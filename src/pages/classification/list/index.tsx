import { PageContainer } from '@ant-design/pro-layout';
import { Button, message, Modal } from 'antd';
import ProTable, { ActionType } from '@ant-design/pro-table';
import React, { useState, useRef } from 'react';
import { queryTableDataApi, delTableDataApi } from './_api';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { setTableColumns, handleAdd } from './_config'

const ClassificationList: React.FC = () => {
	const actionRef = useRef<ActionType>();
	const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>();
	const columns = setTableColumns(actionRef)
	const onSelectChange = (selectedRowKeys: any) => {
		setSelectedRowKeys(selectedRowKeys)
	}
	const rowSelection = {
		selectedRowKeys,
		onChange: onSelectChange
	}
	const handleRemove = async () => {
		if (!selectedRowKeys?.length) {
			message.warning('请选择要删除的数据！')
			return
		}
		Modal.confirm({
			title: 'Confirm',
			icon: <ExclamationCircleOutlined />,
			content: '您确定要删除选中的全部数据吗？',
			okText: '确认',
			cancelText: '取消',
			onOk: async () => {
				try {
					const res = await delTableDataApi(selectedRowKeys)
					if (res.success) {
						actionRef.current?.reload()
						message.success('删除成功！')
						return
					}
					throw new Error(res.message)
				} catch(error: any) {
					message.error(error.message)
				}
			},
		})
	}
	return (
		<PageContainer>
			<ProTable<API.ClassificationListItem, API.PageParams>
				headerTitle="分类列表"
				rowSelection={rowSelection}
				actionRef={actionRef}
				rowKey="id"
				search={{labelWidth: 'auto'}}
				scroll={{ y: 420 }}
				request={queryTableDataApi}
				columns={columns}
				toolBarRender={() => [
					<Button
						type="primary"
						key="primary"
						onClick={handleAdd}
					>
						<PlusOutlined /> 新建一级分类
					</Button>,
					<Button onClick={handleRemove}>
						批量删除
					</Button>
				]}
			/>
		</PageContainer>
	)
}

export default ClassificationList;
