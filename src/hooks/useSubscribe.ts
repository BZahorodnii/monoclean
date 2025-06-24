import { useState } from 'react'
import fetchData from '../helpers/fetchData'

const useSubscribe = () => {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetch = async (email: string) => {
    setLoading(true);
    
    const response = await fetchData('mail/subscribe', 'POST', { email });

    if (response?.code >= 400) {
      
      setErrors(response.errors?.[0] === 'email.duplicate' ? ['email_duplicate'] : response.errors || ['errors_general']);
    } else {
      setData(response);
    }

    setLoading(false);
  }

  return { fetch, data, errors, setErrors, loading };
}


export default useSubscribe;
