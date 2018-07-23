/**
 * We should explore options to organize GraphQL defs, queries and mutations:
 *
 * https://github.com/nicolasdao/schemaglue
 * https://github.com/mykhailo-riabokon/express_graphql_folder_structure
 */

import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
    type User {
        id: String,
        firstName: String,
        lastName: String,
        emails: [String]
    }

    type Query {
        users: [User]
        user(id: String): User
    }
`

export default makeExecutableSchema({ typeDefs, resolvers });