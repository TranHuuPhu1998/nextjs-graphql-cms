export interface PostDetailQuery {
  post: {
    title: string;
    excerpt: string;
    featuredImage: {
      url: string;
    };
    author: {
      name: string;
      bio: string;
      photo: {
        url: string;
      };
    };
    createdAt: string;
    slug: string;
    content: {
      raw: any;
    };
    categories: {
      name: string;
      slug: string;
    }[];
  };
}
