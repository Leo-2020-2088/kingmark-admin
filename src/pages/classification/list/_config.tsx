import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Popconfirm, message } from 'antd';
import { history, Link } from 'umi';
import { delTableDataApi } from './_api';
import ProCon from '@/components/ProCon';
import ProDatePlaceholder from '@/components/ProDatePlaceholder';

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
    {
      title: '分类',
      dataIndex: 'name',
      className: 'classificationWrap',
      // width: 350,
      formItemProps: {
        label: '分类名称',
      },
      fieldProps: {
        placeholder: '请输入分类中文名称或中文名称',
      },
      render: (_, row: API.ClassificationListItem) => <ProCon {...row} />,
    },
    {
      title: '创建时间',
      align: 'center',
      width: 180,
      hideInSearch: true,
      dataIndex: 'createdAt',
      render: (_, row: API.ClassificationListItem) => <ProDatePlaceholder date={row.createdAt} />,
    },
    {
      title: '更新时间',
      align: 'center',
      width: 180,
      hideInSearch: true,
      dataIndex: 'updatedAt',
      render: (_, row: API.ClassificationListItem) => <ProDatePlaceholder date={row.updatedAt} />,
    },
    {
      title: '操作',
      align: 'center',
      width: 200,
      hideInSearch: true,
      dataIndex: 'id',
      render: (_, record: API.ClassificationListItem) => {
        const { id, level } = record;
        return (
          <>
            <Link className="space-plus" to={`/classification/view/${level}/${id}`}>
              查看
            </Link>
            <Link className="space-plus" to={`/classification/edit/${level}/${id}`}>
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
            {level < 3 && (
              <Link className="space-plus" to={`/classification/add/${level}/${id}`}>
                添加子分类
              </Link>
            )}
          </>
        );
      },
    },
  ];
};
// export const columns: ProColumns<API.ClassificationListItem>[] =
export const handleAdd = () => {
  history.push('/classification/add/0/0');
};
