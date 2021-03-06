import { Request, Response } from 'express';
import Users from '../models/Users';
import bcryptjs from 'bcryptjs';


export const getUsers = async( req: Request , res: Response ) => {

    const users = await Users.findAll();

    res.json({ users });
}

export const getUser = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const user = await Users.findByPk( id );

    if( user ) {
        res.json(user);
    } else {
        res.status(404).json({
            msg: `No existe un user con el id ${ id }`
        });
    }


}

export const createUser = async( req: Request , res: Response ) => {

    const { body } = req;

    const salt = bcryptjs.genSaltSync();
    bcryptjs.hash( body.password, salt )
        .then( hashedPass => {
            const user = new Users({
                name: body.name,
                email: body.email,
                password: hashedPass            
            });

            user.save()
                .then( () => {                        
                    res.json({
                        success: true,
                        msg: '¡El usuario se agregó con éxito!',
                        user
                    });
                })
                .catch( (err: any) => {
                  console.log(err)
                  // console.log(err.errors[0].type)
                  let msg = ''
                  if (err.errors[0].type == 'unique violation') {
                    msg = `Ya existe un usuario con el email ${body.email}`
                  } else {
                    msg = 'Lo sentimos, ha ocurrido un error. Intentá nuevamente.'
                  }
                  res.json({
                    success: false,
                    msg
                  });
                })  
        });
}

export const updateUser = async( req: Request , res: Response ) => {

    const { id }   = req.params;
    const { body } = req;

    try {
        
        const user = await Users.findByPk( id );
        if ( !user ) {
            return res.status(404).json({
                msg: 'No existe un user con el id ' + id
            });
        }

        await user.update( body );

        res.json( user );


    } catch (error) {

        console.log(error);
        res.status(500).json({
          msg: 'Lo sentimos, ha ocurrido un error. Intentá nuevamente.'
        })    
    }   
}


export const deleteUser = async( req: Request , res: Response ) => {

    const { id } = req.params;

    const user = await Users.findByPk( id );
    if ( !user ) {
        return res.status(404).json({
            msg: 'No existe un user con el id ' + id
        });
    }

    await user.update({ state: "inactive" });
    res.json(user);
    
    // await user.destroy();
    // res.json({
    //     success: true,
    //     msg: "user borrado con exito"
    // });
}
