import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import resolverMap from './data/resolvers';
import schema from './data/schema';

export default function createApp() {
    // Create Express App
    const app = express();

    // Add middleware to enable CORS
    app.use(cors());

    // Add GraphQL server at /graphql
    const executableSchema = makeExecutableSchema({
        typeDefs: schema,
        resolvers: resolverMap
    });

    app.use(
        '/graphql',
        bodyParser.json(),
        graphqlExpress({
            schema: executableSchema,
            context: {}
        })
    );

    // Add GraphiQL at /graphiql
    app.use(
        '/graphiql',
        graphiqlExpress({
            endpointURL: '/graphql'
        })
    );

    return app;
}
