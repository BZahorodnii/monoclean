import { useState } from 'react'
import fetchData from '../helpers/fetchData'

declare const fbq: (event: string, action: string, params?: Record<string, any>) => void;

interface BodyI {
  propertyType: string;
  square: number;
  floors: number;
  dens: number;
  isHaveYard: number;
  numberOfKitchens: number;
  numberOfBathrooms: number;
  numberOfBedrooms: number;
  unit: string;
  promoCode: string;
}

const useGetPrice = () => {
  const [data, setData] = useState<any>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetch = async (body: BodyI, track = true) => {
    setLoading(true);
    
    const response = await fetchData(`order/get/price`, 'POST', body, 'en', 'https://app.monoclean.ca/api/');

    if (response?.code >= 400) {
      setErrors(response.errors || ['errors_general']);
    } else {
      let totalPrice = 0;
      if (body.promoCode.toLowerCase() === 'toronto40streak') {
        totalPrice = (response.order.total_price * 0.87) / 0.6;
      } else if (body.promoCode.toLowerCase() === 'leilovesit') {
        totalPrice = response.order.total_price / 0.8;
      } else {
        totalPrice = response.order.total_price;
      }
      setData({...response.order, total_price: totalPrice});
      if (track) {
        fbq('track', body.promoCode.toLowerCase() === 'toronto40streak' ? 'InitiateCheckout 40streak' : 'InitiateCheckout', {
          value: response.order.total_price,
          currency: 'CAD',
        });
        fbq('trackCustom', body.promoCode.toLowerCase() === 'toronto40streak' ? 'GetEstimate 40streak' : 'GetEstimate', {
          propertyType: body.propertyType,
          bedrooms: body.numberOfBedrooms,
          bathrooms: body.numberOfBathrooms,
          square: body.square,
          floors: body.floors,
          dens: body.dens,
          estimatedPrice: response.order.total_price,
        });
      }
    }

    setLoading(false);
  }

  return { fetch, data, errors, setErrors, loading };
}


export default useGetPrice;
