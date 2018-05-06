import { NextFunction, Request, Response, Router } from 'express';
import * as httpStatus from 'http-status-codes';
import { isBoolean } from 'util';
import { ClientValidation } from '../middlewares/client.middleware';
import { IClientModel } from '../models/specimen';
import { Managers } from '../store/managers/managers';
import { FailureMessages } from '../util/messages.enum';
export class ClientController extends Managers {
    constructor(routes: Router) {
        super();
        routes.post('/add/:userid', this.addClient.bind(this));
        routes.get('/clients/:type/:userid', ClientValidation, this.getClients.bind(this));
    }
    getClients(req: Request, res: Response, next: NextFunction) {
        this.ClientManager.getclients(req.param('userid'), req.params.type)
            .subscribe((result) => {
                return res.status(httpStatus.OK).type('json').send(result);
            }, (err) => {
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).type('json').send();
            });
    }
    addClient(req: Request, res: Response, next: NextFunction) {
        this.ClientManager.addclient(req.body as IClientModel).subscribe((result) => {
            return res.status(httpStatus.CREATED).type('json').send(result);
        }, (err) => {
            return res.status(httpStatus.NOT_FOUND).send(FailureMessages.CLIENT_NOT_ADDED);
        });
    }
}
