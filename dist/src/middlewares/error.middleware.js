"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorInterceptor = void 0;
const logger_1 = __importDefault(require("../config/logger"));
const _config_1 = require("../config");
const utils_1 = require("@/utils");
const ErrorInterceptor = (error, req, res, next) => {
    try {
        const status = +error?.statusCode || utils_1.StatusCode.SERVER_ERROR;
        const message = _config_1.ISPRODUCTION && status >= utils_1.StatusCode.SERVER_ERROR ? 'Something went wrong' : error?.message;
        if (status >= utils_1.StatusCode.SERVER_ERROR) {
            logger_1.default.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
        }
        return res.status(status).json({ status: false, message });
    }
    catch (err) {
        next(err);
    }
};
exports.ErrorInterceptor = ErrorInterceptor;
