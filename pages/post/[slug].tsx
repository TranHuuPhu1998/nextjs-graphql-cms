import React from 'react';
import { PostDetail, Author, Comments, CommentsForm, Loader } from '../../components';
import { getPosts } from '../../services';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getPostDetails } from '../../services/getDetailPost';
import { PostDetailQuery } from '../../interface/PostDetail';
import { useRouter } from 'next/router';

const PostDetails: React.FC<PostDetailQuery> = ({ post }) => {
  const router = useRouter();

  if (router.isFallback || !post) {
    return <Loader />;
  }
  return (
    <>
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-12">
            <PostDetail post={post} />
            <Author author={post.author} />
            <CommentsForm slug={post.slug} />
            <Comments slug={post.slug} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetails;

// Fetch data at build time
export const getStaticProps: GetStaticProps<{ post: PostDetailQuery }> = async ({ params }) => {
  const data = await getPostDetails(params?.slug as string);
  return {
    props: {
      post: data,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10,
  };
};

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }: any) => ({ params: { slug } })),
    fallback: true,
  };
};
