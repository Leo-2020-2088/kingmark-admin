import React from 'react';
import { PageContainer } from '@ant-design/pro-layout'
import { useParams } from 'umi';

interface ProductEditRouterParam {
  id: string
}
const EditProduct: React.FC = () => {
  const {id}: ProductEditRouterParam = useParams()
  console.log(7, id)
  return (
    <PageContainer>
      产品编辑{id}
    </PageContainer>
  )
}

export default EditProduct
