// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取产品列表 GET /api/products */
export async function queryTableDataApi(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.ProductListItem>('/api/km/product/page/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
/** 删除产品 POST /api/peoducts/del */
export async function delTableDataApi(
  // 产品 ID 数组
  ids: string[],
) {
  return request('/api/km/product/delete', {
    method: 'POST',
    data: ids,
  });
}
export async function publishApi(id: string, isPublish: boolean) {
  return request(`/api/km/product/publish/${id}/${isPublish ? '01' : '02'}`, { method: 'POST' });
}
export async function setTopApi(id: string, isTop: boolean) {
  return request(`/api/km/product/top/${id}/${isTop ? '1' : '0'}`);
}
