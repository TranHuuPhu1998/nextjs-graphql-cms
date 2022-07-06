import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPH_CMS_ENDPOINT;

export const getSimilarPosts = async (categories: any, slug: any) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories } } }, last: 3) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
        excerpt
      }
    }
  `;
  const result = await request(graphqlAPI as string, query, {
    slug,
    categories,
  });

  return result.posts;
};
