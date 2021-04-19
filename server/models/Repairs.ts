import Sequelize, { DataTypes } from 'sequelize';
import sequelize from '../db/db';

import { RepairAddModel } from '../interface/repair.interface';
import Articles from './Articles'
import Clients from './Clients'
import Observations from './Observations'

export interface RepairModel extends Sequelize.Model<RepairModel, RepairAddModel> {
    id?: number;        
    description: string;
    state: string;    
    estDate?: Date; 
    createdAt?: Date;
    updatedAt?: Date;
}

const Repairs = sequelize.define<RepairModel, RepairAddModel>('Repairs', {

    description: {
        type: DataTypes.STRING,
        allowNull: false,       
    },
    state: {
        type: DataTypes.ENUM,
        values: ['open','pending','closed'],
        defaultValue: 'open',
    },
    estDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
})

Articles.belongsToMany(Repairs, {
    through: 'articleRepairTable'   
})

Clients.hasMany(Repairs, {
    foreignKey: 'ClientId',    
});
Repairs.belongsTo(Clients);

export default Repairs