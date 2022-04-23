import { request } from 'umi';

export async function onSave(params: any) {
  return request('/api/km/news/save', {
    method: 'POST',
    data: params,
  });
}
// /km/upload/file
