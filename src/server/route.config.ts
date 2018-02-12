import { Application, Router } from 'express';
import * as path from 'path';
import { CommonController } from '../controllers/common/common.controller';
import { AccountController, AuthUserController } from '../controllers/v1/v1_controllers';
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require(path.join(__dirname, '../swagger/swagger.json'));

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
    setup_Swagger(server: Application): Router {
        let swaggerRoute = Router();
        swaggerRoute.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
        return swaggerRoute;
    }
}
