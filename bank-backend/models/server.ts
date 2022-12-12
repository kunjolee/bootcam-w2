import express, { Application } from 'express';
import cors from 'cors';

import db from '../db/connection';

import { categoriesRouter, currencyRouter, usersRouter, authRouter, seedRouter, accountRouter, movementRouter } from '../routes/';

import { APP_PORT } from '../conf/';

import cookies from 'cookie-parser';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        user: '/api/users',
        category: '/api/categories',
        currency: '/api/currency',
        auth: '/api/auth',
        account: '/api/accounts',
        movement: '/api/movements',
        seed: '/api/seed',
    };

    constructor(){
        this.app = express();
        this.port = APP_PORT;

        this.dbConnection();
        this.middlewares();   
        this.routes();
    }

    async dbConnection(){
      

        try {            
            await db.authenticate();
            console.log('Database online');
        } catch ( error ) {            
            console.log('Unable to connect to the database: ', error);
            throw new Error('Something went wrong');
        }

    }


    middlewares(){        
        // cookies

        this.app.use(cookies());
        
        this.app.use(cors({
            credentials: true, origin: ['http://localhost:5173', 'http://localhost:4173']
        }));
        // this.app.use(cors());

        // read body in json format
        this.app.use( express.json() );

        // Public file
        this.app.use( express.static('public') )


    }
    
    routes(){        
        this.app.use( this.apiPaths.user, usersRouter );        
        this.app.use( this.apiPaths.category, categoriesRouter );        
        this.app.use( this.apiPaths.currency, currencyRouter);
        this.app.use( this.apiPaths.auth, authRouter);
        this.app.use( this.apiPaths.seed, seedRouter);
        this.app.use( this.apiPaths.account, accountRouter);
        this.app.use( this.apiPaths.movement, movementRouter);
    }
    

    listen(){
        this.app.listen( this.port, () => {            
            console.log(`Server running on port ${this.port}`)
        })
    }



}


export default Server;