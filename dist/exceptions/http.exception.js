"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HttpException", {
    enumerable: true,
    get: function() {
        return HttpException;
    }
});
const _utils = require("../utils");
const _baseexception = require("./base.exception");
class HttpException extends _baseexception.BaseError {
    constructor(message = 'Bad Request', statusCode = _utils.StatusCode.BAD_REQUEST, isOperational = true){
        super(statusCode, message, isOperational);
    }
}

//# sourceMappingURL=http.exception.js.map