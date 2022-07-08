import { gql } from 'graphql-request';
import { hashPassword } from 'utils/auth';
import { graphQLClient } from 'utils/graphqlClient';

const GetUserByEmail = gql`
  query GetUserByEmail($email: String!) {
    existingUser: nextUser(where: { email: $email }) {
      id
      password
      name
    }
  }
`;

const CreateNextUserByEmail = gql`
  mutation CreateNextUserByEmail($email: String!, $password: String!) {
    newUser: createNextUser(data: { email: $email, password: $password }) {
      id
    }
  }
`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const { email, password } = req.body;

  if (!email || !email.includes('@')) {
    res.status(422).json({ message: 'Invalid email' });
    return;
  }

  if (!password || password.trim().length < 7) {
    res.status(422).json({
      message: 'Invalid input - password should be at least 7 characters long.',
    });
    return;
  }

  const { existingUser } = await graphQLClient.request(GetUserByEmail, {
    email,
  });

  if (existingUser) {
    return res.status(409).json({ message: 'Try another email' });
  }

  const hashedPassword = await hashPassword(password);

  const { newUser } = await graphQLClient.request(CreateNextUserByEmail, {
    email,
    password: hashedPassword,
  });

  if (!newUser) {
    res.status(422).json({
      message: 'Something went wrong creating the account.',
    });
    return;
  }

  res.status(201).json({ message: 'Created user' });
}
