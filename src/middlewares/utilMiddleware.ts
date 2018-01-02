import { Application, NextFunction, Request, Response } from 'express';

export class UtilMiddlewares {
    constructor() { }
    enable_cors(server: Application): void {
        server.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
    }
}
