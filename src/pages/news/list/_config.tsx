import ProCon from '@/components/ProCon';
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
      title: '新闻',
      dataIndex: 'name',
      width: 280,
      formItemProps: {
        label: '新闻标题',
      },
      fieldProps: {
        placeholder: '请输入新闻中文标题或中文标题',
      },
      render: (_, row: API.NewsListItem) => <ProCon {...row} />,
    },
    {
      title: '状态',
      dataIndex: 'status',
      fieldProps: {
        placeholder: '请选择新闻发布状态',
      },
      valueType: 'select',
      initialValue: '03',
      valueEnum: {
        '03': { text: '全部' },
        '01': { text: '发布' },
        '02': { text: '撤回' },
      },
      render: (dom: ReactNode, record: API.NewsListItem) => {
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
