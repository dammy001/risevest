"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const controllers_1 = require("@/controllers");
const dtos_1 = require("@/dtos");
const interceptors_1 = require("@/interceptors");
const posts_1 = require("@/dtos/posts");
const usersRoutes = (0, express_1.Router)();
const userController = new controllers_1.UserController();
const postController = new controllers_1.PostController();
const createLimiter = (0, express_rate_limit_1.default)({
    windowMs: 2 * 60 * 1000,
    max: 5,
    message: 'Too many attempts. Please try again after 2 minutes',
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    keyGenerator: (req, res) => {
        return req.body?.email || req.params.id || req.ip;
    },
    handler: (req, res, next, optionsUsed) => {
        return res.status(optionsUsed.statusCode).json({ status: false, message: optionsUsed.message });
    },
});
usersRoutes.post('', createLimiter, (0, interceptors_1.validateRequest)(dtos_1.CreateUserDto, 'body'), userController.create);
usersRoutes.get('', auth_middleware_1.authenticate, userController.findAll);
usersRoutes.get('/:id/posts', auth_middleware_1.authenticate, postController.getUserPosts);
usersRoutes.post('/:id/posts', createLimiter, auth_middleware_1.authenticate, (0, interceptors_1.validateRequest)(posts_1.CreatePostDto, 'body'), postController.createPost);
usersRoutes.get('/ranking', auth_middleware_1.authenticate, userController.getTopUsers);
exports.default = usersRoutes;
