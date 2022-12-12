import { Request, Response} from 'express'
import { Currency } from '../models'


export const get = async (req: Request, res: Response) => {
    try {
        const currency = await Currency.findAll();
        res.status(200).json(currency)
        
    } catch (error) {
        console.log('Error getting currency. Try later', error)
        res.status(500).json(error)
    }

}


