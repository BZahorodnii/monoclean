import { useState } from 'react'
import fetchData from '../helpers/fetchData'

interface FormDataI {
  full_name?: string;
  area_of_service?: Array<string>;
  email?: string;
  phone_number?: string;
  experience_level?: string;
}

const useSendForm = () => {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetch = async (name: 'waitlist' | 'partnerWithUs' | 'becomeCleaner' | 'contactUs', formData: FormDataI) => {
    setLoading(true);

    const payload = {
      name,      
      formData,
    }
    
    const response = await fetchData('form/create', 'POST', payload);

    if (response?.code >= 400) {
      setErrors(response.errors || ['errors_general']);
    } else {
      setData(response?.data);
    }

    setLoading(false);
  }

  return { fetch, data, setData, errors, setErrors, loading };
}


export default useSendForm;
