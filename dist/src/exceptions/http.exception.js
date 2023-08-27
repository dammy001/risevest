"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
const base_exception_1 = require("./base.exception");
const utils_1 = require("@/utils");
class HttpException extends base_exception_1.BaseError {
    constructor(message = 'Bad Request', statusCode = utils_1.StatusCode.BAD_REQUEST, isOperational = true) {
        super(statusCode, message, isOperational);
    }
}
exports.HttpException = HttpException;
