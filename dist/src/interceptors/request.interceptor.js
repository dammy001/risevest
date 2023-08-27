"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const utils_1 = require("@/utils");
const validateRequest = (type, value = 'body', skipMissingProperties = false, whitelist = true, forbidNonWhitelisted = true) => {
    return (req, res, next) => {
        const dtoObj = (0, class_transformer_1.plainToInstance)(type, req[value]);
        (0, class_validator_1.validate)(dtoObj, {
            skipMissingProperties,
            whitelist,
            forbidNonWhitelisted,
        }).then((errors) => {
            if (errors.length > 0) {
                const dtoErrors = errors.reduce((response, { property, constraints }) => {
                    response[property] = Object.values(constraints);
                    return response;
                }, {});
                return res
                    .status(utils_1.StatusCode.UNPROCESSABLE)
                    .json({ errors: dtoErrors, success: false, message: 'Invalid data provided' });
            }
            else {
                req[value] = dtoObj;
                next();
            }
        });
    };
};
exports.validateRequest = validateRequest;
