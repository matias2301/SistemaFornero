import { Request, Response } from 'express';
import Providers from '../models/Providers';

export const getProviders = async( req: Request , res: Response ) => {

    const providers = await Providers.findAll();

    res.json({ providers });
}