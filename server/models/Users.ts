import Sequelize, { DataTypes } from 'sequelize';
import sequelize from '../db/db';

export interface UserAddModel {
  id?: number;        
  name: string;
  email: string;
  password: string;
  role: string;
  state: string
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModel extends Sequelize.Model<UserModel, UserAddModel> {
  id?: number;        
  name: string;
  email: string;
  password: string;
  role: string;
  state: string
  createdAt?: Date;
  updatedAt?: Date;
}

export const Users = sequelize.define<UserModel, UserAddModel>('Users', {

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },   
  role: {
    type: DataTypes.ENUM,
    values: ['admin','user'],
    defaultValue: 'user',    
  },
  state: {
    type: DataTypes.ENUM,
    values: ['active', 'inactive'],
    defaultValue: 'active',
  },
})