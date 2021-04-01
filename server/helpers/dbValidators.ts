import Users from '../models/Users';

export const checkEmail = async( email = '' ) => {

    // Verificar si el correo existe
    const checkEmail = await Users.findOne({ 
        where: {
            email
        }
    });

    if ( checkEmail ) {
        throw new Error(`${email} is already registered`);
    }
}