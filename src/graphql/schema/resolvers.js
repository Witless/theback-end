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
        }
    },

    Event: {
        user: ({Users_idUser}, _, {dataSources}) => {
            //TODO Check if I can call the Query user from here instead of extracting from the dataSource directly
            return dataSources.mariadb.getUser(Users_idUser)
        }
    },

    Mutation: {
        addEvent: (_, __, {dataSources}) => {
            return null
        }
    }

}



