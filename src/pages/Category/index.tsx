import React, { useEffect } from 'react'
import Image from '../../components/Image'
import { Link, useNavigate, useParams } from 'react-router-dom'
import classnames from 'classnames'
import { BlogPostI, CategoryI } from '../../types/blog'
import { useAppContext } from '../../components/context/AppContext'
import convertTranslation from '../../helpers/convertTranslation'
import { Helmet } from 'react-helmet'
import styles from './category.module.css'
import useGetBlogPostBySlug from '../../hooks/useGetBlogPostBySlug'

const Category: React.FC = () => {
  const { data: appData, setData } = useAppContext();
  const stringsTranslations = convertTranslation(appData?.strings);
  const params = useParams();
  const { fetch, data, errors } = useGetBlogPostBySlug();
  
  const url = params.lang ? `/${params.lang}` : '';

  const navigate = useNavigate();

  useEffect(() => {
    if (errors.length) {
      navigate('/not-found', { replace: true });
    }
  }, [errors]);

  useEffect(() => {
    fetch(params?.slug, params.lang || 'en');
  }, [params]);

  useEffect(() => {
    const slugName = data?.category?.translation?.name;
    
    if (slugName) {
      setData({ ...appData, blogSlug: slugName });
    }
  }, [data?.category]);

  if (!data) return null;
  
  const pageTranslations = data?.category?.translation;

  return (
    <>
      <Helmet>
        <title>{pageTranslations?.meta_title}</title>
        <meta name="description" content={pageTranslations?.meta_description} />
        <meta name="og:title" content={pageTranslations?.meta_title} />
        <meta name="og:description" content={pageTranslations?.meta_description} />
      </Helmet>
      <div className={styles.pageWrapper}>
        <div className={classnames('container', styles.header)}>
          <h1 className={classnames('h1', styles.title)}>{pageTranslations.name}</h1>
          <div className={classnames('textL-400', styles.text, styles.postContainer)}>
            <div dangerouslySetInnerHTML={{ __html: pageTranslations?.content }} /> 
          </div>
        </div>
        <div className={classnames(styles.wrapper, 'container')}>
          {data?.blogPosts.map((item: BlogPostI) => {
            const slug = item!.slug;
            const readTime = `${item.read_time} ${stringsTranslations?.minutes_read}`;
            const date = new Date(item.created_at.date);
            const title = item.translation.title;
            const text = item.translation.short_description;

            const formattedDate = new Intl.DateTimeFormat('en-GB', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            }).format(date);

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
                        <div key={`category-${i}-${category.id}`}>
                          <Link to={`${url}/blog/category/${category.slug}`} className={styles.blogpostTag}>{category.translation.name}</Link>
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

export default Category;
