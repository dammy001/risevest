import * as z from 'zod'
import { CompleteComment, CompletePost, RelatedCommentModel, RelatedPostModel } from './index'

export const UserModel = z.object({
  id: z.string(),
  firstName: z.string().max(100, { message: 'first name must be shorter than 100 characters' }),
  lastName: z.string().max(100, { message: 'last name must be shorter than 100 characters' }),
  email: z.string().max(150, { message: 'email must be shorter than 100 characters' }),
  userName: z
    .string()
    .max(150, { message: 'username must be shorter than 100 characters' })
    .nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullish(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  posts: CompletePost[]
  comments: CompleteComment[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() =>
  UserModel.extend({
    posts: RelatedPostModel.array(),
    comments: RelatedCommentModel.array(),
  }),
)
