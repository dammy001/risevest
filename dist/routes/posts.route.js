"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = require("express");
const _controllers = require("../controllers");
const _middlewares = require("../middlewares");
const _createcommentdto = require("../dtos/posts/comment/create-comment.dto");
const _interceptors = require("../interceptors");
const postsRoutes = (0, _express.Router)();
const commentController = new _controllers.CommentController();
postsRoutes.post('/:id/comments', _middlewares.authenticate, (0, _interceptors.validateRequest)(_createcommentdto.CreateCommentDto, 'body'), commentController.addCommentToPost);
const _default = postsRoutes;

//# sourceMappingURL=posts.route.js.map