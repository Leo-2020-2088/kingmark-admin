import React, { useState } from 'react';
import ProPictureView from '@/components/ProPictureView';
import styles from './index.less';
import { Switch, Typography } from 'antd';

interface ProConProps {
  nameCn: string;
  nameEn: string;
  img: string;
  introCn: string;
  introEn: string;
}

const { Paragraph, Title } = Typography;
const ProCon: React.FC<ProConProps> = (row: ProConProps) => {
  const [isCn, setLang] = useState<boolean>(true);
  const handelChange = (value: boolean) => {
    setLang(value);
  };
  return (
    <div className={styles.infoWrapper}>
      <ProPictureView src={row.img} title={isCn ? row.nameCn : row.nameEn} />
      <div className={styles._right}>
        <div className={styles._header}>
          <Title
            ellipsis={{
              tooltip: isCn ? row.nameCn : row.nameEn,
            }}
          >
            {isCn ? row.nameCn : row.nameEn}
          </Title>
          <Switch
            size="small"
            defaultChecked
            checkedChildren="中"
            unCheckedChildren="英"
            onChange={handelChange}
          />
        </div>
        <Paragraph
          style={{ margin: 0 }}
          ellipsis={{
            rows: 2,
            tooltip: isCn ? row.introCn : row.introEn,
          }}
        >
          {isCn ? row.introCn : row.introEn}
        </Paragraph>
      </div>
    </div>
  );
};

export default ProCon;
