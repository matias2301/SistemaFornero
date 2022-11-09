import Sequelize, { DataTypes } from 'sequelize';
import sequelize from '../db/db';

import { RepairAddModel } from '../interface/repair.interface';
import Articles from './Articles';
import Clients from './Clients';

export interface RepairModel extends Sequelize.Model<RepairModel, RepairAddModel> {
    id?: number;        
    description: string;
    state: string;    
    estDate?: Date; 
    budget?: string;
    paidNumber?: string;
    paidState: boolean;
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
      values: ['Abierta', 'Pendiente', 'Completada', 'Cerrada', 'Cancelada'],
      defaultValue: 'Abierta',
  },
  estDate: {
      type: DataTypes.DATE,
      allowNull: true,
  },
  budget: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  paidNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  paidState: {
    type: DataTypes.BOOLEAN,
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