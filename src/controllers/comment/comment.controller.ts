import { NextFunction, Request, Response } from 'express'
import { Controller } from '../abstract.controller'
import { prisma } from '@/lib'
import { StatusCode } from '@/utils'

export class CommentController extends Controller {
  async addCommentToPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, comment } = req.body
      if (
        !(await prisma.user.findFirst({ where: { id: req.body.userId }, select: { id: true } })) ||
        !(await prisma.post.findFirst({ where: { id: req.params.id }, select: { id: true } }))
      ) {
        return Controller.error(res, 'User/Post not found', {}, StatusCode.NOT_FOUND)
      }

      const commentInput = await prisma.comment.create({
        data: { comment, postId: req.params.id, userId },
        select: { id: true, comment: true, createdAt: true },
      })

      return Controller.success(
        res,
        commentInput,
        'Comment Created Successfully',
        StatusCode.CREATED,
      )
    } catch (err) {
      next(err)
    }
  }
}
