import type { RequestHandler } from 'express';
export declare const validateRequest: <T = any>(type: any, value?: 'body' | 'query' | 'params', skipMissingProperties?: boolean, whitelist?: boolean, forbidNonWhitelisted?: boolean) => RequestHandler;
