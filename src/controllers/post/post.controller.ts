import { NextFunction, Request, Response } from 'express'
import { Post, Prisma } from '@prisma/client'
import { Controller } from '../abstract.controller'
import { PostPolicy } from '@/policies'
import { postSelect, prisma } from '@/lib'
import { PostEntity } from '@/entities'
import { createPaginator } from '@/utils'

const paginate = createPaginator({ perPage: 20 })

export class PostController extends Controller {
  async createPost(req: Request, res: Response, next: NextFunction) {
    if (await PostController.validateRequest(req)) {
      return Controller.error(res, 'Unauthorized access')
    }

    const { title, content } = req.body

    try {
      const post = await prisma.post.create({
        data: { title, content, userId: req.params.id },
        select: { ...postSelect },
      })

      return Controller.success(res, Controller.mapEntity<PostEntity>(PostEntity, post))
    } catch (err) {
      next(err)
    }
  }

  static async validateRequest(req: Request) {
    return (
      (req.user && !PostPolicy.canCreate(req.user, req.params?.id)) ||
      !(await prisma.user.findFirst({ where: { id: req.params.id }, select: { id: true } }))
    )
  }

  async getUserPosts(req: Request, res: Response, next: NextFunction) {
    if (await PostController.validateRequest(req)) {
      return Controller.error(res, 'Unauthorized access')
    }

    try {
      const result = await paginate<Post, Prisma.PostFindManyArgs>(
        prisma.post,
        {
          where: {
            userId: req.params.id,
          },
          select: {
            ...postSelect,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        { page: req.query.page as any },
      )

      return Controller.success(res, result)
    } catch (err) {
      next(err)
    }
  }
}
