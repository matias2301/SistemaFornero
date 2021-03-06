import { Request, Response } from 'express';
import Providers from '../models/Providers';

export const getProviders = async( req: Request , res: Response ) => {

    const providers = await Providers.findAll();

    res.json({ providers });
}


export const getProvider = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const provider = await Providers.findByPk( id );

    if( provider ) {
        res.json(provider);
    } else {
        res.status(404).json({
            msg: `No existe un proveedor con el id ${ id }`
        });
    }
}


export const createProvider = async( req: Request , res: Response ) => {

    const { body } = req;

    const provider = new Providers(body);

    provider.save()
        .then( () => {                        
            res.json({
                success: true,
                msg: '¡El proveedor se agregó con éxito!',
                provider
            });
        })
        .catch( (err: any) => {
          console.log(err)
          // console.log(err.errors[0].type)
          let msg = ''
          if (err.errors[0].type == 'unique violation') {
            msg = `Ya existe un provedor con el email ${body.email}`
          } else {
            msg = 'Lo sentimos, ha ocurrido un error. Intentá nuevamente.'
          }
          res.json({
            success: false,
            msg
          });
        })     
}


export const updateProvider = async( req: Request , res: Response ) => {

    const { id }   = req.params;
    const { body } = req;

    try {
        
        const provider = await Providers.findByPk( id );
        if ( !provider ) {
            return res.status(404).json({
                msg: 'No existe un proveedor con el id ' + id
            });
        }

        await provider.update( body );

        res.json( provider );


    } catch (error) {

        console.log(error);
        res.status(500).json({
          msg: 'Lo sentimos, ha ocurrido un error. Intentá nuevamente.'
        })    
    }   
}


export const deleteProvider = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const provider = await Providers.findByPk( id );
    if ( !provider ) {
        return res.status(404).json({
            msg: 'No existe un proveedor con el id ' + id
        });
    }

    // await provider.update({ state: false });
    // res.json(provider);

    await provider.destroy();
    res.json({
        success: true,
        msg: '¡El proveedor se eliminó con éxito!'
    });

}