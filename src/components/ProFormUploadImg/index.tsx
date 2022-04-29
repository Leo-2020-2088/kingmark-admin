import React, { useState } from 'react';
import { ProFormUploadButton } from '@ant-design/pro-form';
import type { ProFormItemProps } from '@ant-design/pro-form';
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

interface PreviewImg {
  visible: boolean;
  url: string;
  title: string;
}
// interface ImgInfo {
//   uid: string;
//   name: string;
//   url: string;
// }

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
  // const [loading, setLoading] = useState<boolean>(false)
  // const [files, setFiles] = useState([])
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
  // const handleChange = ({file, fileList}: any) => {
  //   console.log(48, file, fileList)
  //   if (file.status === 'uploading') {
  //     setLoading(true)
  //     return;
  //   }
  //   console.log(52, file, fileList)
  //   setLoading(false)
  //   const files = fileList.map((item: any) => ({
  //     uid: item.uid,
  //     name: item.name,
  //     status: item.status,
  //     url: `http://47.111.83.62${item.response.data}`
  //   }))
  //   setFiles(files)
  // }
  // const UploadButton = (
  //   <div>
  //     {loading ? <LoadingOutlined /> : <PlusOutlined />}
  //     <div style={{ marginTop: 8 }}>点击上传</div>
  //   </div>
  // );

  return (
    <>
      {/* <Upload
        listType="picture-card"
        onPreview={handlePreview}
        onChange={handleChange}
        action="/api/km/upload/file"
        fileList={files}
        // showUploadList={Boolean(props.max - 1)}
      >
        {files.length >= props.max ? null : UploadButton}
      </Upload> */}
      <ProFormUploadButton
        label={props.label}
        max={1}
        name={props.name}
        fieldProps={{
          name: 'file',
          listType: 'picture-card',
          onPreview: handlePreview,
        }}
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
