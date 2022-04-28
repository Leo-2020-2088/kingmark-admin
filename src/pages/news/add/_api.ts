import { request } from 'umi';

export async function onSave(params: any) {
  console.log(4, params);
  return request('/api/km/news/save', {
    method: 'POST',
    data: params,
  });
}
// /km/upload/file
