const express = require("express"); 
const bodyParser = require("body-parser"); 
const { graphqlHTTP } = require("express-graphql"); 
const { buildSchema } = require("graphql");

const app = express();

const events = []; 

const PORT = 5000; 

app.use(bodyParser.json()); 

// where do i find my schema. 
// where do i find my resolver. 
app.use("/graphql", graphqlHTTP({
    schema:buildSchema(`

        type Event{
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            events: [Event!]!


        }

        type RootMutation{
            createEvent(eventInput: EventInput): Event!

        }

        schema{
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return events;

        }, 
        createEvent: (args) => {
            const event = {
                _id: Math.random().toString(), 
                title: args.eventInput.title,
                description: args.eventInput.description, 
                price: +args.eventInput.price,
                date: args.eventInput.date
            }
            events.push(event); 

        }
    },
    graphiql:true

})); 

app.listen(PORT, () => {
    console.log("port is running"); 
} )