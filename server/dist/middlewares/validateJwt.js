"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
require("dotenv").config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Users_1 = __importDefault(require("../models/Users"));
exports.validateJWT = async (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    try {
        const { uid } = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'defaultSecret');
        // leer el usuario que corresponde al uid
        const user = await Users_1.default.findByPk(uid.id);
        if (!user) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            });
        }
        // Verificar si el uid tiene estado true
        if (!user.state) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            });
        }
        req.body.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
};
//# sourceMappingURL=validateJwt.js.map