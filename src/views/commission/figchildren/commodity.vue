<template>
  <div id="commodity">
    <!-- 商品 -->
    <div class="commodity-classification">
      <el-tree
        :data="treedata"
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
        <el-button
          @click="judgeiftop"
          class="search-iftop"
          icon="el-icon-search"
        ></el-button>
      </div>

      <div class="level">
        <el-table
          class="commodity-table"
          :data="ditydatab"
          height="400"
          style="width: 100%"
          stripe="ture"
          :row-class-name="tableRowClassName"
        >
          <el-table-column prop="id" label="id"> </el-table-column>
          <el-table-column prop="content" label="标题"></el-table-column>
          <el-table-column prop="updateTime" label="创建时间">
          </el-table-column>
          <el-table-column prop="createTime" label="更新时间">
          </el-table-column>
          <el-table-column label="操作"> <div>butten</div> </el-table-column>
        </el-table>

        <div class="shopro-flexh">

          <div class="shopro-pagination-container">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalPage"
            >
            </el-pagination>
          </div>

          <div class="shopro-submit-container" >
            <div class="shopro-submit-button shopro-screen-button">保存</div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { getList } from "@/api/product/productcategory";
// 树元素标题绑定表
import { getListByCategory } from "@/api/product/product";
import option from "@/const/product/productcategory";
export default {
  data() {
    return {
      // 真数据
      treedata: [],
      ditydatab: [],
      defauditydata: {
        children: "children",
        label: "name",
      },

      defe: {
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
        }
      ],

      // 弹框标题
      title: "",
      // 是否展示弹框
      box: false,
      // 是否显示查询
      search: "",
      // 加载中
      loading: true,
      // 是否为查看模式
      view: false,
      // 查询信息
      query: {},
      // 分页信息
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 40,
      },
      // 表单数据
      form: {},
      // 选择行
      selectionList: [],
      // 表单配置
      option: option,
      // 表单列表
      data: [],
    };
  },

  mounted() {
    // this.init();
    this.getcommoditydata();
    // {"categoryIds":"31"}
    // this.getproductdata();
  },
  computed: {},

  watch: {},

  methods: {
    commodityclick(node) {
      this.getproductdata(node.id);
    },

    getcommoditydata(page, params = {}) {
      let that = this;
      that.loading = true;
      getList(
        that.page.currentPage,
        that.page.pageSize,
        Object.assign(params, that.query)
      ).then((res) => {
        that.treedata = res.data.data.slice(8);
        console.log("树的数据：",that.treedata)
      });
    },
    getproductdata(id) {
      let that = this;
      let params = { categoryIds: id };
      that.loading = true;
      getListByCategory(
        that.page.currentPage,
        that.page.pageSize,
        Object.assign(params, that.query)
      ).then((res) => {
        that.ditydatab = res.data.data.records;
        console.log('表的数据：',that.ditydatab)
        // that.page.total = data.total;
        // that.data = data.records;
        // that.loading = false;
      });
    },
    clickcommdity(a) {
      console.log("aa", a);
    },
  },
};
</script>

<style scoped lang="scss" src="@/views/commission/style/commodity.scss"></style>

<style lang="scss">
.level .el-table th.el-table__cell {
  background-color: #fafafa;
  color: #444444;
  font-size: 13px;
}</style>
