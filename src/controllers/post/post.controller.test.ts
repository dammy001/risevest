import { NextFunction, Request, Response } from 'express'
import { Post, PrismaClient } from '@prisma/client'
import { vi } from 'vitest'
// import { createPaginator } from '../../utils'
import { PostController } from './post.controller'

const prisma = new PrismaClient()
// const paginate = createPaginator({ page: 10 })

describe('PostController', () => {
  let req: Partial<Request>
  let res: Partial<Response>
  let next: NextFunction | any
  let controller: PostController

  beforeEach(() => {
    req = {
      params: { id: 'user_id_here' }, // Replace with a valid user ID
      body: { title: 'Test Title', content: 'Test Content' },
      user: {}, // Set the user object if needed
      query: { page: '1' },
    }

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    }

    next = vi.fn()

    controller = new PostController()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('createPost', () => {
    it('should create a new post', async () => {
      const mockPost: Post = {
        id: 'mocked_post_id',
        title: 'Test Title',
        content: 'Test Content',
        imageUrl: null,
        userId: 'user_id_here', // Replace with the user ID
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      prisma.post.create = vi.fn().mockResolvedValue(mockPost)

      await controller.createPost(req as Request, res as Response, next)

      expect(prisma.post.create).toHaveBeenCalledWith({
        data: {
          title: 'Test Title',
          content: 'Test Content',
          userId: 'user_id_here', // Replace with the user ID
        },
        select: expect.any(Object), // This could be your postSelect object or a matcher
      })

      // Check if the status function is called with 200
      expect(res.status).toHaveBeenCalledWith(200)

      // Check if the json function is called with the mockPost
      expect(res.json).toHaveBeenCalledWith({
        id: 'mocked_post_id',
        title: 'Test Title',
        content: 'Test Content',
        userId: 'user_id_here', // Replace with the user ID
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
    })

    it.skip('should handle errors', async () => {
      const errorMessage = 'An error occurred'
      prisma.post.create = vi.fn().mockRejectedValue(new Error(errorMessage))

      await controller.createPost(req as Request, res as Response, next)

      expect(next).toHaveBeenCalledWith(new Error(errorMessage))
    })

    // Add more tests for different scenarios
  })

  describe.skip('getUserPosts', () => {
    // it('should get user posts', async () => {
    //   prisma.post.findMany = vi.fn().mockResolvedValue(/* Mock an array of Post objects */)
    //   paginate.mockReturnValue(/* Mock pagination result */)

    //   await controller.getUserPosts(req as Request, res as Response, next)

    //   expect(prisma.post.findMany).toHaveBeenCalledWith(/* Expected query options */)
    //   expect(paginate).toHaveBeenCalledWith(/* Expected arguments */)
    //   expect(res.status).toHaveBeenCalledWith(200)
    //   expect(res.json).toHaveBeenCalledWith(/* Expected response data */)
    // })

    it('should handle errors', async () => {
      const errorMessage = 'An error occurred'
      prisma.post.findMany = vi.fn().mockRejectedValue(new Error(errorMessage))

      await controller.getUserPosts(req as Request, res as Response, next)

      expect(next).toHaveBeenCalledWith(new Error(errorMessage))
    })
  })
})
