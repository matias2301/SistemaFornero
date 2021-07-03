import { Request, Response } from 'express';
import Repairs from '../models/Repairs';
import Clients from '../models/Clients';
import Users from '../models/Users';
import Articles from '../models/Articles';
import Observations from '../models/Observations';

export const getRepairs = async( req: Request , res: Response ) => {

    const repairs = await Repairs.findAll({
        include: [
            Clients,
            Observations,
            {
                model: Users,
                as: 'taken',
                attributes: ["name"],
            },
            {
                model: Users,
                as: 'assigned',
                attributes: ["name"],
            },
        ]
    });

    res.json({ repairs });
}


export const getRepair = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const repair = await Repairs.findAll({
        where: {
            id        
        },
        include: [
            Clients,
            Observations,
            Articles,
            {
                model: Users,
                as: 'taken',
                attributes: ["name"],
            },
            {
                model: Users,
                as: 'assigned',
                attributes: ["name"],
            },
        ]
    });

    if( repair.length > 0 ) {
        res.json(repair);
    } else {
        res.status(404).json({
            msg: `No existe una orden de reparacion con el id ${ id }`
        });
    }
}


export const createRepair = async( req: Request , res: Response ) => {

    const { clientId, description, state, estDate, takenId, assignedId, articles, observations } = req.body;

    const repair = new Repairs({
        ClientId: clientId,
        description,        
        estDate: estDate || '',
        state,
        assignedId,
        takenId,        
    });

    repair.save()
        .then( (repair: any) => {
            
            if(observations){
                const obs = new Observations({
                    description: observations,
                    RepairId: repair.id
                })
                obs.save();
            }

            if( articles.length > 0 ){
              articles.map( (article: any) => {
                Articles.findByPk(article.id).then( art => {
                  if( art ){
                    repair.addArticle(art, { through: { amount: article.amount } })

                    let updatedArticle = {
                      code: article.code,
                      description: article.descrip,
                      price: art.price,
                      stock: ( art.stock - article.amount ),
                      poo: art.poo
                    }
                    art.update( updatedArticle );
                  }
                });             
              })
            }  
            
            res.json({
                success: true,
                msg: 'Orden de reparacion creada con exito',
                repair
            });
        })
        .catch( (err: any) => console.log(err))    
}


export const updateRepair = async( req: Request , res: Response ) => {

    const { id }   = req.params;    
    const { body } = req;

    try {
        
      const repair = await Repairs.findOne({
        where: {
            id        
        },
        include: [
          Articles,
        ]
      });

        if ( !repair ) {
            return res.status(404).json({
                msg: 'No existe una reparacion con el id ' + id
            });
        }

        await repair.update( body )
          .then( (repair: any) => {
              if(body.observations){
                  const obs = new Observations({
                      description: body.observations,
                      RepairId: id
                  })
                  obs.save();
              }

              if( repair.Articles.length > 0 && body.articles.length > 0 ){

                repair.Articles.map( (article: any) => {
                  let remove = false;

                    body.articles.map( (updArticle: any) => {

                      if( article.id === updArticle.id ){

                        remove = true;
                        let newStock = 0;
                        if( article.ArticlesRepairs.amount > updArticle.amount ){
                          newStock = article.stock + (article.ArticlesRepairs.amount - updArticle.amount);
                        } else if ( article.ArticlesRepairs.amount < updArticle.amount ){
                          newStock = article.stock - (updArticle.amount - article.ArticlesRepairs.amount);
                        }

                        if( article.ArticlesRepairs.amount != updArticle.amount ){
                          Articles.findByPk(updArticle.id).then( art => {
                            if( art ){
                              repair.addArticle(art, { through: { amount: updArticle.amount } })

                              let updatedArticle = {
                                code: updArticle.code,
                                description: updArticle.descrip,
                                price: art.price,
                                stock: newStock,
                                poo: art.poo
                              }
                              art.update( updatedArticle );

                            }
                          })
                        }
                      }                      
                      
                    });
                    if( !remove ) {
                      repair.removeArticle(article)
                      let updatedArticle = {
                        code: article.code,
                        description: article.descrip,
                        price: article.price,
                        stock: ( article.stock + article.ArticlesRepairs.amount ),
                        poo: article.poo
                      }
                      article.update( updatedArticle );
                    }
                });

              } else if( repair.Articles.length > 0 && body.articles.length <= 0 ) {

                repair.Articles.map( (article: any) => {

                  Articles.findByPk(article.id).then( art => {
                    if( art ){
                      repair.removeArticle(art)

                      let updatedArticle = {
                        code: article.code,
                        description: article.descrip,
                        price: art.price,
                        stock: art.stock + article.ArticlesRepairs.amount,
                        poo: art.poo
                      }
                      art.update( updatedArticle );
                    }
                  })
                });
              } else {
                body.articles.map( (newArticle: any) => {

                  Articles.findByPk(newArticle.id).then( art => {
                    if( art ){
                      repair.addArticle(art, { through: { amount: newArticle.amount } })

                      let updatedArticle = {
                        code: newArticle.code,
                        description: newArticle.descrip,
                        price: art.price,
                        stock: art.stock - newArticle.amount,
                        poo: art.poo
                      }
                      art.update( updatedArticle );
                    }
                  })
                });
              }              

              if( repair.Articles.length > 0 && body.articles.length > 0 ){
                let newArticles = body.articles.filter( (art:any) => {
                  let res = repair.Articles.find( (match:any) =>{
                    return art.id == match.id;
                    });
                return res == undefined;
                });
                if( newArticles.length > 0 ){
                  newArticles.map( (newArticle: any) => {
                    Articles.findByPk(newArticle.id).then( art => {
                      if( art ){
                        repair.addArticle(art, { through: { amount: newArticle.amount } })
  
                        let updatedArticle = {
                          code: newArticle.code,
                          description: newArticle.descrip,
                          price: art.price,
                          stock: art.stock - newArticle.amount,
                          poo: art.poo
                        }
                        art.update( updatedArticle );    
                      }
                    })              
                  });
                }
              }

              res.json( repair );
          })        

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong'
        })    
    }   
}


export const deleteRepair = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const repair = await Repairs.findByPk( id );
    if ( !repair ) {
        return res.status(404).json({
            msg: 'No existe una reparacion con el id ' + id
        });
    }

    // await repair.update({ state: false });
    // res.json(repair);

    await repair.destroy();
    res.json({
        success: true,
        msg: "reparacion borrada con exito"
    });
    
}