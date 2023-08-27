import { BaseError } from './base.exception';
import { StatusCode } from '@/utils';
export declare class HttpException extends BaseError {
    constructor(message?: string, statusCode?: StatusCode, isOperational?: boolean);
}
