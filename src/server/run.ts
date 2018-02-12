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
        this.server.use(bodyParser.urlencoded({ extended: true }));
        this.server.use(bodyParser.json());
        this.enable_cors(this.server);
        this.map_routes();
        // this.swagger_init();
        this.run();
    }

    static createInstance(): RunServer {
        if (this._instance === null || this._instance === undefined) {
            this._instance = new RunServer();
        }
        return this._instance;
    }

    map_routes(): void {

        let routeConfig = new RouteConfig();
        this.server.use('', routeConfig.setup_Swagger(this.server));
        this.server.use('/api/common', routeConfig.commonAPI());
        this.server.use('/api/v1/account', routeConfig.accountAPI());
        this.server.use('/api/v1/authuser', routeConfig.authUserAPI());
    }

    swagger_init(): void {
    }

    run(): void {
        const port: number = config.get<number>('port');
        this.server.listen(port, () => {
            console.log(`Application listening at port ${port}`);
        });
    }
}
RunServer.createInstance();
