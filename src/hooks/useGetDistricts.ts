import { useState } from 'react'
import fetchData from '../helpers/fetchData'
import { DistrictI } from '../types/areas'

const useGetDistricts = () => {
  const [data, setData] = useState<Array<DistrictI> | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetch = async (cityId: string, lang?: string) => {
    setLoading(true);
    
    const response = await fetchData(`geo/district/list?cityId=${cityId}`, 'GET', null,  lang);

    if (response?.code >= 400) {
      setErrors(response.errors || ['errors_general']);
    } else {
      setData(response.items);
    }

    setLoading(false);
  }

  return { fetch, data, errors, setErrors, loading };
}


export default useGetDistricts;
