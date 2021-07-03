"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmail = void 0;
const Users_1 = __importDefault(require("../models/Users"));
exports.checkEmail = async (email = '') => {
    // Verificar si el correo existe
    const checkEmail = await Users_1.default.findOne({
        where: {
            email
        }
    });
    if (checkEmail) {
        throw new Error(`${email} is already registered`);
    }
};
//# sourceMappingURL=dbValidators.js.map