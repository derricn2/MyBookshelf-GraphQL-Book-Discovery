const { gql } = require('apollo-server-express');

// define GraphQL type definitions (schema)
const typeDefs = gql`
type User {
    _id: ID! # unique identifier for user
    username: String! # user username
    email: String! # user email address
    bookCount: Int # number of books associated with user
    savedBooks: [Book] # list of books saved by user
}

type Book {
    bookId: ID! # unique identifier for a book
    authors: [String] # list of authors of book
    description: String! # book description
    title: String! # book title
    image: String # URL of book image
    link: String # URL link to more information on book
}

type Auth {
    token: ID! # authentication token for user
    user: User # user information for authenticated user
}

input BookInput {
    bookId: ID! # same as above
    authors: [String] 
    description: String!
    title: String!
    image: String
    link: String
}

type Query {
    me: User # query to get information about currently logged-in user
}

type Mutation {
    login(email: String!, password: String!): Auth # mutation for user login
    addUser(username: String!, email: String!, password: String!): Auth # mutation to add a new user
    saveBook(input: BookInput!): User # mutation to save a book to user's list
    removeBook(bookId: ID!): User #mutation to remove a book from a user's list
}
`;

// export typeDefs for use in Apollo Server
module.exports = typeDefs;