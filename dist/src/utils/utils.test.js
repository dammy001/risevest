"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_code_utils_1 = require("./status-code.utils");
const utils_1 = require("@/utils");
describe('successResponse', () => {
    it('should return a success response with default values', () => {
        const response = (0, status_code_utils_1.successResponse)();
        expect(response).toEqual({
            success: true,
            data: {},
            message: '',
            status: utils_1.StatusCode.OK,
        });
    });
    it('should return a success response with custom values', () => {
        const data = { key: 'value' };
        const message = 'Custom message';
        const statusCode = utils_1.StatusCode.CREATED;
        const response = (0, status_code_utils_1.successResponse)(data, message, statusCode);
        expect(response).toEqual({
            success: true,
            data,
            message,
            status: statusCode,
        });
    });
});
describe('errorResponse', () => {
    it('should return an error response with default values', () => {
        const response = (0, status_code_utils_1.errorResponse)(null);
        expect(response).toEqual({
            success: false,
            error: null,
            message: 'Sorry, an error occured',
            status: utils_1.StatusCode.BAD_REQUEST,
        });
    });
    it('should return an error response with custom values', () => {
        const customError = new Error('Custom error');
        const message = 'Custom error message';
        const statusCode = utils_1.StatusCode.SERVER_ERROR;
        const response = (0, status_code_utils_1.errorResponse)(customError, message, statusCode);
        expect(response).toEqual({
            success: false,
            error: customError,
            message,
            status: statusCode,
        });
    });
});
