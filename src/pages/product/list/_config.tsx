import { ProColumns } from '@ant-design/pro-table'
import { Switch, Button } from 'antd'
import { ReactNode } from 'react'
import {history, Link} from 'umi'

export const columns: ProColumns<API.ProductListItem>[] = [
  {
    title: '排序',
    dataIndex: 'index',
    valueType: 'indexBorder',
    hideInSearch: true,
  },
  {
    title: '置顶',
    dataIndex: 'isTop',
    hideInSearch: true,
    render: (dom: any, record: API.ProductListItem) => {
      function onChange(checked: boolean) {
        console.log(`${record.nameCn} ${checked}`);
      }
      return (
        <Switch defaultChecked={dom} onChange={onChange} />
      )
    }
  },
  {
    title: '产品',
    dataIndex: 'nameCn',
    render: (_, row: API.ProductListItem) => {
      return (
        <div>
          <img src={row.img} />
        </div>
      )
    }
  },
  {
    title: '产品分类',
    dataIndex: 'classification',
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: (dom: ReactNode, record: API.ProductListItem) => {
      function onChange(checked: boolean) {
        console.log(`${record.nameCn} ${checked}`);
      }
      return (
        <Switch checkedChildren="上架" defaultChecked={dom === '01'} unCheckedChildren="下架" onChange={onChange} />
      )
    }
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
    render: (id: any) => {
      return (
        <>
          {/* <Button type="link"></Button> */}
          <Link to={`/product/edit/${id}`}>编辑</Link>
          <Button type="text">删除</Button>
        </>
      )
    }
  },
]
export const handleAdd = () => {
  history.push('/product/add')
}
