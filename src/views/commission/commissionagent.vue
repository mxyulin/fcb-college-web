<template>
  <basic-container>
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
            <el-select v-model="searchForm.level" placeholder="请选择" size="small">
              <el-option
                v-for="item in agentLevelList"
                :key="item.level"
                :value="item.level"
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
            <el-select v-model="searchForm.status" placeholder="请选择" size="small">
              <el-option 
              v-for="item in agentStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
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
                  <!-- <el-image
                    src="scope.row.img"
                  >
                  </el-image> -->
                </div>
                <div class="ellipsis-item">
                  {{ scope.row.name }}
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="手机号" width="120">
            <template slot-scope="scope">
              <div>
                {{ scope.row.phone }}
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
                {{ scope.row.total_income
                }}<span class="unit-tip-item">元</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="消费金额" min-width="100">
            <template slot-scope="scope">
              <div>
                {{ scope.row.total_consume
                }}<span class="unit-tip-item">元</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="上级分销商" min-width="140">
            <template slot-scope="scope">
              <div class="ellipsis-item theme-cursor">
                {{ scope.row.parent_agent }}
              </div>
            </template>
          </el-table-column>

          <el-table-column label="一级用户人数" width="120">
            <template slot-scope="scope">
              <div>
                <span
                  >{{ scope.row.child_user_count_1 }}
                  <span class="unit-tip-item">人</span>
                </span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="创建时间" width="150">
            <template slot-scope="scope">
              <div>
                {{ scope.row.createtime }}
              </div>
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="状态" width="100">
            <template>
              <div class="display-flex">正常</div>
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" min-width="80">
            <template>
              <div>查看</div>
            </template>
          </el-table-column>
        </el-table>

        <!-- 代审核 -->
        <el-table
          v-if="activeTabsName == 'pending'"
          :data="listData2"
          border
          stripe
          :cell-class-name="tableCellClassName2"
          :header-cell-class-name="tableCellClassName2"
        >
          <el-table-column label="分销商信息" min-width="240">
            <template slot-scope="scope">
              <div class="display-flex">
                <div class="table-image">
                  <!-- <el-image
                    src="scope.row.img"
                  >
                  </el-image> -->
                </div>
                <div class="ellipsis-item">
                  {{ scope.row.name }}
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="资料审核" width="160">
            <template slot-scope="scope">
              <div>
                {{ scope.row.phone }}
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
                {{ scope.row.total_income
                }}<span class="unit-tip-item">元</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="消费金额" width="140">
            <template slot-scope="scope">
              <div>
                {{ scope.row.total_consume
                }}<span class="unit-tip-item">元</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="推广人数" width="140">
            <template slot-scope="scope">
              <div class="ellipsis-item theme-cursor">
                {{ scope.row.parent_agent }}
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
                {{ scope.row.createtime }}
              </div>
            </template>
          </el-table-column>

          <el-table-column label="创建时间" width="150">
            <template slot-scope="scope">
              <div>
                {{ scope.row.tcreatetime }}
              </div>
            </template>
          </el-table-column>

          <el-table-column fixed="right" label="操作" min-width="220">
            <template slot-scope="scope">
              <div>
                <span
                  class="theme-cursor"
                  style="margin-right: 14px"
                  @click="operation('edit', scope.row.user_id)"
                >
                  查看
                </span>
                <span
                  style="margin-right: 14px; cursor: pointer; color: #687ff4"
                  v-if="
                    scope.row.info_status == 0 || scope.row.info_status == -1
                  "
                  @click="operation('edit', scope.row.user_id)"
                  >辅助填写</span
                >
                <span
                  class="shopro-edit-text"
                  v-if="
                    scope.row.info_status == 0 || scope.row.info_status == 1
                  "
                  @click="operation('agree', scope.row.user_id, scope.row)"
                  >同意</span
                >
                <span
                  class="shopro-edit-text"
                  v-if="scope.row.info_status == null"
                  @click="operation('agree-null-status', scope.row.user_id)"
                  >同意</span
                >
                <span
                  class="agent-apply-item-tip-delete"
                  v-if="scope.row.info_status == 1"
                  @click="operation('reject', scope.row.user_id)"
                  >驳回</span
                >
                <span
                  class="shopro-delete-text"
                  slot="reference"
                  v-if="scope.row.info_status == 1"
                  @click="operation('del', scope.row.user_id)"
                  >删除</span
                >
              </div>
            </template>
          </el-table-column>
        </el-table>

        <!-- 待升级 -->
        <el-table
          v-if="activeTabsName == '1'"
          :data="listData3"
          border
          stripe
          :cell-class-name="tableCellClassName3"
          :header-cell-class-name="tableCellClassName3"
        >
          <el-table-column label="分销商名称" min-width="240">
            <template slot-scope="scope">
              <div class="display-flex">
                <div class="table-image">
                  <!-- <el-image
                    src="scope.row.img"
                  >
                  </el-image> -->
                </div>
                <div class="ellipsis-item">
                  {{ scope.row.name }}
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="当前等级" min-width="160">
            <template slot-scope="scope">
              <div>
                {{ scope.row.phone }}
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
                {{ scope.row.total_income
                }}<span class="unit-tip-item">元</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="消费金额(元)" min-width="140">
            <template slot-scope="scope">
              <div>
                {{ scope.row.total_consume
                }}<span class="unit-tip-item">元</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="推广人数" width="140">
            <template slot-scope="scope">
              <div class="ellipsis-item theme-cursor">
                {{ scope.row.parent_agent }}
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
                  class="shopro-edit-text"
                  @click="operation('edit', scope.row.user_id)"
                  >查看</span
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- pag页码 -->
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
import { getDictionary } from "@/api/system/dict";

export default {
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
        { level: "等级1" },
        { level: "等级2" },
        { level: "等级3" },
        { level: "等级4" },
        { level: "等级5" },
        { level: "等级6" },
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
      // listData:[],//listData2和listData3都是listData
      // listData模拟数据 注意user干什么的
      listData: [
        {
          img: "",
          name: "遇见预见1",
          phone: "1234566467",
          level: "1",
          total_income: "12.12",
          total_consume: "13.13",
          parent_agent: "aa",
          child_user_count_1: "1",
          createtime: "2022-11-11 10:54:08",
        },
        {
          img: "",
          name: "遇见预见2",
          phone: "1234562357",
          level: "1",
          total_income: "22.12",
          total_consume: "15.13",
          parent_agent: "ba",
          child_user_count_1: "1",
          createtime: "2022-11-11 10:54:08",
        },
        {
          img: "",
          name: "遇见预见3",
          phone: "1234565327",
          level: "1",
          total_income: "32.12",
          total_consume: "16.13",
          parent_agent: "ca",
          child_user_count_1: "1",
          createtime: "2022-11-11 10:54:08",
        },
        {
          img: "",
          name: "遇见预见4",
          phone: "123452367",
          level: "1",
          total_income: "42.12",
          total_consume: "173.13",
          parent_agent: "da",
          child_user_count_1: "1",
          createtime: "2022-11-11 10:54:08",
        },
      ],
      listData2: [
        {
          img: "",
          name: "遇见预见1",
          phone: "无需等级",
          level: "等级1",
          total_income: "qq",
          total_consume: "13.13",
          parent_agent: "1",
          child_user_count_1: "1",
          createtime: "2022-11-11 10:54:08",
          tcreatetime: "2032-11-11 10:54:08",
        },
        {
          img: "",
          name: "遇见预见2",
          phone: "无需等级",
          level: "等级1",
          total_income: "bb",
          total_consume: "15.13",
          parent_agent: "2",
          child_user_count_1: "1",
          createtime: "2022-11-11 10:54:08",
          tcreatetime: "2022-11-11 10:54:08",
        },
        {
          img: "",
          name: "遇见预见3",
          phone: "无需等级",
          level: "等级1",
          total_income: "cc",
          total_consume: "16.13",
          parent_agent: "3",
          child_user_count_1: "1",
          createtime: "2022-11-11 10:54:08",
          tcreatetime: "2052-11-11 10:54:08",
        },
        {
          img: "",
          name: "遇见预见4",
          phone: "无需等级",
          level: "等级1",
          total_income: "ee",
          total_consume: "173.13",
          parent_agent: "4",
          child_user_count_1: "1",
          createtime: "2022-11-11 10:54:08",
          tcreatetime: "2622-11-11 10:54:08",
        },
      ],
      listData3: [
        {
          img: "",
          name: "遇见预见1",
          phone: "无需等级",
          level: "等级1",
          total_income: "2032-11-11 10:54:08",
          total_consume: "13.13",
          parent_agent: "1",
        },
        {
          img: "",
          name: "遇见预见2",
          phone: "无需等级",
          level: "等级1",
          total_income: "2052-11-11 10:54:08",
          total_consume: "15.13",
          parent_agent: "2",
        },
        {
          img: "",
          name: "遇见预见3",
          phone: "无需等级",
          level: "等级1",
          total_income: "2082-11-11 10:54:08",
          total_consume: "16.13",
          parent_agent: "3",
        },
      ],

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
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
      this.onLoad(this.page);
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.onLoad(this.page);
    },
    onLoad(page, params = {}) {
      // this.loading = true;
      // getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
      //   let data = res.data.data;
      //   console.log('data1',data)
      //   console.log('data2',res)
      //   // this.page.total = data.total;
      //   // this.data = data.records;
      //   // this.loading = false;
      //   // this.selectionClear();
      // });
    },
  },
};
</script>

<style
  lang="scss"
  scoped
  src="@/views/commission/style/commissionagent.scss"
></style>

<style lang="scss">
// 修改element
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
