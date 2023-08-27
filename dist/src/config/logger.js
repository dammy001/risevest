"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const options = {
    transports: [
        new winston_1.transports.Console({
            level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
        }),
        new winston_1.transports.File({ filename: 'debug.log', level: 'debug' }),
        new winston_1.transports.File({ filename: 'errors.log', level: 'error' }),
    ],
};
const logger = (0, winston_1.createLogger)(options);
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston_1.transports.Console({
        format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.json()),
    }));
    logger.debug('Logging initialized at debug level');
}
exports.default = logger;
