"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _errormiddleware = require("./error.middleware");
const _utils = require("../utils");
describe('ErrorInterceptor', ()=>{
    it('should handle errors and send an appropriate response', ()=>{
        // Mocking Express objects
        const mockRequest = {};
        const mockResponse = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };
        const mockNext = vi.fn();
        // Creating a mock error
        const mockError = {
            statusCode: _utils.StatusCode.NOT_FOUND,
            message: 'Resource not found'
        };
        // Calling the ErrorInterceptor
        (0, _errormiddleware.ErrorInterceptor)(mockError, mockRequest, mockResponse, mockNext);
        // Assertions
        expect(mockResponse.status).toHaveBeenCalledWith(_utils.StatusCode.NOT_FOUND);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: false,
            message: 'Resource not found'
        });
    });
    it('should handle errors with default message in production', ()=>{
        // Mocking Express objects
        const mockRequest = {};
        const mockResponse = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn()
        };
        const mockNext = vi.fn();
        // Creating a mock error
        const mockError = {
            statusCode: _utils.StatusCode.SERVER_ERROR,
            message: 'Internal server error'
        };
        // Mocking the production environment
        const originalIsProduction = process.env.NODE_ENV;
        process.env.NODE_ENV = 'production';
        // Calling the ErrorInterceptor
        (0, _errormiddleware.ErrorInterceptor)(mockError, mockRequest, mockResponse, mockNext);
        // Assertions
        expect(mockResponse.status).toHaveBeenCalledWith(_utils.StatusCode.SERVER_ERROR);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: false,
            message: 'Internal server error'
        });
        // Restoring the environment variable
        process.env.NODE_ENV = originalIsProduction;
    });
});

//# sourceMappingURL=error.middleware.test.js.map