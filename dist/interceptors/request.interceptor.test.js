"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _classtransformer = require("class-transformer");
const _classvalidator = /*#__PURE__*/ _interop_require_wildcard(require("class-validator"));
const _requestinterceptor = require("./request.interceptor");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
vi.mock('class-transformer');
// vi.mock('class-validator')
describe('validateRequest', ()=>{
    const mockRequest = {
        body: {},
        query: {},
        params: {}
    };
    const mockResponse = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn()
    };
    const mockNext = vi.fn();
    class MockType {
    }
    it('should validate request body and call next for valid data', async ()=>{
        const mockDto = new MockType() // Create a mock DTO instance
        ;
        _classtransformer.plainToInstance.mockReturnValue(mockDto);
        // Mock the validate function
        const validateSpy = vi.spyOn(_classvalidator, 'validate');
        validateSpy.mockResolvedValue([]) // No validation errors
        ;
        const middleware = (0, _requestinterceptor.validateRequest)(MockType, 'body', false, true, true);
        await middleware(mockRequest, mockResponse, mockNext);
        expect(_classtransformer.plainToInstance).toHaveBeenCalledWith(MockType, mockRequest.body);
        expect(validateSpy).toHaveBeenCalledWith(mockDto, {
            skipMissingProperties: false,
            whitelist: true,
            forbidNonWhitelisted: true
        });
        expect(mockRequest.body).toEqual(mockDto);
        validateSpy.mockRestore();
    });
});

//# sourceMappingURL=request.interceptor.test.js.map