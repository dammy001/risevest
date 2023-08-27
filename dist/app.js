"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "App", {
    enumerable: true,
    get: function() {
        return App;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _config = require("./config");
const _compression = /*#__PURE__*/ _interop_require_default(require("compression"));
const _helmet = /*#__PURE__*/ _interop_require_default(require("helmet"));
const _errorhandler = /*#__PURE__*/ _interop_require_default(require("errorhandler"));
const _bodyparser = /*#__PURE__*/ _interop_require_default(require("body-parser"));
const _cors = /*#__PURE__*/ _interop_require_default(require("cors"));
const _middlewares = require("./middlewares");
const _routes = /*#__PURE__*/ _interop_require_default(require("./routes"));
const _expressratelimit = /*#__PURE__*/ _interop_require_default(require("express-rate-limit"));
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
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class App {
    getApplication() {
        return this.app;
    }
    listen() {
        this.app.listen(this.port, ()=>{
            console.log('=================================');
            console.log(`======= ENV: ${this.env} =======`);
            console.log(`🚀 App listening on the port ${this.port}`);
            console.log('=================================');
        });
        this.initializeCache();
    }
    initializeMiddlewares() {
        const mapCorsOptions = function(req, callback) {
            const options = {
                origin: false,
                preflightContinue: false,
                allowedHeaders: [
                    'Content-Type',
                    'Authorization',
                    'Accept'
                ],
                methods: [
                    'GET',
                    'HEAD',
                    'POST',
                    'PUT',
                    'DELETE',
                    'PATCH',
                    'OPTIONS'
                ]
            };
            if ([
                'development',
                'test',
                'local'
            ].includes(_config.ENVIRONMENT)) {
                options.origin = '*';
            } else {
                options.origin = [
                    '*'
                ] // change to authorized urls
                ;
            }
            callback(null, options);
        };
        this.app.use((0, _cors.default)(mapCorsOptions));
        this.app.use((0, _helmet.default)());
        this.app.use((0, _compression.default)());
        this.app.use(_bodyparser.default.json());
        this.app.use(_express.default.json({
            limit: '5mb'
        }));
        this.app.use(_express.default.urlencoded({
            extended: true
        }));
        return this;
    }
    initializeInterceptors() {
        this.app.use(_middlewares.ErrorInterceptor);
        if (_config.ENVIRONMENT === 'development') {
            this.app.use((0, _errorhandler.default)());
        }
        return this;
    }
    initializeCache() {
        _config.cache.connect().then(()=>{
            console.log('Redis connected successfully');
        }).catch((error)=>{
            console.error('Failed to connect to Redis', error);
        });
        return this;
    }
    initializeRoutes() {
        const apiLimiter = (0, _expressratelimit.default)({
            windowMs: 2 * 60 * 1000,
            max: 1000,
            standardHeaders: true,
            legacyHeaders: false,
            handler: (req, res, next, optionsUsed)=>{
                return res.status(optionsUsed.statusCode).json({
                    status: false,
                    message: optionsUsed.message
                });
            }
        });
        this.app.use('/api', apiLimiter, _routes.default);
        this.app.use('*', (req, res)=>{
            res.status(404).json({
                message: 'Invalid Route',
                success: false
            });
        });
        return this;
    }
    constructor(){
        _define_property(this, "app", void 0);
        _define_property(this, "env", void 0);
        _define_property(this, "port", void 0);
        this.app = (0, _express.default)();
        this.env = _config.ENVIRONMENT ?? 'development';
        this.port = _config.PORT ?? 5500;
        this.initializeMiddlewares().initializeRoutes().initializeInterceptors();
    }
}

//# sourceMappingURL=app.js.map