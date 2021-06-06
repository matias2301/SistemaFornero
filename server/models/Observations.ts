import Sequelize, { DataTypes } from 'sequelize';
import sequelize from '../db/db';

import { ObservationAddModel } from '../interface/observation.interface';
import Repairs from './Repairs'

export interface ObservationModel extends Sequelize.Model<ObservationModel, ObservationAddModel> {
    id?: number;    
    description: string;       
    createdAt?: Date;
    updatedAt?: Date;
}

const Observations = sequelize.define<ObservationModel, ObservationAddModel>('Observations', {

    description: {
        type: DataTypes.STRING,
        allowNull: true,       
    },    
})

Repairs.hasMany(Observations, {
    foreignKey: 'repairId',    
});
Observations.belongsTo(Repairs);

export default Observations