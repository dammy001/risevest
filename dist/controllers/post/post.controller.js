"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PostController", {
    enumerable: true,
    get: function() {
        return PostController;
    }
});
const _abstractcontroller = require("../abstract.controller");
const _policies = require("../../policies");
const _lib = require("../../lib");
const _entities = require("../../entities");
const _utils = require("../../utils");
const paginate = (0, _utils.createPaginator)({
    perPage: 20
});
class PostController extends _abstractcontroller.Controller {
    async createPost(req, res, next) {
        if (await PostController.validateRequest(req)) {
            return _abstractcontroller.Controller.error(res, 'Unauthorized access');
        }
        const { title, content } = req.body;
        try {
            const post = await _lib.prisma.post.create({
                data: {
                    title,
                    content,
                    userId: req.params.id
                },
                select: {
                    ..._lib.postSelect
                }
            });
            return _abstractcontroller.Controller.success(res, _abstractcontroller.Controller.mapEntity(_entities.PostEntity, post), 'Post Created Successfully', _utils.StatusCode.CREATED);
        } catch (err) {
            next(err);
        }
    }
    static async validateRequest(req) {
        return req.user && !_policies.PostPolicy.canCreate(req.user, req.params?.id) || !await _lib.prisma.user.findFirst({
            where: {
                id: req.params.id
            },
            select: {
                id: true
            }
        });
    }
    async getUserPosts(req, res, next) {
        if (await PostController.validateRequest(req)) {
            return _abstractcontroller.Controller.error(res, 'Unauthorized access');
        }
        try {
            const result = await paginate(_lib.prisma.post, {
                where: {
                    userId: req.params.id
                },
                select: {
                    ..._lib.postSelect
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }, {
                page: req.query.page
            });
            return _abstractcontroller.Controller.success(res, result);
        } catch (err) {
            next(err);
        }
    }
}

//# sourceMappingURL=post.controller.js.map