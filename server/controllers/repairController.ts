import { Request, Response } from 'express';
import Repairs from '../models/Repairs';
import Clients from '../models/Clients';
import Users from '../models/Users';
import Observations from '../models/Observations';
import Articles from '../models/Articles';


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
        clientId,
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
                    repairId: repair.id
                })
                obs.save();
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
        
        const repair = await Repairs.findByPk( id );
        if ( !repair ) {
            return res.status(404).json({
                msg: 'No existe una reparacion con el id ' + id
            });
        }

        await repair.update( body )
            .then( () => {
                if(body.observations){
                    const obs = new Observations({
                        description: body.observations,
                        repairId: id
                    })
                    obs.save();
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