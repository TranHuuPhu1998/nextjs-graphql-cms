import { gql } from 'graphql-request';
import { graphQLClient } from 'utils/graphqlClient';

export default async function asyncHandler(req: Request | any, res: Response | any) {
  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: { name: $name, email: $email, comment: $comment, posts: { connect: { slug: $slug } } }) {
        id
      }
    }
  `;

  try {
    const result = await graphQLClient.request(query, {
      name: req.body.name,
      email: req.body.email,
      comment: req.body.comment,
      slug: req.body.slug,
    });

    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}
