import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { HttpException } from '@/exceptions'
import { JWT_SECRET, SECRET_KEY } from '@/config'
import { prisma } from '@/lib'
import { StatusCode } from '@/utils'

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  let decoded: jwt.JwtPayload

  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (token === SECRET_KEY) {
      return next()
    }

    if (!token) throw new HttpException('Unauthenticated', StatusCode.UNAUTHORIZED)

    decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload

    if (!(await prisma.user.findFirst({ where: { id: decoded.user.id }, select: { id: true } }))) {
      res.status(StatusCode.BAD_REQUEST).json({ message: 'User not found', status: false })
    }
  } catch (err) {
    return next(err)
  }

  req.user = decoded.user

  next()
}
