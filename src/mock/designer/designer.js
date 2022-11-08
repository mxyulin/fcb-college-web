const Mock = require('mockjs')

// 到处模拟数据
export default Mock.mock({
    meta:{
        state:200,
        msg:'操作成功'
    },
   data:[
    {
        image:'http://file.shopro.top/uploads/20210527/4b4b489beed3ce4ee6f913c9b8450581.png',
        name:'金典全品类',
        memo:'经典全品类电商平台'
    },{
        image:'http://file.shopro.top/uploads/20210527/656fbd5f39bee1293cd83e3db9895fc3.png',
        name:'全品类团购',
        memo:'社区团购等全品类站点'
    },{
        image:'http://file.shopro.top/uploads/20210527/27a00b345f148391a21da4ed2e5820d3.png',
        name:'生鲜站',
        memo:'适用于社区生鲜电商'
    },{
        image:'http://file.shopro.top/uploads/20210527/119b27f6a2af61e28ff1507749d22b24.png',
        name:'品牌站',
        memo:'适用于独立品牌类电商'
    },{
        image:'http://file.shopro.top/uploads/20210527/bad68ac7a64fb6b514b123e7c4a461f8.png',
        name:'亲子母婴',
        memo:'适用于亲子母婴类电商'
    },
   ],
})