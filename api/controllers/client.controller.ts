import { NextFunction, Request, Response, Router } from 'express';
import * as httpStatus from 'http-status-codes';
import { ClientValidation } from '../middlewares/client.middleware';
import { IClientModel } from '../models/specimen';
import { IoC } from '../store/IoC_Containers';
import { TypeObject } from '../util/store_Types';
import { FailureMessages } from '../util/messages.enum';
import { IClientStore } from '../store/storeInterface';
export class ClientController {
    constructor(routes: Router) {
        routes.post('/add/:userid', this.addClient.bind(this));
        routes.get('/clients/:type/:userid', ClientValidation, this.getClients.bind(this));
    }
    getClients(req: Request, res: Response, next: NextFunction) {
        IoC.get<IClientStore>(TypeObject.clientStore).getclients(req.param('userid'), req.params.type)
            .subscribe((result) => {
                return res.status(httpStatus.OK).type('json').send(result);
            }, (err) => {
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).type('json').send();
            });
    }
    addClient(req: Request, res: Response, next: NextFunction) {
        IoC.get<IClientStore>(TypeObject.clientStore).addclient(req.body as IClientModel).subscribe((result) => {
            return res.status(httpStatus.CREATED).type('json').send(result);
        }, (err) => {
            return res.status(httpStatus.NOT_FOUND).send(FailureMessages.CLIENT_NOT_ADDED);
        });
    }
}
