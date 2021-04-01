import dotenv from 'dotenv';
import Server from './server/server';
import sequelize from './db/db';

dotenv.config();

const server = new Server();

// server.listen();

sequelize.sync({ force: false }).then( () => {
    server.listen();    
});