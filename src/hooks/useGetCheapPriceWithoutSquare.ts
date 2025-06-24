import { useState } from 'react'
import fetchData from '../helpers/fetchData'

declare const fbq: (event: string, action: string, params?: Record<string, any>) => void;

interface BodyI {
  propertyType: string;
  floors: number;
  dens: number;
  isHaveYard: number;
  numberOfKitchens: number;
  numberOfBathrooms: number;
  numberOfBedrooms: number;
  fullName: string;
  unit: string;
  promoCode: string;
}

const useGetCheapPriceWithoutSquare = () => {
  const [data, setData] = useState<any>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetch = async (body: BodyI, track = false) => {
    setLoading(true);
    
    const response = await fetchData('guest/cheap/order/price', 'POST', body, 'en', 'https://app.monoclean.ca/api/');
    // const response = {
    //   code: 200,
    //   order: {
    //     bonus_fund_fee: 0.81, 
    //     cleaner_payment: 64.53,
    //     estimated_time: 176,
    //     facilitator_fee: 16.94,
    //     tax_amount: 10.7,
    //     total_price: 92.98,
    //   }
    // };
    if (response?.code >= 400) {
      setErrors(response.errors || ['errors_general']);
    } else {
      const totalPrice = (response.order.total_price - response.order.tax_amount) / 0.8;

      setData({...response.order, total_price: totalPrice});
      if (track) {
        fbq('track', 'InitiateCheckout checkout test', {
          value: response.order.total_price,
          currency: 'CAD',
        });
        fbq('trackCustom', 'GetEstimate checkout test', {
          propertyType: body.propertyType,
          bedrooms: body.numberOfBedrooms,
          bathrooms: body.numberOfBathrooms,
          floors: body.floors,
          dens: body.dens,
          fullName: body.fullName,
          estimatedPrice: response.order.total_price,
        });
      }
    }

    setLoading(false);
  }

  return { fetch, data, errors, setErrors, loading };
}


export default useGetCheapPriceWithoutSquare;
