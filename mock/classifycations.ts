// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import { parse } from 'url';

// mock tableListDataSource current: number, pageSize: number
const genList = () => {
  const tableListDataSource: API.ClassificationListItem[] = [
    {
      index: 0,
      img: 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      nameCn: '服装',
      nameEn: 'cloth',
      createdAt: '2022-03-22',
      updatedAt: '2022-04-28',
      id: 'id09944545',
      pid: '',
      level: 1,
      children: [
        {
          index: 0,
          img: 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
          nameCn: '裤子',
          nameEn: 'pants',
          createdAt: '2022-03-22',
          updatedAt: '2022-04-28',
          id: 'id0099988',
          pid: 'id09944545',
          level: 2,
          children: [
            {
              index: 0,
              img: 'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
              nameCn: '短裤',
              nameEn: 'pants',
              createdAt: '2022-03-22',
              updatedAt: '2022-04-28',
              id: 'id8945457',
              pid: 'id0099988',
              level: 3,
            },
          ],
        },
      ],
    }
  ];
  return tableListDataSource;
};
let tableListDataSource = genList();

function getClassifications(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query as unknown as API.PageParams &
  API.ClassificationListItem & {
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

function delClassifications(req: Request, res: Response, u: string) {
  const {ids} = req.body as {ids: string[]}
  tableListDataSource = tableListDataSource.filter((item: API.ClassificationListItem) => !ids.includes(item.id))
  const result = {
    success: true,
  };
  return res.json(result);
}
export default {
  'GET /api/classifications': getClassifications,
  'DELETE /api/classification/del': delClassifications,
};
