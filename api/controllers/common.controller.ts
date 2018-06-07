import { NextFunction, Request, Response, Router } from 'express';
import { CityFieldValidator } from '../middlewares/common.middleware';
import { IoC } from '../store/IoC_Containers';
import { ICommonStore } from '../store/storeInterface';
import { TypeObject } from '../util/store_Types';
export class CommonController {
    constructor(router: Router) {
        router.get('/country', this.getCountryList.bind(this));
        router.get('/states', this.getStateList.bind(this));
        router.get('/city/:name', CityFieldValidator, this.getCityList.bind(this));
    }
    getCountryList(req: Request, res: Response, next: NextFunction) {
        IoC.get<ICommonStore>(TypeObject.commonStore).getCountries().subscribe((result) => {
            return res.status(200).type('json').send(result);
        });
    }
    getStateList(req: Request, res: Response, next: NextFunction) {
        IoC.get<ICommonStore>(TypeObject.commonStore).getStates().subscribe((result) => {
            return res.status(200).type('json').send(result);
        });
    }
    getCityList(req: Request, res: Response, next: NextFunction) {
        IoC.get<ICommonStore>(TypeObject.commonStore).getCities(req.param('name')).subscribe((result) => {
            return res.status(200).type('json').send(result);
        });
    }
}
