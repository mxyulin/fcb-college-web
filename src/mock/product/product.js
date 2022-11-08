import goodslist from '@/mock/product/product.json';
import Mock from 'mockjs';

export default ({mock}) => {
  if (!mock) return;
  console.log('ok');
  Mock.mock('/mock/fcb-product/product/list', 'get', () => {
    return goodslist;
  })
}
