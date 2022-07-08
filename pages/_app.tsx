import '../styles/globals.scss';
import 'tailwindcss/tailwind.css';
import { Provider } from 'next-auth/client';
import type { AppProps } from 'next/app';
import Layout from 'components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HelpersWords } from 'nx-packages/packages/open-ai-helpers/src';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Provider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastContainer />
    </Provider>
  );
}

export default MyApp;
