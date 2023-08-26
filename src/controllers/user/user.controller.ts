import { NextFunction, Request, Response } from 'express'
import { Prisma, User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { Controller } from '../abstract.controller'
import { createPaginator } from '@/utils'
import { prisma, userSelect } from '@/lib'
import { UserEntity } from '@/entities'
import { HttpException } from '@/exceptions'
import { JWT_SECRET } from '@/config'

const paginate = createPaginator({ perPage: 20 })

export class UserController extends Controller {
  async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      if (await prisma.user.findFirst({ where: { email: req.body.email }, select: userSelect })) {
        throw new HttpException('User already exists')
      }

      const user = await prisma.user.create({ data: { ...req.body }, select: userSelect })

      return Controller.success(res, {
        user: Controller.mapEntity(UserEntity, user),
        token: jwt.sign({ user }, JWT_SECRET, { expiresIn: '24h' }),
      })
    } catch (err) {
      next(err)
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      // Generic types can be passed to "paginate",
      // so args and result will be typed and autocompleted
      const result = await paginate<User, Prisma.UserFindManyArgs>(
        prisma.user,
        {
          select: {
            ...userSelect,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        { page: req.query.page as string },
      )

      return Controller.success(res, result)
    } catch (err) {
      next(err)
    }
  }

  async getTopUsers(req: Request, res: Response, next: NextFunction) {
    try {
      // The UserWithComments CTE identifies users who have at least one comment.
      // The main query joins the data from the UserPostCounts CTE,
      // filtering only those users who have comments based on the UserWithComments CTE.
      // The LEFT JOIN LATERAL clause retrieves the latest comment for each post while considering the specific user.
      // The final query retrieves the top 3 users with the most posts and includes their latest comments.
      return Controller.success(
        res,
        await prisma.$queryRaw`
          WITH UserPostCounts AS (
            SELECT
              u."id" AS user_id,
              u."firstName" AS user_name,
              u."lastName" AS last_name,
              COUNT(p."id") AS post_count,
              ROW_NUMBER() OVER (ORDER BY COUNT(p."id") DESC) AS user_rank
            FROM "users" u LEFT JOIN "posts" p ON u."id" = p."userId" GROUP BY u."id"
          ),
          UserWithComments AS (
            SELECT DISTINCT u."id" AS user_id FROM "users" u
            JOIN "comments" c ON u."id" = c."userId"
          )
          SELECT
            upc.user_id,
            upc.user_name,
            upc.last_name,
            p."title" AS post_title,
            c."comment" AS comment_content,
            c."createdAt" AS comment_createdAt
          FROM
            UserPostCounts upc
          JOIN
            "posts" p ON upc.user_id = p."userId"
          JOIN
            "users" u ON upc.user_id = u."id"
          JOIN LATERAL (
            SELECT "comment", "createdAt"
            FROM "comments" c
            WHERE c."postId" = p."id" AND c."userId" = u."id"
            ORDER BY c."createdAt" DESC
            LIMIT 1
          ) c ON true
          JOIN
            UserWithComments uwc ON upc.user_id = uwc.user_id
          WHERE
            upc.user_rank <= 3
          ORDER BY
            upc.user_rank;
        `,
      )
    } catch (err) {
      next(err)
    }
  }
}
