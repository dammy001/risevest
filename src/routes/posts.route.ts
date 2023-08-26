import { type IRouter, Router } from 'express'
import { CommentController } from '@/controllers'
import { authenticate } from '@/middlewares'
import { CreateCommentDto } from '@/dtos/posts/comment/create-comment.dto'
import { validateRequest } from '@/interceptors'

const postsRoutes: IRouter = Router()

const commentController = new CommentController()

postsRoutes.post(
  '/:id/comments',
  authenticate,
  validateRequest(CreateCommentDto, 'body'),
  commentController.addCommentToPost,
)

export default postsRoutes
