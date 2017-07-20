const schema = `

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

# The schema allows the following queries
type Query {
  authors: [Author!]!,
  author(id: ID!): Author,
  publishers: [Publisher!]!,
  publisher(id: ID!): Publisher,
  books: [Book!]!,
  book(id: ID!): Book
}

# The types that represent the root query and root mutation.
# We call them RootQuery and RootMutation by convention.
schema {
  query: Query
}
`;

export default schema;
