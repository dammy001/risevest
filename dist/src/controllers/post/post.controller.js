"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const abstract_controller_1 = require("../abstract.controller");
const policies_1 = require("@/policies");
const lib_1 = require("@/lib");
const entities_1 = require("@/entities");
const utils_1 = require("@/utils");
const paginate = (0, utils_1.createPaginator)({ perPage: 20 });
class PostController extends abstract_controller_1.Controller {
    async createPost(req, res, next) {
        if (await PostController.validateRequest(req)) {
            return abstract_controller_1.Controller.error(res, 'Unauthorized access');
        }
        const { title, content } = req.body;
        try {
            const post = await lib_1.prisma.post.create({
                data: { title, content, userId: req.params.id },
                select: { ...lib_1.postSelect },
            });
            return abstract_controller_1.Controller.success(res, abstract_controller_1.Controller.mapEntity(entities_1.PostEntity, post), 'Post Created Successfully', utils_1.StatusCode.CREATED);
        }
        catch (err) {
            next(err);
        }
    }
    static async validateRequest(req) {
        return ((req.user && !policies_1.PostPolicy.canCreate(req.user, req.params?.id)) ||
            !(await lib_1.prisma.user.findFirst({ where: { id: req.params.id }, select: { id: true } })));
    }
    async getUserPosts(req, res, next) {
        if (await PostController.validateRequest(req)) {
            return abstract_controller_1.Controller.error(res, 'Unauthorized access');
        }
        try {
            const result = await paginate(lib_1.prisma.post, {
                where: {
                    userId: req.params.id,
                },
                select: {
                    ...lib_1.postSelect,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            }, { page: req.query.page });
            return abstract_controller_1.Controller.success(res, result);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.PostController = PostController;
