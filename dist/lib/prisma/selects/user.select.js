"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "userSelect", {
    enumerable: true,
    get: function() {
        return userSelect;
    }
});
const _client = require("@prisma/client");
const userSelect = _client.Prisma.validator()({
    id: true,
    email: true,
    firstName: true,
    lastName: true,
    userName: true,
    createdAt: true
});

//# sourceMappingURL=user.select.js.map