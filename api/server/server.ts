import * as bodyParser from 'body-parser';
import * as config from 'config';
import * as express from 'express';
import { AuthenticationMiddleware } from '../middlewares/authentication.middleware';
import { ClientEndpoints, CommonEndpoints, IndividualEndpoints, SwaggerDocEndpoint, UserEndpoints } from './server-endpoints.config';
import { EnableCORS } from './server-settings.config';

export class Server {
    app: express.Application = express();
    constructor() {
        this.initAppSetting();
        this.initAppEndpoints();
        this.initServer();
    }
    static createInstance(): Server {
        return new Server();
    }
    initAppSetting(): void {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(EnableCORS);
    }
    initAppEndpoints(): void {
        this.app.use('', SwaggerDocEndpoint());
        this.app.use('/api/individual', IndividualEndpoints());
        this.app.use('/api/common', CommonEndpoints());
        this.app.use('/api/user', AuthenticationMiddleware, UserEndpoints());
        this.app.use('/api/client', AuthenticationMiddleware, ClientEndpoints());
    }
    initServer(): void {
        let port: number = config.get<number>('port');
        this.app.listen(port, 'localhost', () => {
            console.log(`Application listing at port ${port}.`);
        });
    }
}
Server.createInstance();
