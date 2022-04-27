import React, { useState } from 'react';
import styles from './index.less';
import { EyeOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

interface ProPictureViewProp {
  src: string;
  title: string;
}

const ProPictureView: React.FC<ProPictureViewProp> = (props: ProPictureViewProp) => {
  const [visible, setVisible] = useState<boolean>(false);
  const handleCancel = () => {
    setVisible(false);
  };
  const handleVisible = () => {
    setVisible(true);
  };
  return (
    <div className={styles.container}>
      <EyeOutlined onClick={handleVisible} className={styles.icon} />
      <img alt={props.title} src={`http://47.111.83.62${props.src}`} />
      <Modal title={props.title} visible={visible} footer={null} onCancel={handleCancel}>
        <img alt={props.title} style={{ width: '100%' }} src={`http://47.111.83.62${props.src}`} />
      </Modal>
    </div>
  );
};

export default ProPictureView;
