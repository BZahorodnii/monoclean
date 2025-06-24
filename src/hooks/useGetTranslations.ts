import { useState } from 'react'
import fetchData from '../helpers/fetchData'

const useGetTranslations = () => {
  const [data, setData] = useState<any>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetch = async (lang?: string) => {
    setLoading(true);
    
    const pagesData = await fetchData('pages/list', 'GET', null, lang);
    const pagesBlockData = await fetchData('pages/block/list', 'GET', null, lang);
    const stringsData = await fetchData('string/list', 'GET', null, lang);

    if (pagesData?.code >= 400 || pagesBlockData?.code >= 400 || stringsData?.code >= 400) {
      setErrors(pagesData.errors || pagesBlockData.errors || stringsData.errors || ['errors_general']);
    } else {
      setData({ nav: pagesData.items, pagesBlock: pagesBlockData.items, strings: stringsData.items });
    }

    setLoading(false);
  }

  return { fetch, data, errors, setErrors, loading };
}


export default useGetTranslations;
