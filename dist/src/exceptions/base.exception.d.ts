import { StatusCode } from '@/utils';
export declare class BaseError extends Error {
    readonly statusCode: any;
    readonly isOperational: boolean;
    constructor(statusCode: StatusCode, message: string, isOperational?: boolean);
}
