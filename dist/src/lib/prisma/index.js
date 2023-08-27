"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customPrisma = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const soft_delete_middleware_1 = __importDefault(require("./middleware/soft-delete.middleware"));
const prismaOptions = {};
if (process.env.NODE_ENV !== 'production')
    prismaOptions.log = ['query', 'error', 'warn'];
exports.prisma = globalThis.prisma || new client_1.PrismaClient(prismaOptions);
const customPrisma = (options) => new client_1.PrismaClient({ ...prismaOptions, ...options });
exports.customPrisma = customPrisma;
if (process.env.NODE_ENV !== 'production')
    globalThis.prisma = exports.prisma;
exports.prisma.$extends({
    result: {
        user: {
            fullName: {
                needs: { firstName: true, lastName: true },
                compute(user) {
                    return `${user.firstName} ${user.lastName}`;
                },
            },
        },
    },
});
// If any changed on middleware server restart is required
(0, soft_delete_middleware_1.default)(exports.prisma);
__exportStar(require("./selects"), exports);
exports.default = exports.prisma;
