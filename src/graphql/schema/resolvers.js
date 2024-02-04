import {Query} from "mysql/lib/protocol/sequences/index.js";

export const resolvers = {

    Query: {

        user: (_, {id}, {dataSources}) => {
            return dataSources.mariadb.getUser(id);
        },

        approvedEvents: (_, __, {dataSources}) => {
            return dataSources.mariadb.getApprovedEvents()
        },

        unapprovedEvents: (_, __, {dataSources}) => {
            return dataSources.mariadb.getUnapprovedEvents()
        },

        event: (_, {id}, {dataSource}) => {
            //TODO
        }
    },

    Event: {
        user: ({userId}, _, {dataSources}) => {
            return resolvers.Query.user(_, {id: userId}, {dataSources})
        }
    },

    Mutation: {

        /**
         * Adds an event to the database
         *
         * If failed returns with HTTP Semantics error 409 (Conflict) by default
         * @param _
         * @param args
         * @param dataSources
         * @returns {Promise<{code: number, success: boolean, message: string, event: *}|{code: number, success: boolean, message: string}>}
         */
         addEvent: async (_, args, {dataSources}) => {
            try{
                const event = await dataSources.mariadb.addEvent(args);
                return {
                    code: 200,
                    success: true,
                    message: "Successfully inserted data",
                    event
                }
            }catch (e) {
                return {
                    code: 409,
                    success: false,
                    message: "Failed to insert data"
                }
            }


        }
    }

}



