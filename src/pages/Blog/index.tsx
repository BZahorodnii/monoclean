import React, { useEffect } from 'react'
import Image from '../../components/Image'
import { Link, useParams } from 'react-router-dom'
import classnames from 'classnames'
import { BlogPostI, CategoryI } from '../../types/blog'
import useGetBlogPosts from '../../hooks/useGetBlogPosts'
import { useAppContext } from '../../components/context/AppContext'
import convertTranslation from '../../helpers/convertTranslation'
import styles from './blog.module.css'
import getMetaStrings from '../../helpers/getMetaStrings'
import { Helmet } from 'react-helmet'

const Blog: React.FC = () => {
  const { fetch: blogPostsFetch, data: blogData } = useGetBlogPosts();
  const { data: appData } = useAppContext();
  const params = useParams();
  const pageTranslations = convertTranslation(appData?.pagesBlock)?.blog;
  const stringsTranslations = convertTranslation(appData?.strings);
  const metaTranslations = getMetaStrings(appData?.nav)?.blog;
  const url = params.lang ? `/${params.lang}` : '';

  useEffect(() => {
    blogPostsFetch(params.lang || 'en');
  }, [params]);

  const capitalizeFirstLetter = (str: string) => {
    if (!str) return str;

    return str[0].toUpperCase() + str.slice(1);
  }

  if (!blogData?.length) return null;

  return (
    <>
      <Helmet>
        <title>{metaTranslations?.title}</title>
        <meta name="description" content={metaTranslations?.description} />
        <meta name="og:title" content={metaTranslations?.title} />
        <meta name="og:description" content={metaTranslations?.description} />
      </Helmet>
      <div className={styles.pageWrapper}>
        <div className={classnames('container', styles.header)}>
          <h1 className={classnames('h1', styles.title)}>{pageTranslations.header_title}</h1>
          <div className={classnames('textL-400', styles.text)}>{pageTranslations.header_text}</div>
        </div>
        <div className={classnames(styles.wrapper, 'container')}>
          {blogData.map((item: BlogPostI) => {
            const slug = item!.slug;
            const readTime = `${item.read_time} ${stringsTranslations?.minutes_read}`;
            const date = new Date(item.created_at.date);
            const title = item.translation.title;
            const text = item.translation.short_description;

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
              <Link to={`${url}/blog/${slug}`} className={styles.blogItem} key={`postItem-${item.id}`}>
                <div className={styles.blogpostImg}>
                  <Image
                    src={item.main_image}
                    alt="Blog post logo"
                    width={354}
                  />
                </div>
                <div className={classnames('textS-500', styles.blogpostDate)}>
                  {`${formattedDate} • ${readTime}`}
                </div>
                <div className={classnames('h3', styles.blogpostTitle)}>{title}</div>
                <div className={classnames('textM-400', styles.blogpostText)}>{text}</div>
                {Boolean(item.categories?.length) && (
                  <div className={classnames('textS-400',  styles.blogpostTags)}>
                    {item.categories?.map((category: CategoryI, i: number) => {
                      return (
                        <div key={`blog-category-${i}-${category.id}`}>
                          <Link to={`category/${category.slug}`} className={styles.blogpostTag}>{category.translation.name}</Link>
                        </div>
                      )
                    })}
                  </div>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </>
  );
}

export default Blog;
