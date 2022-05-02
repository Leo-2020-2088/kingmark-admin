import { request } from 'umi';

export async function onSave(params: any) {
  return request('/api/km/product/update', {
    method: 'POST',
    data: params,
  });
}
