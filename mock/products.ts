// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import moment from 'moment';
import { parse } from 'url';

// mock tableListDataSource
const genList = (current: number, pageSize: number) => {
  const tableListDataSource: API.ProductListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      index: index,
      isTop: i % 6 === 0,
      img: 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      classification: '分类1/分类11',
      nameCn: `产品名称${i}`,
      nameEn: `pro${i}`,
      status: '01',
      updatedAt: moment().format('YYYY-MM-DD'),
      createdAt: moment().format('YYYY-MM-DD'),
      id: `procode${index}`,
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};
let tableListDataSource = genList(1, 100);

function getProducts(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query as unknown as API.PageParams &
  API.ProductListItem & {
    sorter: any;
    filter: any;
  };
  let dataSource = [...tableListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  if (params.sorter) {
    const sorter = JSON.parse(params.sorter);
    dataSource = dataSource.sort((prev, next) => {
      let sortNumber = 0;
      Object.keys(sorter).forEach((key) => {
        if (sorter[key] === 'descend') {
          if (prev[key] - next[key] > 0) {
            sortNumber += -1;
          } else {
            sortNumber += 1;
          }
          return;
        }
        if (prev[key] - next[key] > 0) {
          sortNumber += 1;
        } else {
          sortNumber += -1;
        }
      });
      return sortNumber;
    });
  }
  if (params.filter) {
    const filter = JSON.parse(params.filter as any) as {
      [key: string]: string[];
    };
    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return Object.keys(filter).some((key) => {
          if (!filter[key]) {
            return true;
          }
          if (filter[key].includes(`${item[key]}`)) {
            return true;
          }
          return false;
        });
      });
    }
  }
  // if (params.name) {
  //   dataSource = dataSource.filter((data) => data?.name?.includes(params.name || ''));
  // }
  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.current}`, 10) || 1,
  };
  return res.json(result);
}

function delProducts(req: Request, res: Response, u: string) {
  const {ids} = req.body as {ids: string[]}
  tableListDataSource = tableListDataSource.filter((item: API.ProductListItem) => !ids.includes(item.id))
  const result = {
    success: true,
    msg: '',
  };
  return res.json(result);
}
export default {
  'GET /api/products': getProducts,
  'DELETE /api/products/del': delProducts,
};
