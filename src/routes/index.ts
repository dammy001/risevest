import { type Router as IRouter, Router } from 'express'
import usersRoutes from './users.route'
import postsRoutes from './posts.route'
import { StatusCode } from '@/utils'

const router: IRouter = Router()

router.use('', (req, res) => res.send(StatusCode.OK).json({ status: true, message: 'Welcome' }))

router.use('/users', usersRoutes)
router.use('/posts', postsRoutes)

export default router
