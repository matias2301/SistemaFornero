"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = require("path");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// import sequelize from '../db/db';
const userRoute_1 = __importDefault(require("../routes/userRoute"));
const authRoute_1 = __importDefault(require("../routes/authRoute"));
const clientRoute_1 = __importDefault(require("../routes/clientRoute"));
const articleRoute_1 = __importDefault(require("../routes/articleRoute"));
const productRoute_1 = __importDefault(require("../routes/productRoute"));
const providerRoute_1 = __importDefault(require("../routes/providerRoute"));
const repairRoute_1 = __importDefault(require("../routes/repairRoute"));
const observationRoute_1 = __importDefault(require("../routes/observationRoute"));
class Server {
    constructor() {
        this.apiPaths = {
            auth: '/api/auth',
            users: '/api/users',
            clients: '/api/clients',
            articles: '/api/articles',
            products: '/api/products',
            providers: '/api/providers',
            repairs: '/api/repairs',
            observations: '/api/observations',
        };
        this.app = express_1.default();
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
        this.app.use(cors_1.default());
        // Lectura del body
        // this.app.use( express.json() );        
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        // Carpeta pública
        const publicPath = path.resolve(__dirname, '../public');
        this.app.use(express_1.default.static(publicPath));
    }
    routes() {
        this.app.use(this.apiPaths.auth, authRoute_1.default);
        this.app.use(this.apiPaths.users, userRoute_1.default);
        this.app.use(this.apiPaths.clients, clientRoute_1.default);
        this.app.use(this.apiPaths.articles, articleRoute_1.default);
        this.app.use(this.apiPaths.products, productRoute_1.default);
        this.app.use(this.apiPaths.providers, providerRoute_1.default);
        this.app.use(this.apiPaths.repairs, repairRoute_1.default);
        this.app.use(this.apiPaths.observations, observationRoute_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map