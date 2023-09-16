// import GraphQL modules
const { gql } = require('apollo-server-express');
const typeDefs = require('./typeDefs'); // import typeDefs
const resolvers = require('./resolvers'); // import resolvers

module.exports = { typeDefs, resolvers };