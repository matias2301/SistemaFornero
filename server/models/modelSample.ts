// import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

// export interface newUser{    
//   name: string;
//   email: string;
//   password: string;
//   role: string;
//   state: string
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// export interface UserModel extends Model<newUser>, newUser {}
// export class User extends Model<UserModel, newUser> {}

// export type UserStatic = typeof Model & {
//   new (values?: object, options?: BuildOptions): UserModel;
// };

// export function UserFactory (sequelize: Sequelize): UserStatic {
//   return <UserStatic>sequelize.define("users", {
//       name: {
//         type: DataTypes.STRING,
//       },
//       email: {
//         type: DataTypes.STRING,
//         unique: true,
//         validate: {
//           notEmpty: true,
//           isEmail: true,
//         },
//       },
//       password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       role: {
//         type: DataTypes.ENUM,
//         values: ['admin','user'],
//         defaultValue: 'user',    
//       },
//       state: {
//         type: DataTypes.BOOLEAN,
//         values: ['active', 'inactive'],
//         defaultValue: 'active',    
//       },
//       createdAt: {
//           type: DataTypes.DATE,
//           allowNull: false,
//           defaultValue: DataTypes.NOW,
//       },
//       updatedAt: {
//           type: DataTypes.DATE,
//           allowNull: false,
//           defaultValue: DataTypes.NOW,
//       },
//   });
// }


// import {createJWToken} from '../config/auth'
// import bcryptjs from 'bcryptjs';
// require('dotenv').config()
// module.exports = function(Sequelize: any, DataTypes: any) {
//   const User = Sequelize.define('User', {
//       name: {
//         type: DataTypes.STRING,
//       },
//       email: {
//         type: DataTypes.STRING,
//         unique: true,
//         validate: {
//           notEmpty: true,
//           isEmail: true,
//         },
//       },
//       password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       role: {
//         type: DataTypes.ENUM,
//         values: ['admin','user'],
//         defaultValue: 'user',    
//       },
//       state: {
//         type: DataTypes.BOOLEAN,
//         values: ['active', 'inactive'],
//         defaultValue: 'active',    
//       },
//       createdAt: {
//           type: DataTypes.DATE,
//           allowNull: false,
//           defaultValue: DataTypes.NOW,
//       },
//       updatedAt: {
//           type: DataTypes.DATE,
//           allowNull: false,
//           defaultValue: DataTypes.NOW,
//       },
//   })

//   User.beforeSave((user: any, options: any) => {
//     if (user.changed('password')) {
//       user.password = bcryptjs.hashSync(user.password, bcryptjs.genSaltSync(10))
//     }
//   })
//   User.prototype.generateToken = function generateToken() {
//     console.log('JWT:' + process.env.SECRET)
//     return createJWToken({ email: this.email, id: this.id})
//   }

//   User.prototype.authenticate = function authenticate(value: string) {
//     if (bcryptjs.compareSync(value, this.password))
//       return this
//     else
//       return false
//   }
//   return User
// }