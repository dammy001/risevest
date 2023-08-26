import { Prisma } from '@prisma/client'
import { prisma } from '../src/lib'

async function createUser(data: {
  user: {
    firstName: string
    lastName: string
    email: string
    userName: string
    hasPosts?: boolean
    hasComments?: boolean
  }
  posts?: Array<
    Omit<Prisma.PostCreateInput, 'user'> & {
      comments?: Array<Omit<Prisma.CommentCreateInput, 'post'>>
    }
  >
  comments?: Array<Prisma.CommentCreateInput>
}) {
  const userData = {
    ...data.user,
    ...(data.user.hasPosts && {
      posts: {
        create: {
          title: 'Database Architecture',
          content:
            'Database architecture is very crutial in designing a performant and scalable system',
          ...(data.user.hasComments && {
            comments: {
              createMany: {
                data: [{ comment: 'i enjoyed the topic' }, { comment: 'so much insight' }],
                skipDuplicates: true,
              },
            },
          }),
        },
      },
    }),
  } as Prisma.UserCreateInput

  const user = await prisma.user.upsert({
    where: { email_userName: { email: data.user.email, userName: data.user.userName } },
    create: userData,
    update: userData,
  })

  console.log(`👤 Upserted successfully with email: "${data.user.email}"`)

  for (const postInput of data.posts ?? []) {
    const { comments: commentFields = [], ...postData } = postInput as Prisma.PostCreateInput & {
      comments?: Array<Prisma.CommentCreateInput>
    }
    postData.user = { connect: { id: user.id } }

    const postExist = await prisma.post.findFirst({
      where: {
        title: postData.title,
        userId: user.id,
      },
      select: {
        id: true,
      },
    })

    if (postExist) {
      console.log(`\t📆 Post ${postData.title} already seems seeded for ${data.user.email}`)
      continue
    }

    const { id: postId } = await prisma.post.create({
      data: postData,
    })

    console.log(`\t📆 Post ${postData.title} with id ${postId} created`)

    for (const commentInput of commentFields) {
      await prisma.comment.create({
        data: {
          ...commentInput,
          post: {
            connect: {
              id: postId,
            },
          },
        },
      })

      console.log(`\t\t☎️ Created comment for post ${postId}`)
    }
  }

  return user
}

async function main() {
  const [user1, user2, user3] = await Promise.all([
    await createUser({
      user: {
        firstName: 'Damilare',
        lastName: 'Doe',
        email: 'dummy@gmail.com',
        userName: 'doe1',
      },
    }),
    await createUser({
      user: {
        firstName: 'Wayne',
        lastName: 'Doe',
        email: 'wayne@gmail.com',
        userName: 'wayne',
      },
    }),
    await createUser({
      user: {
        firstName: 'Jason',
        lastName: 'Doe',
        email: 'jason@gmail.com',
        userName: 'jason1',
      },
    }),
  ])

  await Promise.all([
    createUser({
      user: {
        firstName: 'Damilare',
        lastName: 'Anjorin',
        email: 'damilareanjorin1@gmail.com',
        userName: 'damilare1',
      },
      posts: [
        {
          title: 'Database Architecture',
          content:
            'Database architecture is very crutial in designing a performant and scalable system',
          comments: [
            {
              comment: 'I enjoyed this topic especially when the part of indexing',
              user: {
                connect: {
                  id: user1.id,
                },
              },
            },
            {
              comment: 'I enjoyed part of sharding',
              user: {
                connect: {
                  id: user2.id,
                },
              },
            },
          ],
        },
        {
          title: 'Design System',
          content: 'Design system is very crutial',
          comments: [
            {
              comment: 'I enjoyed this topic',
              user: {
                connect: {
                  id: user1.id,
                },
              },
            },
            {
              comment: 'I enjoyed part of load balancing',
              user: {
                connect: {
                  id: user3.id,
                },
              },
            },
          ],
        },
        {
          title: 'Test Post 1',
          content: 'test post 1',
        },
        {
          title: 'Test Post 2',
          content: 'test post 2',
        },
      ],
    }),
    createUser({
      user: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        userName: 'john1',
      },
      posts: [
        {
          title: 'Design Pattern',
          content: 'Design pattern is very crutial',
          comments: [
            {
              comment: 'I enjoyed this topic',
              user: {
                connect: {
                  id: user3.id,
                },
              },
            },
            {
              comment: 'I enjoyed part of solid principles',
              user: {
                connect: {
                  id: user2.id,
                },
              },
            },
          ],
        },
        {
          title: 'Designing Payment System',
          content: 'Payment system',
        },
        {
          title: 'Test Post 3',
          content: 'test post 3',
        },
      ],
    }),
    createUser({
      user: {
        firstName: 'Ridwan',
        lastName: 'Rise',
        email: 'ridwan@gmail.com',
        userName: 'ridwan1',
      },
      posts: [
        {
          title: 'Test One',
          content: 'Test one is very crutial',
        },
        {
          title: 'Test Two',
          content: 'Test two',
        },
      ],
    }),
    createUser({
      user: {
        firstName: 'Restvest',
        lastName: 'Rise',
        email: 'rise@gmail.com',
        userName: 'rise1',
      },
      posts: [
        {
          title: 'Test Title 4',
          content: 'Test title is very crutial',
        },
        {
          title: 'Test Title 4',
          content: 'Test title 4',
        },
      ],
    }),
  ])
}

main()
  .then(() => {})
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
