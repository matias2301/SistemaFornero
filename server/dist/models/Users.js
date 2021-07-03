"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db/db"));
const Repairs_1 = __importDefault(require("./Repairs"));
const Users = db_1.default.define('Users', {
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: true,
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM,
        values: ['admin', 'user'],
        defaultValue: 'user',
    },
    state: {
        type: sequelize_1.DataTypes.ENUM,
        values: ['active', 'inactive'],
        defaultValue: 'active',
    },
});
Repairs_1.default.belongsTo(Users, {
    as: 'taken'
});
Users.hasMany(Repairs_1.default, {
    foreignKey: 'takenId',
});
Repairs_1.default.belongsTo(Users, {
    as: 'assigned'
});
Users.hasMany(Repairs_1.default, {
    foreignKey: 'assignedId',
});
exports.default = Users;
//# sourceMappingURL=Users.js.map