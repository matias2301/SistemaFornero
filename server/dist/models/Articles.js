"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db/db"));
const Providers_1 = __importDefault(require("./Providers"));
const Articles = db_1.default.define('Articles', {
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
        allowNull: true,
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    poo: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    }
});
Articles.belongsToMany(Providers_1.default, {
    through: "ArticlesProvider",
});
Providers_1.default.belongsToMany(Articles, {
    through: "ArticlesProvider",
});
exports.default = Articles;
//# sourceMappingURL=Articles.js.map