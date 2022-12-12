import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs'
import { User } from '../models';
import { generateJWT } from '../helpers';

export const get = async ( req: Request, res: Response ) => {

const users = await User.findAll();    
        
    res.json({
        msg: 'GET',
        users
    })
}

export const getById = async ( req: Request, res: Response ) => {

    const { id } = req.params as { id: string };

    const user = await User.findByPk(id)

    if ( !user ) return res.status(404).json({ msg: 'User not found' })

    res.json({
        msg: 'GET ONE',
        user
    })

}

export const save = async ( req: Request, res: Response ) => {
    const { pass, ...rest } = req.body;
        
    try {

        const salt = bcryptjs.genSaltSync();
        const hash = bcryptjs.hashSync(pass, salt);

        const user = await User.create({
            ...rest,
            pass: hash
        });        


        const token = await generateJWT(user.id, user.username, user.email);

        res.status(200).json({
            msg: 'User saved successfully',
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
            ok: true,
            token
        });

    } catch (error) {
        console.log('User POST ERROR',error)
        res.status(500).json({
            msg: 'Contact your admin',            
        })        
    }

}

export const update = async ( req: Request, res: Response ) => {

    const { body } = req;
    const { id } = req.params;

    try {
        
        const user = await User.findByPk( id );

        if ( !user ) {
            return res.status(400).json({
                msg: `There is no user with id ${ id }`
            })
        }

        await user.update(body);

        res.status(200).json(user);

    } catch (error) {
        console.log('PUT USERS', error);        

        res.status(500).json({
            msg: 'Contact your admin'
        })
    }
}


export const deleteUser = async ( req: Request, res: Response) => {

    const { id } = req.params;

    try {
        const user = await User.findByPk( id );

        if ( !user ) {
            return res.status(400).json({
                msg: `There is no user with id ${ id }`
            })
        }    


        user.update({ state: 0 });

        res.status(200).json({
            msg: `User with id ${id} deleted successfully`,
            user
        })

        // user.destroy() - delete permanently this user from the DB

    } catch (error) {
        console.log('DELETE USERS ',error)
        res.status(500).json({
            msg: 'Contact your admin'
        });
    }

}
