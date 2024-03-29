const express = require("express")
const {graphqlHTTP }= require("express-graphql")
const { graphql } = require("graphql")
const schema = require("./schema/schema")

const app = express()

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}))
app.listen(4000, () =>{
    console.log("serve is running")
})