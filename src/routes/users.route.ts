import { type IRouter, NextFunction, Request, Response, Router } from 'express'
import rateLimit, { type Options } from 'express-rate-limit'
import { authenticate } from '../middlewares/auth.middleware'
import { PostController, UserController } from '@/controllers'
import { CreateUserDto } from '@/dtos'
import { validateRequest } from '@/interceptors'
import { CreatePostDto } from '@/dtos/posts'

const usersRoutes: IRouter = Router()

const userController = new UserController()
const postController = new PostController()

const createLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes,
  max: 5,
  message: 'Too many attempts. Please try again after 2 minutes',
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  keyGenerator: (req: Request, res: Response) => {
    return req.body?.email || req.params.id || req.ip
  },
  handler: (req: Request, res: Response, next: NextFunction, optionsUsed: Options) => {
    return res.status(optionsUsed.statusCode).json({ status: false, message: optionsUsed.message })
  },
})

usersRoutes.post('', createLimiter, validateRequest(CreateUserDto, 'body'), userController.create)
usersRoutes.get('', authenticate, userController.findAll)

usersRoutes.get('/:id/posts', authenticate, postController.getUserPosts)
usersRoutes.post(
  '/:id/posts',
  createLimiter,
  authenticate,
  validateRequest(CreatePostDto, 'body'),
  postController.createPost,
)

usersRoutes.get('/ranking', authenticate, userController.getTopUsers)

export default usersRoutes
