import jwt from 'jsonwebtoken';
import { JWT_PRIVATE_KEY } from '../conf';

export const generateJWT = (uid: string, username: string, email: string) => {

    return new Promise(( resolve, reject ) => {

        const options = {
            expiresIn: '3h'
        }
        
        const payload = {
            uid,
            username,
            email
        };
        
        jwt.sign(payload , JWT_PRIVATE_KEY, options , (err, token) => {
        
            if (err) {
                console.log(err);
                reject('Something wrong happend while trying to generate your token');
            }

            resolve(token);

        });

    });
}

export const verifyJWT = ( token: string ): Promise<string> => {
    if (!process.env.JWT_PRIVATE_KEY) {
        throw new Error('Environment variables: JWT_SECRET_KEY is not defined');
    }


    return new Promise(( resolve, reject ) => {

        try {
            jwt.verify( token, process.env.JWT_PRIVATE_KEY || '', (err,payload) => {
                if (err) {
                    console.log('que viene en el token de la funcion', token)
                    console.log('vamos a ver variables de etorno', process.env.JWT_PRIVATE_KEY)
                    console.log('solo para ver ', JWT_PRIVATE_KEY)
                    console.log('aca vamos a ver que pasa', err)
                    reject('invalid token');
                } else {
                    const { uid } = payload as { uid: string };
                    // if everything goes well it'll return the id
                    resolve(uid);
                }
            })
        } catch (error) {
            console.log('Verify JWT error', error)
        }

    });
}




