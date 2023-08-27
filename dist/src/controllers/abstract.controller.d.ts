import type { Response } from 'express';
import { type ClassConstructor } from 'class-transformer';
import { StatusCode } from '@/utils';
export type IResponse<T = any> = {
    data: T;
    message: string;
    statusCode?: keyof typeof StatusCode;
};
export declare abstract class Controller {
    static success<T = any>(res: Response, data: T, message?: string, statusCode?: StatusCode): Response<any, Record<string, any>>;
    static error<T extends object = any>(res: Response, message: string, data?: T, statusCode?: StatusCode): Response<any, Record<string, any>>;
    static mapEntity<TData>(entity: ClassConstructor<any>, data: TData): TData extends null ? null : any;
}