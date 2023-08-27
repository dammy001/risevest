"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const class_transformer_1 = require("class-transformer");
const utils_1 = require("@/utils");
class Controller {
    static success(res, data, message = 'Successful', statusCode = utils_1.StatusCode.OK) {
        return res.status(statusCode).json({ success: true, data, message });
    }
    static error(res, message, data, statusCode = utils_1.StatusCode.BAD_REQUEST) {
        return res.status(statusCode).json({ success: false, ...(data && { data }), message });
    }
    static mapEntity(entity, data) {
        return (0, class_transformer_1.plainToInstance)(entity, JSON.parse(JSON.stringify(data)));
    }
}
exports.Controller = Controller;
