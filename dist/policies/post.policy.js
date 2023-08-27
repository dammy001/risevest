"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PostPolicy", {
    enumerable: true,
    get: function() {
        return PostPolicy;
    }
});
class PostPolicy {
    static canCreate(user, id) {
        return user.id.trim() === id.trim();
    }
    static canView(user, id) {
        return user.id.trim() === id.trim();
    }
}

//# sourceMappingURL=post.policy.js.map