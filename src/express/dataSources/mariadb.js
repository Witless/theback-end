import DBConnection from "../DBConnection.js";
import utils from "../../utils/utils.js";

const Mariadb = {

    async createUser(newUsuario, result) {
        try {
            console.log(newUsuario.email);
            if (utils.validateEmail(newUsuario.email)) {
                const existingUser = await DBConnection.getConnection().select('id').from('Users')
                    .where({email: newUsuario.email}).orWhere({username: newUsuario.username});

                console.log(existingUser.length);
                if (existingUser.length > 0) {
                    result(null, 600);
                } else {
                    const insertResult = await DBConnection.getConnection().from('Users').insert(newUsuario);
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
    }


}

export default Mariadb