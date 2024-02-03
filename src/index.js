import {ApolloServer} from "@apollo/server";
import {typeDefs} from "./graphql/schema/typeDefs.js"
import {resolvers} from "./graphql/schema/resolvers.js"
import {startStandaloneServer} from "@apollo/server/standalone";
import MariaDB from "./graphql/dataSources/mariadb.js";
import 'dotenv/config'
import express from "express"
import ExpressServer from "./express/express.js";
import cors from 'cors';
import router from "./express/routes/user.js"


/**
 * Knex SQL Configuration
 * @type {{client: string, connection: {password: *, database: *, port: *, host: *, user: *}}}
 */

export const knexConfig = {
    client: "mysql",
    connection: {
        host: process.env.MARIADB_HOST,
        port: process.env.MARIADB_PORT,
        user: process.env.MARIADB_USER,
        password: process.env.MARIADB_PASSWORD,
        database: process.env.MARIADB_DATABASE
    }
}

/**
 * Express server initialization
 */
export const app = express();
console.log(process.env.EXPRESS_PORT);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/users', router);
app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`
        Express server launched
        Listening on port: ${process.env.EXPRESS_PORT}
    `)
})

new ExpressServer(app).init();

/**
 * Apollo server initialization
 * @returns {Promise<void>}
 */

async function startApolloServer(){


    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    })

    const {url} = await startStandaloneServer(apolloServer, {
        listen: {
            port: process.env.APOLLO_PORT
        },
        context: async () => {
            const {cache} = apolloServer;

            return {
                dataSources: {
                    mariadb: new MariaDB(knexConfig)
                }
            }
        }
    })

    console.log(`
        Apollo server launched
        Listening at: ${url}
    `)

}

await startApolloServer();


