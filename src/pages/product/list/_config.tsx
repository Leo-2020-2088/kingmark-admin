import { Switch, Popconfirm, message } from 'antd';
import type { ReactNode } from 'react';
import { history, Link } from 'umi';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { delTableDataApi, publishApi, setTopApi } from './_api';
import { queryClassificationOptions } from '@/services/common';
import ProCon from '@/components/ProCon';

export const handleRemove = async (ids: string[], actionRef: ActionType) => {
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
export const setTableColumns = (
  actionRef: ActionType,
): ProColumns<API.ClassificationListItem>[] => {
  return [
    // {
    //   title: '排序',
    //   dataIndex: 'index',
    //   valueType: 'indexBorder',
    //   hideInSearch: true,
    // },
    {
      title: '置顶',
      dataIndex: 'isTop',
      hideInSearch: true,
      render: (dom: any, record: API.ProductListItem) => {
        async function handleChange(checked: boolean) {
          try {
            const res = await setTopApi(record.id, checked);
            if (res.success) {
              actionRef?.current?.reload();
              message.success(`${checked ? '置顶' : '取消置顶'}成功！`);
              return;
            }
            throw new Error(`${checked ? '置顶' : '取消置顶'}失败！`);
          } catch (error: any) {
            message.error(error.message);
          }
        }
        return <Switch defaultChecked={dom === '1'} onChange={handleChange} />;
      },
    },
    {
      title: '产品',
      dataIndex: 'name',
      width: 280,
      formItemProps: {
        label: '产品名称',
      },
      fieldProps: {
        placeholder: '请输入产品中文名称或中文名称',
      },
      render: (_, row: API.ProductListItem) => <ProCon {...row} />,
    },
    {
      title: '产品分类',
      dataIndex: 'classification',
      valueType: 'treeSelect',
      fieldProps: {
        placeholder: '请选择产品分类',
      },
      request: queryClassificationOptions,
    },
    {
      title: '状态',
      dataIndex: 'status',
      fieldProps: {
        placeholder: '请选择产品状态',
      },
      valueType: 'select',
      initialValue: '03',
      valueEnum: {
        '03': { text: '全部' },
        '01': { text: '上架' },
        '02': { text: '下架' },
      },
      render: (dom: ReactNode, record: API.ProductListItem) => {
        async function handleChange(checked: boolean) {
          try {
            const res = await publishApi(record.id, checked);
            if (res.success) {
              actionRef?.current?.reload();
              message.success(`${checked ? '上架' : '下架'}成功！`);
              return;
            }
            throw new Error(`${checked ? '上架' : '下架'}失败！`);
          } catch (error: any) {
            message.error(error.message);
          }
        }
        return (
          <Switch
            checkedChildren="上架"
            defaultChecked={dom === '01'}
            unCheckedChildren="下架"
            onChange={handleChange}
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
      render: (_, record: API.ClassificationListItem) => {
        const { id } = record;
        // 添加子分类
        return (
          <>
            <Link className="space-plus" to={`/product/edit/${id}`}>
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
  history.push('/product/add');
};
