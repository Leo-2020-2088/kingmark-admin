import React, { useState } from 'react';
import { ProFormUploadButton } from '@ant-design/pro-form';
import type { ProFormItemProps } from '@ant-design/pro-form';
import { Modal } from 'antd';

interface PreviewImg {
  visible: boolean;
  url: string;
  title: string;
}

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const ProFormUploadImg: React.FC<ProFormItemProps & { max: number }> = (
  props: ProFormItemProps & { max: number },
) => {
  const [previewImg, setPreview] = useState<PreviewImg>({
    visible: false,
    url: '',
    title: '',
  });
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreview({
      visible: true,
      url: file.url || file.preview,
      title: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  const handleCancel = () => {
    setPreview({
      visible: false,
      url: '',
      title: '',
    });
  };

  return (
    <>
      <ProFormUploadButton
        label={props.label}
        max={1}
        name={props.name}
        fieldProps={{
          name: 'file',
          listType: 'picture-card',
          onPreview: handlePreview,
        }}
        // readonly={props.readonly}
        disabled={props.readonly}
        initialValue={props.initialValue}
        action="/api/km/upload/file"
        transform={props.transform}
      />
      <Modal
        title={previewImg.title}
        visible={previewImg.visible}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="产品分类封面预览" style={{ width: '100%' }} src={previewImg.url} />
      </Modal>
    </>
  );
};

export default ProFormUploadImg;
