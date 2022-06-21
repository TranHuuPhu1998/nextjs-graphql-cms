import Categories from "../components/Categories";
import PostCard from "../components/PostCard";
import PostWidget from "../components/PostWidget";
import { getListPost } from "../services/getListPost";
import { PostQueryInterface } from "../interface/Post";
import { GetStaticProps } from "next/types";

interface IProps {
  posts: PostQueryInterface[];
}

const Home: React.FC<IProps> = ({ posts }) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts?.map((post, index: number) => (
            <PostCard key={index} post={post.node} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

// Fetch data at build time
export const getStaticProps: GetStaticProps<IProps> = async () => {
  const posts = (await getListPost()) || [];
  return {
    props: { posts },
  };
};

export default Home;
