import Sequelize, { DataTypes } from 'sequelize';
import sequelize from '../db/db';

import { ProviderAddModel } from '../interface/provider.interface';

export interface ProviderModel extends Sequelize.Model<ProviderModel, ProviderAddModel> {
    id?: number;        
    name: string;
    lastName?: string;
    email: string;
    phone: string;    
    city: string;
    state: string;
    country: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const Providers = sequelize.define<ProviderModel, ProviderAddModel>('Providers', {

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },   
    email: {
      type: DataTypes.STRING,
      unique: true,       
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,     
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,     
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,      
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,      
    },
})

export default Providers