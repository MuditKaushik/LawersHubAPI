import { NextFunction, Request, Response } from 'express';
import * as httpStatus from 'http-status-codes';

export function CityFieldValidator(req: Request, res: Response, next: NextFunction) {
    let cityName: string = req.param('name');
    if (cityName != null || cityName !== 'undefined') {
        next();
    } else {
        return res.send(httpStatus.BAD_REQUEST).type('json').send('city name not valid.');
    }
}