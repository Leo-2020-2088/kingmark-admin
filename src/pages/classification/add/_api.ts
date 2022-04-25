import { request } from 'umi';

export async function onSave(params: any) {
  const { img, ...rest }: any = params;
  const imgurl = img[0].response.data;
  return request('/api/km/category/save', {
    method: 'POST',
    data: { ...rest, img: imgurl },
  });
}
