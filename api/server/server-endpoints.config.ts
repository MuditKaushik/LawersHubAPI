import { Router } from 'express';
import { ClientController } from '../controllers/client.controller';
import { CommonController } from '../controllers/common.controller';
import { IndividualController } from '../controllers/individual.controller';
import { UserController } from '../controllers/user.controller';

export function IndividualEndpoints(): Router {
    let individualRoutes: Router = Router();
    let individual = new IndividualController(individualRoutes);
    return individualRoutes;
}
export function CommonEndpoints(): Router {
    let commonRoutes: Router = Router();
    let commonCtrl = new CommonController(commonRoutes);
    return commonRoutes;
}
export function UserEndpoints(): Router {
    let userRouters: Router = Router();
    let userCtrl = new UserController(userRouters);
    return userRouters;
}
export function ClientEndpoints(): Router {
    let clientRoutes: Router = Router();
    let clientCtrl = new ClientController(clientRoutes);
    return clientRoutes;
}
