import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
type Author {
  id: ID!,
  name: String!,
  books: [Book!]!
}

type Publisher {
  id: ID!,
  name: String!,
  books: [Book!]!
}

type Book {
  id: ID!,
  name: String!,
  publisher: Publisher!,
  authors: [Author!]!
}

# Root Query - all the queries supported by the schema
type Query {
  authors: [Author!]!,
  author(id: ID!): Author,
  publishers: [Publisher!]!,
  publisher(id: ID!): Publisher,
  books: [Book!]!,
  book(id: ID!): Book
}

# Root Mutation - all the mutations supported by the schema
type Mutation {
  createAuthor(id: ID!, name: String!): Author,
  createPublisher(id: ID!, name: String!): Publisher,
  createBook(id: ID!, name: String!, publisherId: ID!, authorIds: [ID!]!): Book
}

# Root Subscription - all the subscriptions supported by the schema
type Subscription {
    authorAdded: Author
}

# schema consists of the Root Query, the Root Mutation and the Root Subscription
schema {
  query: Query,
  mutation: Mutation,
  subscription: Subscription
}
`;

// Create the schema
export const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});
