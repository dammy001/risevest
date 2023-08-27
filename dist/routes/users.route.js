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
const _expressratelimit = /*#__PURE__*/ _interop_require_default(require("express-rate-limit"));
const _authmiddleware = require("../middlewares/auth.middleware");
const _controllers = require("../controllers");
const _dtos = require("../dtos");
const _interceptors = require("../interceptors");
const _posts = require("../dtos/posts");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const usersRoutes = (0, _express.Router)();
const userController = new _controllers.UserController();
const postController = new _controllers.PostController();
const createLimiter = (0, _expressratelimit.default)({
    windowMs: 2 * 60 * 1000,
    max: 5,
    message: 'Too many attempts. Please try again after 2 minutes',
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    keyGenerator: (req, res)=>{
        return req.body?.email || req.params.id || req.ip;
    },
    handler: (req, res, next, optionsUsed)=>{
        return res.status(optionsUsed.statusCode).json({
            status: false,
            message: optionsUsed.message
        });
    }
});
usersRoutes.post('', createLimiter, (0, _interceptors.validateRequest)(_dtos.CreateUserDto, 'body'), userController.create);
usersRoutes.get('', _authmiddleware.authenticate, userController.findAll);
usersRoutes.get('/:id/posts', _authmiddleware.authenticate, postController.getUserPosts);
usersRoutes.post('/:id/posts', createLimiter, _authmiddleware.authenticate, (0, _interceptors.validateRequest)(_posts.CreatePostDto, 'body'), postController.createPost);
usersRoutes.get('/ranking', _authmiddleware.authenticate, userController.getTopUsers);
const _default = usersRoutes;

//# sourceMappingURL=users.route.js.map