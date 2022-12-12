import { Request,Response, NextFunction } from 'express'
import { validationResult } from 'express-validator';

export const fieldsValidate = ( req: Request, res: Response, next: NextFunction) => {
    
    
    const errs = validationResult(req);

    if (!errs.isEmpty()) {
        return res.status(400).json(errs.array());
    }

    next();
}

