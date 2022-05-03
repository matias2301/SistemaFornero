import { Request, Response, NextFunction } from 'express';


export const isAdminRole = ( req: Request, res: Response, next: NextFunction ) => {

    const { user } = req.body;

    if ( !user ) {
        return res.status(500).json({
            msg: 'Se intentó verificar el role sin validar primero el token'
        });
    }

    const { role, name } = user;
    
    if ( role !== 'admin' ) {
        return res.status(401).json({
            msg: `User ${ name } no es administrador - Acceso no permitido`
        });
    }

    next();
}


export const hasRole = ( ...roles: any[] ) => {
    return (req: Request, res: Response, next: NextFunction) => {
        
        const { user } = req.body;
        const { role } = user;

        if ( !user ) {
            return res.status(500).json({
              msg: 'Se intentó verificar el role sin validar primero el token'
            });
        }

        if ( !roles.includes( role ) ) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${ roles }`
            });
        }
        next();
    }
}