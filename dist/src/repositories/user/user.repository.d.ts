import { Prisma } from '@prisma/client';
import { BaseRepository } from '../base.repository';
import { UserEntity } from '../../entities/user.entity';
export declare class UserRepository extends BaseRepository<Prisma.UserDelegate> {
    constructor();
    findByEmail(email: string): Promise<UserEntity | null>;
    createOne(data: Prisma.UserCreateInput): Promise<UserEntity>;
}
