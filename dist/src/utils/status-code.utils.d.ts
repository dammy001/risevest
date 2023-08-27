import type { ErrorResponse, SuccessResponse } from '@/types';
export declare enum StatusCode {
    OK = 200,
    SERVER_ERROR = 500,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    CREATED = 201,
    BAD_REQUEST = 400,
    NO_CONTENT = 204,
    CONFLICT = 209,
    UNPROCESSABLE = 422
}
export declare const successResponse: (data?: {}, message?: string, statusCode?: StatusCode) => SuccessResponse;
export declare const errorResponse: (error: any, message?: string, statusCode?: StatusCode) => ErrorResponse;
