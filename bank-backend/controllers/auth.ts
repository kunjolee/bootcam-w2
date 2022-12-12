import { Response } from 'express';
import bcryptjs from 'bcryptjs'
import { generateJWT, verifyJWT } from '../helpers';
import { IAuth,CustomRequest } from '../interfaces';
import { User } from '../models';

export const login = async (req: CustomRequest<IAuth>, res: Response) => {
    try {
        
        const { email='', username='', pass='' } = req.body;

        const user = await User.findOne({ 
            where: {
                username       
            },
         });

         if (!user) {
            return res.status(400).json({
                msg: `User not founded`
            });
         };

         if (!bcryptjs.compareSync(pass, user.pass)) {
            return res.status(400).json({
                msg: 'Invalid authentication - user credentials do not coincide'
            })
         }
   
        const token = await generateJWT(user.id, user.username, user.email)
      
        res.status(200).json({
            ok: true,
            msg: 'authenticated successfully',
            token,
            user:{
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                address: user.address,
                phone: user.phone,
                birthdate: user.birthdate,
                state: user.state
            }
        });
        
    } catch (error) {
        console.log('Something wront happend while trying to authenticate', error);
        res.status(500).json({
            ok: false,
            msg: 'Something wront happend while trying to authenticate'
        })
    }
}


// verify if the user is already logged in
export const verifyAuth = async (req: CustomRequest, res: Response) => {

    const { token } = req.cookies as { token: string };
    
    try {
        const uid = await verifyJWT( token );
        
        const user = await User.findByPk(uid);

        if ( !user ) {
            return res.status(400).json({ msg: 'No user with that ID' });
        }


        res.status(200).json({ 
            ok: true,
            msg: 'Authenticated successfully',
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                address: user.address,
                phone: user.phone,
                birthdate: user.birthdate,
                state: user.state
            },
            token
        });

    } catch (error) {
        console.log('error in Auth:', error);

        res.status(401).json({
            msg: 'Session expired'
        })
    }
}

// migraciones mantienen el historial del schema de nuestra db