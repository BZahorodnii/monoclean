const getMetaStrings = (data: any) => {
  return data?.reduce((acc: any, item: any) => {
    acc[item.name] = { title: item.translation.meta_title, description: item.translation.meta_description };
    return acc;
  }, {});
};

export default getMetaStrings;
