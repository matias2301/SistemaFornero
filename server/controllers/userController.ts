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
                        msg: 'User created successfully',
                        user
                    });
                })
                .catch( (err: any) => console.log(err))
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
            msg: 'Something went wrong'
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

    await user.update({ state: false });

    // await usuario.destroy();

    res.json(user);
}
