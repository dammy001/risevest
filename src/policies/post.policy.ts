import { UserEntity } from '@/entities'

export class PostPolicy {
  static canCreate(user: UserEntity, id: string) {
    return user.id.trim() === id.trim()
  }

  static canView(user: UserEntity, id: string) {
    return user.id.trim() === id.trim()
  }
}
