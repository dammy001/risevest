"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserEntity", {
    enumerable: true,
    get: function() {
        return UserEntity;
    }
});
const _classtransformer = require("class-transformer");
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
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
class UserEntity {
    constructor(){
        _define_property(this, "id", void 0);
        _define_property(this, "firstName", void 0);
        _define_property(this, "lastName", void 0);
        _define_property(this, "email", void 0);
        _define_property(this, "createdAt", void 0);
        _define_property(this, "updatedAt", void 0);
        _define_property(this, "deletedAt", void 0);
    }
}
_ts_decorate([
    (0, _classtransformer.Exclude)({
        toPlainOnly: true
    })
], UserEntity.prototype, "deletedAt", void 0);

//# sourceMappingURL=user.entity.js.map