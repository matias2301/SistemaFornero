import dotenv from 'dotenv';
import Server from './server/server';
import connection from './db/db';

dotenv.config();

const server = new Server();

connection.sync({ force: false }).then( () => {
    server.listen();
});
