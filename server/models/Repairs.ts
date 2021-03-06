import Sequelize, { DataTypes } from 'sequelize';
import sequelize from '../db/db';

import { RepairAddModel } from '../interface/repair.interface';
import Articles from './Articles'
import Providers from './Providers'
import Clients from './Clients'

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

const ArticlesRepairs = sequelize.define('ArticlesRepairs', {
  amount: DataTypes.INTEGER
}, { timestamps: false });

Articles.belongsToMany(Repairs, {
  through: "ArticlesRepairs",
});
Repairs.belongsToMany(Articles, {
  through: "ArticlesRepairs", 
});

Clients.hasMany(Repairs, {
    foreignKey: 'ClientId',    
});
Repairs.belongsTo(Clients);

export default Repairs