"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const sequelize_1 = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_DIALECT } = process.env;
const sequelize = new sequelize_1.Sequelize(`${DB_DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
    logging: false,
    native: false,
});
exports.default = sequelize;
//# sourceMappingURL=db.js.map