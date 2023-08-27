"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BaseError", {
    enumerable: true,
    get: function() {
        return BaseError;
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
class BaseError extends Error {
    constructor(statusCode, message, isOperational){
        super(message);
        _define_property(this, "statusCode", void 0);
        _define_property(this, "isOperational", void 0);
        Object.setPrototypeOf(this, new.target.prototype);
        this.statusCode = statusCode;
        this.isOperational = isOperational || false;
        Error.captureStackTrace(this);
    }
}

//# sourceMappingURL=base.exception.js.map