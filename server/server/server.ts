import express, { Application } from 'express';
// import cors from 'cors';
// import db from '../db/db';

class Server {

    private app: Application;
    private port: string;    

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server running on port ${this.port}`);            
        });
    }
}

export default Server