import * as z from 'zod';
import { CompleteComment, CompleteUser } from './index';
export declare const PostModel: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    content: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    imageUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    userId: z.ZodString;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    content?: string | null | undefined;
    imageUrl?: string | null | undefined;
}, {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    content?: string | null | undefined;
    imageUrl?: string | null | undefined;
}>;
export interface CompletePost extends z.infer<typeof PostModel> {
    user: CompleteUser;
    comments: CompleteComment[];
}
/**
 * RelatedPostModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export declare const RelatedPostModel: z.ZodSchema<CompletePost>;
