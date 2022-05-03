import { Request, Response } from 'express';
import Articles from '../models/Articles';
import Providers from '../models/Providers';

export const getArticles = async( req: Request , res: Response ) => {

    const articles = await Articles.findAll({
        include: [
            {
                model: Providers,
            }
        ]
    });

    res.json({ articles });
}


export const getArticle = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const article = await Articles.findByPk( id );

    if( article ) {
        res.json(article);
    } else {
        res.status(404).json({
            msg: `No existe un articulo con el id ${ id }`
        });
    }
}


export const createArticle = async( req: Request , res: Response ) => {

    const { code, description, price, stock, poo, providers } = req.body;

    const article = new Articles({
        code,
        description,
        price,
        stock,
        poo
    });

    article.save()
        .then( (article: any) => {
            if( providers.length > 0 ){
                providers.map( (provider: any) => {
                  Providers.findByPk(provider).then( prov => {
                    article.addProvider(prov)
                  });              
                })
            }                   
            res.json({
                success: true,
                msg: '¡El artículo se agregó con éxito!',
                article
            });
        })
        .catch( (err: any) => console.log(err))    
}


export const updateArticle = async( req: Request , res: Response ) => {

    const { id }   = req.params;
    const { body } = req;

    try {
        
        const article = await Articles.findByPk( id );
        if ( !article ) {
            return res.status(404).json({
                msg: 'No existe un articulo con el id ' + id
            });
        }

        await article.update( body );

        res.json( article );


    } catch (error) {

        console.log(error);
        res.status(500).json({
          msg: 'Lo sentimos, ha ocurrido un error. Intentá nuevamente.'
        })    
    }   
}


export const deleteArticle = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const article = await Articles.findByPk( id );
    if ( !article ) {
        return res.status(404).json({
            msg: 'No existe un articulo con el id ' + id
        });
    }

    // await article.update({ state: false });
    // res.json(article);

    await article.destroy();
    res.json({
        success: true,
        msg: '¡El artículo se eliminó con éxito!'
    });
    
}