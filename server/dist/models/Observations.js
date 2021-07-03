"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db/db"));
const Repairs_1 = __importDefault(require("./Repairs"));
const Observations = db_1.default.define('Observations', {
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
});
Repairs_1.default.hasMany(Observations, {
    foreignKey: 'RepairId',
});
Observations.belongsTo(Repairs_1.default);
exports.default = Observations;
//# sourceMappingURL=Observations.js.map