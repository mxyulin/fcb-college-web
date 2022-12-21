import Mock from "mockjs";

export default function ({ mock }) {
  if (!mock) return;
  Mock.mock('/mock/fcb-resource/attach/goodsGroupList', 'get', () => {
    return {
      code: 200,
      msg: "操作成功",
      success: true,
      data: {
        id: "666", 
        name: "家电", 
        category_name: "家电分类", 
        image: "", 
        current: 1,
        total: 2,
        records: [{
          activity_type: 'groupon',
          image: 'https://img10.360buyimg.com/n7/jfs/t1/81691/10/24471/105352/63a15c40E199e7483/f7c40c4c8764730d.jpg',
          title: '小米冰箱',
          subtitle: 'K50-PRO',
          activity_discounts_tags: ['折上折', '杠上花'],
          groupon_price: '999',
          price: '1299',
          original_price: '1499',
          stock: '600'
        }, {
          activity_type: 'groupon',
          image: 'https://img10.360buyimg.com/n7/jfs/t1/81691/10/24471/105352/63a15c40E199e7483/f7c40c4c8764730d.jpg',
          title: '小米冰箱',
          subtitle: 'K50-PRO',
          activity_discounts_tags: ['折上折', '杠上花'],
          groupon_price: '999',
          price: '1299',
          original_price: '1499',
          stock: '600'
        }]
      }
    }
  });
}
