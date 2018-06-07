import * as bodyParser from 'body-parser';
import * as config from 'config';
import * as express from 'express';
import { AuthenticationMiddleware } from '../middlewares/authentication.middleware';
import { ClientEndpoints, CommonEndpoints, IndividualEndpoints, UserEndpoints } from './server-endpoints.config';
import { EnableCORS, SwaggerYaml } from './server-settings.config';
import { IoC_Container } from '../store/IoC_Containers/contailers';
const swaggerUi = require('swagger-ui-express');

export class Server extends IoC_Container {
    app: express.Application = express();
    constructor() {
        super();
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
        this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(SwaggerYaml()));
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
