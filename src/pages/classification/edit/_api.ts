import { request } from 'umi';

export async function fetchDataById(id: string) {
  return request(`/api/km/category/${id}`, {
    method: 'GET',
  });
}
