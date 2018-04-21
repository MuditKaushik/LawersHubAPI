import { Router } from 'express';
import * as fs from 'fs';
import * as yamlJs from 'js-yaml';
import * as path from 'path';
import { ClientController } from '../controllers/client.controller';
import { CommonController } from '../controllers/common.controller';
import { IndividualController } from '../controllers/individual.controller';
import { UserController } from '../controllers/user.controller';
const swaggerUi = require('swagger-ui-express');

export function IndividualEndpoints(): Router {
    let individualRoutes: Router = Router();
    new IndividualController(individualRoutes);
    return individualRoutes;
}
export function CommonEndpoints(): Router {
    let commonRoutes: Router = Router();
    new CommonController(commonRoutes);
    return commonRoutes;
}
export function UserEndpoints(): Router {
    let userRouters: Router = Router();
    new UserController(userRouters);
    return userRouters;
}
export function ClientEndpoints(): Router {
    let clientRoutes: Router = Router();
    new ClientController(clientRoutes);
    return clientRoutes;
}
export function SwaggerDocEndpoint(): Router {
    let swaggerDocRoutes: Router = Router();
    let swaggerOptions = { };
    let swaggerfilePath = fs.readFileSync(path.join(__dirname, "..\\swagger\\swagger.yaml"), { encoding: 'utf8' });
    let swaggerYaml = yamlJs.load(swaggerfilePath);
    swaggerDocRoutes.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerYaml, swaggerOptions));
    return swaggerDocRoutes;
}
