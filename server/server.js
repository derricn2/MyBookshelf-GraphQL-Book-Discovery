const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express'); // import ApolloServer
const { authMiddleware } = require('./utils/auth'); // import authentication middleware
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas'); // import typeDefs and resolvers
// const routes = require('./routes'); // not needed for GraphQL API

const PORT = process.env.PORT || 3001;

// async function to encapsulate the server startup process
async function startServer() {
  const app = express();

  // body parsers for JSON data
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // create instance of ApolloServer and provide typeDefs and resolvers
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware, // set context to use authentication middleware
  });

  // wait for Apollo Server to start
  await server.start();

  // apply Apollo Server as middleware
  server.applyMiddleware({ app });

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  app.use(routes);

  // start server once database connection is open
  db.once('open', () => {
    app.listen(PORT, () =>
      console.log(`🌍 Now listening on localhost:${PORT}`)
    );
  });
}

// call startServer function and handle any errors
startServer().catch((error) => {
  console.error('Error starting server:', error);
});
