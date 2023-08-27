"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CommentController", {
    enumerable: true,
    get: function() {
        return CommentController;
    }
});
const _abstractcontroller = require("../abstract.controller");
const _lib = require("../../lib");
const _utils = require("../../utils");
class CommentController extends _abstractcontroller.Controller {
    async addCommentToPost(req, res, next) {
        try {
            const { userId, comment } = req.body;
            if (!await _lib.prisma.user.findFirst({
                where: {
                    id: req.body.userId
                },
                select: {
                    id: true
                }
            }) || !await _lib.prisma.post.findFirst({
                where: {
                    id: req.params.id
                },
                select: {
                    id: true
                }
            })) {
                return _abstractcontroller.Controller.error(res, 'User/Post not found', {}, _utils.StatusCode.NOT_FOUND);
            }
            const commentInput = await _lib.prisma.comment.create({
                data: {
                    comment,
                    postId: req.params.id,
                    userId
                },
                select: {
                    id: true,
                    comment: true,
                    createdAt: true
                }
            });
            return _abstractcontroller.Controller.success(res, commentInput, 'Comment Created Successfully', _utils.StatusCode.CREATED);
        } catch (err) {
            next(err);
        }
    }
}

//# sourceMappingURL=comment.controller.js.map