import { NextFunction, Request, Response } from 'express';
import { Controller } from '../abstract.controller';
export declare class PostController extends Controller {
    createPost(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    static validateRequest(req: Request): Promise<any>;
    getUserPosts(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
