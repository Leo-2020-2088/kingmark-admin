import { request } from 'umi';

export async function fetchDataById(id: string) {
  return request(`/api/km/category/${id}`, {
    method: 'GET',
  });
}

export async function onSave(params: any) {
  const { img, ...rest }: any = params;
  const imgurl = img ? img[0].response?.data || img[0].url : '';
  return request('/api/km/product/update', {
    method: 'POST',
    data: { ...rest, img: imgurl },
  });
}
