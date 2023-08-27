"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PostEntity", {
    enumerable: true,
    get: function() {
        return PostEntity;
    }
});
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
class PostEntity {
    constructor(){
        _define_property(this, "id", void 0);
        _define_property(this, "title", void 0);
        _define_property(this, "content", void 0);
        _define_property(this, "imageUrl", void 0);
        _define_property(this, "createdAt", void 0);
    }
}

//# sourceMappingURL=post.entity.js.map