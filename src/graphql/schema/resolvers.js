export const resolvers = {

    Query: {

        user: (parent, {id}, {dataSources}) => {
            console.log(parent)
            return dataSources.mariadb.getUser(id);
        },

        approvedEvents: (_, __, {dataSources}) => {
            return dataSources.mariadb.getApprovedEvents()
        },

        unapprovedEvents: (_, __, {dataSources}) => {
            return dataSources.mariadb.getUnapprovedEvents()
        }
    },

    Mutation: {
        addEvent: (_, __, {dataSources}) => {
            return null
        }
    }

}



