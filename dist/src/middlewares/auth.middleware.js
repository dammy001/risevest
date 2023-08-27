"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const exceptions_1 = require("@/exceptions");
const config_1 = require("@/config");
const lib_1 = require("@/lib");
const utils_1 = require("@/utils");
const authenticate = async (req, res, next) => {
    let decoded;
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token)
            throw new exceptions_1.HttpException('Unauthenticated', utils_1.StatusCode.UNAUTHORIZED);
        if (token === config_1.SECRET_KEY) {
            return next();
        }
        decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        if (!(await lib_1.prisma.user.findFirst({ where: { id: decoded.user.id }, select: { id: true } }))) {
            res.status(utils_1.StatusCode.BAD_REQUEST).json({ message: 'User not found', status: false });
        }
    }
    catch (err) {
        return next(err);
    }
    req.user = decoded.user;
    next();
};
exports.authenticate = authenticate;
