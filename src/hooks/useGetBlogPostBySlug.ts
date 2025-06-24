import { useState } from 'react'
import fetchData from '../helpers/fetchData'
import { BlogPostI, CategoryI } from '../types/blog';

interface DataI {
  blogPosts: Array<BlogPostI>,
  category: CategoryI
}

const useGetBlogPostBySlug = () => {
  const [data, setData] = useState<DataI | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetch = async (slug: string | undefined, lang?: string) => {
    if (!slug) return;

    setLoading(true);
    
    const responseCategory = await fetchData(`blog-categories/list?slug=${slug}`, 'GET', null, lang);

    if (responseCategory?.code >= 400) {
      setErrors(responseCategory.errors || ['errors_general']);
      setLoading(false);
      return;
    }

    const categoryId = responseCategory?.items[0]?.id;

    const responseBlogPosts = await fetchData(`blogs/list?categoryId=${categoryId}`, 'GET', null, lang);

    if (responseBlogPosts?.code >= 400) {
      setErrors(responseBlogPosts.errors || ['errors_general']);
    } else {
      setData({ category: responseCategory.items[0], blogPosts: responseBlogPosts.items });
    }

    setLoading(false);
  }

  return { fetch, data, errors, setErrors, loading };
}


export default useGetBlogPostBySlug;
