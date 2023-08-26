import { type Router as IRouter, Router } from 'express'
import usersRoutes from './users.route'
import postsRoutes from './posts.route'

const router: IRouter = Router()

router.use('/users', usersRoutes)
router.use('/posts', postsRoutes)

export default router
