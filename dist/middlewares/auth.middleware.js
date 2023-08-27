"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "authenticate", {
    enumerable: true,
    get: function() {
        return authenticate;
    }
});
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
const _utils = require("../utils");
const _exceptions = require("../exceptions");
const _config = require("../config");
const _lib = require("../lib");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const authenticate = async (req, res, next)=>{
    let decoded;
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) throw new _exceptions.HttpException('Unauthenticated', _utils.StatusCode.UNAUTHORIZED);
        if (token === _config.SECRET_KEY) {
            return next();
        }
        decoded = _jsonwebtoken.default.verify(token, _config.JWT_SECRET);
        if (!await _lib.prisma.user.findFirst({
            where: {
                id: decoded.user.id
            },
            select: {
                id: true
            }
        })) {
            res.status(_utils.StatusCode.BAD_REQUEST).json({
                message: 'User not found',
                status: false
            });
        }
    } catch (err) {
        return next(err);
    }
    req.user = decoded.user;
    next();
};

//# sourceMappingURL=auth.middleware.js.map