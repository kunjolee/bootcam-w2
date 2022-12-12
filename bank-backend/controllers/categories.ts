import { Request, Response } from 'express';
import { Category } from '../models/';


export const get = async (req: Request, res: Response) => {
    try {
        const categories = await Category.findAll() 
       
        res.status(200).json(categories);
        
    } catch (error: any) {
        res.status(500).json({
            msg: 'Error getting categories',
           
        })
    }
}








