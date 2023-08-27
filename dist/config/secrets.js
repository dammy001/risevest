"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    BASEURL: function() {
        return BASEURL;
    },
    ENVIRONMENT: function() {
        return ENVIRONMENT;
    },
    ISPRODUCTION: function() {
        return ISPRODUCTION;
    },
    DATABASEURL: function() {
        return DATABASEURL;
    },
    PORT: function() {
        return PORT;
    },
    JWT_SECRET: function() {
        return JWT_SECRET;
    },
    SECRET_KEY: function() {
        return SECRET_KEY;
    }
});
const _dotenv = require("dotenv");
(0, _dotenv.config)({
    path: '.env'
});
const BASEURL = process.env.BASE_URL;
const ENVIRONMENT = process.env.NODE_ENV;
const ISPRODUCTION = ENVIRONMENT === 'production';
const PORT = Number(process.env?.PORT || 7000);
const DATABASEURL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const SECRET_KEY = process.env.SECRET_KEY;

//# sourceMappingURL=secrets.js.map