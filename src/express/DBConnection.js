import knex from "knex";
import {knexConfig} from "../index.js";

class DBConnection {

    static connection;

    static getConnection(){
        if(!this.connection){
            console.log("Created new connection to DB")
            this.connection = knex(knexConfig)
        }
        return this.connection;
    }

}

export default DBConnection