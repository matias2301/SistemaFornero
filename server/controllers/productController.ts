import { Request, Response } from 'express';
import Products from '../models/Products';

export const getProducts = async( req: Request , res: Response ) => {

    const products = await Products.findAll();

    res.json({ products });
}


export const getProduct = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const product = await Products.findByPk( id );

    if( product ) {
        res.json(product);
    } else {
        res.status(404).json({
            msg: `No existe un producto con el id ${ id }`
        });
    }
}


export const createProduct = async( req: Request , res: Response ) => {

    const { body } = req;

    const product = new Products(body);

    product.save()
        .then( () => {                        
            res.json({
                success: true,
                msg: '¡El producto se agregó con éxito!',
                product
            });
        })
        .catch( (err: any) => console.log(err))    
}


export const updateProduct = async( req: Request , res: Response ) => {

    const { id }   = req.params;
    const { body } = req;

    try {
        
        const product = await Products.findByPk( id );
        if ( !product ) {
            return res.status(404).json({
                msg: 'No existe un producto con el id ' + id
            });
        }

        await product.update( body );

        res.json( product );


    } catch (error) {

        console.log(error);
        res.status(500).json({
          msg: 'Lo sentimos, ha ocurrido un error. Intentá nuevamente.'
        })    
    }   
}


export const deleteProduct = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const product = await Products.findByPk( id );
    if ( !product ) {
        return res.status(404).json({
            msg: 'No existe un producto con el id ' + id
        });
    }

    // await product.update({ state: false });
    // res.json(product);

    await product.destroy();
    res.json({
        success: true,
        msg: '¡El producto se eliminó con éxito!',
    });
    
}