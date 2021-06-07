import Sequelize, { DataTypes } from 'sequelize';
import sequelize from '../db/db';

import { ArticleAddModel } from '../interface/article.interface';

export interface ArticleModel extends Sequelize.Model<ArticleModel, ArticleAddModel> {
    id?: number;
    code: string;        
    description: string;
    price: number;
    stock: number;    
    poo: number; 
    createdAt?: Date;
    updatedAt?: Date;
}

const Articles = sequelize.define<ArticleModel, ArticleAddModel>('Articles', {

    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,       
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },   
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,        
        allowNull: false,  
    },
    poo: {
        type: DataTypes.INTEGER,
        defaultValue: 0,        
        allowNull: false,  
    }
})

export default Articles
