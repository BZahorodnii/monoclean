async function fetchData(url: string, method: 'GET' | 'POST' | 'PUT' = 'GET', body: any = null, lang?: string, baseUrl: string = process.env.NEXT_PUBLIC_API_URL || 'https://monoclean.ca/api/'): Promise<any> {
  const BASE_URL = baseUrl;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept-Language': lang || 'en',
  };

  const config: RequestInit = {
    method: method,
    headers: headers,
  };

  if (body && (method === 'POST' || method === 'PUT')) {
    config.body = JSON.stringify(body);
  }

  // const response = await fetch(`${BASE_URL}${url}`, config);

  // return await response.json();

  try {
    const response = await fetch(`${BASE_URL}${url}`, config);

    // Check if the response was successful
    if (!response.ok) {
      const errorResponse = await response.json(); // Assumption that error details are always in JSON format
      const errors = errorResponse.errors || ['errors.default']; // Default error if none provided
      throw {
        code: response.status,
        errors: errors,
      };
    }

    return response.json();
  } catch (err: any) {
    if (err.code) {
      return {
        code: err.code,
        errors: err.errors
      };
    } else {
      return {
        code: 500,
        errors: ['Internal server error']
      };
    }
  }

}

export default fetchData;
