"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const date = (0, dayjs_1.default)().toDate();
function softDeleteMiddleware(prisma) {
    /***********************************/
    /* SOFT DELETE MIDDLEWARE */
    /***********************************/
    prisma.$use(
    // @ts-expect-error params type is correct
    (params, next) => {
        if (params.model !== 'user')
            return next(params);
        // Check incoming query type
        if (params.action === 'delete') {
            // Delete queries
            // Change action to an update
            params.action = 'update';
            params.args.data = { deletedAt: date };
        }
        if (params.action === 'deleteMany') {
            // Delete many queries
            params.action = 'updateMany';
            if (params.args.data !== undefined) {
                params.args.data.deletedAt = date;
            }
            else {
                params.args.data = { deletedAt: date };
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
            }
            else {
                params.args.where = { deletedAt: null };
            }
        }
        return next(params);
    });
}
exports.default = softDeleteMiddleware;
