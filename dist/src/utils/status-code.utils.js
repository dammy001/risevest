"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = exports.StatusCode = void 0;
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["OK"] = 200] = "OK";
    StatusCode[StatusCode["SERVER_ERROR"] = 500] = "SERVER_ERROR";
    StatusCode[StatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    StatusCode[StatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusCode[StatusCode["CREATED"] = 201] = "CREATED";
    StatusCode[StatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusCode[StatusCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    StatusCode[StatusCode["CONFLICT"] = 209] = "CONFLICT";
    StatusCode[StatusCode["UNPROCESSABLE"] = 422] = "UNPROCESSABLE";
})(StatusCode || (exports.StatusCode = StatusCode = {}));
const successResponse = (data = {}, message = '', statusCode = StatusCode.OK) => {
    return {
        success: true,
        data,
        message,
        status: statusCode,
    };
};
exports.successResponse = successResponse;
const errorResponse = (error, message = 'Sorry, an error occured', statusCode = StatusCode.BAD_REQUEST) => {
    return {
        success: false,
        error,
        message,
        status: statusCode,
    };
};
exports.errorResponse = errorResponse;
