import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPH_CMS_ENDPOINT;

export const getListPost = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          cursor
          node {
            id
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              id
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI as string, query);

  return result.postsConnection.edges;
};
