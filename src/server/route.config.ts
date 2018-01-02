import { Router } from 'express';
import { AccountController, AuthUserController } from '../controllers/v1/v1_controllers';

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
    // private authAccountAPI(): Router {
    //     let authAccountRoutes: Router = Router();
    //     this.server.use('/api/v1/authaccount', authAccountRoutes);
    //     return authAccountRoutes;
    // }
}
