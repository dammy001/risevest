"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_route_1 = __importDefault(require("./users.route"));
const posts_route_1 = __importDefault(require("./posts.route"));
const utils_1 = require("@/utils");
const router = (0, express_1.Router)();
router.get('', (req, res) => res.send(utils_1.StatusCode.OK).json({ status: true, message: 'Welcome' }));
router.use('/users', users_route_1.default);
router.use('/posts', posts_route_1.default);
exports.default = router;
