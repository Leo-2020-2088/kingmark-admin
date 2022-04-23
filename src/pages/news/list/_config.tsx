import type { ProColumns } from '@ant-design/pro-table';
import { Popconfirm, Switch, message } from 'antd';
import { ReactNode } from 'react';
import { history, Link } from 'umi';
import { delTableDataApi } from './_api';
export const handleRemove = async (ids: string[], actionRef: any) => {
  try {
    const res = await delTableDataApi(ids);
    if (res.success) {
      actionRef?.current?.reload();
      message.success('删除成功！');
      return;
    }
    throw new Error(res.message);
  } catch (error: any) {
    message.error(error.message);
  }
};
export const setTableColumns = (actionRef: any): ProColumns<API.NewsListItem>[] => {
  return [
    {
      title: '新闻标题',
      dataIndex: 'nameCn',
      render: (_, row: API.NewsListItem) => {
        const { nameCn, nameEn } = row;
        return `${nameCn}/${nameEn}`;
      },
    },
    {
      title: '封面图',
      dataIndex: 'img',
      key: 'image',
      hideInSearch: true,
      valueType: 'image',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (dom: ReactNode, record: API.ProductListItem) => {
        function onChange(checked: boolean) {
          console.log(`${record.nameCn} ${checked}`);
        }
        return (
          <Switch
            checkedChildren="发布"
            defaultChecked={dom === '01'}
            unCheckedChildren="撤回"
            onChange={onChange}
          />
        );
      },
    },
    {
      title: '创建时间',
      hideInSearch: true,
      dataIndex: 'createdAt',
    },
    {
      title: '更新时间',
      hideInSearch: true,
      dataIndex: 'updatedAt',
    },
    {
      title: '操作',
      hideInSearch: true,
      dataIndex: 'id',
      render: (_, record: API.NewsListItem) => {
        const { id } = record;
        return (
          <>
            <Link className="space-plus" to={`/news/edit/${id}`}>
              编辑
            </Link>
            <Popconfirm
              className="space-plus"
              key="popconfirm"
              title="确认删除吗？"
              onConfirm={() => handleRemove([id], actionRef)}
              okText="是"
              cancelText="否"
            >
              <a>删除</a>
            </Popconfirm>
          </>
        );
      },
    },
  ];
};
export const handleAdd = () => {
  history.push('/news/add');
};
