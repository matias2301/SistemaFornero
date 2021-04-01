import { Request, Response } from 'express';
import Observations from '../models/Observations';

export const getObservations = async( req: Request , res: Response ) => {

    const observations = await Observations.findAll();

    res.json({ observations });
}