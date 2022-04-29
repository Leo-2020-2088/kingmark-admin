import { request } from 'umi';

export async function fetchDataById(id: string) {
  return request(`/api/km/category/${id}`, {
    method: 'GET',
  });
}

export async function onSave(params: any) {
  return request('/api/km/product/update', {
    method: 'POST',
    data: params,
  });
}
