import gql from "graphql-tag"

export const typeDefs = gql`
    
    scalar Date
    
    type Query {
        user(id: ID!): User
        event(id: ID!): Event
        
        """
        @auth Admin
        """
        users: [User]
        
        feed(id: ID!): Feed
        
        """
        The id provided must be a feedId
        @auth User
        """
        mediaInFeed(id: ID!): [Media]
        
        """
        The id provided must be a eventId
        @auth User
        """
        feedsInEvent(id: ID!): [Feed]
        
        
        approvedEvents: [Event]
        
        """
        @auth User
        """
        unapprovedEvents: [Event]
    }
    
    type Mutation {
        """
        @auth User
        """
        addEvent(title: String!, description: String!, coords: String, place: String!, country: String, userId: String!): addEventResponse!
        
        """
        @auth User
        """
        addFeed(text: String!, eventId: String!, userId: String!): addFeedResponse!
        
        """
        @auth User
        """
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
        timestamp: Date!
        place: String
        country: String
        show: Boolean
        coords: Point
        user: User
    }
    
    type Point{
        x: String
        y: String
    }
    
    type User {
        id: ID!
        username: String
        reputation: Int
        role: String
        avatar: String
        email: String
        verified: Boolean
    }
    
    `

