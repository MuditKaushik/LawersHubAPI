import { Router, Request, Response } from 'express';
import * as httpStatus from 'http-status-codes';
import { CommonManager } from '../../repository/facade/facades';

export class CommonController {
    constructor(route: Router) {
        route.get('/getstates', this.getstates.bind(this));
        route.get('/getcities/:state', this.getcities.bind(this));
        route.get('/getcountry', this.getcountry.bind(this));
    }
    getstates(req: Request, res: Response) {
        CommonManager.getStates().subscribe((result: any) => {
            return res.status(httpStatus.OK).send(result);
        }, (err: any) => {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
        });
    }
    getcountry(req: Request, res: Response) {
        CommonManager.getCountries().subscribe((result: any) => {
            return res.status(httpStatus.OK).send(result);
        }, (err: any) => {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    }
    getcities(req: Request, res: Response) {
        CommonManager.getCities(req.param('state')).subscribe((result: Array<string>) => {
            return res.status(httpStatus.OK).send(result);
        }, (err: any) => {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
        });
    }
}