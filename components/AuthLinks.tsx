import { Fragment } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/client';
import Loading from './Loading';

export default function AuthLinks() {
  const [session, loading] = useSession();
  if (loading) {
    return <Loading />;
  }
  return (
    <Fragment>
      {session ? (
        <button
          onClick={signOut as any}
          className="mx-2 relative inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
        >
          Logout
        </button>
      ) : (
        <div className="space-x-1.5 mx-2">
          <Link href="/login">
            <a className="relative inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500">
              Sign in
            </a>
          </Link>
          <Link href="/register">
            <a className="relative inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500">
              Sign up
            </a>
          </Link>
        </div>
      )}
    </Fragment>
  );
}
