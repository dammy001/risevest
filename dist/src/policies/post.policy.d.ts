import { UserEntity } from '@/entities';
export declare class PostPolicy {
    static canCreate(user: UserEntity, id: string): boolean;
    static canView(user: UserEntity, id: string): boolean;
}
