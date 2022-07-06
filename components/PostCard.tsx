import React from 'react';
import moment from 'moment';
import Link from 'next/link';

interface IProps {
  post: any;
}

const PostCard: React.FC<IProps> = ({ post }) => (
  <article className="flex flex-col shadow my-4">
    <div className="relative overflow-hidden shadow-md mb-6">
      <img src={post.featuredImage?.url} className="object-top w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg" />
    </div>
    <div className="bg-white flex flex-col justify-start p-6">
      <code className="text-blue-700 text-sm font-bold uppercase pb-4">{post.tags?.map((tag: any) => `#${tag.name} `)}</code>
      <Link href={`/post/${post.slug}`}>
        <a className="text-3xl font-bold hover:text-gray-700 pb-4">{post.title}</a>
      </Link>
      <p className="text-sm pb-3">
        By <span className="font-semibold hover:text-gray-800">{post.author?.name}</span>, Published on{' '}
        {moment(post.createdAt).format('MMM DD, YYYY')}
      </p>
      <p className="pb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus quis porta dui. Ut eu iaculis massa. Sed ornare ligula lacus, quis iaculis
        dui porta volutpat. In sit amet posuere magna..
      </p>
      <Link href={`/post/${post.slug}`}>
        <span className="w-max bg-slate-300 rounded-lg p-3 text-black flex cursor-pointer">
          Continue Reading &nbsp;
          <svg
            className="svg-inline--fa fa-arrow-right w-2"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="arrow-right"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            data-fa-i2svg
          >
            <path
              fill="currentColor"
              d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
            />
          </svg>
        </span>
      </Link>
    </div>
  </article>
);

export default PostCard;
