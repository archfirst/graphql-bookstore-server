GraphQL Bookstore Server
========================
This example demonstrates the patterns used in real-world GraphQL applications and how to implement them using [Apollo GraphQL](http://dev.apollodata.com/) tools and libraries.

1. In any realistic application, you will encounter one-to-many and many-to-many relationships between domain entities. In this example, we use the bookstore domain to illustrate how to implement these relationships.
2. In many applications, there is a need to show real-time updates on the client. We demonstrate how to do this using GraphQL subscriptions.

First, a quick description of the bookstore domain:

- A bookstore sells books.
- A book can have one or more authors.
- A book has a single publisher.
- An author can write several books.
- A publisher can publish several books.

More formally, book-to-author is a many-to-many relationship, whereas book-to-publisher is a many-to-one relationship. This is depicted in the domain model below.

![Domain Model](assets/bookstore-domain-model.png)

Getting started (Dev Mode)
--------------------------
To run the application in development mode:
```bash
$ npm install
$ npm run start-db
$ npm run watch  <--- run this in a separate shell
```

- `npm install` installs the required node libraries under `node_modules`. This needs to be run only once.
- `npm run start-db` starts a simple JSON based database server. It is implemented using [JSON Server](https://github.com/typicode/json-server) which provides a simple persistence solution with a full REST API. The JSON file that stores the data is located at /data/db.json. It is seeded with four books and associated authors and publishers.
- `npm run watch` starts the application. It is designed for an efficient development process. As you make changes to the code, the application will restart to reflect the changes immediately. Also, Node.js is started with the `--inspect` flag so that debugging is turned on.


Then point your browser to [http://localhost:8080/graphiql](http://localhost:8080/graphiql). You should now be able to perform queries and mutations as defined in the sections below.

To debug the server in Chrome, point your browser to chrome-devtools://devtools/bundled/inspector.html?experiments=true&v8only=true&ws=127.0.0.1:9229/{uuid of debugger}

Building for production
-----------------------
When you want to deploy the application into production, run the following command:

```bash
$ npm run build
$ npm start
```

- `npm run build` compiles the ES6 code into the dist directory. This needs to be run only once.
- `npm start` runs the application from the dist directory.

Queries
-------
### Get a list of all authors
```
{
  authors {
    name
  }
}
```

### Get an author along with their books
```
query Author($id: ID!) {
  author(id: $id) {
    name,
    books {
      name
    }
  }
}
```

with the following variables
```
{
  "id": "martin-fowler"
}
```

### Get a list of all publishers
```
{
  publishers {
    name
  }
}
```

### Get a publisher along with their books
```
query Publisher($id: ID!) {
  publisher(id: $id) {
    name,
    books {
      name
    }
  }
}
```

with the following variables
```
{
  "id": "addison-wesley"
}
```

### Get a list of all books
```
{
  books {
    name
  }
}
```

### Get a book along with its publisher and authors
```
query Book($id: ID!) {
  book(id: $id) {
    name,
    publisher {
      name
    },
    authors {
      name
    }
  }
}
```

with the following variables
```
{
  "id": "design-patterns"
}
```

Mutations
---------
### Create an author
```
mutation CreateAuthor($id: ID!, $name: String!) {
  createAuthor(id: $id, name: $name) {
    id,
    name
  }
}
```

with the following variables
```
{
  "id": "robert-martin",
  "name": "Robert C. Martin"
}
```

### Create a publisher
```
mutation CreatePublisher($id: ID!, $name: String!) {
  createPublisher(id: $id, name: $name) {
    id,
    name
  }
}
```

with the following variables
```
{
  "id": "prentice-hall",
  "name": "Prentice Hall"
}
```

### Create a book
```
mutation CreateBook($id: ID!, $name: String!, $publisherId: ID!, $authorIds: [ID!]!) {
  createBook(id: $id, name: $name, publisherId: $publisherId, authorIds: $authorIds) {
    id,
    name,
    publisher {
      name
    },
    authors {
      name
    }
  }
}
```

with the following variables
```
{
  "id": "clean-code",
  "name": "Clean Code - A Handbook of Agile Software Craftsmanship",
  "publisherId": "prentice-hall",
  "authorIds": [
    "robert-martin"
  ]
}
```

Subscriptions
-------------
Run the following query in GraphiQL to subscribe to `authorAdded` messages:

```
subscription {
  authorAdded {
    id
    name
  }
}
```

When you run this query, you should see a message like this:

> "Your subscription data will appear here after server publication!"

Now run GraphiQL in a second browser window, and create an author following the instructions above (under Mutations). When you add a new author, you should see a message like this in the first GraphiQL window:

```
{
  "authorAdded": {
    "id": "donald-knuth",
    "name": "Donald E. Knuth"
  }
}
```
