<template>
  <div id="agentTeam" v-cloak>
    <!-- id编号 -->
    <div class="crumbs-item-container shopro-container-scrollbar">
      <span class="crumbs-item-1">1245</span>
      <span class="crumbs-item">
        <i class="el-icon-arrow-right"></i>
        <span class="crumbs-item-id">2255</span>
      </span>
    </div>
    <!-- 查询功能 -->
    <div class="display-flex flex-between">
      <div class="shopro-screen-container display-flex display-flex-d">
        <div class="display-flex shopro-screen-item">
          <div class="shopro-screen-condition">
            <el-input
              placeholder="请输入内容"
              v-model="searchForm.form_1_value"
              size="small"
            >
              <el-select
                class="input-with-select"
                v-model="searchForm.form_1_key"
                slot="prepend"
                placeholder="请选择"
              >
                <el-option label="会员ID" value="id"></el-option>
                <el-option label="会员昵称" value="nickname"></el-option>
                <el-option label="会员手机号" value="mobile"></el-option>
              </el-select>
            </el-input>
          </div>
        </div>
        <div class="display-flex shopro-screen-item">
          <div class="shopro-screen-tip">分销商等级</div>
          <div class="shopro-screen-condition shopro-screen-condition-1">
            <el-select
              v-model="searchForm.level"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in agentLevelList"
                :key="item.level"
                :label="item.name + '(等级' + item.level + ')'"
                :value="item.level"
              >
                {{ item.name }}(等级{{ item.level }})
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="display-flex shopro-screen-item">
        <el-popover placement="bottom" width="170" trigger="click">
          <div class="el-popover-container shopro-container-scrollbar">
            <el-checkbox-group v-model="dashboardIdList">
              <el-checkbox
                :label="item.value"
                v-for="(item, indexa) in this.dashboardList"
                :key="indexa"
              >
                {{ item.label }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
          <span slot="reference" class="el-icon-container">
            <i class="el-icon-s-grid"></i>
            <i class="el-icon-caret-bottom"></i>
          </span>
        </el-popover>
      </div>
    </div>

    <!-- table表 -->
    <div v-loading="teamAjax">
      <div style="margin-bottom: 14px">
        <el-table :data="parent_user" border>
          <template v-for="(item, index) in columns">
            <el-table-column
              :key="index"
              :fixed="item.fixed"
              :prop="item.field"
              :align="item.align ? item.align : 'center'"
              :min-width="item.width"
            >
              <template slot="header">
                <div>
                  {{
                    item.field == "avatar-nickname" ? "当前用户" : item.title
                  }}
                </div>
              </template>

              <template slot-scope="scope">
                <template>
                  <div
                    class="display-flex"
                    v-if="item.type == 'vhtml'"
                    v-html="
                      item.formatter(scope.row, item.outterfield, item.field)
                    "
                  ></div>
                  <div
                    class="display-flex"
                    v-if="item.type == 'click'"
                    v-html="
                      item.formatter(scope.row, item.outterfield, item.field)
                    "
                  ></div>
                  <div v-if="item.type == 'vmodel'">
                    {{ scope.row[item.field] }}
                  </div>
                </template>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>

      <div class="shopro-table-container">
        <el-table :data="teamList" border>
          <template v-for="(item, index) in columns">
            <el-table-column
              :key="index"
              :fixed="item.fixed"
              :prop="item.field"
              :align="item.align ? item.align : 'center'"
              :min-width="item.width"
              v-if="dashboardIdList.includes(item.field)"
            >
              <template slot="header">
                <div>
                  {{ item.title }}
                </div>
              </template>
              <template slot-scope="scope">
                <template>
                  <div
                    class="display-flex"
                    v-if="item.type == 'vhtml'"
                    v-html="
                      item.formatter(scope.row, item.outterfield, item.field)
                    "
                  ></div>
                  <div
                    class="display-flex"
                    style="cursor: pointer; color: #8644f2"
                    v-if="item.type == 'click'"
                    v-html="
                      item.formatter(scope.row, item.outterfield, item.field)
                    "
                    @click="operation('clickteam', scope.row.id)"
                  ></div>
                  <div v-if="item.type == 'vmodel'">
                    {{ scope.row[item.field] }}
                  </div>
                </template>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </div>
    
    </div>

    <div class="shopro-pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        pager-count="5"
        :current-page="currentPage"
        :page-size="limit"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
      >
      </el-pagination>
    </div>

    <div style="height:50px;"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        level: "",
        form_1_key: "id",
        form_1_value: "",
      },
      agentLevelList: [
        { name: "普通用户", level: 1 },
        { name: "省", level: 2 },
        { name: "市代理", level: 3 },
        { name: "金牌合伙人", level: 4 },
        { name: "银牌合伙人", level: 5 },
        { name: "铜牌合伙人", level: 6 },
        { name: "领导人", level: 7 },
        { name: "合作伙伴", level: 8 },
      ],
      dashboardIdList: [
        "id",
        "avatar-nickname",
        "level",
        "status",
        "child_user_count",
        "child_user_count_1",
        "child_user_count_2",
        "child_agent_count",
        "child_agent_count_1",
        "child_agent_count_2",
        "child_order_money",
        "child_order_money_1",
        "child_order_money_2",
        "order_money",
        "child_order_count",
        "child_order_count_1",
        "child_order_count_2",
        "order_count",
        "total_income",
        "delay_money",
        "total_consume",
        "createtime",
      ],
      dashboardList: [
        {
          label: "ID",
          value: "id",
        },
        {
          label: "团队用户",
          value: "avatar-nickname",
        },
        {
          label: "等级",
          value: "level",
        },
        {
          label: "状态",
          value: "status",
        },
        {
          label: "团队人数",
          value: "child_user_count",
        },
        {
          label: "一级团队人数",
          value: "child_user_count_1",
        },
        {
          label: "二级团队人数",
          value: "child_user_count_2",
        },
        {
          label: "分销商人数",
          value: "child_agent_count",
        },
        {
          label: "一级分销商人数",
          value: "child_agent_count_1",
        },
        {
          label: "二级分销商人数",
          value: "child_agent_count_2",
        },
        {
          label: "团队分销总额",
          value: "child_order_money",
        },
        {
          label: "一级分销总额",
          value: "child_order_money_1",
        },
        {
          label: "二级分销总额",
          value: "child_order_money_2",
        },
        {
          label: "直推分销总额",
          value: "order_money",
        },
        {
          label: "团队分销订单",
          value: "child_order_count",
        },
        {
          label: "一级分销订单",
          value: "child_order_count_1",
        },
        {
          label: "二级分销订单",
          value: "child_order_count_2",
        },
        {
          label: "直推分销订单",
          value: "order_count",
        },
        {
          label: "累计佣金",
          value: "total_income",
        },
        {
          label: "消费金额",
          value: "delay_money",
        },
        {
          label: "待入账佣金",
          value: "total_consume",
        },
        {
          label: "加入时间",
          value: "createtime",
        },
      ],
      columns: [
        {
          type: "vmodel",
          field: "id",
          title: "ID",
          width: "70px",
        },
        {
          type: "click",
          field: "avatar-nickname",
          title: "团队用户",
          width: "160px",
          align: "left",
        },
        {
          type: "vhtml",
          field: "level",
          title: "等级",
          width: "180px",
          align: "left",
        },
        {
          type: "vhtml",
          field: "status",
          title: "状态",
          width: "60px",
        },
        {
          type: "vhtml",
          field: "child_user_count",
          title: "团队人数",
          width: "120px",
        },
        {
          type: "vhtml",
          field: "child_user_count_1",
          title: "一级团队人数",
          width: "120px",
        },
        {
          type: "vhtml",
          field: "child_user_count_2",
          title: "二级团队人数",
          width: "120px",
        },
        {
          type: "vhtml",
          field: "child_agent_count",
          outterfield: "agent",
          title: "分销商人数",
          width: "120px",
        },
        {
          type: "vhtml",
          field: "child_agent_count_1",
          outterfield: "agent",
          title: "一级分销商人数",
          width: "120px",
        },
        {
          type: "vhtml",
          field: "child_agent_count_2",
          outterfield: "agent",
          title: "二级分销商人数",
          width: "120px",
        },
        {
          type: "vhtml",
          field: "child_order_money",
          outterfield: "agent",
          title: "团队分销总额",
          width: "120px",
        },
        {
          type: "vhtml",
          field: "child_order_money_1",
          outterfield: "agent",
          title: "一级分销总额",
          width: "120px",
        },
        {
          type: "vhtml",
          field: "child_order_money_2",
          outterfield: "agent",
          title: "二级分销总额",
          width: "120px",
        },
        {
          type: "vhtml",
          field: "order_money",
          outterfield: "agent",
          title: "直推分销总额",
          width: "120px",
        },
        {
          type: "vhtml",
          field: "child_order_count",
          outterfield: "agent",
          title: "团队分销订单",
          width: "120px",
        },
        {
          type: "vhtml",
          field: "child_order_count_1",
          outterfield: "agent",
          title: "一级分销订单",
          width: "120px",
        },
        {
          type: "vhtml",
          field: "child_order_count_2",
          outterfield: "agent",
          title: "二级分销订单",
          width: "120px",
        },
        {
          type: "vhtml",
          field: "order_count",
          outterfield: "agent",
          title: "直推分销订单",
          width: "120px",
        },
        {
          type: "vhtml",
          field: "total_income",
          outterfield: "agent",
          title: "累计佣金",
          width: "120px",
        },
        {
          type: "vhtml",
          field: "delay_money",
          outterfield: "agent",
          title: "消费金额",
          width: "120px",
        },
        {
          type: "vhtml",
          field: "total_consume",
          title: "待入账佣金",
          width: "120px",
        },
        {
          type: "vhtml",
          field: "createtime",
          outterfield: "agent",
          title: "加入时间",
          width: "160px",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
@import "@/views/commission/style/commissionagent/team.scss";
</style>

<style lang="scss"></style>
