import React from 'react';
import { useRouter } from 'next/router';
import { getCategories } from 'services/getCategories';
import { getCategoryPost } from 'services/getCategoryPost';
import { PostCard, Loader } from 'components';
import { GetStaticPaths, GetStaticProps } from 'next';
import { PostQueryInterface } from 'interface/Post';
import { TagList } from 'components/TagList';
import { getListTags } from 'services/getListTag';

const CategoryPost: React.FC<{ posts: PostQueryInterface[]; tags: any }> = ({ posts, tags }) => {
  const router = useRouter();

  if (router.isFallback || !posts) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="col-span-1 lg:col-span-4 py-4">
          <div className="relative lg:sticky top-8 border rounded-lg	border[#cccccc] py-2">
            {tags.map((tag, index) => {
              return <TagList key={index} tags={tag.node} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPost;

// Fetch data at build time
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = await getCategoryPost(params?.slug as string);
  const tags = await getListTags();
  return {
    props: { posts, tags },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10,
  };
};

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }: { slug: string }) => ({ params: { slug } })),
    fallback: true,
  };
};
