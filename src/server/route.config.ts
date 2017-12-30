import { Application, Router } from 'express';
import { AccountController } from '../controllers/v1/v1_controllers';

export class RouteConfig {
    constructor() {
    }
    accountAPI(): Router {
        let router: Router = Router();
        let accountCtrl = new AccountController(router);
        return router;
    }
    // private authUserAPI(): Router {
    //     let authUserRoutes: Router = Router();
    //     this.server.use('/api/v1/authuser', authUserRoutes);
    //     return authUserRoutes;
    // }
    // private authAccountAPI(): Router {
    //     let authAccountRoutes: Router = Router();
    //     this.server.use('/api/v1/authaccount', authAccountRoutes);
    //     return authAccountRoutes;
    // }
}
