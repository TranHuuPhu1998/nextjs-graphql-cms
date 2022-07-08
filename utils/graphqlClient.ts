import { GraphQLClient } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPH_CMS_ENDPOINT;

export const graphQLClient = new GraphQLClient(graphqlAPI as string, {
  headers: {
    authorization: `Bearer ${process.env.GRAPHQL_CMS_TOKEN}`,
  },
});
