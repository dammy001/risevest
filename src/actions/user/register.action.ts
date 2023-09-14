import jwt from 'jsonwebtoken'
import { Inject, Service } from 'typedi'
import { JWT_SECRET } from '@/config'
import { CreateUserDto } from '@/dtos'
import { HttpException } from '@/exceptions'
import { UserRepository } from '@/repositories'
import { UserEntity } from '@/entities'

@Service()
export class RegisterAction {
  constructor(@Inject() public readonly userRepository: UserRepository) {}

  async execute(data: CreateUserDto): Promise<{
    user: UserEntity
    token: string
  }> {
    if (await this.userRepository.findByEmail(data.email)) {
      throw new HttpException('User already exists')
    }

    const user = await this.userRepository.createOne({ ...data })

    return {
      user,
      token: jwt.sign({ user }, JWT_SECRET, { expiresIn: '24h' }),
    }
  }
}
