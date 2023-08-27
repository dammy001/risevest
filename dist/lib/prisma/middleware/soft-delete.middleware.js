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
const _dayjs = /*#__PURE__*/ _interop_require_default(require("dayjs"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const date = (0, _dayjs.default)().toDate();
function softDeleteMiddleware(prisma) {
    /***********************************/ /* SOFT DELETE MIDDLEWARE */ /***********************************/ prisma.$use(// @ts-expect-error params type is correct
    (params, next)=>{
        if (params.model !== 'user') return next(params);
        // Check incoming query type
        if (params.action === 'delete') {
            // Delete queries
            // Change action to an update
            params.action = 'update';
            params.args.data = {
                deletedAt: date
            };
        }
        if (params.action === 'deleteMany') {
            // Delete many queries
            params.action = 'updateMany';
            if (params.args.data !== undefined) {
                params.args.data.deletedAt = date;
            } else {
                params.args.data = {
                    deletedAt: date
                };
            }
        }
        if (params.action === 'findUnique') {
            params.action = 'findFirst';
            // Add 'deleted' filter
            // ID filter maintained
            params.args.where.deletedAt = null;
        }
        if (params.action === 'findMany' || params.action === 'findFirst') {
            // Find many queries
            if (params.args.where !== undefined) {
                if (params.args.where.deletedAt === undefined) {
                    // Exclude deleted records if they have not been explicitly requested
                    params.args.where.deletedAt = null;
                }
            } else {
                params.args.where = {
                    deletedAt: null
                };
            }
        }
        return next(params);
    });
}
const _default = softDeleteMiddleware;

//# sourceMappingURL=soft-delete.middleware.js.map