import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { execute, subscribe } from 'graphql';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { rootResolver } from './data/resolvers';
import schema from './data/schema';

export function createApp() {
    // Create Express App
    const app = express();

    // Add middleware to enable CORS
    app.use(cors());

    // Add GraphQL server at /graphql
    const executableSchema = makeExecutableSchema({
        typeDefs: schema,
        resolvers: rootResolver
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
    const port = process.env.SERVER_PORT;
    app.use(
        '/graphiql',
        graphiqlExpress({
            endpointURL: '/graphql',
            subscriptionsEndpoint: `ws://localhost:${port}/subscriptions`
        })
    );

    return app;
}

export function createSubscriptionServer(server) {
    return new SubscriptionServer(
        {
            execute,
            subscribe,
            schema
        },
        {
            server: server,
            path: '/subscriptions'
        }
    );
}
