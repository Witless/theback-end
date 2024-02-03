import express from "express";
import crypto from "crypto";
import { user } from "../model/user.model.js";
import {knexConfig} from "../../index.js";
import Knex from "knex";
import {GenerateToken} from "../AuthJWT/auth.js";

const secretKeyPin = "2L9u8|~FxBu!a0w9]"

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
            idUser: crypto.randomUUID(),
            username: req.body.username,
            password: req.body.password,
            birth: req.body.birth,
            reputation: 0,
            level: 0,
            avatar: "",
            email: req.body.email,
            location: req.body.location,
            gender: req.body.gender,
            verified: 0
        });

        console.log("Ey2" + usuariox.username + usuariox.email);

        // Guardar usuario en la base de datos
        user.create(usuariox, (err, token) => {
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
    const { email, password } = req.body;

    try {
        const resultados = await Knex(knexConfig).select('idUser').from("users").where({username:req.body.username,password: req.body.password});

        console.log(resultados + "" + resultados.length);

        if (resultados.length > 0) {
            const payload = {
                email: email,
                password: password
            };
            const token = GenerateToken(payload, secretKeyPin);
            res.json({ token });
        } else {
            res.status(500).json({ error: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

export default router