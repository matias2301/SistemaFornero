"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const Users_1 = __importDefault(require("../models/Users"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateJwt_1 = require("../helpers/generateJwt");
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Users_1.default.findOne({
            where: {
                email
            },
        });
        // Verify if email exists
        if (!user) {
            return res.status(400).json({
                msg: 'Please verify email and password submitted'
            });
        }
        // Verify if user is active
        if (user.state !== 'active') {
            return res.status(400).json({
                msg: 'Please verify email and password submitted'
            });
        }
        // Verify password
        const validPassword = bcryptjs_1.default.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Please verify email and password submitted'
            });
        }
        // Generar el JWT
        const token = await generateJwt_1.generarJWT(user);
        res.json({
            success: true,
            msg: 'User Logged In',
            user,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Sopmething went wrong'
        });
    }
};
//# sourceMappingURL=authController.js.map