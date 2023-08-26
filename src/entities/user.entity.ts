import { Exclude } from 'class-transformer'

export class UserEntity {
  id!: string

  firstName!: string

  lastName!: string

  email!: string

  createdAt!: Date

  updatedAt!: Date

  @Exclude({ toPlainOnly: true })
  deletedAt!: Date | null
}
