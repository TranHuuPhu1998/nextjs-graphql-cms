import { useEffect } from 'react';
import Credentials from 'components/Credentials';
import Router from 'next/router';
import { providers, csrfToken, useSession } from 'next-auth/client';

const Login = ({ providers, csrfToken }) => {
  const [session, _] = useSession();

  useEffect(() => {
    if (session) Router.push('/');
  }, [session]);

  return (
    <div className="bg-gray-50 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign In</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Welcome back!</p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Credentials providers={providers} csrfToken={csrfToken} />
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      providers: await providers(),
      csrfToken: await csrfToken(context),
    },
  };
}

export default Login;
