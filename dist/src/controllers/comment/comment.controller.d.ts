import { NextFunction, Request, Response } from 'express';
import { Controller } from '../abstract.controller';
export declare class CommentController extends Controller {
    addCommentToPost(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
