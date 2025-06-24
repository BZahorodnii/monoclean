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

const useCreateCheapPaymentIntent = () => {
  const [isOk, setIsOk] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetch = async (body: BodyI) => {
    setLoading(true);
    
    const response = await fetchData('guest/cheap/create/intent', 'POST', body, 'en', 'https://app.monoclean.ca/api/');

    if (response?.code >= 400) {
      setErrors(response.errors || ['errors_general']);
    } else {
      console.log('useCreateCheapPaymentIntent', response);
      setIsOk(true);
    }

    setLoading(false);
  }

  return { fetch, isOk, setIsOk, errors, setErrors, loading };
}


export default useCreateCheapPaymentIntent;
