"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_middleware_1 = require("./error.middleware");
const utils_1 = require("@/utils");
describe('ErrorInterceptor', () => {
    it('should handle errors and send an appropriate response', () => {
        // Mocking Express objects
        const mockRequest = {};
        const mockResponse = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        const mockNext = vi.fn();
        // Creating a mock error
        const mockError = {
            statusCode: utils_1.StatusCode.NOT_FOUND,
            message: 'Resource not found',
        };
        // Calling the ErrorInterceptor
        (0, error_middleware_1.ErrorInterceptor)(mockError, mockRequest, mockResponse, mockNext);
        // Assertions
        expect(mockResponse.status).toHaveBeenCalledWith(utils_1.StatusCode.NOT_FOUND);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: false,
            message: 'Resource not found',
        });
    });
    it('should handle errors with default message in production', () => {
        // Mocking Express objects
        const mockRequest = {};
        const mockResponse = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        const mockNext = vi.fn();
        // Creating a mock error
        const mockError = {
            statusCode: utils_1.StatusCode.SERVER_ERROR,
            message: 'Internal server error',
        };
        // Mocking the production environment
        const originalIsProduction = process.env.NODE_ENV;
        process.env.NODE_ENV = 'production';
        // Calling the ErrorInterceptor
        (0, error_middleware_1.ErrorInterceptor)(mockError, mockRequest, mockResponse, mockNext);
        // Assertions
        expect(mockResponse.status).toHaveBeenCalledWith(utils_1.StatusCode.SERVER_ERROR);
        expect(mockResponse.json).toHaveBeenCalledWith({
            status: false,
            message: 'Internal server error',
        });
        // Restoring the environment variable
        process.env.NODE_ENV = originalIsProduction;
    });
});
