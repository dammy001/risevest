"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return parseJSONSafely;
    }
});
_export_star(require("./status-code.utils"), exports);
_export_star(require("./pagination.util"), exports);
function _export_star(from, to) {
    Object.keys(from).forEach(function(k) {
        if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k)) {
            Object.defineProperty(to, k, {
                enumerable: true,
                get: function() {
                    return from[k];
                }
            });
        }
    });
    return from;
}
function parseJSONSafely(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        console.error(e.message);
        if (e.message.includes('Unexpected token')) {
            return {
                success: false,
                message: `Invalid JSON in the body: ${e.message}`
            };
        }
        return {};
    }
}

//# sourceMappingURL=index.js.map