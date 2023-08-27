import * as z from 'zod';
import { CompletePost, CompleteUser } from './index';
export declare const CommentModel: z.ZodObject<{
    id: z.ZodString;
    comment: z.ZodString;
    postId: z.ZodString;
    userId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
    postId: string;
    userId?: string | null | undefined;
}, {
    id: string;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
    postId: string;
    userId?: string | null | undefined;
}>;
export interface CompleteComment extends z.infer<typeof CommentModel> {
    post: CompletePost;
    user?: CompleteUser | null;
}
/**
 * RelatedCommentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export declare const RelatedCommentModel: z.ZodSchema<CompleteComment>;
