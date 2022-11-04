import goodslist from '@/mock/product.json';
import Mock from 'mockjs';

export default ({mock}) => {
  if (!mock) return;
  Mock.mock('/api/fcb-product/product/list', 'get', () => {
    return goodslist;
  })
}
