require("dotenv").config();
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Users from '../models/Users';

export const validateJWT = async ( req: Request, res: Response, next: NextFunction ) => {

    const token = req.header('x-token');
    
    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { uid }: any = jwt.verify( token, process.env.SECRET_KEY || 'defaultSecret' );
        
        // leer el usuario que corresponde al uid
        const user = await Users.findByPk( uid.id );

        if( !user ) {
            return res.status(401).json({
                msg: 'Token no válido - el usuario no existe'
            })
        }

        // Verificar si el uid tiene estado true
        if ( !user.state ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            })
        }       
        
        req.body.user = user;
        
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}