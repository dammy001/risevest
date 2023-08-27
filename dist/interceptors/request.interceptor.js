"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateRequest", {
    enumerable: true,
    get: function() {
        return validateRequest;
    }
});
const _classtransformer = require("class-transformer");
const _classvalidator = require("class-validator");
const _utils = require("../utils");
const validateRequest = (type, value = 'body', skipMissingProperties = false, whitelist = true, forbidNonWhitelisted = true)=>{
    return (req, res, next)=>{
        const dtoObj = (0, _classtransformer.plainToInstance)(type, req[value]);
        (0, _classvalidator.validate)(dtoObj, {
            skipMissingProperties,
            whitelist,
            forbidNonWhitelisted
        }).then((errors)=>{
            if (errors.length > 0) {
                const dtoErrors = errors.reduce((response, { property, constraints })=>{
                    response[property] = Object.values(constraints);
                    return response;
                }, {});
                return res.status(_utils.StatusCode.UNPROCESSABLE).json({
                    errors: dtoErrors,
                    success: false,
                    message: 'Invalid data provided'
                });
            } else {
                req[value] = dtoObj;
                next();
            }
        });
    };
};

//# sourceMappingURL=request.interceptor.js.map