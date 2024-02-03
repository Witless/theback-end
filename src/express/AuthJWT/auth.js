import jwt from 'jsonwebtoken';


export function GenerateToken(payload, clave) {

    const options = {
        expiresIn: '7d'
    };

    const token = jwt.sign(payload, clave, options);

    return token;
}

export function validarEmail(email) {
    // Expresión regular para verificar el formato del correo electrónico
    const expresionRegular = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Utilizar el método test para verificar si la cadena coincide con el formato
    return expresionRegular.test(email);
}