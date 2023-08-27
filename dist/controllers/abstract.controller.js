"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Controller", {
    enumerable: true,
    get: function() {
        return Controller;
    }
});
const _classtransformer = require("class-transformer");
const _utils = require("../utils");
class Controller {
    static success(res, data, message = 'Successful', statusCode = _utils.StatusCode.OK) {
        return res.status(statusCode).json({
            success: true,
            data,
            message
        });
    }
    static error(res, message, data, statusCode = _utils.StatusCode.BAD_REQUEST) {
        return res.status(statusCode).json({
            success: false,
            ...data && {
                data
            },
            message
        });
    }
    static mapEntity(entity, data) {
        return (0, _classtransformer.plainToInstance)(entity, JSON.parse(JSON.stringify(data)));
    }
}

//# sourceMappingURL=abstract.controller.js.map