"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _winston = require("winston");
const options = {
    transports: [
        new _winston.transports.Console({
            level: process.env.NODE_ENV === 'production' ? 'error' : 'debug'
        }),
        new _winston.transports.File({
            filename: 'debug.log',
            level: 'debug'
        }),
        new _winston.transports.File({
            filename: 'errors.log',
            level: 'error'
        })
    ]
};
const logger = (0, _winston.createLogger)(options);
if (process.env.NODE_ENV !== 'production') {
    logger.add(new _winston.transports.Console({
        format: _winston.format.combine(_winston.format.colorize(), _winston.format.json())
    }));
    logger.debug('Logging initialized at debug level');
}
const _default = logger;

//# sourceMappingURL=logger.js.map