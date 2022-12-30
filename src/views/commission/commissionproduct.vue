<template>
  <basic-container>
    <div id="indexPage" v-cloak v-loading="isAjax">
      <div class="shopro-screen-container">
        <div class="shopro-button shopro-refresh-button">
          <i class="el-icon-refresh"></i>
        </div>

        <div class="display-flex shopro-screen-item">
          <div class="shopro-screen-tip">商品名称</div>
          <div class="shopro-screen-condition">
            <el-input
              placeholder="请输入商品名称"
              size="small"
              v-model="searchForm.goods_title"
            ></el-input>
          </div>
        </div>

        <div class="display-flex shopro-screen-item">
          <div class="shopro-screen-tip">商品分类</div>
          <div class="shopro-screen-condition">
            <el-select
              v-model="searchForm.goods_type"
              placeholder="请选择商品分类"
              size="small"
            >
              <el-option
                v-for="(goods, indexa) in goodTypeOptions"
                :key="indexa"
                :label="goods.name"
                :value="goods.type"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="display-flex shopro-screen-item">
          <div class="shopro-screen-tip">活动类型</div>
          <div class="shopro-screen-condition">
            <el-select
              v-model="searchForm.activity_type"
              placeholder="请选择活动类型"
              size="small"
            >
              <el-option
                :label="activity.name"
                :value="activity.type"
                v-for="(activity, indexb) in activityTypeOptions"
                :key="indexb"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="display-flex shopro-screen-item">
          <div class="shopro-screen-tip">分销规则</div>
          <div class="shopro-screen-condition">
            <el-select
              v-model="searchForm.self_rules"
              placeholder="请选择分销规则"
              size="small"
            >
              <el-option
                :label="rules.name"
                :value="rules.type"
                v-for="(rules, indexc) in commissionTypeOptions"
                :key="indexc"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="display-flex shopro-screen-item">
          <div class="shopro-screen-tip">分销状态</div>
          <div class="shopro-screen-condition">
            <el-select
              v-model="searchForm.commission_goods_status"
              placeholder="请选择分销状态"
              size="small"
            >
              <el-option
                :label="status.name"
                :value="status.type"
                v-for="(status, indexd) in commissionStatusOptions"
                :key="indexd"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="display-flex shopro-screen-item-button">
          <div class="shopro-button shopro-reset-button">重置</div>
          <div class="shopro-button shopro-screen-button">筛选</div>
        </div>
      </div>

      <div class="shopro-table-container" v-loading="tableAjax">
        <el-table
          :data="listData"
          style="width: 100%"
          border
          stripe="true"
          :cell-class-name="tableCellClassName"
          :header-cell-class-name="tableCellClassName"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>

          <el-table-column prop="tenantId" label="商品信息" min-width="300">
          </el-table-column>

          <el-table-column prop="commissionRules" label="分销规则" width="100">
            <!-- <template slot-scope="scope">
              <div
                v-if="scope.row.commission && scope.row.commission.status == 1"
              >
                <div v-if="scope.row.commission.self_rules == 0">默认规则</div>
                <div v-if="scope.row.commission.self_rules == 1">独立规则</div>
                <div v-if="scope.row.commission.self_rules == 2">批量规则</div>
              </div>
            </template> -->
          </el-table-column>

          <el-table-column prop="commissionConfig" label="商品状态" width="100">
          </el-table-column>

          <el-table-column label="操作" fixed="right" width="220">
            <template slot-scope="scope">
              <div>
                <span class="shopro-edit-text">设置佣金</span>
                <span class="shopro-detail-text" v-if="scope.row.commission">
                  <span
                    v-if="
                      scope.row.commission && scope.row.commission.status == 0
                    "
                    >参与</span
                  >
                  <span
                    style="color: #ff5959"
                    v-if="
                      scope.row.commission && scope.row.commission.status == 1
                    "
                    >不参与</span
                  >
                </span>
                <span class="shopro-detail-text">参与</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="shopro-pagination-container">
        <div class="display-flex">
          <div style="margin-right: 40px">
            <el-checkbox>批量设置</el-checkbox>
          </div>
          <div class="display-flex multiple-set-item">
            <div class="multiple-set-acitve-1">参与</div>
            <div class="multiple-set-acitve-2">不参与</div>
            <div class="multiple-set-acitve-3">设置佣金</div>
          </div>
        </div>
        <!-- pag页码 分页器 -->
        <div class="display-center-a">
          <el-pagination
            align="right"
            background
            @current-change="productCurrentChange"
            @size-change="productSizeChange"
            :current-page="page.currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
          >
          </el-pagination>
        </div>
      </div>
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
} from "@/api/commission/commissionproduct";
import option from "@/const/commission/commissionproduct";
import { mapGetters } from "vuex";
import { getDictionary } from "@/api/system/dict";

export default {
  data() {
    return {
      searchForm: {
        goods_title: "",
        goods_type: "all",
        activity_type: "all",
        self_rules: "all",
        commission_goods_status: "all",
      },
      goodTypeOptions: [
        {
          name: "全部",
          type: "all",
        },
        {
          name: "实体商品",
          type: "normal",
        },
        {
          name: "虚拟商品",
          type: "virtual",
        },
      ],
      activityTypeOptions: [
        {
          name: "全部",
          type: "all",
        },
        {
          name: "拼团",
          type: "groupon",
        },
        {
          name: "秒杀",
          type: "seckill",
        },
        {
          name: "积分",
          type: "score",
        },
      ],
      commissionTypeOptions: [
        {
          name: "全部",
          type: "all",
        },
        {
          name: "默认规则",
          type: "0",
        },
        {
          name: "独立规则",
          type: "1",
        },
        {
          name: "批量规则",
          type: "2",
        },
      ],
      commissionStatusOptions: [
        {
          name: "全部",
          type: "all",
        },
        {
          name: "不参与",
          type: "0",
        },
        {
          name: "参与",
          type: "1",
        },
      ],
      listData: [
        {
          tenantId: "用户id 商品信息",
          commissionRules: "佣金奖励 分销规则",
          commissionConfig: "佣金配置 商品状态",

          //
          selfRules: "自我购买",
          commissionOrderStatus: "佣金订单状态",
        },
      ],

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
    init() {},
    // 分页器
    productCurrentChange(currentPage) {
      let that = this;
      that.page.currentPage = currentPage;
      that.onLoad(that.page);
    },
    productSizeChange(pageSize) {
      let that = this;
      that.page.pageSize = pageSize;
      that.onLoad(that.page);
    },
    // 发请求
    onLoad(page, params = {}) {
      let that = this;
      that.loading = true;
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, that.query)
      ).then((res) => {
        // console.log("data", res);
        that.listData = res.data.data.records;
        // that.page.total = data.total;
        // that.data = data.records;
        // that.loading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/views/commission/style/commissionproduct.scss";
</style>
<style lang="scss">
.display-center-a .el-pagination {
  margin: 0;
}
</style>
