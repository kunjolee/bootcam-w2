import { Request, Response } from 'express'
import db from '../db/connection';
import { Movement } from '../models/'

export const save = async (req: Request, res: Response) => {
    try {
        const { state, ...rest } = req.body
        const movement = await Movement.create({
            ...rest,
            idUser: (req as any).authUser.id
        });
    
        res.json({
            msg: 'Movement saved successfully',
            movement
        })
        
    } catch (error) {
        console.log('Movement POST ERROR',error)
        res.status(500).json({
            msg: 'Contact your admin',  
            error          
        })        
    }


}


export const saveByAccount = async (req: Request, res: Response) => {
    const { accountNumber } = req.params
    try {
        const { state, ...rest } = req.body;

        const [ results ] = await db.query(`select id from accounts where "accountNumber" = '${ accountNumber }'`)

        const movement = await Movement.create({
            ...rest,
            idAccount: (results[0] as any).id,
            idUser: (req as any).authUser.id
        });
    
        res.json({
            msg: 'Movement saved successfully',
            movement
        })
        
    } catch (error) {
        console.log('Movement POST ERROR',error)
        res.status(500).json({
            msg: 'Contact your admin',  
            error          
        })        
    }


}

export const getHistoryMovements = async (req: Request, res: Response) => {

    const { idAccount = '', idCategory='', myDate = ''} = req.query

    if (!idAccount) {
        res.status(400).json({ msg: 'At least you should provide an idAccount' })
    }

    try {
        
        let query = ``;

        query = `
            select 
            m.id, m.description, m."type", m.amount, m."myDate",
            c.category,
            cu."currencyType" as "Currency"
            from movements m
            
            JOIN categories c ON m."idCategory" = c.id
            JOIN currencies cu ON m."idCurrency" = cu.id
            
            where m."idAccount" = ${idAccount}

        `;
//  ${ idAccount }
        if (idCategory) {
            query = `
                select 
                m.id, m.description, m."type", m.amount, m."myDate",
                c.category,
                cu."currencyType" as "Currency"
                from movements m
                
                JOIN categories c ON m."idCategory" = c.id
                JOIN currencies cu ON m."idCurrency" = cu.id
                
                where m."idAccount" = ${idAccount} and m."idCategory" = ${ idCategory }
            `
        } else if (myDate) {
            query = `
                select 
                m.id, m.description, m."type", m.amount, m."myDate",
                c.category,
                cu."currencyType" as "Currency"
                from movements m
                
                JOIN categories c ON m."idCategory" = c.id
                JOIN currencies cu ON m."idCurrency" = cu.id
                where m."idAccount" = ${idAccount} and m."myDate"=${myDate}
            `
        }
        const [ results ] = await db.query(query);
        res.status(200).json(results)
        
    } catch (error) {
        console.log(error)
        res.status(400).json({msg: 'Error happened at movements'})
    }
}


// select 
// 	m.id, m.description, m."type", m.amount, m."myDate",
// 	c.category,
// 	cu."currencyType" as "Currency"
// from movements m

// JOIN categories c ON m."idCategory" = c.id
// JOIN currencies cu ON m."idCurrency" = cu.id

// where m."idAccount" = 22 and m."myDate"='2022-11-12'