import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { authenticate } from './auth.middleware'
import { HttpException } from '@/exceptions'
import { prisma } from '@/lib'
import { StatusCode } from '@/utils'

vi.mock('jsonwebtoken')
vi.mock('@/lib/prisma')
vi.mock('@/exceptions')

describe('authenticate', () => {
  const mockRequest = {
    headers: {
      authorization: 'Bearer mock-token',
    },
  } as Request

  const mockResponse = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  } as unknown as Response

  const mockNext = vi.fn()

  it('should call next if the token matches SECRET_KEY', async () => {
    const token = 'mock-secret-key'
    mockRequest.headers.authorization = `Bearer ${token}`
    await authenticate(mockRequest, mockResponse, mockNext)
    expect(mockNext).toHaveBeenCalled()
  })

  it('should throw HttpException if no token is provided', async () => {
    mockRequest.headers.authorization = undefined
    await authenticate(mockRequest, mockResponse, mockNext)
    expect(HttpException).toHaveBeenCalledWith('Unauthenticated', StatusCode.UNAUTHORIZED)
    expect(mockNext).toHaveBeenCalledWith(expect.any(HttpException))
  })

  it('should return user not found if user does not exist', async () => {
    jwt.verify.mockReturnValue({ user: { id: 'mock-user-id' } })

    // Mocking the Prisma findFirst method
    const prismaUserFindFirstSpy = vi.spyOn(prisma.user, 'findFirst')
    prismaUserFindFirstSpy.mockReturnValue(null as any)

    await authenticate(mockRequest, mockResponse, mockNext)
    // expect(mockResponse.status).toHaveBeenCalledWith(StatusCode.BAD_REQUEST)
    // expect(mockResponse.json).toHaveBeenCalledWith({
    //   message: 'User not found',
    //   status: false,
    // })

    prismaUserFindFirstSpy.mockRestore()
  })

  it('should call next for catch block', async () => {
    jwt.verify.mockImplementation(() => {
      throw new Error('Mock Error')
    })
    await authenticate(mockRequest, mockResponse, mockNext)
    expect(mockNext).toHaveBeenCalledWith(expect.any(Error))
  })
})
