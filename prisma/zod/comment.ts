import * as z from 'zod'
import { CompletePost, CompleteUser, RelatedPostModel, RelatedUserModel } from './index'

export const CommentModel = z.object({
  id: z.string(),
  comment: z.string(),
  postId: z.string(),
  userId: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteComment extends z.infer<typeof CommentModel> {
  post: CompletePost
  user?: CompleteUser | null
}

/**
 * RelatedCommentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCommentModel: z.ZodSchema<CompleteComment> = z.lazy(() =>
  CommentModel.extend({
    post: RelatedPostModel,
    user: RelatedUserModel.nullish(),
  }),
)
