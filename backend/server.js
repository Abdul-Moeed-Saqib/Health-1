require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./graphql/schema');

const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
})

const corsOptions = {
    origin: ["http://localhost:3000"],
    credentials: true
  };

app.use(cors(corsOptions));

app.use('/graphql', graphqlHTTP((request, response) => {
  return {
    schema: schema,
    rootValue: global,
    graphiql: true,
    context: {

      req: request,
      res: response
    }
  }
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('listening on port', process.env.PORT);
    })
  })
  .catch((error) => {
    console.log(error);
  })