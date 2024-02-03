import {SQLDataSource} from "datasource-sql";


class MariaDB extends SQLDataSource {

     getUser(id){
        return this.knex.select().from("Users").where({
            idUser: id
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



}

export default MariaDB