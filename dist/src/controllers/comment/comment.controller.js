"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const abstract_controller_1 = require("../abstract.controller");
const lib_1 = require("@/lib");
const utils_1 = require("@/utils");
class CommentController extends abstract_controller_1.Controller {
    async addCommentToPost(req, res, next) {
        try {
            const { userId, comment } = req.body;
            if (!(await lib_1.prisma.user.findFirst({ where: { id: req.body.userId }, select: { id: true } })) ||
                !(await lib_1.prisma.post.findFirst({ where: { id: req.params.id }, select: { id: true } }))) {
                return abstract_controller_1.Controller.error(res, 'User/Post not found', {}, utils_1.StatusCode.NOT_FOUND);
            }
            const commentInput = await lib_1.prisma.comment.create({
                data: { comment, postId: req.params.id, userId },
                select: { id: true, comment: true, createdAt: true },
            });
            return abstract_controller_1.Controller.success(res, commentInput, 'Comment Created Successfully', utils_1.StatusCode.CREATED);
        }
        catch (err) {
            next(err);
        }
    }
}
exports.CommentController = CommentController;
