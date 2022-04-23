import { FooterToolbar, PageContainer } from '@ant-design/pro-layout';
import React, { useState } from 'react';
import styles from './style.less';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Col, Popover, Row, message } from 'antd';
import { fieldLabels } from './_config';
import type { ErrorField } from './_data';
import { onSave } from './_api';
import ProCard from '@ant-design/pro-card';
import ProForm, { ProFormUploadButton, ProFormText } from '@ant-design/pro-form';
import ProFormEditor from '@/components/ProFormEditor';

const NewNews: React.FC = () => {
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
    } catch {
      // console.log
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
        <ProCard title="新闻封面" className={styles.card} headerBordered>
          <Row gutter={16}>
            <Col sm={24}>
              <ProFormUploadButton
                label={fieldLabels.img}
                name="img"
                max={1}
                fieldProps={{
                  name: 'file',
                  listType: 'picture-card',
                }}
                action="/api/km/upload/file"
                extra=""
              />
            </Col>
          </Row>
        </ProCard>
        <ProCard
          title="新闻基础信息"
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
                  placeholder="请输入中文标题"
                  rules={[{ required: true, message: '请输入中文标题' }]}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col sm={24}>
                <ProFormEditor
                  label={fieldLabels.content}
                  name="contentCn"
                  placeholder="请输入中文内容"
                  rules={[{ required: true, message: '请输入中文内容' }]}
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
                  placeholder="请输入英文标题"
                  rules={[{ required: true, message: '请输入英文标题' }]}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col sm={24}>
                <ProFormEditor
                  label={fieldLabels.content}
                  name="contentEn"
                  placeholder="请输入英文内容"
                  rules={[{ required: true, message: '请输入英文内容' }]}
                />
              </Col>
            </Row>
          </ProCard.TabPane>
        </ProCard>
      </PageContainer>
    </ProForm>
  );
};
export default NewNews;
