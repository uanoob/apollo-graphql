const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
const { PORT, MONGO_URI } = require('./config');
const Recipe = require('./models/Recipe');
const User = require('./models/User');

const { ObjectId } = mongoose.Types;
function objectIdToString() {
  return this.toString();
}
ObjectId.prototype.valueOf = objectIdToString;

mongoose
  .connect(
    MONGO_URI,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
    },
  )
  .then(() => {
    console.log('DB connected');
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    Recipe,
    User,
  },
  playground: {
    endpoint: '/graphql',
  },
});

server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
