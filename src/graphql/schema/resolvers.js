import dateScalar from "graphql-date"

export const resolvers = {

    Date: dateScalar,

    Query: {

        user: (_, {id}, {dataSources}) => {
            return dataSources.mariadb.getUser(id);
        },

        users: (_, __, {dataSources, user}) => {
            if(user?.role !== 'ADMIN') return null;
            return dataSources.mariadb.getUsers();
        },

        approvedEvents: (_, __, {dataSources}) => {
            return dataSources.mariadb.getApprovedEvents()
        },

        unapprovedEvents: (_, __, {dataSources, user}) => {
            if(!user) return null
            return dataSources.mariadb.getUnapprovedEvents()
        },

        event: (_, {id}, {dataSources}) => {
            return dataSources.mariadb.getEvent(id)
        },

        feed: (_, {id}, {dataSources}) => {
            return dataSources.mariadb.getFeed(id)
        },

        mediaInFeed: (_, {id}, {dataSources, user}) => {
            if(!user) return null
            return dataSources.mariadb.getMediaInFeed(id);
        },

        feedsInEvent: (_, {id}, {dataSources, user}) => {
            if(!user) return null
            return dataSources.mariadb.getFeedsInEvent(id);
        }
    },

    Event: {
        user: ({userId}, _, {dataSources}) => {
            return resolvers.Query.user(_, {id: userId}, {dataSources})
        },

        coords: ({id}, _, {dataSources}) => {
            return dataSources.mariadb.getCoords(id);
        }
    },

    Feed: {
        event: ({eventId}, _, {dataSources}) => {
            return resolvers.Query.event(_, {id: eventId}, {dataSources})
        },
        user: ({userId}, _, {dataSources}) => {
            return resolvers.Query.user(_, {id: userId}, {dataSources})
        }
    },

    Media: {
        feed: ({feedId}, _, {dataSources}) => {
            return resolvers.Query.feed(_, {id: feedId}, {dataSources})
        }
    },

    Mutation: {

        /**
         * Adds an event to the database
         *
         * If failed returns with HTTP Semantics error 409 (Conflict) by default
         */
         addEvent: async (_, args, {dataSources, user}) => {
            if(!user) return null;
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



        },

        /**
         * Adds a feed entry linked to an event and a user to the database
         *
         * If failed returns with HTTP Semantics error 409 (Conflict) by default
         */
        addFeed: async (_, args, {dataSources, user}) => {
            if(!user) return null;
            try{
                const feed = await dataSources.mariadb.addFeed(args);
                return {
                    code: 200,
                    success: true,
                    message: "Successfully inserted data",
                    feed
                }
            }catch (e) {
                return {
                    code: 409,
                    success: false,
                    message: "Failed to insert data"
                }
            }
        },

        /**
         * Adds media linked to a feed to the database
         *
         * If failed returns with HTTP Semantics error 409 (Conflict) by default
         */
        addMedia: async (_, args, {dataSources, user}) => {
            if(!user) return null;
            try{
                const media = await dataSources.mariadb.addMedia(args);
                return {
                    code: 200,
                    success: true,
                    message: "Successfully inserted data",
                    media
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



