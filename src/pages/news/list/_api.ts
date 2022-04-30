// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取产品列表 GET /api/classification */
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
  return request<API.NewsListItem>('/api/km/news/page/list', {
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
  return request(`/api/km/news/delete`, {
    method: 'post',
    data: ids,
  });
}
