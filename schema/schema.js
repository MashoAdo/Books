const graphql  = require("graphql")
const _ = require("lodash")

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLList} = graphql

const books = [
    {name: "Deep work", genre: "motivation", id:1, authorId:1},
    {name: "Subtle", genre: "motivation", id:2, authorId:2},
    {name: "Gifted hands", genre: "medicine", id:3, authorId:3},
    {name: "Think hard", genre: "motivation", id:4, authorId:1},
    {name: "neurobiology", genre: "medicine", id:5, authorId:3},
    {name: "switch", genre: "fantasy", id:6, authorId:2}
]


const authors = [
    {id: 1, name: "Cal Newport", age:16},
    {id: 2, name: "Author2", age:26},
    {id: 3, name: "doctor", age:36}
]

const BookType = new GraphQLObjectType({
    name: "book",
    fields: () => ({
        id: {type :GraphQLInt},
        name: {type :GraphQLString},
        genre: {type :GraphQLString},
        author: {
            type :AuthorType,
            resolve(parent,args){
                return _.find(authors, {id:parent.authorId} )
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: "author",
    fields : () =>({
        name: {type: GraphQLString},
        id: {type: GraphQLInt},
        age: {type: GraphQLString},
        book: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, {authorId:parent.id})

            }
        }
    })
})

const RootQueryType = new GraphQLObjectType({
    name: "RootQueryType",
    fields:  {
        book: {
            type: BookType,
            args: {
                id: {type: GraphQLInt}
            },
            resolve(parent, args) {
                return _.find(books, {id:args.id})
            }

        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLInt}},
            resolve(parent,args){
                return _.find(authors, {id:args.id})
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return books
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                return authors
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQueryType
})