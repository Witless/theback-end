import {SQLDataSource} from "datasource-sql";
import utils from "../../utils/utils.js";


class MariaDB extends SQLDataSource {

     getUser(id){
        return this.knex.select().from("Users").where({
            id: id
        }).first()
    }

    getApprovedEvents(){
        return this.knex.select().from("Events").where({
            show: 1
        })
    }

    getUnapprovedEvents(){
        return this.knex.select().from("Events").where({
            show: 0
        })
    }

    /**
     * Adds a new event to the DB, args comes in the form of {title, description, coords, place, country, userId}
     * @param args
     * @returns {*}
     */
    async addEvent(args){
        args.id = utils.generateUUIDv4();
        await this.knex("Events").insert(args)
        return this.knex.select().from("Events").where({
            id: args.id
        }).first()
    }



}

export default MariaDB