import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { useParams, useRequest } from 'umi';

interface ProductEditRouterParam {
  id: string;
}
const EditProduct: React.FC = () => {
  const { id }: ProductEditRouterParam = useParams();
  const [formData, setFormData] = useState<API.ClassificationListItem>();
  // const {data} = useRequest(fetchDataById, )
  // console.log(12, id) , error, loading
  const { data } = useRequest({
    url: `/api/km/category/${id}`,
    method: 'GET',
  });
  useEffect(() => {
    setFormData(data);
  }, [data]);
  console.log(formData);
  return <PageContainer>产品编辑{id}</PageContainer>;
};

export default EditProduct;
