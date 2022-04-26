import { request } from 'umi';

const formatTreoptions = (data: API.ClassificationListItem[]): any => {
  return data.map((item: API.ClassificationListItem) => {
    const { nameCn, nameEn, id, children } = item;
    return {
      label: `${nameCn}/${nameEn}`,
      value: id,
      children: children ? formatTreoptions(children) : [],
    };
  });
};

export const queryClassificationOptions = async () => {
  const res = await request('/api/km/category/tree/list', {
    method: 'GET',
  });
  const options = formatTreoptions(res.data);
  return options;
};
