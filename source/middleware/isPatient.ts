import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { Roles } from '../constants/roles';
import makeResponse from '../functions/makeResponse';

const NAMESPACE = "IsPatient";

const isPatient = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Validating Token');
    
    let token = req.headers.authorization?.split(" ")[1];
    if(token){
        // @ts-ignore
        jwt.verify(token, config.server.token.secret, (error, decoded: any) => {
            if(error){
                return makeResponse(res, 404, error.message, error, true);
            }else if(decoded?.role === Roles.PATIENT){ // updataing for patient delete
                res.locals.jwt = decoded;
                next();
            }else {
                return makeResponse(res, 404, "Only Patient can perform this task", null, true);
            }
        });
    }else {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}

export default isPatient;