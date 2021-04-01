import Sequelize, { DataTypes } from 'sequelize';
import sequelize from '../db/db';

import { ProductAddModel } from '../interface/product.interface';

export interface ProductModel extends Sequelize.Model<ProductModel, ProductAddModel> {
    id?: number;  
    code: string;      
    description: string;
    price: number;
    stock: number;    
    createdAt?: Date;
    updatedAt?: Date;
}

const Products = sequelize.define<ProductModel, ProductAddModel>('Products', {

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
        allowNull: false,
    },   
    stock: {
        type: DataTypes.INTEGER,        
        defaultValue: 0,   
        allowNull: false,   
    },
})

export default Products