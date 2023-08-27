"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = require("express");
const _usersroute = /*#__PURE__*/ _interop_require_default(require("./users.route"));
const _postsroute = /*#__PURE__*/ _interop_require_default(require("./posts.route"));
const _utils = require("../utils");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const router = (0, _express.Router)();
router.get('', (req, res)=>res.send(_utils.StatusCode.OK).json({
        status: true,
        message: 'Welcome'
    }));
router.use('/users', _usersroute.default);
router.use('/posts', _postsroute.default);
const _default = router;

//# sourceMappingURL=index.js.map