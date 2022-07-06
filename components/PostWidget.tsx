import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getRecentPosts } from '../services/getRecentPosts';
import { getSimilarPosts } from '../services/getSimilarPosts';

interface IProps {
  categories?: any;
  slug?: string;
}

const PostWidget: React.FC<IProps> = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        setRelatedPosts(result);
      });
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
      });
    }
  }, [slug]);

  // const SampleNextArrow = (props: any) => {
  //   const { className, style, onClick } = props;
  //   return <div className={className} style={{ ...style, background: 'green', borderRadius: '10px' }} onClick={onClick} />;
  // };

  // const SamplePrevArrow = (props: any) => {
  //   const { className, style, onClick } = props;
  //   return <div className={className} style={{ ...style, background: 'green', borderRadius: '10px' }} onClick={onClick} />;
  // };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    autoplay: true,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 relative">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">{slug ? 'Related Posts' : 'Recent Posts'}</h3>
      <Slider {...settings}>
        {relatedPosts.map((post: any, index: number) => (
          <div key={index} className="border border-cyan-400 w-full h-72 p-2">
            <div className="flex">
              <Image alt={post.title} height="300px" width="600px" unoptimized className="align-middle" src={post.featuredImage.url} />
            </div>
            <div className="flex-grow">
              <p className="text-gray-500 font-xs">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
              <Link href={`/post/${post.slug}`} key={index}>
                <a className="text-md text-blue-400">{post.title}</a>
              </Link>
              <p className="text-gray-500 font-xs">{post.excerpt.length > 50 ? `${post.excerpt.slice(0, 50)}...` : post.excerpt}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PostWidget;
