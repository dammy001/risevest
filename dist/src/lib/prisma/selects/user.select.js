"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSelect = void 0;
const client_1 = require("@prisma/client");
exports.userSelect = client_1.Prisma.validator()({
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    userName: true,
    createdAt: true,
});
