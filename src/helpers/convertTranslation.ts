const convertTranslation = (data: any) => {
  if (!data) return;
  
  return data?.reduce((acc: any, item: any) => {
    acc[item.name] = item.translation.name || item.translation.content;
    return acc;
  }, {});
};

export default convertTranslation;
