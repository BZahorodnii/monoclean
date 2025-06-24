import { useState } from 'react'
import fetchData from '../helpers/fetchData'

const useValidateCoupon = () => {
  const [data, setData] = useState<any>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetch = async (promoCode: string) => {
    setLoading(true);
    

    if (promoCode?.toLowerCase() === 'toronto40streak') {
      const data = {
        code: "TORONTO40STREAK",
        createdAt: "2025-04-14T12:53:00-04:00",
        discountValue: 40,
        id: 2,
        isGlobal: true,
        maxAmount: null,
        type: "percent",
        updatedAt: "2025-04-14T12:53:00-04:00",
        usageCount: 0,
        usageLimit: null,
        validFrom: null,
        validTo: null,
      }

      setData(data);
      setLoading(false);
      return;
    }

    if (promoCode?.toLowerCase() === 'leilovesit') {
      const data = {
        code: "leilovesit",
        createdAt: "2025-04-14T12:53:00-04:00",
        discountValue: 25,
        id: 3,
        isGlobal: true,
        maxAmount: null,
        type: "percent",
        updatedAt: "2025-04-14T12:53:00-04:00",
        usageCount: 0,
        usageLimit: null,
        validFrom: null,
        validTo: null,
      }

      setData(data);
      setLoading(false);
      return;
    }

    const response = await fetchData(`promo/validate/${promoCode}`, 'GET', null, 'en', 'https://app.monoclean.ca/api/');

    if (response?.code >= 400) {
      setData(null);
      setErrors(response.errors || ['errors_general']);
    } else {
      setData(response.data);
      localStorage.setItem('promo', promoCode);
    }

    setLoading(false);
  }

  return { fetch, data, errors, setErrors, loading };
}


export default useValidateCoupon;
