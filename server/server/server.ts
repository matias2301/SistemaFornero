import express, { Application } from 'express';

import path = require('path');
import bodyParser from 'body-parser';
import cors from 'cors';

// import sequelize from '../db/db';

import userRoute from '../routes/userRoute';
import authRoute from '../routes/authRoute';
import clientRoute from '../routes/clientRoute';
import articleRoute from '../routes/articleRoute';
import productRoute from '../routes/productRoute';
import providerRoute from '../routes/providerRoute';
import repairRoute from '../routes/repairRoute';
import observationRoute from '../routes/observationRoute';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {        
        auth: '/api/auth',
        users: '/api/users',
        clients: '/api/clients',
        articles: '/api/articles',
        products: '/api/products',
        providers: '/api/providers',
        repairs: '/api/repairs',
        observations: '/api/observations',        
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
        this.app.use( this.apiPaths.auth, authRoute );        
        this.app.use( this.apiPaths.users, userRoute );
        this.app.use( this.apiPaths.clients, clientRoute );
        this.app.use( this.apiPaths.articles, articleRoute );
        this.app.use( this.apiPaths.products, productRoute );
        this.app.use( this.apiPaths.providers, providerRoute );
        this.app.use( this.apiPaths.repairs, repairRoute );
        this.app.use( this.apiPaths.observations, observationRoute );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server running on port ${this.port}`);            
        });
    }
}

export default Server