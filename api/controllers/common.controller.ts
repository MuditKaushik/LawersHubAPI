import { NextFunction, Request, Response, Router } from 'express';
import { CityFieldValidator } from '../middlewares/common.middleware';
import { IPayload } from '../models/specimen';
import { Managers } from '../store/managers/managers';
export class CommonController extends Managers {
    constructor(router: Router) {
        super();
        router.get('/country', this.getCountryList.bind(this));
        router.get('/states', this.getStateList.bind(this));
        router.get('/city/:name', CityFieldValidator, this.getCityList.bind(this));
    }
    getCountryList(req: Request, res: Response, next: NextFunction) {
        this.CommonManager.getCountries().subscribe((result) => {
            return res.status(200).type('json').send(result);
        });
    }
    getStateList(req: Request, res: Response, next: NextFunction) {
        this.CommonManager.getStates().subscribe((result) => {
            return res.status(200).type('json').send(result);
        });
    }
    getCityList(req: Request, res: Response, next: NextFunction) {
        this.CommonManager.getCities(req.param('name')).subscribe((result) => {
            return res.status(200).type('json').send(result);
        });
    }
}
