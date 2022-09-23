import Sequelize, { DataTypes } from 'sequelize';
import sequelize from '../db/db';

import { ArticleAddModel } from '../interface/article.interface';
import Providers from './Providers'

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
        unique: true,
        
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,       
    },
    price: {
        type: DataTypes.FLOAT,
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

Articles.belongsToMany(Providers, {
  through: "ArticlesProvider",  
  // as: "providers",
  // foreignKey: 'ProviderId', 
});
Providers.belongsToMany(Articles, {
  through: "ArticlesProvider", 
  // as: "articles",
  // foreignKey: 'ArticleId',
});

export default Articles
