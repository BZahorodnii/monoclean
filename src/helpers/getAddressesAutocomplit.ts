const getAddressesAutocomplit = async (query: string) => {
  // TODO: change to env variable
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  // Toronto
  const components = 'components=country:ca&location=43.6532,-79.3832&radius=50000&libraries=places';
  const response = await fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${key}&${components}`);
  const data = await response.json();

  return data.predictions;
};

export default getAddressesAutocomplit;
