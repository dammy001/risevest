"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSelect = void 0;
const client_1 = require("@prisma/client");
exports.postSelect = client_1.Prisma.validator()({
    id: true,
    title: true,
    content: true,
    imageUrl: true,
    createdAt: true,
});
