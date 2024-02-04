import {SQLDataSource} from "datasource-sql";
import utils from "../../utils/utils.js";


class MariaDB extends SQLDataSource {

     getUser(id){
        return this.knex.select().from("Users").where({
            id
        }).first()
    }

    getEvent(id){
         return this.knex.select().from("Events").where({
             id
         }).first()
    }

    getFeed(id){
        return this.knex.select().from("Feeds").where({
            id
        }).first()
    }

    getMediaInFeed(id){
         return this.knex.select().from("Media").where({
             feedId: id
         })
    }

    getFeedsInEvent(id){
         return this.knex.select().from("Feeds").where({
             eventId: id
         })
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

    async addFeed(args){
        args.id = utils.generateUUIDv4();
        await this.knex("Feeds").insert(args)
        return this.knex.select().from("Feeds").where({
            id: args.id
        }).first()
    }

    async addMedia(args){
        args.id = utils.generateUUIDv4();
        await this.knex("Media").insert(args)
        return this.knex.select().from("Media").where({
            id: args.id
        }).first()
    }


}

export default MariaDB