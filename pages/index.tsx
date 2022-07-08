import PostCard from 'components/PostCard';
import PostWidget from 'components/PostWidget';
import { getListPost } from 'services/getListPost';
import { PostQueryInterface } from 'interface/Post';
// import { GetStaticProps } from 'next/types';
import { AboutUs } from 'components/AboutUs';
import { useSession, getSession } from 'next-auth/client';
import Loading from 'components/Loading';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

interface IProps {
  posts: PostQueryInterface[];
}

const Home: React.FC<IProps> = ({ posts }) => {
  const [session, loading] = useSession();

  if (!session || loading) {
    return <Loading />;
  }

  useEffect(() => {
    if (session && session.user) {
      toast.success(`Welcome to ${session.user?.name} blog for dev`);
    }
  }, []);

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts?.map((post, index: number) => (
            <PostCard key={index} post={post.node} />
          ))}
          <PostWidget />
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative my-4 top-0">
            <AboutUs />
          </div>
        </div>
      </div>
    </div>
  );
};

// Fetch data at build time
// export const getStaticProps: GetStaticProps<IProps> = async () => {
//   const posts = (await getListPost()) || [];
//   return {
//     props: { posts },
//     // Next.js will attempt to re-generate the page:
//     // - When a request comes in
//     // - At most once every 10 seconds
//     revalidate: 10,
//   };
// };

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const posts = (await getListPost()) || [];

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { posts, session },
  };
}

export default Home;
