import { useState } from 'react'
import fetchData from '../helpers/fetchData'

const useGetBlogPost = () => {
  const [data, setData] = useState<any>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetch = async (slug: string, lang?: string) => {
    setLoading(true);
    
    const response = await fetchData(`blogs/list?slug=${slug}`, 'GET', null, lang);

    if (response?.code >= 400) {
      setErrors(response.errors || ['errors_general']);
    } else {
      setData(response.items[0]);
    }

    setLoading(false);
  }

  return { fetch, data, errors, setErrors, loading };
}


export default useGetBlogPost;
