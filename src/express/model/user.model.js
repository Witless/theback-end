import * as auth from "../AuthJWT/auth.js";
import {knexConfig} from "../../index.js";
import Knex from "knex";




    export const user = function(usuario) {
    this.idUser = usuario.idUser;
    this.username = usuario.username;
    this.password = usuario.password;
    this.birth = usuario.birth;
    this.reputation = usuario.reputation;
    this.level = usuario.level;
    this.avatar = usuario.avatar;
    this.email = usuario.email;
    this.location = usuario.location;
    this.gender = usuario.gender;
    this.verified = usuario.verified;
};

user.create =  async (newUsuario, result) => {

    try {
        console.log(newUsuario.email);
        if (auth.validarEmail(newUsuario.email)) {
            const existingUser = await Knex(knexConfig).select('idUser').from('users')
                .where({email: newUsuario.email}).orWhere({username: newUsuario.username});

            console.log(existingUser.length);
            if (existingUser.length > 0) {
                result(null, 600);
            } else {
                const insertResult = await  Knex(knexConfig).from('users').insert(newUsuario);
                console.log("created usuario: ", {id: insertResult[0].id, ...newUsuario});
                result(null, 200);
            }
        } else {
            result(null, 100);
        }
    } catch (error) {
        console.error("error:", error);
        result(error, null);
    }
};

