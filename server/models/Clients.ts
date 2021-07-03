import Sequelize, { DataTypes } from 'sequelize';
import sequelize from '../db/db';

import { ClientAddModel } from '../interface/client.interface';

export interface ClientModel extends Sequelize.Model<ClientModel, ClientAddModel> {
    id?: number;        
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    streetName: string;
    streetNumber: string;
    city: string;
    state: string;
    country: string;    
    createdAt?: Date;
    updatedAt?: Date;
}

const Clients = sequelize.define<ClientModel, ClientAddModel>('Clients', {

    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },   
    email: {
        type: DataTypes.STRING,        
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,     
    },
    streetName: {
        type: DataTypes.STRING,
        allowNull: false,      
    },
    streetNumber: {
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

export default Clients