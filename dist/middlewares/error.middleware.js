"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ErrorInterceptor", {
    enumerable: true,
    get: function() {
        return ErrorInterceptor;
    }
});
const _logger = /*#__PURE__*/ _interop_require_default(require("../config/logger"));
const _config = require("../config");
const _utils = require("../utils");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const ErrorInterceptor = (error, req, res, next)=>{
    try {
        const status = +error?.statusCode || _utils.StatusCode.SERVER_ERROR;
        const message = _config.ISPRODUCTION && status >= _utils.StatusCode.SERVER_ERROR ? 'Something went wrong' : error?.message;
        if (status >= _utils.StatusCode.SERVER_ERROR) {
            _logger.default.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
        }
        return res.status(status).json({
            status: false,
            message
        });
    } catch (err) {
        next(err);
    }
};

//# sourceMappingURL=error.middleware.js.map