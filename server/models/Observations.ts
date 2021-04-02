import Sequelize, { DataTypes } from 'sequelize';
import sequelize from '../db/db';

import { ObservationAddModel } from '../interface/observation.interface';
import Repairs from './Repairs'

export interface ObservationModel extends Sequelize.Model<ObservationModel, ObservationAddModel> {
    id?: number;
    title: string;    
    description: string;   
    createdAt?: Date;
    updatedAt?: Date;
}

const Observations = sequelize.define<ObservationModel, ObservationAddModel>('Observations', {

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,       
    },
})

Observations.belongsTo(Repairs, {
    foreignKey: 'repairId',    
});


export default Observations