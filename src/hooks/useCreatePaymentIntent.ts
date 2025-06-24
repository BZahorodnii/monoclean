import { useState } from 'react'
import fetchData from '../helpers/fetchData'

interface BodyI {
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  propertyType: string;
  dens: number;
  date: string;
  time: string;
  frequency: string;
  address: string;
  phone: string;
  email: string;
  instructions: string;
  fullName: string;
}

const useCreatePaymentIntent = () => {
  const [data, setData] = useState<any | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetch = async (body: BodyI) => {
    setLoading(true);
    
    const response = await fetchData('guest/create/intent', 'POST', body, 'en', 'https://app.monoclean.ca/api/');

    if (response?.code >= 400) {
      setErrors(response.errors || ['errors_general']);
    } else {
      setData(response.data);
    }

    setLoading(false);
  }

  return { fetch, data, errors, setErrors, loading };
}


export default useCreatePaymentIntent;
