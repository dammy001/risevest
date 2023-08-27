"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CreatePostDto", {
    enumerable: true,
    get: function() {
        return CreatePostDto;
    }
});
const _classvalidator = require("class-validator");
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
class CreatePostDto {
    constructor(){
        _define_property(this, "title", void 0);
        _define_property(this, "content", void 0);
    }
}
_ts_decorate([
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsString)()
], CreatePostDto.prototype, "title", void 0);
_ts_decorate([
    (0, _classvalidator.ValidateIf)((data)=>data.content !== 'undefined'),
    (0, _classvalidator.IsString)()
], CreatePostDto.prototype, "content", void 0);

//# sourceMappingURL=create-post.dto.js.map