<template>
  <div id="commodity">
    <!-- 商品 -->
    <div class="commodity-classification">
      <!-- 真数据 -->
      <el-tree
        :data="ditydata"
        :props="defauditydata"
      ></el-tree>


      <!-- 树标题 -->
      <el-tree
        :data="treetilel"
        :props="defaultProps"
        @node-click="handleNodeClick"
      ></el-tree>

      <el-tree
        :data="treedata"
        :props="defe"
        @node-click="handleNodeClick"
      ></el-tree>
    </div>

    <div class="commodity-content">
      <div class="search">
        <el-input
          class="search-input"
          v-model="search"
          placeholder="请输入内容id"
        ></el-input>
        <el-button class="search-drop-down">默</el-button>
        <el-button
          @click="judgeiftop"
          class="search-iftop"
          icon="el-icon-search"
        ></el-button>
      </div>

      <div>
        <el-table
        class="commodity-table"
        :data="datas"
        height="400"
        style="width: 100%"
        stripe="ture"
        :row-class-name="tableRowClassName"
      >
        <el-table-column prop="id" label="id" width="200"> </el-table-column>
        <el-table-column prop="title" label="标题" width="200"></el-table-column>
        <el-table-column prop="oldtime" label="创建时间" width="200"> </el-table-column>
        <el-table-column prop="newtiem" label="更新时间" width="200"> </el-table-column>
        <el-table-column label="操作" width="200"> <div>butten</div> </el-table-column>
      </el-table>
      </div>
      
    </div>
  </div>
</template>

<script>
import { getList, getDetail, add, update, remove,getTree } from "@/api/product/productcategory";
import option from "@/const/product/productcategory";
export default {
  data() {
    return {
      // 真数据
      ditydata: [],
      defauditydata:{
        children: "children",
        label: "name",
      },

      // 树标题模拟数据
      treetilel: [
        {
          label: "商品分类一级",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-2-1",
                  children: [
                    {
                      label: "四级 1-1-1-1",
                    },
                    {
                      label: "四级 1-1-1-1",
                    },
                  ],
                },
              ],
            },
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 1-1-1",
                  children: [
                    {
                      label: "四级 1-1-1-1",
                    },
                    {
                      label: "四级 1-1-1-1",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],


      // 树的模拟数据
      treedata:[
        {
          name:'老子1',
          children:[
            {
              name:'老子12',
              children:[
                {
                  name:'老子121'
                },
                {
                  name:'老子122'
                },
              ]
            },
            {
              name:'老子21',
              children:[
                {
                  name:'老子223'
                  },
              ]
            },
          ]
        },
      ],


      defe:{
        children: "children",
        label: "name",
      },
      defaultProps: {
        children: "children",
        label: "label",
      },


      // 模拟数据
      datas: [
        {
          id: 1,
          title: "哦豁1",
          oldtime: "2022-11-08 13：32：42",
          newtiem: "2022-12-09 13：32：42",
        },
        {
          id: 2,
          title: "哦豁2",
          oldtime: "2022-11-02 13：32：42",
          newtiem: "2022-12-10 13：32：42",
        },
        {
          id: 3,
          title: "哦豁3",
          oldtime: "2022-11-03 13：32：42",
          newtiem: "2022-12-07 13：32：42",
        },
        {
          id: 4,
          title: "哦豁4",
          oldtime: "2022-11-04 13：32：42",
          newtiem: "2022-12-11 13：32：42",
        },
        {
          id: 5,
          title: "哦豁4",
          oldtime: "2022-11-04 13：32：42",
          newtiem: "2022-12-11 13：32：42",
        },
        {
          id: 5,
          title: "哦豁4",
          oldtime: "2022-11-04 13：32：42",
          newtiem: "2022-12-11 13：32：42",
        },
        {
          id: 5,
          title: "哦豁4",
          oldtime: "2022-11-04 13：32：42",
          newtiem: "2022-12-11 13：32：42",
        },
        {
          id: 5,
          title: "哦豁4",
          oldtime: "2022-11-04 13：32：42",
          newtiem: "2022-12-11 13：32：42",
        },
      ],

      commissiondata: 1,
      //

      // 下方为请求所需的变量
      // 弹框标题
      title: '',
      // 是否展示弹框
      box: false,
      // 加载中
      loading: true,
      // 是否为查看模式
      view: false,
      // 查询信息
      query: {},
      //选择的平台
      platformArray:[],
      // 分页信息
      page: {
        currentPage: 2,
        pageSize: 10,
        total: 40
      },
      // 表单数据
      form: {name:'',memo:'',platform:[]},
      // 表单配置
      option: option,
      // 表单列表
      templateList: [],
    };
  },
  
  mounted () {
    // this.init();
    this.getcommoditydata();;
  },
  computed: {

  },
  
  watch:{
    // commissiondata(){
    //   this.getcommoditydata();
    // }
  },
  
  methods: {
    // handleNodeClick(da) {
    //   // console.log('da:',da);
    // },
    // 请求数据
    getcommoditydata(params = {}){
      let that= this;
      let {commissiondata} = that
      that.loading=true;
      getList(that.page.currentPage, that.page.pageSize, params).then((res) => {
         this.ditydata = res.data.data.slice(8)
         
        // let sss = res.data;
        console.log('真数组:',res.data.data)
        console.log('假数组',that.treetilel)
        console.log('真数组:',that.ditydata)
        
      });
      // getTree( ).then((res) => {
      //   let bbb = res.data;
      //   console.log('dataa:',bbb)
      // });
    }
  },
};
</script>

<style lang="scss" scoped>
#commodity {
  margin: 0 auto;
  display: flex;
  background-color: #ffffff;
}
.commodity-classification {
  min-width: 200px;
}
.commodity-content {
  max-width: 100%;
  border-left:1px solid #e6e6e6;
  padding: 10px;
}
.search{
  display: flex;
}
.search-input{
  margin-right: 10px;
}

.commodity-table{
  background-color: #f9f9f9;
}
</style>
