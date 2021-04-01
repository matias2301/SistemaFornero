import { Request, Response } from 'express';
import Articles from '../models/Articles';

export const getArticles = async( req: Request , res: Response ) => {

    const articles = await Articles.findAll();

    res.json({ articles });
}