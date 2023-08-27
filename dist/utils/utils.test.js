"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _statuscodeutils = require("./status-code.utils");
const _utils = require(".");
describe('successResponse', ()=>{
    it('should return a success response with default values', ()=>{
        const response = (0, _statuscodeutils.successResponse)();
        expect(response).toEqual({
            success: true,
            data: {},
            message: '',
            status: _utils.StatusCode.OK
        });
    });
    it('should return a success response with custom values', ()=>{
        const data = {
            key: 'value'
        };
        const message = 'Custom message';
        const statusCode = _utils.StatusCode.CREATED;
        const response = (0, _statuscodeutils.successResponse)(data, message, statusCode);
        expect(response).toEqual({
            success: true,
            data,
            message,
            status: statusCode
        });
    });
});
describe('errorResponse', ()=>{
    it('should return an error response with default values', ()=>{
        const response = (0, _statuscodeutils.errorResponse)(null);
        expect(response).toEqual({
            success: false,
            error: null,
            message: 'Sorry, an error occured',
            status: _utils.StatusCode.BAD_REQUEST
        });
    });
    it('should return an error response with custom values', ()=>{
        const customError = new Error('Custom error');
        const message = 'Custom error message';
        const statusCode = _utils.StatusCode.SERVER_ERROR;
        const response = (0, _statuscodeutils.errorResponse)(customError, message, statusCode);
        expect(response).toEqual({
            success: false,
            error: customError,
            message,
            status: statusCode
        });
    });
});

//# sourceMappingURL=utils.test.js.map