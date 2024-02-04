import user from "./routes/user.js"
import knex from "knex";
import DBConnection from "./DBConnection.js"

export default class ExpressServer {

    constructor(app, knexConfig) {this.app = app; this.knexConfig = knexConfig}
    init(){

        this.createMariaDBConnection(this.knexConfig)

        this.app.use("/user", user)


    }

    createMariaDBConnection(knexConfig){
        new DBConnection(knexConfig);
    }




}