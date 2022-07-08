import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { gql } from 'graphql-request';
import { verifyPassword } from 'utils/auth';
import { graphQLClient } from 'utils/graphqlClient';

export const GetUserByEmail = gql`
  query GetUserByEmail($email: String!) {
    user: nextUser(where: { email: $email }, stage: DRAFT) {
      id
      password
      name
    }
  }
`;

export const CreateNextUserByEmail = gql`
  mutation CreateNextUserByEmail($email: String!, $password: String!) {
    newUser: createNextUser(data: { email: $email, password: $password }) {
      id
    }
  }
`;

export default NextAuth({
  session: {
    jwt: true,
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    session: async (session, user) => {
      session.userId = user.sub;
      return Promise.resolve(session);
    },
  },
  providers: [
    Providers.Credentials({
      name: 'Email & Password',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'jamie@graphcms.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      authorize: async ({ email, password }: any) => {
        const { user } = await graphQLClient.request(GetUserByEmail, {
          email,
        });

        // tranhuuphu1212@gmail.com
        // pass123QWE

        if (!user || !user.password) {
          throw new Error('User not found');
        }
        await verifyPassword(user.password, password);

        return {
          id: user.id,
          name: user.name || '',
          email,
        };
      },
    }),
  ],
});
