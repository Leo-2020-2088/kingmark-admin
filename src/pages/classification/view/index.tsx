import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import styles from './style.less';
import { Col, Row, Button } from 'antd';
import { fieldLabels } from './_config';
import ProCard from '@ant-design/pro-card';
import { useParams, useRequest, history } from 'umi';
import ProForm, { ProFormTreeSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { queryClassificationOptions } from '@/services/common';
import ProFormUploadImg from '@/components/ProFormUploadImg';

interface ClassificationRouterParam {
  id: string;
  level: string;
}
const ViewClassification: React.FC = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>('cn');
  const { id, level }: ClassificationRouterParam = useParams();
  const { data: currentClassification, loading } = useRequest({
    url: `/api/km/category/${id}`,
    method: 'GET',
  });

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };
  return loading ? null : (
    <ProForm
      layout="horizontal"
      hideRequiredMark
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
              <Button onClick={() => history.push('/classification/list')}>返回</Button>
              <Button
                type="primary"
                onClick={() => history.push(`/classification/edit/${level}/${id}`)}
              >
                编辑
              </Button>
            </FooterToolbar>
          );
        },
      }}
      initialValues={{
        ...currentClassification,
        img: [{ url: currentClassification.img }],
      }}
    >
      <PageContainer content="高级表单常见于一次性输入和提交大批量数据的场景。">
        <ProCard title="父级分类信息与封面图片" className={styles.card} headerBordered>
          <Row gutter={16}>
            {level !== '1' && (
              <Col lg={10} md={12} sm={24}>
                <ProFormTreeSelect
                  name="pid"
                  label={fieldLabels.pid}
                  placeholder="请选择父级分类"
                  allowClear
                  secondary
                  readonly={true}
                  bordered
                  rules={[{ required: true, message: '请选择父级分类' }]}
                  initialValue={id}
                  request={queryClassificationOptions}
                  fieldProps={{
                    showArrow: true,
                    filterTreeNode: true,
                    showSearch: true,
                    dropdownMatchSelectWidth: false,
                    labelInValue: true,
                    autoClearSearchValue: true,
                    multiple: false,
                  }}
                />
              </Col>
            )}
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
          title="分类基础信息"
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
                  placeholder="请输入中文名称"
                  readonly={true}
                  bordered
                  rules={[{ required: true, message: '请输入中文名称' }]}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={10} md={12} sm={24}>
                <ProFormTextArea
                  label={fieldLabels.intro}
                  placeholder="请输入中文简介"
                  name="introCn"
                  readonly={true}
                  bordered
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
                  placeholder="请输入英文名称"
                  readonly={true}
                  bordered
                  rules={[{ required: true, message: '请输入英文名称' }]}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={10} md={12} sm={24}>
                <ProFormTextArea
                  label={fieldLabels.intro}
                  name="introEn"
                  readonly={true}
                  bordered
                  placeholder="请输入英文简介"
                />
              </Col>
            </Row>
          </ProCard.TabPane>
        </ProCard>
      </PageContainer>
    </ProForm>
  );
};

export default ViewClassification;
