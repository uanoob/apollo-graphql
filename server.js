const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
const {
  PORT, MONGO_URI, CORS_ORIGIN, JWT_KEY,
} = require('./config');
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

const corsOptions = {
  origin: CORS_ORIGIN,
  credentials: true,
};

app.use(cors(corsOptions));

// Set up JWT authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers.authorization;
  if (token !== 'null') {
    try {
      const currentUser = await jwt.verify(token, JWT_KEY);
      req.currentUser = currentUser;
    } catch (err) {
      console.log(err);
    }
  }
  next();
});

// Create schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Create Graphiql application
app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
);

// Connect schemas with Graphql
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
      Recipe,
      User,
      currentUser,
    },
  })),
);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
