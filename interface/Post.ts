export interface PostQueryInterface {
  node: {
    id: string;
    createdAt: string;
    slug: string;
    title: string;
    excerpt: string;
    featuredImage: {
      url: string;
    };
    author: {
      bio: string;
      name: string;
      id: string;
      photo: {
        url: string;
      };
    };
    categories: {
      id: string;
      name: string;
      slug: string;
    };
  };
}
