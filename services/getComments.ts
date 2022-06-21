import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPH_CMS_ENDPOINT;

export const getComments = async (slug: string = '') => {
  const query = gql`
    query GetComments($slug: String!) {
      comments(where: { posts_every: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;

  const result = await request(graphqlAPI as string, query, { slug });

  return result.comments || [];
};
