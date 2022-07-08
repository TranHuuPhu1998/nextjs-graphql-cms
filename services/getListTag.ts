import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPH_CMS_ENDPOINT;

export const getListTags = async () => {
  const query = await gql`
    query MyQuery {
      tagsConnection {
        edges {
          node {
            name
            id
          }
          cursor
        }
      }
    }
  `;
  const result = await request(graphqlAPI as string, query);

  return result.tagsConnection.edges;
};
