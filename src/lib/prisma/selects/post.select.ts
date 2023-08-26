import { Prisma } from '@prisma/client'

export const postSelect = Prisma.validator<Prisma.PostSelect>()({
  id: true,
  title: true,
  content: true,
  imageUrl: true,
  createdAt: true,
})
