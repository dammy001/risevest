import type { Express } from 'express';
export declare class App {
    app: Express;
    env: string;
    port: string | number;
    constructor();
    getApplication(): Express;
    listen(): void;
    private initializeMiddlewares;
    private initializeInterceptors;
    private initializeCache;
    private initializeRoutes;
}
