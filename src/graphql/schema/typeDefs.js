import gql from "graphql-tag"

export const typeDefs = gql`
    
    scalar Date
    
    type Query {
        user(id: ID!): User
        event(id: ID!): Event
        feed(id: ID!): Feed
        """
        The id provided must be a feedId
        """
        mediaInFeed(id: ID!): [Media]
        """
        The id provided must be a eventId
        """
        feedsInEvent(id: ID!): [Feed]
        approvedEvents: [Event]
        unapprovedEvents: [Event]
    }
    
    type Mutation {
        addEvent(title: String!, description: String!, coords: String, place: String!, country: String, userId: String!): addEventResponse!
        addFeed(text: String!, eventId: String!, userId: String!): addFeedResponse!
        addMedia(url: String!, nsfw: Boolean!, feedId: String!): addMediaResponse!
    }
    
    type addEventResponse{
        code: Int!
        success: Boolean!
        message: String!
        event: Event
    }
    
    type addFeedResponse{
        code: Int!
        success: Boolean!
        message: String!
        feed: Feed
    }

    type addMediaResponse{
        code: Int!
        success: Boolean!
        message: String!
        media: Media
    }
    
    type Media{
        id: ID!
        nsfw: Boolean!
        url: String!
        timestamp: Date!
        feed: Feed
    }
    
    type Feed{
        id: ID!
        text: String!
        verified: Boolean!
        timestamp: Date!
        event: Event
        user: User
    }
    
    type Event {
        id: ID!
        title: String!
        description: String
        coords: String
        timestamp: Date!
        place: String
        country: String
        show: Boolean
        user: User
    }
    
    type User {
        id: ID!
        username: String
        reputation: Int
        level: Int
        avatar: String
        email: String
        verified: Boolean
    }
    
    `

