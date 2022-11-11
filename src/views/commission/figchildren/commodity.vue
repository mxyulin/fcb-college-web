<template>
  <div id="commodity">
    <!-- 商品 -->
    <div class="commodity-classification">
      <!-- 真数据 -->
      <el-tree
        :data="ditydata"
        :props="defauditydata"
        @node-click="commodityclick"
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
        <el-table-column prop="id" label="id" > </el-table-column>
        <el-table-column prop="title" label="标题" ></el-table-column>
        <el-table-column prop="oldtime" label="创建时间" > </el-table-column>
        <el-table-column prop="newtiem" label="更新时间" > </el-table-column>
        <el-table-column label="操作" > <div>butten</div> </el-table-column>
      </el-table>
      </div>
      
    </div>
  </div>
</template>

<script>
import { getList, getDetail, add, update, remove,getTree } from "@/api/product/productcategory";
import {getListByCategory} from "@/api/product/product";
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




      defe:{
        children: "children",
        label: "name",
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
      page2: {
        currentPage: 3,
        pageSize: 10,
        total: 40
      },
      loading2:false,

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
        currentPage: 3,
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
    this.getcommoditydata();
    this.getproductdata();
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
    commodityclick(indenxclick){
      console.log(indenxclick)
      
    },
    getproductdata(){
      let that= this;
      that.loading2=true;
      getListByCategory(that.page2.currentPage, that.page2.pageSize, that.page2.params).then((res) => {
         console.log('prodact',res)
      });
    },
    getcommoditydata(){
      let that= this;
      let {commissiondata} = that
      that.loading=true;
      getList(that.page.currentPage, that.page.pageSize, that.page.params).then((res) => {
         that.ditydata = res.data.data.slice(8)
         console.log('数据',res)
      });
    }
  },
};
</script>

<style lang="scss" scoped>
#commodity {
  margin: 0 auto;
  display: flex;
  background-color: #ffffff;
  width: 100%;
}
.commodity-classification {
  min-width: 160px;
}
.commodity-content {
  box-sizing: border-box;
  width: 100%;
  min-width: 640px;
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
