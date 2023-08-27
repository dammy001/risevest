"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _postcontroller = require("./post.controller");
const _lib = require("../../lib");
const _utils = require("../../utils");
describe('PostController', ()=>{
    let mockRequest;
    let mockResponse;
    let mockNext;
    beforeEach(()=>{
        mockRequest = {
            body: {},
            params: {
                id: 'user-id'
            },
            user: null,
            query: {}
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
    describe('createPost', ()=>{
        it('should create a post and return success response', async ()=>{
            // Mock Prisma functions
            const mockCreate = vi.fn();
            const mockFindFirst = vi.fn();
            _lib.prisma.user.findFirst = mockFindFirst;
            _lib.prisma.post.create = mockCreate;
            const mockCreatedPost = {
                id: 'post-id',
                title: 'Test Post',
                content: 'Test Content',
                userId: 'user-id'
            };
            mockFindFirst.mockResolvedValue({
                id: 'user-id'
            });
            mockCreate.mockResolvedValue(mockCreatedPost);
            const postController = new _postcontroller.PostController();
            mockRequest.user = {
                id: 'user-id'
            };
            await postController.createPost(mockRequest, mockResponse, mockNext);
            expect(mockResponse.status).toHaveBeenCalledWith(_utils.StatusCode.CREATED);
            expect(mockResponse.json).toHaveBeenCalledWith({
                success: true,
                data: expect.any(Object),
                message: 'Post Created Successfully'
            });
            expect(mockNext).not.toHaveBeenCalled();
        });
    });
    describe('validateRequest', ()=>{
        // ... other tests ...
        it('should return undefined for unauthorized access', async ()=>{
            // Mock Prisma function
            _lib.prisma.user.findFirst = vi.fn().mockResolvedValue(null);
            const postController = new _postcontroller.PostController();
            const result = await postController.createPost(mockRequest, mockResponse, mockNext);
            expect(result).toBe(undefined);
        });
    });
    describe.skip('getUserPosts', ()=>{
        it('should get user posts and return success response', async ()=>{
            const mockPaginate = vi.fn();
            const mockFindFirst = vi.fn();
            _lib.prisma.user.findFirst = mockFindFirst;
            _lib.prisma.post.findMany = mockPaginate;
            // Mock successful paginate call
            const mockUserPosts = [
                {
                    id: 'post-id',
                    title: 'Test Post',
                    content: 'Test Content',
                    userId: 'user-id'
                }
            ];
            mockPaginate.mockResolvedValue(mockUserPosts);
            mockFindFirst.mockResolvedValue({
                id: 'user-id'
            });
            const postController = new _postcontroller.PostController();
            // mockRequest.user = { id: 'user-id' }
            mockRequest.params = {
                id: 'user-id'
            };
            mockRequest.query = {
                page: '1'
            };
            await postController.getUserPosts(mockRequest, mockResponse, mockNext);
            expect(mockPaginate).toHaveBeenCalledWith(_lib.prisma.post, {
                where: {
                    userId: 'user-id'
                },
                select: expect.any(Object),
                orderBy: {
                    createdAt: 'desc'
                }
            }, {
                page: '1'
            });
            expect(mockResponse.status).toHaveBeenCalledWith(_utils.StatusCode.OK);
            expect(mockResponse.json).toHaveBeenCalledWith({
                success: true,
                data: mockUserPosts
            });
            expect(mockNext).not.toHaveBeenCalled();
        });
    });
});

//# sourceMappingURL=post.controller.test.js.map