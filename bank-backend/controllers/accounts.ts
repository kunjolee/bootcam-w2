import { Request, Response } from 'express'
import db from '../db/connection';
import { Account } from '../models'

export const save = async ( req: Request, res: Response ) => {
    const {state = '', balance=0, idUser=0 , ...rest } = req.body;
       
    try {
        
        const account = await Account.create({
           ...rest,
           idUser: (req as any).authUser.id
        });       
          
        res.status(200).json({
            msg: 'User saved successfully',
            account
        });

    } catch (error) {
        console.log('User POST ERROR',error)
        res.status(500).json({
            msg: 'Contact your admin',  
            error          
        })        
    }

}


export const getUserAccounts = async (req: Request, res: Response) => {
    
    try {
        const [ results ] = await db.query(`select "id", "accountNumber" from accounts where "idUser" = ${(req as any).authUser.id}`)
        res.status(200).json(results)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error in get',
            error
        })
    }

}

// Here i update only the balance
export const updateBalance = async (req: Request, res: Response) => {
    try {
        let { type, amount=0, idAccount=0, typeUpdate='' } = req.body

        console.log('que traes', idAccount, amount)
        const [results] = await db.query(`select * from accounts where id = '${ idAccount }'`)

        if (typeUpdate === 'transferExpense') {
            if(results.length <= 0){
                return res.status(200).json({
                    msg: `destination account does not exist`,
                    ok:false 
                })
            }
        }

        let query = '';

        if(type==='EXPENSES'){

            const [ results ] = await db.query(`select balance from accounts where id = ${idAccount}`)
            const [ myBalance ] = results;
            
            if (amount > (myBalance as any).balance) {
                
                return res.status(200).json({
                    msg: `Can't create an expense greater than your balance ${(myBalance as any).balance}`,
                    ok: false,
                    amount,
                    myBalance: (myBalance as any).balance
                })
            }     

            query = `update accounts set balance = balance - ${amount} where id = ${idAccount}`
        } else {
            query = `update accounts set balance = balance + ${amount} where id = ${idAccount}`
        }
        
        await db.query(query);

        res.status(200).json({
            msg: 'Balance updated successfully',
            ok: true
        })
            
            
    } catch (error) {
            console.log(error)
            console.log('Error updating balance')    
    }
}



// Here i update only the balance
export const updateBalanceByAccount = async (req: Request, res: Response) => {
    try {
        let { amount = 0 } = req.body
        let { accountNumber } = req.params
        const [results] = await db.query(`select * from accounts where "accountNumber" = '${ accountNumber }'`)

        if(results.length <= 0){
            return res.status(200).json({
                msg: `destination account does not exist`,
                ok:false 
            })
        }

        let query = `update accounts set balance = balance + ${amount} where "accountNumber" = '${accountNumber}'
        `
        
           await db.query(query);

        res.status(200).json({
            msg: 'Balance updated successfully',
            ok: true
        })
            
            
    } catch (error) {
            console.log(error)
            console.log('Error updating balance')    
    }
}


export const getTotalAccounts= async (req: Request, res: Response) => {
    try {
        const [ results ] = await db.query(
            `SELECT SUM(balance) FROM accounts where "idUser" = ${(req as any).authUser.id}`
        );

    
        res.status(200).json(results)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error in get total',
            error
        })
    }

}
export const getAccountInfoByUser= async (req: Request, res: Response) => {
     
    try {
        const [ results ] = await db.query(`select "id", "accountNumber", "balance" from accounts where "idUser" = ${(req as any).authUser.id}`)
        res.status(200).json(results)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error in get info',
            error
        })
    }

}
