import { Application, Router } from 'express';
import { AccountController, AuthUserController } from '../controllers/v1/v1_controllers';
import { CommonController } from '../controllers/common/common.controller';

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
}
