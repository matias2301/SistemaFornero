import { Request, Response } from 'express';
import Clients from '../models/Clients';

export const getClients = async( req: Request , res: Response ) => {

    const clients = await Clients.findAll();

    res.json({ clients });
}