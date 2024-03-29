import { Request, Response } from 'express';
import Users from '../models/Users';
import bcryptjs from 'bcryptjs';

import { generarJWT } from '../helpers/generateJwt';


export const login = async( req: Request , res: Response ) => {

    const { email, password } = req.body;

    try {      
        
        const user = await Users.findOne({
            where: {
                email
            },
        });

        // Verify if email exists
        if ( !user ) {
            return res.status(400).json({
                msg: 'Verificá el email y la contraseña ingresada'
            });
        }
        
        // Verify if user is active
        if ( user.state !== 'active' ) {
            return res.status(400).json({
                msg: 'Verificá el email y la contraseña ingresada'
            });
        }

        // Verify password
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Verificá el email y la contraseña ingresada'
            });
        }

        // Generar el JWT
        const token = await generarJWT( user );

        res.json({
            success: true,
            msg: 'Se ha iniciado sesión',
            user,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
          msg: 'Lo sentimos, ha ocurrido un error. Intentá nuevamente.'
        });
    }   

}