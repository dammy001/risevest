"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
class BaseError extends Error {
    statusCode;
    isOperational;
    constructor(statusCode, message, isOperational) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.statusCode = statusCode;
        this.isOperational = isOperational || false;
        Error.captureStackTrace(this);
    }
}
exports.BaseError = BaseError;
