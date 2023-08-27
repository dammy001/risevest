"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "postSelect", {
    enumerable: true,
    get: function() {
        return postSelect;
    }
});
const _client = require("@prisma/client");
const postSelect = _client.Prisma.validator()({
    id: true,
    title: true,
    content: true,
    imageUrl: true,
    createdAt: true
});

//# sourceMappingURL=post.select.js.map