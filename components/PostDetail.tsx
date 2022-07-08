import React, { ReactElement } from 'react';
import moment from 'moment';
import { PostDetailQuery } from 'interface/PostDetail';
import Highlight, { defaultProps } from 'prism-react-renderer';
import ReactDOMServer from 'react-dom/server';
import { RichText } from '@graphcms/rich-text-react-renderer';
import Image from 'next/image';
import theme from 'prism-react-renderer/themes/nightOwl';

const PostDetail: React.FC<PostDetailQuery> = ({ post }) => {
  return (
    <>
      <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
        <div className="relative overflow-hidden shadow-md mb-6">
          <img src={post.featuredImage.url} alt="" className="object-top h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg" />
        </div>
        <div className="px-4 lg:px-0">
          <div className="flex items-center mb-8 w-full">
            <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8">
              <img alt={post.author.name} height="30px" width="30px" className="align-middle rounded-full" src={post.author.photo.url} />
              <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">{post.author.name}</p>
            </div>
            <div className="font-medium text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline mr-2 text-pink-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="align-middle">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
            </div>
          </div>
          <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
          <RichText
            content={post.content.raw}
            renderers={{
              h4: ({ children }) => <h4 style={{ fontSize: '0.8rem' }}>{children}</h4>,
              h3: ({ children }) => <h3 style={{ fontSize: '1rem' }}>{children}</h3>,
              h2: ({ children }) => <h2 style={{ fontSize: '1.5rem' }}>{children}</h2>,
              h1: ({ children }) => <h1 style={{ fontSize: '2rem' }}>{children}</h1>,
              p: ({ children }) => {
                if (ReactDOMServer.renderToString(children as ReactElement<string>).length === 0) {
                  return <br />;
                }
                return <p style={{ marginBottom: '1rem' }}>{children}</p>;
              },
              code_block: ({ children }) => {
                return (
                  <Highlight
                    {...defaultProps}
                    theme={theme}
                    code={ReactDOMServer.renderToString(children as ReactElement<string>)}
                    language="javascript"
                  >
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                      <pre className={className} style={style}>
                        {tokens.map((line, i) => (
                          <div {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                              <span {...getTokenProps({ token, key })} />
                            ))}
                          </div>
                        ))}
                      </pre>
                    )}
                  </Highlight>
                );
              },
              img: ({ src, altText, height, width }) => <Image src={src as string} alt={altText} height={height} width={width} objectFit="cover" />,
              a: ({ children, href, title }) => {
                const regex = /.png|.jpg/g; // the "global" flag is set

                if (href && regex.test(href)) {
                  return <img src={href} height="100%" alt={title} />;
                }
                return (
                  <a className="text-blue-400 underline" href={href}>
                    {children}
                  </a>
                );
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default PostDetail;
