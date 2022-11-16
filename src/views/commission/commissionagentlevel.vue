<template>
  <basic-container>
    <!-- 分销商等级 -->
    <div id="indexPage" v-cloak v-loading="isAjax">
      <!-- getindexLis 刷新页面 -->
      <div class="shopro-header-container">分销商等级</div>
      <div class="shopro-index-button-container">
        <div class="shopro-button shopro-refresh-button" @click="getindexList = true">
          <i class="el-icon-refresh"></i>
        </div>
        <!-- operation 弹框副页面 -->
        <div class="shopro-add-button" @click="operationa()">
          <i class="el-icon-plus"></i>添加等级
        </div>
        <el-dialog append-to-body="ture"   :visible.sync="operation" width="60%"  center>
          <!-- <addvue></addvue> -->
          <editvue></editvue>
        </el-dialog>
      </div>

      <div class="shopro-table-container level">
        <el-table
          :data="indexList"
          style="width: 100%"
          stripe
          border
          :cell-class-name="tableCellClassName"
          :header-cell-class-name="tableCellClassName"
        >
          <el-table-column prop="level" label="等级" width="160">
            <template slot-scope="scope">
              <div>
                等级{{ scope.row.level }}&nbsp;<span v-if="scope.row.level == 1"
                  >(默认等级)</span
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column label="等级名称" min-width="120">
            <template slot-scope="scope">
              <div class="ellipsis-item">
                {{ scope.row.name }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="等级徽章" min-width="120">
            <template slot-scope="scope">
              <div class="table-image">
                <el-image
                  style="width: 40px; height: 40px"
                  :src="scope.row.image"
                  :fit="fit"
                ></el-image>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="一级(自购)佣金比例" min-width="160">
            <template slot-scope="scope">
              <div class="shopro-custom-cell-center">
                {{ scope.row.commission_rules1 }}%
              </div>
            </template>
          </el-table-column>
          <el-table-column label="二级佣金比例" min-width="120">
            <template slot-scope="scope">
              <div class="shopro-custom-cell-center">
                {{ scope.row.commission_rules2 }}%
              </div>
            </template>
          </el-table-column>
          <el-table-column label="三级佣金比例" min-width="120">
            <template slot-scope="scope">
              <div class="shopro-custom-cell-center">
                {{ scope.row.commission_rules3 }}%
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="120">
            <template>
              <div>
                <span class="shopro-edit-text" @click="operationb=true">编辑</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog append-to-body="ture"   :visible.sync="operationb" width="60%"  center>
          <addvue></addvue>
      </el-dialog>
    </div>
  </basic-container>
</template>

<script>

import {
  getList,
  getDetail,
  add,
  update,
  remove,
} from "@/api/commission/commissionagentlevel";
import option from "@/const/commission/commissionagentlevel";
import addvue from "./levelchildren/add.vue"
import editvue from "./levelchildren/edit.vue"
import { mapGetters } from "vuex";
import { getDictionary } from "@/api/system/dict";

export default {
  components: {addvue,editvue},
  data() {
    return {
      operation: false,
      operationb:false,
      indexList: [
        {
          level: 1,
          name: "普通用户",
          image:
            "https://demo.shopro.top/uploads/20220909/5c5e361cd3869e363e8d19c4911905e5.jpg",
          commission_rules1: 1.0,
          commission_rules2: 2.0,
          commission_rules3: 3.0,
        },
        {
          level: 1,
          name: "普通用户",
          image:
            "https://demo.shopro.top/uploads/20220909/5c5e361cd3869e363e8d19c4911905e5.jpg",
          commission_rules1: 1.0,
          commission_rules2: 2.0,
          commission_rules3: 3.0,
        },
        {
          level: 1,
          name: "普通用户",
          image:
            "https://demo.shopro.top/uploads/20220909/5c5e361cd3869e363e8d19c4911905e5.jpg",
          commission_rules1: 1.0,
          commission_rules2: 2.0,
          commission_rules3: 3.0,
        },
        {
          level: 1,
          name: "普通用户",
          image:
            "https://demo.shopro.top/uploads/20220909/5c5e361cd3869e363e8d19c4911905e5.jpg",
          commission_rules1: 1.0,
          commission_rules2: 2.0,
          commission_rules3: 3.0,
        },
      ],

      //以下为生成
      // 弹框标题
      title: "",
      // 是否展示弹框
      box: false,
      // 是否显示查询
      search: true,
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
    this.init();
    this.onLoad(this.page);
  },
  computed: {
    ...mapGetters(["permission"]),
    ids() {
      let ids = [];
      this.selectionList.forEach((ele) => {
        ids.push(ele.id);
      });
      return ids.join(",");
    },
  },
  methods: {
    // 刷新页面
    getindexLis() {},
    //弹框副页面
    operationa() {
      this.operation = true;
    },

    // 以下为生成

    init() {},
    onLoad(page, params = {}) {
      const that = this;
      that.loading = true;
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, that.query)
      ).then((res) => {
        const data = res.data.data;
        console.log('data',res)
        // that.page.total = data.total;
        // that.data = data.records;
        // that.loading = false;
      });
    },
  },
};
</script>

<style
  lang="scss"
  scoped
  src="@/views/commission/style/commissionagentlevel.scss"
></style>


<style lang="scss">
 .level .el-table th.el-table__cell {
  background-color: #fafafa;
  color: #444444;
  font-size: 13px;
}
.el-dialog--center .el-dialog__body{
  padding: 20px 0 0 0;
}
</style>
