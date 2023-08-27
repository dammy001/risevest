"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    prisma: function() {
        return prisma;
    },
    customPrisma: function() {
        return customPrisma;
    },
    default: function() {
        return _default;
    }
});
const _client = require("@prisma/client");
const _softdeletemiddleware = /*#__PURE__*/ _interop_require_default(require("./middleware/soft-delete.middleware"));
_export_star(require("./selects"), exports);
function _export_star(from, to) {
    Object.keys(from).forEach(function(k) {
        if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k)) {
            Object.defineProperty(to, k, {
                enumerable: true,
                get: function() {
                    return from[k];
                }
            });
        }
    });
    return from;
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const prismaOptions = {};
if (process.env.NODE_ENV !== 'production') prismaOptions.log = [
    'query',
    'error',
    'warn'
];
const prisma = globalThis.prisma || new _client.PrismaClient(prismaOptions);
const customPrisma = (options)=>new _client.PrismaClient({
        ...prismaOptions,
        ...options
    });
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
prisma.$extends({
    result: {
        user: {
            fullName: {
                needs: {
                    firstName: true,
                    lastName: true
                },
                compute (user) {
                    return `${user.firstName} ${user.lastName}`;
                }
            }
        }
    }
});
// If any changed on middleware server restart is required
(0, _softdeletemiddleware.default)(prisma);
const _default = prisma;

//# sourceMappingURL=index.js.map