import * as bodyParser from 'body-parser';
import * as config from 'config';
import * as express from 'express';
import { UtilMiddlewares } from '../middlewares/utilMiddleware';
import { RouteConfig } from './route.config';

export class RunServer extends UtilMiddlewares {
    static _instance: RunServer;
    server: express.Application;

    constructor() {
        super();
        this.server = express();
        this.middleware();
        this.enable_cors(this.server);
        this.map_routes();
        this.run();
    }

    static createInstance(): RunServer {
        if (this._instance === null || this._instance === undefined) {
            this._instance = new RunServer();
        }
        return this._instance;
    }

    middleware(): void {
        bodyParser.json();
        bodyParser.urlencoded({ extended: true });
    }

    map_routes(): void {
        let routeConfig = new RouteConfig();
        this.server.use('/api.lawyerhub.com/v1/account/', routeConfig.accountAPI());
        // this.server.use('/api/v1/authuser', );
        // this.server.use('/api/v1/authaccount', );
    }

    run(): void {
        const port: number = config.get<number>('port');
        this.server.listen(port, () => {
            console.log(`Application listening at port ${port}`);
        });
    }
}
RunServer.createInstance();
