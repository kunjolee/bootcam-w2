import { Request, Response } from 'express';
import { seeData } from '../db/seed-data';
import { User } from '../models';

export const save = async (req:Request, res:Response) => {

    if( process.env.NODE_ENV === 'production' ) {
        res.status(401).json({ message: 'This route is not allowed in production' });
        return;
    }

    try {
        await User.truncate();
        
        await User.bulkCreate(seeData.users);
        res.status(200).json({msg: 'Seeders created successfully'});

    } catch (error) {
        console.log('seeders error', error)
        res.status(500).json({ msg: 'Something wrong happened in seeders '})
    }

}   