import user from "./routes/user.js"
import {Router as router} from "express";

export default class ExpressServer {

    constructor(app) {this.app = app}
    init(){

        this.app.use("/user", user)



    }




}