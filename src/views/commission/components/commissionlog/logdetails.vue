<template>
  <div id="logdetails">
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

          <el-table-column
            prop="commissionRules"
            min-width="160"
            label="下单用户"
          >
          </el-table-column>

          <el-table-column
            prop="commissionRules"
            min-width="160"
            label="分销用户"
          >
          </el-table-column>

          <el-table-column min-width="90" prop="commission" label="分佣金额">
          </el-table-column>

          <el-table-column prop="orderId" width="90" label="入账状态">
          </el-table-column>

          <el-table-column width="90" prop="agentId" label="入账方式">
          </el-table-column>

          <el-table-column prop="updateTime" min-width="160" label="分佣时间">
          </el-table-column>
        </el-table>
      </div>

      <div class="shopro-pagination-container">
        <el-pagination
          align="right"
          background
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
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/views/commission/style/commissionlog/logdetails.scss";
</style>

<style lang="scss" scoped></style>
