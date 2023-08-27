"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const _config_1 = require("./config");
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const errorhandler_1 = __importDefault(require("errorhandler"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const _middlewares_1 = require("./middlewares");
const _routes_1 = __importDefault(require("./routes"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
class App {
    app;
    env;
    port;
    constructor() {
        this.app = (0, express_1.default)();
        this.env = _config_1.ENVIRONMENT ?? 'development';
        this.port = _config_1.PORT ?? 5500;
        this.initializeMiddlewares().initializeRoutes().initializeInterceptors();
    }
    getApplication() {
        return this.app;
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('=================================');
            console.log(`======= ENV: ${this.env} =======`);
            console.log(`🚀 App listening on the port ${this.port}`);
            console.log('=================================');
        });
        this.initializeCache();
    }
    initializeMiddlewares() {
        const mapCorsOptions = function (req, callback) {
            const options = {
                origin: false,
                preflightContinue: false,
                allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
                methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            };
            if (['development', 'test', 'local'].includes(_config_1.ENVIRONMENT)) {
                options.origin = '*';
            }
            else {
                options.origin = ['*']; // change to authorized urls
            }
            callback(null, options);
        };
        this.app.use((0, cors_1.default)(mapCorsOptions));
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use(body_parser_1.default.json());
        this.app.use(express_1.default.json({ limit: '5mb' }));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        return this;
    }
    initializeInterceptors() {
        this.app.use(_middlewares_1.ErrorInterceptor);
        if (_config_1.ENVIRONMENT === 'development') {
            this.app.use((0, errorhandler_1.default)());
        }
        return this;
    }
    initializeCache() {
        _config_1.cache
            .connect()
            .then(() => {
            console.log('Redis connected successfully');
        })
            .catch((error) => {
            console.error('Failed to connect to Redis', error);
        });
        return this;
    }
    initializeRoutes() {
        const apiLimiter = (0, express_rate_limit_1.default)({
            windowMs: 2 * 60 * 1000,
            max: 1000,
            standardHeaders: true,
            legacyHeaders: false,
            handler: (req, res, next, optionsUsed) => {
                return res
                    .status(optionsUsed.statusCode)
                    .json({ status: false, message: optionsUsed.message });
            },
        });
        this.app.use('/api', apiLimiter, _routes_1.default);
        this.app.use('*', (req, res) => {
            res.status(404).json({
                message: 'Invalid Route',
                success: false,
            });
        });
        return this;
    }
}
exports.App = App;
