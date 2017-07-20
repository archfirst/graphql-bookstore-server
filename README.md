Bookstore GraphQL API
=====================

Getting started (Dev Mode)
--------------------------
To run the application in development mode:
```bash
$ npm install
$ npm run start-db
$ npm run watch  // run this in a separate shell
```

- `npm install` installs the required node libraries under `node_modules`. This needs to be run only once.
- `npm run start-db` starts a simple JSON based database server. It is implemented using [JSON Server](https://github.com/typicode/json-server) which provides a simple persistence solution with a full REST API. The JSON file that stores the data is located at /data/db.json. It is seeded with four books and associated authors and publishers.
- `npm run watch` starts the application. It is designed for an efficient development process. As you make changes to the code, the application will restart to reflect the changes immediately. Also, Node.js is started with the `--inspect` flag so that debugging is turned on.


Then point your browser to [http://localhost:8080/graphiql](http://localhost:8080/graphiql). You should now be able to perform queries and mutations as defined in the sections below.

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
