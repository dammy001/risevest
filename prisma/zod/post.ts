import * as z from 'zod'
import { CompleteComment, CompleteUser, RelatedCommentModel, RelatedUserModel } from './index'

export const PostModel = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string().nullish(),
  imageUrl: z.string().nullish(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompletePost extends z.infer<typeof PostModel> {
  user: CompleteUser
  comments: CompleteComment[]
}

/**
 * RelatedPostModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPostModel: z.ZodSchema<CompletePost> = z.lazy(() =>
  PostModel.extend({
    user: RelatedUserModel,
    comments: RelatedCommentModel.array(),
  }),
)
