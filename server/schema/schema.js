const graphql = require('graphql');
const { resolveFieldValueOrError } = require('graphql/execution/execute');
const { PrismaClient, Prisma__BookClient } = require('@prisma/client');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

const _ = require('lodash');
const { connect } = require('http2');

const prisma = new PrismaClient();

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //return _.filter(books, { authorId: parent.id })
                return prisma.book.findMany({ where: { authorId: parent.id } });
            }
        }
    })
});

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // console.log(parent)
                //return _.find(authors, { id: parent.authorId })
                return prisma.author.findOne({ where: { id: parent.authorId } });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //code to get data from db/ other source
                // console.log(typeof (args.id));
                //return _.find(books, { id: args.id });
                return prisma.book.findOne({ where: { id: args.id } });
            }
        },

        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //code to get data from db/ other source
                // console.log(typeof (args.id));
                //return _.find(authors, { id: args.id });
                return prisma.author.findOne({ where: { id: args.id } });
            }
        },

        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                //return books
                return prisma.book.findMany();
            }
        },

        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors
                return prisma.author.findMany();
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args) {
                let author = {
                    id: args.id,
                    name: args.name,
                    age: args.age
                };
                return prisma.author.create({ data: author });
            }
        },

        updateAuthor: {
            type: AuthorType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args) {
                return prisma.author.update({
                    where: { id: args.id },
                    data: {
                        name: args.name,
                        age: args.age
                    }
                });
            }
        },

        removeAuthor :{
            type: AuthorType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return prisma.author.delete({
                    where: { id: args.id }
                });
            }
        },

        addBook: {
            type: BookType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID }
            },
            resolve(parent, args) {
                return prisma.book.create({
                    data: {
                        id: args.id,
                        name: args.name,
                        genre: args.genre,
                        author: {
                            connect: { id: args.authorId }
                        }
                    }

                });
            }
        },

        updateBook: {
            type: BookType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorId: { type: GraphQLID }
            },
            resolve(parent, args) {
                return prisma.book.update({
                    where: { id: args.id },
                    data: {
                        name: args.name,
                        genre: args.genre,
                        author: {
                            connect: { id: args.authorId }
                        }
                    }
                });
            }
        },

        removeBook: {
            type: BookType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args) {
                return prisma.book.delete({
                    where: { id: args.id }
                });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});

//mongodb+srv://ben:<password>@cluster0.otjf7.mongodb.net/<dbname>?retryWrites=true&w=majority
