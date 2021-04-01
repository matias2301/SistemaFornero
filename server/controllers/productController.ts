import { Request, Response } from 'express';
import Products from '../models/Products';

export const getProducts = async( req: Request , res: Response ) => {

    const products = await Products.findAll();

    res.json({ products });
}