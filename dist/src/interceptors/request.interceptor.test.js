"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const classValidator = __importStar(require("class-validator"));
const request_interceptor_1 = require("./request.interceptor");
vi.mock('class-transformer');
// vi.mock('class-validator')
describe('validateRequest', () => {
    const mockRequest = {
        body: {},
        query: {},
        params: {},
    };
    const mockResponse = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
    };
    const mockNext = vi.fn();
    class MockType {
    }
    it('should validate request body and call next for valid data', async () => {
        const mockDto = new MockType() // Create a mock DTO instance
        ;
        class_transformer_1.plainToInstance.mockReturnValue(mockDto);
        // Mock the validate function
        const validateSpy = vi.spyOn(classValidator, 'validate');
        validateSpy.mockResolvedValue([]); // No validation errors
        const middleware = (0, request_interceptor_1.validateRequest)(MockType, 'body', false, true, true);
        await middleware(mockRequest, mockResponse, mockNext);
        expect(class_transformer_1.plainToInstance).toHaveBeenCalledWith(MockType, mockRequest.body);
        expect(validateSpy).toHaveBeenCalledWith(mockDto, {
            skipMissingProperties: false,
            whitelist: true,
            forbidNonWhitelisted: true,
        });
        expect(mockRequest.body).toEqual(mockDto);
        validateSpy.mockRestore();
    });
});
