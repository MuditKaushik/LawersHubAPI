import { Application, Router } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as jsYaml from 'js-yaml';
import { CommonController } from '../controllers/common/common.controller';
import { AccountController, AuthUserController } from '../controllers/v1/v1_controllers';
const swaggerUi = require('swagger-ui-express');

export class RouteConfig {
    constructor() {
    }
    accountAPI(): Router {
        let accountRoutes: Router = Router();
        let accountCtrl = new AccountController(accountRoutes);
        return accountRoutes;
    }
    authUserAPI(): Router {
        let authUserRoutes: Router = Router();
        let authUserCtrl = new AuthUserController(authUserRoutes);
        return authUserRoutes;
    }
    commonAPI(): Router {
        let commonRoutes: Router = Router();
        let commonCtrl = new CommonController(commonRoutes);
        return commonRoutes;
    }
    // private authAccountAPI(): Router {
    //     let authAccountRoutes: Router = Router();
    //     this.server.use('/api/v1/authaccount', authAccountRoutes);
    //     return authAccountRoutes;
    // }
    setup_Swagger(): Router {
        let swaggerRoute = Router();
        const swaggerDocs = path.join(__dirname, '../swagger/swagger.yaml');
        const swaggerYaml = jsYaml.safeLoad(fs.readFileSync(swaggerDocs, { encoding: 'utf8' }));
        swaggerRoute.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerYaml));
        return swaggerRoute;
    }
}
