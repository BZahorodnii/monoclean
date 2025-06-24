import { useState } from 'react'
import fetchData from '../helpers/fetchData'

const useGetDocuments = () => {
  const [data, setData] = useState<any>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetch = async (lang?: string) => {
    setLoading(true);
    
    const response = await fetchData(`document/list`, 'GET', null, lang, 'https://app.monoclean.ca/api/');

    if (response?.code >= 400) {
      setErrors(response.errors || ['errors_general']);
    } else {
      setData(response.items);
    }

    setLoading(false);
  }

  return { fetch, data, errors, setErrors, loading };
}


export default useGetDocuments;
