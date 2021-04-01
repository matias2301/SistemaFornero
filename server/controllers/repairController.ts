import { Request, Response } from 'express';
import Repairs from '../models/Repairs';

export const getRepairs = async( req: Request , res: Response ) => {

    const repairs = await Repairs.findAll();

    res.json({ repairs });
}