<template>
  <basic-container>
    <!-- 分销商 -->
    <div id="agentIndex" v-cloak v-loading="isAjax">
      <!-- 最上面的tab -->
      <div class="shopro-tabs-container">
        <el-tabs v-model="activeTabsName">
          <el-tab-pane
            v-for="(tabs, i) in tabsList"
            :key="i"
            :label="tabs.label"
            :name="tabs.name"
          ></el-tab-pane>
        </el-tabs>
      </div>

      <!-- 页面头部 -->
      <div class="shopro-screen-container">
        <div class="shopro-button shopro-refresh-button">
          <i class="el-icon-refresh"></i>
        </div>

        <div class="display-flex shopro-screen-item shopro-screen-item-vague">
          <div class="shopro-screen-condition">
            <el-input
              placeholder="请输入内容"
              v-model="searchForm.form_1_value"
              class="input-with-select"
              size="small"
            >
              <el-select
                v-model="searchForm.form_1_key"
                slot="prepend"
                placeholder="请选择"
              >
                <el-option label="会员ID" value="user_id"></el-option>
                <el-option label="会员昵称" value="nickname"></el-option>
                <el-option label="手机号" value="mobile"></el-option>
              </el-select>
            </el-input>
          </div>
        </div>

        <div class="display-flex shopro-screen-item">
          <div class="shopro-screen-tip">分销商等级</div>
          <div class="shopro-screen-condition">
            <el-select
              v-model="searchForm.level"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in agentLevelList"
                :key="item.level"
                :label="item.level"
                :value="item.value"
              >
                <span>{{ item.level }}</span>
              </el-option>
            </el-select>
          </div>
        </div>

        <div
          class="display-flex shopro-screen-item"
          v-if="activeTabsName != 'pending'"
        >
          <div class="shopro-screen-tip">审核状态</div>
          <div class="shopro-screen-condition">
            <el-select
              v-model="searchForm.status"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in agentStatusOptions"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              >
                <!-- <span>{{liem.label}}</span> -->
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="display-flex shopro-screen-item">
          <div class="shopro-screen-tip">更新时间</div>
          <div>
            <el-date-picker
              v-model="searchForm.updatetime"
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
        <div class="display-flex shopro-screen-item-button">
          <div class="shopro-button shopro-reset-button">重置</div>

          <div class="shopro-button shopro-screen-button">筛选</div>
          <!-- type="primary" -->
          <!-- <el-button >筛选</el-button> -->
        </div>
      </div>

      <!-- table页面 -->
      <div class="shopro-table-container" v-loading="isAjaxtable">
        <!-- 分销商 -->
        <el-table
          v-if="activeTabsName == 'all'"
          :data="listData"
          border
          stripe
          :cell-class-name="tableCellClassName"
          :header-cell-class-name="tableCellClassName"
        >
          <el-table-column label="分销商信息" width="220">
            <template slot-scope="scope">
              <div class="display-flex">
                <div class="table-image">
                  <el-image
                    src="https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM5viafIuiciaZxwY5guBR7yJNa6iaN5CexOHZxsMH554A66czQKNuFBuH8InrzNw3WqlrykH8aLibTRXYA/132"
                  >
                  </el-image>
                </div>
                <div class="ellipsis-item">
                  {{ scope.row.tenantId }}
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="手机号" width="120">
            <template slot-scope="scope">
              <div>
                {{ scope.row.applyInfo }}
              </div>
            </template>
          </el-table-column>

          <el-table-column label="等级" width="160">
            <template slot-scope="scope">
              <div class="display-flex">
                <div class="ellipsis-item">
                  <span>普通用户</span>
                  <span>(等级{{ scope.row.level }})</span>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="累计佣金" min-width="100">
            <template slot-scope="scope">
              <div>
                {{ scope.row.totallncome }}<span class="unit-tip-item">元</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="消费金额" min-width="100">
            <template slot-scope="scope">
              <div>
                {{ scope.row.orderMoney }}<span class="unit-tip-item">元</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="上级分销商" min-width="140">
            <template slot-scope="scope">
              <div class="ellipsis-item theme-cursor">
                {{ scope.row.childAgentLevel }}
              </div>
            </template>
          </el-table-column>

          <el-table-column label="一级用户人数" width="120">
            <template slot-scope="scope">
              <div>
                <span
                  >{{ scope.row.childOrderCount }}
                  <span class="unit-tip-item">人</span>
                </span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="创建时间" width="150">
            <template slot-scope="scope">
              <div>
                {{ scope.row.createTime }}
              </div>
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="状态" width="100">
            <template>
              <div class="display-flex">
                <span class="shopro-status-dot shopro-status-normal-dot"></span>
                <span class="shopro-status-special">正常</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" min-width="80">
            <template>
              <div class="theme-cursor" @click="centerdilogprofile=true">查看</div>
            </template>
          </el-table-column>
        </el-table>

        <!-- 代审核 -->
        <el-table
          v-if="activeTabsName == 'pending'"
          :data="listData"
          border
          stripe
          :cell-class-name="tableCellClassName2"
          :header-cell-class-name="tableCellClassName2"
        >
          <el-table-column label="分销商信息" min-width="240">
            <template slot-scope="scope">
              <div class="display-flex">
                <div class="table-image">
                  <el-image
                    src="https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM5viafIuiciaZxwY5guBR7yJNa6iaN5CexOHZxsMH554A66czQKNuFBuH8InrzNw3WqlrykH8aLibTRXYA/132"
                  >
                  </el-image>
                </div>
                <div class="ellipsis-item">
                  {{ scope.row.tenantId }}
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="资料审核" width="160">
            <template slot-scope="scope">
              <div>
                {{ scope.row.level }}
              </div>
            </template>
          </el-table-column>

          <el-table-column label="等级" min-width="160">
            <template slot-scope="scope">
              <div class="display-flex">
                <div class="ellipsis-item">
                  <span>普通用户</span>
                  <span>(等级{{ scope.row.level }})</span>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="上级分销商" min-width="140">
            <template slot-scope="scope">
              <div>
                {{ scope.row.childAgentLevel
                }}<span class="unit-tip-item">元</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="消费金额" width="140">
            <template slot-scope="scope">
              <div>
                {{ scope.row.orderMoney }}<span class="unit-tip-item">元</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="推广人数" width="140">
            <template slot-scope="scope">
              <div class="ellipsis-item theme-cursor">
                {{ scope.row.level }}
              </div>
            </template>
          </el-table-column>

          <el-table-column label="提交次数" width="100">
            <template slot-scope="scope">
              <div>
                <span
                  >{{ scope.row.child_user_count_1 }}
                  <span class="unit-tip-item">人</span>
                </span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="更新时间" width="150">
            <template slot-scope="scope">
              <div>
                {{ scope.row.updateTime }}
              </div>
            </template>
          </el-table-column>

          <el-table-column label="创建时间" width="150">
            <template slot-scope="scope">
              <div>
                {{ scope.row.createTime }}
              </div>
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" min-width="220">
            <template slot-scope="scope">
              <div>
                <span @click="centerdilogprofile=true" class="theme-cursor" style="margin-right: 14px">
                  查看
                </span>
                <span
                  style="margin-right: 14px; cursor: pointer; color: #687ff4"
                  v-if="
                    scope.row.info_status == 0 || scope.row.info_status == -1
                  "
                  >辅助填写</span
                >
                <span
                  class="shopro-edit-text"
                  v-if="
                    scope.row.info_status == 0 || scope.row.info_status == 1
                  "
                  >同意</span
                >
                <span
                  class="shopro-edit-text"
                  v-if="scope.row.info_status == null"
                  >同意</span
                >
                <span
                  class="agent-apply-item-tip-delete"
                  v-if="scope.row.info_status == 1"
                  >驳回</span
                >
                <span
                  class="shopro-delete-text"
                  slot="reference"
                  v-if="scope.row.info_status == 1"
                  >删除</span
                >
              </div>
            </template>
          </el-table-column>
        </el-table>

        <!-- 待升级 -->
        <el-table
          v-if="activeTabsName == '1'"
          :data="listData"
          border
          stripe
          :cell-class-name="tableCellClassName3"
          :header-cell-class-name="tableCellClassName3"
        >
          <el-table-column label="分销商名称" min-width="240">
            <template slot-scope="scope">
              <div class="display-flex">
                <div class="table-image">
                  <el-image
                    src="https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM5viafIuiciaZxwY5guBR7yJNa6iaN5CexOHZxsMH554A66czQKNuFBuH8InrzNw3WqlrykH8aLibTRXYA/132"
                  >
                  </el-image>
                </div>
                <div class="ellipsis-item">
                  {{ scope.row.tenantId }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="当前等级" min-width="160">
            <template slot-scope="scope">
              <div>
                {{ scope.row.level }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="升级之后的等级" min-width="160">
            <template slot-scope="scope">
              <div class="display-flex">
                <div class="ellipsis-item">
                  <span>普通用户</span>
                  <span>(等级{{ scope.row.level }})</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="160">
            <template slot-scope="scope">
              <div>
                {{ scope.row.createTime }}<span class="unit-tip-item">元</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="消费金额(元)" min-width="140">
            <template slot-scope="scope">
              <div>
                {{ scope.row.orderMoney }}<span class="unit-tip-item">元</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="推广人数" width="140">
            <template slot-scope="scope">
              <div class="ellipsis-item theme-cursor">
                {{ scope.row.level }}
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="190">
            <template slot-scope="scope">
              <div>
                <span
                  class="shopro-edit-text color-0ACE97"
                  v-if="scope.row.level_status_text"
                  @click="
                    operation(
                      'update-agree',
                      scope.row.user_id,
                      scope.row.level_status
                    )
                  "
                  >同意</span
                >
                <span
                  style="margin-right: 12px"
                  v-if="!scope.row.level_status_text"
                  >未找到等级</span
                >
                <span
                  class="shopro-delete-text"
                  v-if="scope.row.level_status != 0"
                  @click="operation('update-refuse', scope.row.user_id, 0)"
                  >{{ scope.row.level_status_text ? "拒绝" : "删除" }}</span
                >
                <span
                  class="shopro-edit-text theme-cursor"
                  @click="centerdilogprofile = true"
                  >查看</span
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- pag页码 分页器 -->
      <div class="shopro-pagination-container">
        <el-pagination
          align="right" background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        >
        </el-pagination>
      </div>

      <!-- eldialog 跳转组件 -->
      <el-dialog
        append-to-body="ture"
        :visible.sync="centerdilogprofile"
        width="80%"
        center
      >
      <profile></profile>
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
} from "@/api/commission/commissionagent";
import option from "@/const/commission/commissionagent";
import { mapGetters } from "vuex";
import profile from "./components/commissionagent/profile.vue";
import { getDictionary } from "@/api/system/dict";

export default {
  components: { profile },
  data() {
    return {
      // 模拟数据

      // 原网站属性
      agentStatusOptions: [
        {
          value: "all",
          label: "全部",
        },
        {
          value: "normal",
          label: "正常",
        },
        {
          value: "forbidden",
          label: "禁用",
        },
        {
          value: "pending",
          label: "审核中",
        },
        {
          value: "freeze",
          label: "冻结",
        },
      ],
      activeTabsName: "all",
      tabsList: [
        {
          name: "all",
          label: "分销商",
        },
        {
          name: "pending",
          label: "待审核",
        },
        {
          name: "1",
          label: "待升级",
        },
      ],
      // agentLevelList: [],
      // 模拟数据
      agentLevelList: [
        { level: "等级1", value: "all" },
        { level: "等级2", value: "2" },
        { level: "等级3", value: "3" },
        { level: "等级4", value: "4" },
        { level: "等级5", value: "5" },
        { level: "等级6", value: "6" },
      ],
      // form搜索
      searchForm: {
        status: "all",
        level: "all",
        updatetime: [],

        form_1_key: "user_id",
        form_1_value: "",

        level_status: "all",
      },
      searchFormInit: {
        status: "all",
        level: "all",
        updatetime: [],
        form_1_key: "user_id",
        form_1_value: "",
        level_status: "all",
      },
      searchOp: {
        status: "=",
        updatetime: "range",
        level: "=",
        user_id: "=",
        nickname: "like",
        mobile: "like",
        level_status: ">",
      },
      listData: [
        {
          tenantId: "用户",
          // 等级
          level: 1,
          applyInfo: "电话",
          totallncome: "累计收入",
          orderMoney: "消费金额",
          childAgentLevel: "上级分销商",
          childOrderCount: 1,
          createTime: "创建时间",
          updateTime: "更新时间",

          // 审核资料 待定
          // 推广人数 待定
          // 提交次数 待定
        },
      ],

      centerdilogprofile:false,

      // 自带生成元素
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
    searchHide() {
      this.search = !this.search;
    },
    searchChange() {
      this.onLoad(this.page);
    },
    searchReset() {
      this.query = {};
      this.page.currentPage = 1;
      this.onLoad(this.page);
    },
    handleSubmit() {
      if (!this.form.id) {
        add(this.form).then(() => {
          this.box = false;
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
      } else {
        update(this.form).then(() => {
          this.box = false;
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
      }
    },
    handleAdd() {
      this.title = "新增";
      this.form = {};
      this.box = true;
    },
    handleEdit(row) {
      this.title = "编辑";
      this.box = true;
      getDetail(row.id).then((res) => {
        this.form = res.data.data;
      });
    },
    handleView(row) {
      this.title = "查看";
      this.view = true;
      this.box = true;
      getDetail(row.id).then((res) => {
        this.form = res.data.data;
      });
    },

    handleDelete() {
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return remove(this.ids);
        })
        .then(() => {
          this.selectionClear();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
    },

    rowDel(row) {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return remove(row.id);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
    },
    beforeClose(done) {
      done();
      this.form = {};
      this.view = false;
    },
    selectionChange(list) {
      this.selectionList = list;
    },
    selectionClear() {
      this.selectionList = [];
      // this.$refs.table.clearSelection();
    },
      
    // 分页器 
    handleCurrentChange(currentPage) {
      let that = this;
      that.page.currentPage = currentPage;
      that.onLoad(that.page);
    },
    handleSizeChange(pageSize) {
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
        that.listData = res.data.data.records;
        // console.log("data数据", res);
        // that.page.total = data.total;
        // this.data = data.records;
        that.loading = false;
        // this.selectionClear();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/views/commission/style/commissionagent.scss";
</style>

<style lang="scss">
// 修改element
.el-card__body {
  padding: 0 20px;
}
.shopro-tabs-container .el-tabs__nav-scroll {
  padding: 0 20px;
}
.shopro-tabs-container .el-tabs__item {
  width: 100px;
  padding: 0;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.shopro-tabs-container .el-tabs__active-bar {
  width: 80px !important;
  left: 10px;
}
</style>
