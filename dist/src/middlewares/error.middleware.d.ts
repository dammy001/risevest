import type { NextFunction, Request, Response } from 'express';
export declare const ErrorInterceptor: (error: any, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
