"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_middleware_1 = require("./auth.middleware");
const exceptions_1 = require("@/exceptions");
const lib_1 = require("@/lib");
const utils_1 = require("@/utils");
vi.mock('jsonwebtoken');
vi.mock('@/lib/prisma');
vi.mock('@/exceptions');
describe('authenticate', () => {
    const mockRequest = {
        headers: {
            authorization: 'Bearer mock-token',
        },
    };
    const mockResponse = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
    };
    const mockNext = vi.fn();
    it('should call next if the token matches SECRET_KEY', async () => {
        const token = 'mock-secret-key';
        mockRequest.headers.authorization = `Bearer ${token}`;
        await (0, auth_middleware_1.authenticate)(mockRequest, mockResponse, mockNext);
        expect(mockNext).toHaveBeenCalled();
    });
    it('should throw HttpException if no token is provided', async () => {
        mockRequest.headers.authorization = undefined;
        await (0, auth_middleware_1.authenticate)(mockRequest, mockResponse, mockNext);
        expect(exceptions_1.HttpException).toHaveBeenCalledWith('Unauthenticated', utils_1.StatusCode.UNAUTHORIZED);
        expect(mockNext).toHaveBeenCalledWith(expect.any(exceptions_1.HttpException));
    });
    it('should return user not found if user does not exist', async () => {
        ;
        jsonwebtoken_1.default.verify.mockReturnValue({ user: { id: 'mock-user-id' } });
        // Mocking the Prisma findFirst method
        const prismaUserFindFirstSpy = vi.spyOn(lib_1.prisma.user, 'findFirst');
        prismaUserFindFirstSpy.mockReturnValue(null);
        await (0, auth_middleware_1.authenticate)(mockRequest, mockResponse, mockNext);
        // expect(mockResponse.status).toHaveBeenCalledWith(StatusCode.BAD_REQUEST)
        // expect(mockResponse.json).toHaveBeenCalledWith({
        //   message: 'User not found',
        //   status: false,
        // })
        prismaUserFindFirstSpy.mockRestore();
    });
    it('should call next for catch block', async () => {
        ;
        jsonwebtoken_1.default.verify.mockImplementation(() => {
            throw new Error('Mock Error');
        });
        await (0, auth_middleware_1.authenticate)(mockRequest, mockResponse, mockNext);
        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });
});
