'use strict';

// This has to go first due to the way NodeJS imports
import './env';

import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './graphql/schema';

const PORT = process.env.NODEJS_PORT;
const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.get('/', (req, res) => res.send('Welcome to jointly'));

app.listen(PORT, () => console.log(`Running on port ${PORT}`));