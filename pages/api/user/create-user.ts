import { GraphQLClient, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPH_CMS_ENDPOINT;

/** *************************************************************
 * Any file inside the folder pages/api is mapped to /api/* and  *
 * will be treated as an API endpoint instead of a page.         *
 *************************************************************** */

// export a default function for API route to work
export default async function asyncHandler(req: Request | any, res: Response | any) {
  const graphQLClient = new GraphQLClient(graphqlAPI as string, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHQL_CMS_TOKEN}`,
    },
  });

  const query = gql`
    mutation CreateNextUserByEmail($email: String!, $password: String!) {
      newUser: createNextUser(data: { email: $email, password: $password }) {
        id
      }
    }
  `;

  try {
    const result = await graphQLClient.request(query, {
      name: req.body.name,
      password: req.body.password,
    });

    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}
