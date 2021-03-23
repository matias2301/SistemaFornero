require("dotenv").config();
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/Users';

export const generarJWT = ( uid: UserModel ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRET_KEY || 'defaultSecret' , {
            expiresIn: '4h'
        }, ( err, token ) => {

            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        })

    })
}