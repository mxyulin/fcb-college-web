<template>
  <basic-container>
    <div id="orderIndex">
      <div class="screen-container display-flex">
        <div class="display-flex shopro-screen-item shopro-screen-item-vague">
          <div class="shopro-button shopro-refresh-button">
            <i class="el-icon-refresh"></i>
          </div>
        </div>

        <div class="display-flex shopro-screen-item shopro-screen-item-vague">
          <div class="shopro-screen-condition">
              <el-input
                placeholder="请输入内容"
                v-model="searchForm.form_1_value"
                class="screen-item-select"
                size="small"
              >
                <el-select
                  v-model="searchForm.form_1_key"
                  slot="prepend"
                  placeholder="请选择"
                >
                  <el-option
                    label="下单用户ID"
                    value="buyer_id"
                  ></el-option>
                  <el-option
                    label="下单用户昵称"
                    value="buyer_nickname"
                  ></el-option>
                  <el-option
                    label="下单用户手机号"
                    value="buyer_mobile"
                  ></el-option>
                </el-select>
              </el-input>
          </div>
        </div>

        <div class="display-flex shopro-screen-item shopro-screen-item-vague">
          <div class="shopro-screen-condition">
              <el-input
                placeholder="请输入内容"
                v-model="searchForm.form_2_value"
                class="screen-item-select"
                size="small"
              >
                <el-select
                  v-model="searchForm.form_2_key"
                  slot="prepend"
                  placeholder="请选择"
                >
                  <el-option label="分销用户ID" value="agent_id"></el-option>
                  <el-option
                    label="分销用户昵称"
                    value="agent_nickname"
                  ></el-option>
                  <el-option
                    label="分销用户手机号"
                    value="agent_mobile"
                  ></el-option>
                </el-select>
              </el-input>
          </div>
        </div>

        <div class="display-flex shopro-screen-item shopro-screen-item-vague">
          <div class="screen-item">
              <div class="screen-item-tip">订单号</div>
              <div class="screen-item-botton">
              <el-input
                placeholder="请输入订单号"
                v-model="searchForm.order_sn"
                class="screen-item-input"
                size="small"
              >
              </el-input>
              </div>
          </div>
        </div>

        <div class="display-flex shopro-screen-item shopro-screen-item-vague">
          <div class="screen-item">
              <div class="screen-item-tip">入账状态</div>
              <div class="screen-item-botton ">
              <el-select
                v-model="searchForm.status"
                placeholder="请选择分佣状态"
                size="small"
              >
                <el-option
                  :label="sitem.label"
                  :value="sitem.value"
                  v-for="(sitem, indexa) in searchStatusOption"
                  :key="indexa"
                >
                </el-option>
              </el-select>
              </div>
          </div>
        </div>

        <div class="display-flex shopro-screen-item shopro-screen-item-vague">
          <div class="screen-item screen-item-time">
              <div class="screen-item-tip">分佣时间</div>
              <div class="screen-item-times">
                  <el-date-picker
                    v-model="searchForm.createtime"
                    type="datetimerange"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    size="small"
                    format="yyyy-MM-dd HH:mm:ss"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  >
                  </el-date-picker>
              </div>
          </div>
        </div>

        <div class="display-flex shopro-screen-item shopro-screen-item-vague">
          <div class="screen-item shopro-screen-item-button">
              <div class="shopro-button shopro-reset-button">重置</div>
              <div class="shopro-button shopro-screen-button">筛选</div>
          </div>
        </div>
      </div>

      <div class="order-table">
        <div class="table-dashboard-container">
          <div class="table-dashboard-item-container">
            <div class="table-dashboard-item">
              <div class="table-dashboard-item-tip">
                <span class="table-dashboard-item-dot"></span>
                佣金单数:
              </div>
              <div class="table-dashboard-item-form">
                <span class="table-dashboard-item-num">{{
                  dashboard.total
                }}</span>
                <span class="table-dashboard-item-unit">单</span>
              </div>
            </div>
          </div>

          <div class="table-dashboard-item-container">
            <div class="table-dashboard-item">
              <div class="table-dashboard-item-tip">
                <span class="table-dashboard-item-dot dot-2"></span>
                累计佣金:
              </div>
              <div class="table-dashboard-item-form">
                <span class="table-dashboard-item-num">{{
                  dashboard.commission_total
                }}</span>
                <span class="table-dashboard-item-unit">元</span>
              </div>
            </div>
          </div>

          <div class="table-dashboard-item-container">
            <div class="table-dashboard-item">
              <div class="table-dashboard-item-tip">
                <span class="table-dashboard-item-dot dot-3"></span>
                已到账佣金:
              </div>
              <div class="table-dashboard-item-form">
                <span class="table-dashboard-item-num">{{
                  dashboard.commissioned_total
                }}</span>
                <span class="table-dashboard-item-unit">元</span>
              </div>
            </div>
          </div>

          <div class="table-dashboard-item-container">
            <div class="table-dashboard-item">
              <div class="table-dashboard-item-tip">
                <span class="table-dashboard-item-dot dot-4"></span>
                待入账佣金:
              </div>
              <div class="table-dashboard-item-form">
                <span class="table-dashboard-item-num">{{
                  dashboard.delay_total
                }}</span>
                <span class="table-dashboard-item-unit">元</span>
              </div>
            </div>
          </div>

          <div class="table-dashboard-item-container">
            <div class="table-dashboard-item">
              <div class="table-dashboard-item-tip">
                <span class="table-dashboard-item-dot dot-5"></span>
                已退回佣金:
              </div>
              <div class="table-dashboard-item-form">
                <span class="table-dashboard-item-num">{{
                  dashboard.commission_back_total
                }}</span>
                <span class="table-dashboard-item-unit">元</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <el-table
            :data="orderList"
            style="width: 100%"
            ref="multipleTable"
            tooltip-effect="dark"
            border
            stripe
            default-expand-all="true"
          >
            <el-table-column prop="tenantId" width="220" label="订单号">
            </el-table-column>

            <el-table-column prop="commissionRules" min-width="160" label="下单用户">
            </el-table-column>

            <el-table-column prop="commissionRules" min-width="160" label="分销用户">
            </el-table-column>

            <el-table-column min-width="90" prop="commission" label="分佣金额">
            </el-table-column>

            <el-table-column prop="orderId"  width="90" label="入账状态">
            </el-table-column>

            <el-table-column width="90" prop="agentId" label="入账方式">
            </el-table-column>

            <el-table-column prop="updateTime" min-width="160" label="分佣时间">
            </el-table-column>

          </el-table>
        </div>

        <div class="shopro-pagination-container">
          <el-pagination
            align="right" background
            @current-change="rewardCurrentChange"
            @size-change="rewardSizeChange"
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
} from "@/api/commission/commissionreward";
import option from "@/const/commission/commissionreward";
import { mapGetters } from "vuex";
import { getDictionary } from "@/api/system/dict";

export default {
  data() {
    return {
      searchForm: {
        form_1_key: "buyer_id",
        form_1_value: "",

        form_2_key: "agent_id",
        form_2_value: "",

        order_sn: "",
        createtime: "",
        status: "all",

        id: "",
      },
      searchOp: {
        buyer_id: "=",
        buyer_nickname: "like",
        buyer_mobile: "like",

        agent_id: "=",
        agent_nickname: "like",
        agent_mobile: "like",

        order_sn: "like",
        createtime: "range",
        status: "=",

        id: "=",
      },
      searchStatusOption: [
        {
          value: "all",
          label: "全部",
        },
        {
          value: "-1",
          label: "已退回",
        },
        {
          value: "0",
          label: "未入账",
        },
        {
          value: "1",
          label: "已入账",
        },
      ],
      dashboard: {
        total: 0,
        commission_total: 0,
        commissioned_total: 0,
        delay_total: 0,
        commission_back_total: 0,
      },
      orderList: [
        {
          tenantId:'用户Id 订单号',
          commissionRules:'佣金奖励 下单用户 分销用户',
          commission:'佣金 佣金金额',
          orderId:'类型  入账状态',
          agentId:'代理Id 入账方式',
          updateTime:'修改时间 分佣时间',

          // 问题tenantId commissionRules commissionRules

        }
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
    rewardCurrentChange(currentPage) {
      let that = this;
      that.page.currentPage = currentPage;
      that.onLoad(that.page);
    },
    rewardSizeChange(pageSize) {
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
        that.orderList = res.data.data.records;
        console.log(that.orderList)
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
>
@import "@/views/commission/style/commissionreward.scss"; 
</style>

<style lang="scss" scoped>
</style>
