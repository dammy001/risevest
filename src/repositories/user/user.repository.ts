import { Prisma } from '@prisma/client'
import { BaseRepository } from '../base.repository'
import { UserEntity } from '../../entities/user.entity'
import { prisma, userSelect } from '@/lib'

export class UserRepository extends BaseRepository<Prisma.UserDelegate> {
  constructor() {
    super(prisma.user, UserEntity)
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.findOne<
      Prisma.UserFindFirstArgs['where'],
      Prisma.UserFindFirstArgs['select']
    >(
      {
        email,
      },
      { ...userSelect },
    )
  }

  async createOne(data: Prisma.UserCreateInput): Promise<UserEntity> {
    return await this.create<Prisma.UserCreateInput>(data, { ...userSelect })
  }
}
