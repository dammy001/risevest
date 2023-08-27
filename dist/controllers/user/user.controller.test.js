"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
const _usercontroller = require("./user.controller" // Update with the correct path
);
const _lib = require("../../lib");
const _config = require("../../config");
const _utils = require("../../utils");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
describe('UserController', ()=>{
    let mockRequest;
    let mockResponse;
    let mockNext;
    beforeEach(()=>{
        mockRequest = {
            body: {}
        };
        mockResponse = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };
        mockNext = vi.fn();
    });
    afterEach(()=>{
        vi.clearAllMocks();
    });
    describe('create', ()=>{
        it('should create a new user and return success response with token', async ()=>{
            // Mock Prisma functions
            const mockFindFirst = vi.fn();
            const mockCreate = vi.fn();
            _lib.prisma.user.findFirst = mockFindFirst;
            _lib.prisma.user.create = mockCreate;
            mockFindFirst.mockResolvedValue(null);
            const mockCreatedUser = {
                id: 'user-id',
                email: 'test@example.com',
                firstName: 'Damilare',
                lastName: 'Anjorin',
                userName: 'dammy'
            };
            mockCreate.mockResolvedValue(mockCreatedUser);
            const mockToken = 'mocked-token';
            _jsonwebtoken.default.sign = vi.fn().mockReturnValue(mockToken);
            const userController = new _usercontroller.UserController();
            mockRequest.body = {
                email: 'test@example.com',
                firstName: 'Damilare',
                lastName: 'Anjorin',
                userName: 'dammy'
            };
            await userController.create(mockRequest, mockResponse, mockNext);
            expect(mockFindFirst).toHaveBeenCalledWith({
                where: {
                    email: 'test@example.com'
                },
                select: expect.any(Object)
            });
            expect(mockCreate).toHaveBeenCalledWith({
                data: {
                    email: 'test@example.com',
                    firstName: 'Damilare',
                    lastName: 'Anjorin',
                    userName: 'dammy'
                },
                select: expect.any(Object)
            });
            expect(_jsonwebtoken.default.sign).toHaveBeenCalledWith({
                user: mockCreatedUser
            }, _config.JWT_SECRET, {
                expiresIn: '24h'
            });
            expect(mockResponse.status).toHaveBeenCalledWith(expect.any(Number));
            expect(mockResponse.json).toHaveBeenCalledWith({
                success: true,
                data: {
                    token: 'mocked-token',
                    user: {
                        createdAt: undefined,
                        deletedAt: undefined,
                        email: 'test@example.com',
                        firstName: 'Damilare',
                        lastName: 'Anjorin',
                        userName: 'dammy',
                        id: 'user-id',
                        updatedAt: undefined
                    }
                },
                message: 'Successful'
            });
            expect(mockNext).not.toHaveBeenCalled();
        });
        it('should handle error when user already exists', async ()=>{
            const mockFindFirst = vi.fn();
            _lib.prisma.user.findFirst = mockFindFirst;
            const mockExistingUser = {
                id: 'existing-user-id',
                email: 'test@example.com'
            };
            mockFindFirst.mockResolvedValue(mockExistingUser);
            const userController = new _usercontroller.UserController();
            mockRequest.body = {
                email: 'test@example.com'
            };
            await userController.create(mockRequest, mockResponse, mockNext);
            expect(mockFindFirst).toHaveBeenCalledWith({
                where: {
                    email: 'test@example.com'
                },
                select: expect.any(Object)
            });
            expect(mockResponse.status).toHaveBeenCalledWith(expect.any(Number));
            expect(mockResponse.json).toHaveBeenCalledWith({
                data: {},
                success: false,
                message: 'User already exists'
            });
            expect(mockNext).not.toHaveBeenCalled();
        });
        it('should handle and pass errors to the next middleware', async ()=>{
            const mockFindFirst = vi.fn();
            const mockCreate = vi.fn();
            _lib.prisma.user.findFirst = mockFindFirst;
            _lib.prisma.user.create = mockCreate;
            const mockError = new Error('Some error');
            mockCreate.mockRejectedValue(mockError);
            const userController = new _usercontroller.UserController();
            mockRequest.body = {
                email: 'test@example.com'
            };
            await userController.create(mockRequest, mockResponse, mockNext);
            expect(mockFindFirst).toHaveBeenCalledWith({
                where: {
                    email: 'test@example.com'
                },
                select: expect.any(Object)
            });
            expect(mockCreate).toHaveBeenCalledWith({
                data: {
                    email: 'test@example.com'
                },
                select: expect.any(Object)
            });
            expect(mockResponse.status).not.toHaveBeenCalled();
            expect(mockResponse.json).not.toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });
    describe.skip('findAll', ()=>{
        it('should retrieve all users and return a success response', async ()=>{
            // Mock Prisma function
            const mockPaginate = vi.fn();
            // Mock successful paginate call
            const mockUserList = [
                {
                    id: 'user-id-1',
                    email: 'user1@example.com'
                },
                {
                    id: 'user-id-2',
                    email: 'user2@example.com'
                }
            ];
            mockPaginate.mockResolvedValue({
                data: mockUserList,
                meta: {
                    total: mockUserList.length,
                    lastPage: 1,
                    current: 1,
                    perPage: 10,
                    prev: null,
                    next: null
                }
            });
            // Mock createPaginator function
            const mockCreatePaginator = vi.fn().mockReturnValue(mockPaginate);
            const mocks = vi.hoisted(()=>{
                return {
                    createPaginator: vi.fn().mockReturnValue(vi.fn().mockReturnValue({
                        data: [
                            {
                                id: 'user-id-1',
                                email: 'user1@example.com'
                            },
                            {
                                id: 'user-id-2',
                                email: 'user2@example.com'
                            }
                        ],
                        meta: {
                            total: 2,
                            lastPage: 1,
                            current: 1,
                            perPage: 10,
                            prev: null,
                            next: null
                        }
                    }))
                };
            });
            vi.mock('@/utils', async ()=>{
                const actual = await vi.importActual('@/utils');
                return {
                    ...actual,
                    createPaginator: mocks.createPaginator
                };
            });
            const userController = new _usercontroller.UserController();
            mockRequest.query = {
                page: '1'
            };
            await userController.findAll(mockRequest, mockResponse, mockNext);
            // Assertion
            expect(mockCreatePaginator).toHaveBeenCalledWith({
                perPage: 20
            });
            expect(mockPaginate).toHaveBeenCalledWith(_lib.prisma.user, expect.any(Object), {
                page: '1'
            });
            expect(mockResponse.status).toHaveBeenCalledWith(_utils.StatusCode.OK);
            expect(mockResponse.json).toHaveBeenCalledWith({
                success: true,
                data: mockUserList
            });
            expect(mockNext).not.toHaveBeenCalled();
        });
    });
});

//# sourceMappingURL=user.controller.test.js.map