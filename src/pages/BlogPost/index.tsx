import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Image from '../../components/Image'
import useGetBlogPost from '../../hooks/useGetBlogPost'
import { useAppContext } from '../../components/context/AppContext'
import styles from './blogPost.module.css'
import classnames from 'classnames'
import { Helmet } from 'react-helmet'

const BlogPost: React.FC = () => {
  const params = useParams();
  const { slug } = params;
  const { fetch: blogPostFetch, data: blogPostData, errors } = useGetBlogPost();
  const { data, setData } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (errors.length) {
      navigate('/not-found', { replace: true });
    }
  }, [errors]);

  useEffect(() => {
    if (slug) {
      blogPostFetch(slug!, params.lang || 'en');
    }
  }, [slug, params]);

  useEffect(() => {
    if (blogPostData?.translation?.title) {
      setData({ ...data, blogSlug: blogPostData?.translation?.title });
    }
  }, [blogPostData]);
  
  if (!blogPostData) return null;
  const capitalizeFirstLetter = (str: string) => {
    if (!str) return str;

    return str[0].toUpperCase() + str.slice(1);
  }

  const content = blogPostData.translation?.content;
  const date = new Date(blogPostData?.created_at?.date);
  const formatter = new Intl.DateTimeFormat(params.lang || 'en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  
  const parts = formatter.formatToParts(date);
  const formattedDate = parts.map(({ type, value }) => {
    switch (type) {
      case 'month':
        return `${capitalizeFirstLetter(value)},`;
      default:
        return value;
    }
  }).join('');

  return (
    <>
      <Helmet>
        <title>{blogPostData?.translation?.meta_title}</title>
        <meta name="description" content={blogPostData?.translation?.meta_description} />
        <meta name="og:title" content={blogPostData?.translation?.meta_title} />
        <meta name="og:description" content={blogPostData?.translation?.meta_description} />
      </Helmet>
      <div className={styles.postContainer}>
        <div className={classnames('h2', styles.title)}>{blogPostData?.translation?.title}</div>
        <div className={classnames('textL-400', styles.text)}>{blogPostData?.translation?.short_description}</div>
        <div className={classnames('textM-500', styles.date)}>
          <Image
            src="/icons/calendar.svg"
            alt="Calendar Icon"
            width={24}
            height={24}
          />
          {formattedDate}
        </div>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </>
  )
}

export default BlogPost;
