"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../db/db"));
const Articles_1 = __importDefault(require("./Articles"));
const Clients_1 = __importDefault(require("./Clients"));
const Repairs = db_1.default.define('Repairs', {
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: sequelize_1.DataTypes.ENUM,
        values: ['open', 'pending', 'closed'],
        defaultValue: 'open',
    },
    estDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
});
const ArticlesRepairs = db_1.default.define('ArticlesRepairs', {
    amount: sequelize_1.DataTypes.INTEGER
}, { timestamps: false });
Articles_1.default.belongsToMany(Repairs, {
    through: "ArticlesRepairs",
});
Repairs.belongsToMany(Articles_1.default, {
    through: "ArticlesRepairs",
});
Clients_1.default.hasMany(Repairs, {
    foreignKey: 'ClientId',
});
Repairs.belongsTo(Clients_1.default);
exports.default = Repairs;
//# sourceMappingURL=Repairs.js.map