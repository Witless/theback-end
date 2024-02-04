import jwt from 'jsonwebtoken';


export function generateToken(payload, clave) {

    const options = {
        expiresIn: '7d'
    };

    return jwt.sign(payload, clave, options)



}

