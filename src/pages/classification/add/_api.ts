import { request } from 'umi';

export async function fakeSubmitForm(params: any) {
  return request('/api/advancedForm', {
    method: 'POST',
    data: params,
  });
}
export async function onSave(params: any) {
  return request('/api/km/category/save', {
    method: 'POST',
    data: params,
  })
}
// /km/upload/file
