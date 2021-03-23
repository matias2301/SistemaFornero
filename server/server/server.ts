import express, { Application } from 'express';

import path = require('path');
import bodyParser from 'body-parser';
import cors from 'cors';

// import sequelize from '../db/db';

import userRoute from '../routes/userRoute';
import authRoute from '../routes/authRoute';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users',
        auth: '/api/auth'
    }   

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        // this.dbConnection();
        this.middlewares();
        this.routes();
    }

    // async dbConnection() {

    //     try {            
    //         await sequelize.authenticate();
    //         console.log('Database online');
            
    //     } catch (error) {
    //         throw new Error( error );
    //     }
    // }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura del body
        // this.app.use( express.json() );        
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        // Carpeta pública
        const publicPath = path.resolve( __dirname, '../public' );
        this.app.use( express.static(publicPath) );
    }


    routes() {
        this.app.use( this.apiPaths.users, userRoute );
        this.app.use( this.apiPaths.auth, authRoute );        
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server running on port ${this.port}`);            
        });
    }
}

export default Server