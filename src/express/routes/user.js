import express from "express";
import {user} from "../model/user.model.js";
import {generateToken} from "../AuthJWT/auth.js";
import DBConnection from "../DBConnection.js";
import utils from "../../utils/utils.js";
import mariadb from "../dataSources/mariadb.js";


const router = new express.Router();


router.post('/signup', (req, res) => {

    console.log(req.body);


    try {
        // Validar la solicitud
        if (!req.body) {
            return res.status(400).send({
                message: "Content can not be empty!"
            });
        }

        console.log("Ey" + req.body.username + req.body.email + req.body.password);

        const usuariox = new user({
            id: utils.generateUUIDv4(),
            username: req.body.username,
            password: req.body.password,
            birth: req.body.birth,
            reputation: 0,
            role: "USER",
            avatar: "",
            email: req.body.email,
            location: req.body.location,
            gender: req.body.gender,
            verified: 0
        });

        console.log("Ey2" + usuariox.username + usuariox.email);

        // Guardar usuario en la base de datos
        mariadb.createUser(usuariox, (err, token) => {
            if (err) {
                return res.status(500).send({
                    message: err.message || "Some error occurred while creating the usuario."
                });
            } else {
                return res.send({
                    token: token
                });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Error en la solicitud de registro de usuarios."
        });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const resultados = await DBConnection.getConnection().select('id', 'reputation', 'role', 'avatar', 'verified').from("Users").where({username:req.body.username,password: req.body.password}).first();

        console.log(resultados + "" + resultados.id);

        if (resultados.id) {

            const payload = JSON.parse(JSON.stringify(resultados))

            const token = generateToken(payload, process.env.JWT_SIGNING_KEY);

            res.json({ token, id: resultados.id });

        } else {
            res.status(500).json({ error: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

export default router