"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostPolicy = void 0;
class PostPolicy {
    static canCreate(user, id) {
        return user.id.trim() === id.trim();
    }
    static canView(user, id) {
        return user.id.trim() === id.trim();
    }
}
exports.PostPolicy = PostPolicy;
