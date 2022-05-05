import { Request, Response } from 'express';
import Clients from '../models/Clients';

export const getClients = async( req: Request , res: Response ) => {

    const clients = await Clients.findAll();

    res.json({ clients });
}


export const getClient = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const client = await Clients.findByPk( id );

    if( client ) {
        res.json(client);
    } else {
        res.status(404).json({
            msg: `No existe un cliente con el id ${ id }`
        });
    }
}


export const createClient = async( req: Request , res: Response ) => {

    const { body } = req;

    const client = new Clients(body);

    client.save()
        .then( () => {                        
            res.json({
                success: true,
                msg: '¡El cliente se agregó con éxito!',
                client
            });
        })
        .catch( (err: any) => {
          console.log(err)
          // console.log(err.errors[0].type)
          let msg = ''
          if (err.errors[0].type == 'unique violation') {
            msg = `Ya existe un cliente con el código ${body.email}`
          } else {
            msg = 'Lo sentimos, ha ocurrido un error. Intentá nuevamente.'
          }
          res.json({
            success: false,
            msg
          });
        })   
}


export const updateClient = async( req: Request , res: Response ) => {

    const { id }   = req.params;
    const { body } = req;

    try {
        
        const client = await Clients.findByPk( id );
        if ( !client ) {
            return res.status(404).json({
                msg: 'No existe un cliente con el id ' + id
            });
        }

        await client.update( body );

        res.json( client );

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Lo sentimos, ha ocurrido un error. Intentá nuevamente.'
        })    
    }   
}


export const deleteClient = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const client = await Clients.findByPk( id );
    if ( !client ) {
        return res.status(404).json({
            msg: 'No existe un cliente con el id ' + id
        });
    }

    // await client.update({ state: false });
    // res.json(client);

    await client.destroy();
    res.json({
        success: true,
        msg: '¡El cliente se eliminó con éxito!'
    });
    
}