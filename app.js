const express = require('express');
const bodyParser = require('body-parser');
const {graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose');
const graphqlSchema = require("./graphql/schema/index"); 
const graphqlResolver = require("./graphql/resolvers/index"); 

const app = express();

app.use(bodyParser.json());


app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
  })
); 

const PORT = 8000; 

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.pzhj1.mongodb.net/EventBooking?retryWrites=true&w=majority`)
.then(() => {
    app.listen(PORT, () => {
        console.log("port is running on 5000"); 
    })
})
.catch(err => {
    console.log(err); 
})