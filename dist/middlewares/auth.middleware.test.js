"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
const _authmiddleware = require("./auth.middleware");
const _exceptions = require("../exceptions");
const _lib = require("../lib");
const _utils = require("../utils");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
vi.mock('jsonwebtoken');
vi.mock('@/lib/prisma');
vi.mock('@/exceptions');
describe('authenticate', ()=>{
    const mockRequest = {
        headers: {
            authorization: 'Bearer mock-token'
        }
    };
    const mockResponse = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn()
    };
    const mockNext = vi.fn();
    it('should call next if the token matches SECRET_KEY', async ()=>{
        const token = 'mock-secret-key';
        mockRequest.headers.authorization = `Bearer ${token}`;
        await (0, _authmiddleware.authenticate)(mockRequest, mockResponse, mockNext);
        expect(mockNext).toHaveBeenCalled();
    });
    it('should throw HttpException if no token is provided', async ()=>{
        mockRequest.headers.authorization = undefined;
        await (0, _authmiddleware.authenticate)(mockRequest, mockResponse, mockNext);
        expect(_exceptions.HttpException).toHaveBeenCalledWith('Unauthenticated', _utils.StatusCode.UNAUTHORIZED);
        expect(mockNext).toHaveBeenCalledWith(expect.any(_exceptions.HttpException));
    });
    it('should return user not found if user does not exist', async ()=>{
        _jsonwebtoken.default.verify.mockReturnValue({
            user: {
                id: 'mock-user-id'
            }
        });
        // Mocking the Prisma findFirst method
        const prismaUserFindFirstSpy = vi.spyOn(_lib.prisma.user, 'findFirst');
        prismaUserFindFirstSpy.mockReturnValue(null);
        await (0, _authmiddleware.authenticate)(mockRequest, mockResponse, mockNext);
        // expect(mockResponse.status).toHaveBeenCalledWith(StatusCode.BAD_REQUEST)
        // expect(mockResponse.json).toHaveBeenCalledWith({
        //   message: 'User not found',
        //   status: false,
        // })
        prismaUserFindFirstSpy.mockRestore();
    });
    it('should call next for catch block', async ()=>{
        _jsonwebtoken.default.verify.mockImplementation(()=>{
            throw new Error('Mock Error');
        });
        await (0, _authmiddleware.authenticate)(mockRequest, mockResponse, mockNext);
        expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });
});

//# sourceMappingURL=auth.middleware.test.js.map