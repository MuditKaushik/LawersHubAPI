import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';
import * as yamlJs from 'js-yaml';
import * as path from 'path';

export function EnableCORS(req: Request, res: Response, next: NextFunction): void {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    next();
}
export function SwaggerYaml(): any {
    let swaggerfilePath = fs.readFileSync(path.join(__dirname, '..\\swagger\\swagger.yaml'), { encoding: 'utf8' });
    return yamlJs.load(swaggerfilePath);
}
