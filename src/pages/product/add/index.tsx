import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import styles from './style.less';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Col, Popover, Row, message } from 'antd';
import { fieldLabels } from './_config';
import type { ErrorField } from './_data.d';
import { onSave } from './_api';
import ProCard from '@ant-design/pro-card';
import ProForm, { ProFormText, ProFormTextArea, ProFormTreeSelect } from '@ant-design/pro-form';
import { queryClassificationOptions } from '@/services/common';
import ProFormUploadImg from '@/components/ProFormUploadImg';
import { history } from 'umi';

const NewProduct: React.FC = () => {
  const [error, setError] = useState<ErrorField[]>([]);
  const [activeTabKey, setActiveTabKey] = useState<string>('cn');
  const getErrorInfo = (errors: ErrorField[]) => {
    const errorCount = errors.filter((item) => item.errors.length > 0).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = (fieldKey: string) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = errors.map((err) => {
      if (!err || err.errors.length === 0) {
        return null;
      }
      const key = err.name[0] as string;
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <CloseCircleOutlined className={styles.errorIcon} />
          <div className={styles.errorMessage}>{err.errors[0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger: HTMLElement) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode as HTMLElement;
            }
            return trigger;
          }}
        >
          <CloseCircleOutlined />
        </Popover>
        {errorCount}
      </span>
    );
  };
  const onFinish = async (values: Record<string, any>) => {
    setError([]);
    try {
      await onSave(values);
      message.success('提交成功');
      history.push('/product');
    } catch (e: any) {
      message.error(e.message);
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    setError(errorInfo.errorFields);
  };
  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };
  return (
    <ProForm
      layout="horizontal"
      hideRequiredMark
      submitter={{
        render: (props, dom) => {
          return (
            <FooterToolbar>
              {getErrorInfo(error)}
              {dom}
            </FooterToolbar>
          );
        },
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <PageContainer content="高级表单常见于一次性输入和提交大批量数据的场景。">
        <ProCard title="产品分类信息与产品图片" className={styles.card} headerBordered>
          <Row gutter={16}>
            <Col lg={10} md={12} sm={24}>
              <ProFormTreeSelect
                name="classificationId"
                label={fieldLabels.classification}
                placeholder="请选择产品分类"
                allowClear
                secondary
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
                transform={(value: any) => ({ img: value[0].response.data })}
              />
            </Col>
          </Row>
        </ProCard>
        <ProCard
          title="产品基础信息"
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
                  rules={[{ required: true, message: '请输入英文名称' }]}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={10} md={12} sm={24}>
                <ProFormTextArea
                  label={fieldLabels.intro}
                  name="introEn"
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

export default NewProduct;
