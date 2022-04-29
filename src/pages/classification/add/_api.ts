import { request } from 'umi';

export async function onSave(params: any) {
  return request('/api/km/category/save', {
    method: 'POST',
    data: params,
  });
}
