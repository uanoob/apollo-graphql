const express = require('express');
const mongoose = require('mongoose');
const { PORT, MONGO_URI } = require('./config');
const Recipe = require('./models/Recipe');
const User = require('./models/User');

mongoose
  .connect(
    MONGO_URI,
    {
      useNewUrlParser: true,
      useCreateIndex: true
    }
  )
  .then(() => {
    console.log('DB connected');
  })
  .catch(error => {
    console.log(error);
  });

const app = express();

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
