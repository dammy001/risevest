import { Prisma } from '@prisma/client'

export const userSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  userName: true,
  createdAt: true,
})
