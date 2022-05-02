import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import styles from './style.less';
import { Col, Row, Button } from 'antd';
import { fieldLabels } from './_config';
import ProCard from '@ant-design/pro-card';
import ProForm, { ProFormText, ProFormTextArea, ProFormTreeSelect } from '@ant-design/pro-form';
import { queryClassificationOptions } from '@/services/common';
import ProFormUploadImg from '@/components/ProFormUploadImg';
import { useParams, useRequest, history } from 'umi';

interface ProductEditRouterParam {
  id: string;
}
const EditProduct: React.FC = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>('cn');
  const { id }: ProductEditRouterParam = useParams();
  const { data: currentProduct, loading } = useRequest({
    url: `/api/km/product/${id}`,
    method: 'GET',
  });
  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };
  const handleGo = (route: string) => {
    history.push(route);
  };
  return !loading ? (
    <ProForm
      layout="horizontal"
      hideRequiredMark
      initialValues={{
        ...currentProduct,
        img: [{ url: currentProduct.img }],
      }}
      submitter={{
        // 配置按钮的属性
        resetButtonProps: {
          style: {
            // 隐藏重置按钮
            display: 'none',
          },
        },
        submitButtonProps: {
          style: {
            // 隐藏重置按钮
            display: 'none',
          },
        },
        render: () => {
          return (
            <FooterToolbar>
              <Button onClick={handleGo.bind(null, `/product/list`)}>返回</Button>
              <Button type="primary" onClick={handleGo.bind(null, `/product/edit/${id}`)}>
                编辑
              </Button>
            </FooterToolbar>
          );
        },
      }}
    >
      <PageContainer content="高级表单常见于一次性输入和提交大批量数据的场景。">
        <ProCard
          loading={loading}
          title="产品分类信息与产品图片"
          className={styles.card}
          headerBordered
        >
          <Row gutter={16}>
            <Col lg={10} md={12} sm={24}>
              <ProFormTreeSelect
                name="classification"
                label={fieldLabels.classification}
                placeholder="请选择产品分类"
                allowClear
                secondary
                readonly={true}
                bordered
                rules={[{ required: true, message: '请选择产品分类' }]}
                request={queryClassificationOptions}
                fieldProps={{
                  showArrow: true,
                  filterTreeNode: true,
                  showSearch: true,
                  dropdownMatchSelectWidth: false,
                  labelInValue: false,
                  autoClearSearchValue: true,
                  multiple: false,
                }}
              />
            </Col>
            <Col sm={24}>
              <ProFormUploadImg
                label={fieldLabels.img}
                max={1}
                name="img"
                readonly={true}
                transform={(value: any) => ({ img: value[0]?.response?.data || value[0].url })}
              />
            </Col>
          </Row>
        </ProCard>
        <ProCard
          title="产品基础信息"
          loading={loading}
          tabs={{
            activeKey: activeTabKey,
            onChange: onTabChange,
          }}
        >
          <ProCard.TabPane key="cn" tab="中文">
            <Row gutter={16}>
              <Col lg={10} md={12} sm={24}>
                <ProFormText
                  label={fieldLabels.name}
                  name="nameCn"
                  readonly={true}
                  bordered
                  placeholder="请输入中文名称"
                  rules={[{ required: true, message: '请输入中文名称' }]}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={10} md={12} sm={24}>
                <ProFormTextArea
                  label={fieldLabels.intro}
                  readonly={true}
                  bordered
                  placeholder="请输入中文简介"
                  name="introCn"
                />
              </Col>
            </Row>
          </ProCard.TabPane>
          <ProCard.TabPane key="en" tab="英文">
            <Row gutter={16}>
              <Col lg={10} md={12} sm={24}>
                <ProFormText
                  label={fieldLabels.name}
                  name="nameEn"
                  readonly={true}
                  bordered
                  placeholder="请输入英文名称"
                  rules={[{ required: true, message: '请输入英文名称' }]}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={10} md={12} sm={24}>
                <ProFormTextArea
                  label={fieldLabels.intro}
                  readonly={true}
                  bordered
                  name="introEn"
                  placeholder="请输入英文简介"
                />
              </Col>
            </Row>
          </ProCard.TabPane>
        </ProCard>
      </PageContainer>
    </ProForm>
  ) : null;
};

export default EditProduct;
