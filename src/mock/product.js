import Mock from 'mockjs';

const productList = [
  {"code":200,"success":true,"data":{test: "xixi"},"msg":"ok"}
]

export default ({mock}) => {
  if (!mock) return;
  Mock.mock('/api/fcb-product/product/list', 'get', () => {
    return productList;
  })
}
