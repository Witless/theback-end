import gql from "graphql-tag"

export const typeDefs = gql`
    
    type Query {
        user(id: ID!): User
        approvedEvents: [Event]
        unapprovedEvents: [Event]
    }
    
    type Mutation {
        addEvent(title: String!, description: String, coords: String, place: String, country: String, userId: String!): addEventResponse!
    }
    
    type addEventResponse{
        code: Int!
        success: Boolean!
        message: String!
        event: Event
    }
    
    type Event {
        idEvent: ID!
        title: String!
        description: String
        coords: String
        timestamp: Int
        place: String
        country: String
        show: Boolean
        user: User
    }
    
    type User {
        idUser: ID!
        username: String
        reputation: Int
        level: Int
        avatar: String
        email: String
        verified: Boolean
    }
    
    `

