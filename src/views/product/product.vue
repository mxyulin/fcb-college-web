<template>
  <basic-container>
    <!-- 查询 -->
    <Query :page="page" :search="search" @getGoodsData="getGoodsData" />
    <!--  -->
    <el-row :gutter="0" type="flex" justify="space-between">
      <el-col :span="2">
        <el-button
          :size="option.size"
          type="primary"
          icon="el-icon-plus"
          @click="addHandler"
          class="create-btn"
          >新增</el-button
        >
      </el-col>
      <el-col :span="20">
        <el-radio-group
          v-model="activeStatus"
          :size="option.size"
          fill="primary"
          class="sort-btn-group"
        >
          <el-radio-button :label="3">全部</el-radio-button>
          <el-radio-button :label="1">已上架</el-radio-button>
          <el-radio-button :label="2">已下架</el-radio-button>
          <el-radio-button :label="0">已隐藏</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col :span="2">
        <el-button
          :size="option.size"
          icon="el-icon-refresh"
          @click="getGoodsData"
          class="refresh-btn"
          circle
        ></el-button>
        <el-button
          :size="option.size"
          icon="el-icon-search"
          @click="search = !search"
          class="refresh-btn"
          circle
        ></el-button>
      </el-col>
    </el-row>
    <!-- 列表模块 -->
    <el-row :gutter="0">
      <div v-loading="loading">
        <el-table
          stripe
          ref="table"
          height="70vh"
          style="width: 100%"
          tooltip-effect="dark"
          :data="goodsData"
          :size="option.size"
          :header-cell-style="{ background: '#FAFAFA' }"
          @selection-change="selectionChange"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column label="商品" min-width="100">
            <template slot-scope="scope">
              <div class="display-flex goods-name">
                <!-- 商品图 -->
                <div>
                  <el-image
                    fit="contain"
                    class="image-slot"
                    style="width: 58px; height: 58px"
                    :src="scope.row.image"
                    :preview-src-list="[scope.row.image]"
                  >
                    <div slot="error">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
                <!-- 商品名和规格 -->
                <div>
                  <div
                    class="ellipsis-item"
                    style="margin-top: 8px; line-height: 1"
                  >
                    {{ scope.row.title }}
                  </div>
                  <div style="margin-top: 13px">
                    <span
                      v-if="scope.row.isSku == 1"
                      style="color: #444; margin-right: 12px; line-height: 20px"
                    >
                      {{ scope.row.isSku == 1 ? "多规格" : "" }}
                    </span>
                    <div
                      v-if="scope.row.activity_type || scope.row.app_type"
                      class="activity-type display-flex"
                    >
                      <div
                        v-if="scope.row.app_type"
                        class="activity-tags full-activity-tag"
                      >
                        {{ scope.row.app_type_text }}
                      </div>
                      <!-- 暂不使用 -->
                      <!-- <template
                          v-for="(b, a) in scope.row.activity_type_text_arr"
                        >
                          <template v-if="a == 'groupon'">
                            <div class="activity-tags groupon-activity-tag">
                              拼团
                            </div>
                          </template>
                          <div
                            v-if="a == 'seckill'"
                            class="activity-tags seckill-activity-tag"
                          >
                            {{ b }}
                          </div>
                          <div
                            v-if="
                              a == 'full_reduce' ||
                              a == 'full_discount' ||
                              a == 'free_shipping'
                            "
                            class="activity-tags full-activity-tag"
                          >
                            {{ b }}
                          </div>
                        </template> -->
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="价格" min-width="100" sortable>
          </el-table-column>
          <el-table-column prop="sales" label="销量" min-width="100" sortable>
          </el-table-column>
          <el-table-column prop="views" label="浏览量" min-width="100" sortable>
          </el-table-column>
          <el-table-column prop="stock" label="库存" min-width="100" sortable>
          </el-table-column>
          <el-table-column label="更新时间" min-width="100">
            <template slot-scope="scope">
              <div>
                {{ scope.row.updateTime }}
              </div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="180">
            <template slot-scope="scope">
              <!-- 上架的下拉菜单 -->
              <el-popover placement="bottom" trigger="hover" width="150">
                <div class="display-flex status-box">
                  <el-button
                    plain
                    type="primary"
                    class="common-btn status-btn"
                    v-if="scope.row.status != 1"
                    @click="updateStatus(scope.row.id, 1)"
                  >
                    上架
                  </el-button>
                  <el-button
                    plain
                    type="warning"
                    class="common-btn status-btn"
                    v-if="scope.row.status != 2"
                    @click="updateStatus(scope.row.id, 2)"
                  >
                    下架
                  </el-button>
                  <el-button
                    plain
                    type="info"
                    class="common-btn status-btn"
                    v-if="scope.row.status != 0"
                    @click="updateStatus(scope.row.id, 0)"
                  >
                    隐藏
                  </el-button>
                </div>
                <!-- 上架按钮 -->
                <span
                  slot="reference"
                  style="cursor: pointer; margin-right: 5px"
                >
                  <el-button
                    icon="icon-move-up"
                    type="text"
                    v-if="scope.row.status == 1"
                    >上架
                  </el-button>
                  <el-button
                    icon="icon-move-down"
                    type="text"
                    v-if="scope.row.status == 2"
                    >下架
                  </el-button>
                  <el-button
                    icon="icon-hideinvisiblehidden"
                    type="text"
                    v-if="scope.row.status == 0"
                    >隐藏
                  </el-button>
                </span>
              </el-popover>
              <!-- 编辑 -->
              <el-button
                type="text"
                icon="el-icon-edit"
                @click="handleEdit(scope.row)"
                >编辑
              </el-button>
              <!-- 复制 -->
              <el-button
                type="text"
                icon="el-icon-s-order"
                @click="copyGoods(scope.row)"
                >复制
              </el-button>
              <!-- 删除 -->
              <el-button
                type="text"
                icon="el-icon-delete"
                @click="rowDel(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>
    <el-row
      :gutter="0"
      type="flex"
      justify="space-between"
      style="margin-top: 20px"
    >
      <!-- 底部按钮组 -->
      <el-col :span="12">
        <el-button
          plain
          type="success"
          :size="option.size"
          @click="slectedAction('up')"
          v-if="activeStatus != 1"
          >上架</el-button
        >
        <el-button
          plain
          type="warning"
          :size="option.size"
          @click="slectedAction('down')"
          v-if="activeStatus != 2"
          >下架</el-button
        >
        <el-button
          plain
          type="danger"
          :size="option.size"
          @click="selectionsDelete()"
          >删除</el-button
        >
      </el-col>
      <!-- 分页模块 -->
      <el-col :span="9">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          :page-size="page.pageSize"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          @size-change="onSizeChange"
          @current-change="onCurrentChange"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 表单模块 -->
    <product-form
      ref="form"
      :title="title"
      :currentRow="currentRow"
      :dialogFormVisible.sync="dialogFormVisible"
      @getGoodsData="getGoodsData"
    />
  </basic-container>
</template>

<script>
import {
  getList,
  add,
  slectionsUpdate,
  remove,
} from "@/api/product/product";
import option from "@/const/product/product";
import Query from "@/views/product/components/query";
import ProductForm from "@/views/product/components/productform";
import { mapGetters } from "vuex";

export default {
  components: {
    Query,
    ProductForm,
  },
  data() {
    return {
      title: "",
      dialogFormVisible: false,
      currentRow: null,
      // 是否查询
      search: true,
      // 加载中
      loading: true,
      // 商品上架状态(3是全部展示)
      activeStatus: 3,
      // 分页信息
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 40,
      },
      // 选择行
      selectionList: [],
      // 表单配置
      option: option,
      // 是否展示筛选面板
      chooseType: false,
      // 商品源数据
      goodsData: [],
    };
  },
  mounted() {
    this.getGoodsData();
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
  watch: {
    // 根据上架状态拉取商品数据
    activeStatus() {
      this.getGoodsData();
    },
  },
  methods: {
    // 获取商品数据
    getGoodsData(params = {}) {
      let that = this; 
      let { activeStatus } = that;
      that.loading = true;
      getList(that.page.currentPage, that.page.pageSize, params).then((res) => {
        let data = res.data.data;
        that.page.total = data.total;
        // 全部
        if (activeStatus == 3) {
          that.goodsData = data.records;
        } else {
          // 非全部
          that.goodsData = data.records.filter((good) => {
            return good.status == activeStatus;
          });
        }
        that.loading = false;
        that.selectionClear();
      });
    },
    // 增加商品
    addHandler() {
      this.title = "新增商品";
      this.dialogFormVisible = true;
    },
    // 修改上架状态
    updateStatus(id, status) {
      slectionsUpdate(id, status).then((res) => {
        if (res.data.code == 200) {
          this.getGoodsData();
        }
      });
    },
    // 编辑商品
    handleEdit(row) {
      this.currentRow = row;
      this.title = "编辑商品";
      this.dialogFormVisible = true;
    },
    // 复制商品
    copyGoods(row) {
      delete row.id;
      add(row).then(() => {
        this.getGoodsData();
        this.$message({
          type: "success",
          message: "操作成功！",
        });
      });
    },
    // 删除商品
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
          this.getGoodsData();
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
    },
    // 保存已选列表
    selectionChange(list) {
      this.selectionList = list;
    },
    // 清空列表已选
    selectionClear() {
      this.selectionList = [];
      this.$refs.table.clearSelection();
    },
    // 分页器当前页
    onCurrentChange(currentPage) {
      this.page.currentPage = currentPage;
      this.getGoodsData();
    },
    // 一页显示数量
    onSizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.getGoodsData();
    },
    // 删除所有选中行
    selectionsDelete() {
      if (this.selectionList.length === 0) {
        this.$message.warning("请至少选择一条数据");
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
          this.getGoodsData();
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
    },
    // 批量上架下架
    slectedAction(action) {
      if (this.selectionList.length === 0) {
        this.$message.warning("请至少选择一条数据");
        return;
      }
      let statusCode = (action == "up") ? 1 : 2;
      slectionsUpdate(this.ids, statusCode).then(({ data: { code } }) => {
        if (code == 200) {
          this.getGoodsData();
          this.$message({
            type: "success",
            message: "操作成功！",
          });
        } else {
          this.$message({
            type: "error",
            message: "操作失败！",
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped> 
#goodsIndex {
  color: #444;
}

// 重写 el-input-group 前后修饰元素
/deep/ .el-input-group__append,
.el-input-group__prepend {
  width: 30px;
  text-align: center;
  padding: 0;
}

.el-pagination,
.el-pagination__total,
.el-input__inner,
.el-pagination__jump {
  color: #444;
}

.common-btn {
  height: 32px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.el-input__inner,
.el-input__icon {
  line-height: 32px;
  height: 32px;
}

.btn-box {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
}

// .refresh-btn {
//   width: 32px;
//   border: 1px solid #E6E6E6;
//   font-size: 14px;
//   margin-right: 20px;
// }

.create-goods,
.add-params,
.add-level1-sku {
  width: 98px;
  background: #7536D0;
  color: #fff;
}

.create-goods {
  margin-right: 40px;
}

.create-goods span,
.add-params span,
.add-level1-sku span {
  margin-left: 8px;
}

.goods-name {
  justify-content: space-between;
  align-items: stretch;
}

.goods-img {
  width: 60px;
  height: 60px;
  margin-right: 10px;
  border: 1px solid #e6e6e6;
  flex-shrink: 0;
}

.el-table,
.el-table thead,
.el-table th {
  color: #444;
  font-weight: 500 !important;
  font-size: 13px;
}

.display-flex {
  display: flex;
  align-items: center;
}


.label-auto {
  width: 100%;
  height: 100%;
}

.el-radio-button__inner,
.el-radio-button__inner:hover {
  height: 32px;
  line-height: 32px;
  width: 80px;
  text-align: center;
  padding: 0;
  color: #666;
}

.el-radio__input.is-checked+.el-radio__label,
.el-tabs__item.is-active,
.el-tabs__item:hover,
.el-pager li.active,
.el-select-dropdown__item.selected {
  color: #7438D5;
}

.el-radio__input.is-checked .el-radio__inner,
.el-tabs__active-bar,
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background: #7438D5;
  border-color: #7438D5;
}

.one-ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.sort-order {
  margin-left: 6px;
  color: #C0C4CC;
  flex-direction: row-reverse;
}

.recycle-btn {
  width: 88px;
  color: #444;
  border: #444 1px solid;
}

.recycle-btn i {
  margin-right: 6px;
  font-size: 14px;
}

.all-btn-up,
.all-btn-del,
.all-btn-up1 {
  width: 60px;
  border: 1px solid #E5E5E5;
  margin-right: 20px;
}

.all-btn-up1:hover {
  color: #7438D5;
  border-color: #7438D5;
}

.all-btn-up:hover {
  color: #50E3C2;
  border-color: #50E3C2;
}

.all-btn-del:hover {
  color: #FF5959;
  border-color: #FF5959;
}

.status-box {
  width: 100%;
  justify-content: space-between;
}

.status-btn {
  width: 56px;
  height: 26px;
  // border: 1px solid #7438D5;
  // color: #7438D5;
  font-size: 12px;
}

.el-table th {
  background: #F9F9F9;
  padding: 7px 0;
}

.el-tabs__item {
  width: 80px;
  padding: 0;
  padding-right: 20px;
  text-align: center;
  color: #666;
}

.el-tabs__nav-wrap::after {
  height: 1px;
}

.icon-top {
  margin-left: -5px;
}

// .el-popover, .el-popper, .popper-box {
//   max-width: 80px !important;
//   left: 46px;
//   top: 10px;
// }

.custom-table {
  padding: 20px 20px 30px;
  background: #fff;
}

.custom-header {
  justify-content: space-between;
  margin-bottom: 14px;
}

label {
  margin-bottom: 0;
}

.custom-refresh {
  width: 34px;
  height: 32px;
  border: 1px solid #E6E6E6;
  font-size: 16px;
  justify-content: center;
  margin-right: 20px;
  border-radius: 4px;
}

.page-container {
  justify-content: space-between;
  margin-top: 30px;
}

/* .el-table td,
.el-table th,
.el-table th.is-leaf {
  border-color: #f7f7f7;
  padding: 0;
} */

/* .el-table th .cell,
.el-table td .cell {
  height: 44px;
  display: flex;
  align-items: center;
  line-height: 20px;
  justify-content: center;
} */

/* .el-table th .cell {
  height: 40px;
} */

.goods-title {
  margin-bottom: 4px;
  width: 154px;
  line-height: 14px;
}

.activity-type {
  justify-content: space-around;
}

.activity-type-btn {
  width: 40px;
  height: 20px;
  padding-top: 2px;
  border-radius: 4px;
  color: #fff;
  justify-content: center;
}

.seckill-btn {
  background: #FFF4F3;
  border: 1px solid #FECAC4;
  color: #FE9488;
}

.groupon-btn {
  background: #F1EDFA;
  border: 1px solid #CEBEEC;
  color: #9C7EDA;
}

.score-btn {
  background: #FDF5E8;
  border: 1px solid #F8DCAE;
  color: #F2BA5E;
}

.el-table .bg-color {
  background: #f9f9f9;
}

.cell-left .cell {
  justify-content: flex-start !important;
}

.el-table_1_column_11.is-leaf,
.el-table_1_column_11 {
  border-color: #EBEEF5 !important;
}

.el-radio-button__inner {
  font-size: 12px;
}

.el-table__fixed-right::before,
.el-table__fixed::before {
  height: 0 !important;
}

.ellipsis-item {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

.el-table td,
.el-table th {
  padding: 10px 0 9px;
}

[v-cloak] {
  display: none
}

</style>
