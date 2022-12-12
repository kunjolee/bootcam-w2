import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
import { verifyJWT } from '../helpers';
import { User } from '../models';


export const validateJWT = async ( req: Request, res: Response, next: NextFunction) => {

    const { token } = req.cookies as { token: string };

    try {

        const uid = await verifyJWT( token );
        
        const user = await User.findByPk(uid);

        if ( !user ) {
            return res.status(400).json({ msg: 'No user with that ID' });
        }

        if (!user.state){
            return res.status(401).json({
                msg: 'Invalid token - User state: false',
            });
        }

        (req as any).authUser = user;

        next();
    } catch (error) {
        console.log('Something wrong happened by validating JWT',error)
    }
}