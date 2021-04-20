import { Request, Response } from 'express';
import Observations from '../models/Observations';

export const createObservations = async( req: Request , res: Response ) => {

    const { body } = req;

    const obs = new Observations(body);

    obs.save()
        .then( () => {                        
            res.json({
                success: true,
                msg: 'observation creada con exito',
                obs
            });
        })
        .catch( (err: any) => console.log(err))    
}

export const deleteObservations = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const obs = await Observations.findByPk( id );
    if ( !obs ) {
        return res.status(404).json({
            msg: 'No existe un observation con el id ' + id
        });
    }

    // await obs.update({ state: false });
    // res.json(obs);

    await obs.destroy();
    res.json({
        success: true,
        msg: "observation borrado con exito"
    });
    
}