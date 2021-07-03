"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db/db"));
const Products = db_1.default.define('Products', {
    code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
});
exports.default = Products;
//# sourceMappingURL=Products.js.map