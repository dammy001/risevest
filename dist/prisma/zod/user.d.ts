import * as z from 'zod';
import { CompleteComment, CompletePost } from './index';
export declare const UserModel: z.ZodObject<{
    id: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    userName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
    deletedAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
    userName?: string | null | undefined;
    deletedAt?: Date | null | undefined;
}, {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
    userName?: string | null | undefined;
    deletedAt?: Date | null | undefined;
}>;
export interface CompleteUser extends z.infer<typeof UserModel> {
    posts: CompletePost[];
    comments: CompleteComment[];
}
/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export declare const RelatedUserModel: z.ZodSchema<CompleteUser>;
