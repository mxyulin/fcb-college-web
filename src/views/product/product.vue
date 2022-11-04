<template>
  <basic-container>
    <div class="avue-crud">
      <!-- 顶部菜单 -->
      <el-row class="topMenu">
        <!-- 查询模块 -->
        <el-row>
          <div class="avue-crud__menu">
            <div class="avue-crud__left">
              <el-form :inline="true" :size="option.size" :model="query">
                <!-- 面板开关 -->
                <el-form-item label="筛选条件">
                  <el-switch
                    v-model="chooseType"
                    :active-color="primary"
                    inactive-color="#E9EBEF"
                  >
                  </el-switch>
                </el-form-item>
              </el-form>
            </div>
            <div class="avue-right">
              <el-input
                :size="option.size"
                placeholder="请输入标题"
                suffix-icon="el-icon-search"
                v-model="searchKey"
              ></el-input>
            </div>
          </div>
        </el-row>
        <el-collapse-transition>
          <el-row :hidden="!chooseType">
            <div class="filter">
              <div class="container">
                <el-row class="display-flex">
                  <div class="lable">活动类别</div>
                  <el-radio-group v-model="activeType" size="small">
                    <el-radio
                      v-model="activeType"
                      label="all"
                      border
                      fill="primary"
                      >全部</el-radio
                    >
                    <el-radio
                      v-model="activeType"
                      label="group"
                      border
                      fill="primary"
                      >拼团</el-radio
                    >
                    <el-radio
                      v-model="activeType"
                      label="seckill"
                      border
                      fill="primary"
                      >秒杀</el-radio
                    >
                    <el-radio
                      v-model="activeType"
                      label="score"
                      border
                      fill="primary"
                      >积分</el-radio
                    >
                  </el-radio-group>
                </el-row>
                <el-row class="display-flex">
                  <div class="lable">价格区间</div>
                  <div class="choose-price">
                    <el-input v-model="priceFrist" :size="option.size">
                      <template slot="append">元</template>
                    </el-input>
                  </div>
                  <div class="choose-price-line">-</div>
                  <div class="choose-price">
                    <el-input v-model="priceLast" :size="option.size">
                      <template slot="append">元</template>
                    </el-input>
                  </div>
                </el-row>
                <el-row class="display-flex">
                  <el-button type="primary" :size="option.size">筛选</el-button>
                  <el-button type="warning" :size="option.size">清空</el-button>
                </el-row>
              </div>
            </div>
          </el-row>
        </el-collapse-transition>
      </el-row>
      <!-- 列表菜单 -->
      <el-row class="listMenu">
        <div class="avue-crud__menu">
          <!-- 头部左侧按钮模块 -->
          <div class="avue-crud__left">
            <el-button
              :size="option.size"
              icon="el-icon-refresh"
              @click="searchChange"
              class="refresh-btn"
            ></el-button>
            <el-button
              :size="option.size"
              type="primary"
              icon="el-icon-plus"
              @click="handleAdd"
              class="create-btn"
              >新增</el-button
            >
            <el-radio-group
              v-model="activeStatus"
              :size="option.size"
              fill="primary"
              class="sort-btn-group"
            >
              <el-radio-button label="all">全部</el-radio-button>
              <el-radio-button label="up">已上架</el-radio-button>
              <el-radio-button label="down">已下架</el-radio-button>
              <el-radio-button label="hidden">已隐藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 头部右侧按钮模块 -->
          <div class="avue-crud__right">
            <el-button
              :size="option.size"
              icon="el-icon-delete"
              @click="recyclebin"
              >回收站</el-button
            >
          </div>
        </div>
      </el-row>
      <!-- 列表模块 -->
      <el-row>
        <div v-loading="tableAjax">
          <el-table
            ref="multipleTable"
            :data="goodsData"
            tooltip-effect="dark"
            style="width: 100%"
            border
            @selection-change="handleSelectionChange"
            :row-class-name="tableRowClassName"
            :cell-class-name="tableCellClassName"
            :header-cell-class-name="tableCellClassName"
            @row-dblclick="goodsOpt"
          >
            <el-table-column type="selection" min-width="36"></el-table-column>
            <el-table-column prop="id" label="ID" min-width="70">
              <!-- 通过插槽 header 自定义表头 -->
              <template slot="header">
                <div class="display-flex">
                  <div>ID</div>
                  <!-- 排序箭头 -->
                  <div class="display-flex sort-order">
                    <i
                      class="el-icon-sort-up icon-top"
                      :style="{
                        color: sort == 'id' && order == 'asc' ? '#7438d5' : '',
                      }"
                      @click="sortOrder('id', 'asc')"
                    ></i>
                    <i
                      class="el-icon-sort-down icon-bottom"
                      :style="{
                        color: sort == 'id' && order == 'desc' ? '#7438d5' : '',
                      }"
                      @click="sortOrder('id', 'desc')"
                    ></i>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="商品" min-width="330">
              <template slot-scope="scope">
                <div class="goods-name">
                  <el-image
                    style="width: 58px; height: 58px"
                    :src="scope.row.image"
                    :fit="contain"
                    class="image-slot"
                  >
                    <div slot="error">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
                <div>
                  <div
                    class="ellipsis-item"
                    style="margin-top: 8px; line-height: 1"
                  >
                    {{ scope.row.title }}
                  </div>
                  <div class="display-flex" style="margin-top: 13px">
                    <span
                      v-if="scope.row.is_sku == 1"
                      style="color: #444; margin-right: 12px; line-height: 20px"
                    >
                      {{ scope.row.is_sku == 1 ? "多规格" : "" }}
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
                      <template
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
                      </template>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="price" label="价格" min-width="90">
              <template slot="header">
                <div class="display-flex">
                  <div>价格</div>
                  <div class="display-flex sort-order">
                    <i
                      class="el-icon-sort-up icon-top"
                      :style="{
                        color:
                          sort == 'price' && order == 'asc' ? '#7438d5' : '',
                      }"
                      @click="sortOrder('price', 'asc')"
                    ></i>
                    <i
                      class="el-icon-sort-down icon-bottom"
                      :style="{
                        color:
                          sort == 'price' && order == 'desc' ? '#7438d5' : '',
                      }"
                      @click="sortOrder('price', 'desc')"
                    ></i>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="sales" label="销量" min-width="100">
              <template slot="header">
                <div class="display-flex">
                  <div>销量</div>
                  <div class="display-flex sort-order">
                    <i
                      class="el-icon-sort-up icon-top"
                      :style="{
                        color:
                          sort == 'sales' && order == 'asc' ? '#7438d5' : '',
                      }"
                      @click="sortOrder('sales', 'asc')"
                    ></i>
                    <i
                      class="el-icon-sort-down icon-bottom"
                      :style="{
                        color:
                          sort == 'sales' && order == 'desc' ? '#7438d5' : '',
                      }"
                      @click="sortOrder('sales', 'desc')"
                    ></i>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="views" label="浏览量" min-width="90">
              <template slot="header">
                <div class="display-flex">
                  <div>浏览量</div>
                  <div class="display-flex sort-order">
                    <i
                      class="el-icon-sort-up icon-top"
                      :style="{
                        color:
                          sort == 'views' && order == 'asc' ? '#7438d5' : '',
                      }"
                      @click="sortOrder('views', 'asc')"
                    ></i>
                    <i
                      class="el-icon-sort-down icon-bottom"
                      :style="{
                        color:
                          sort == 'views' && order == 'desc' ? '#7438d5' : '',
                      }"
                      @click="sortOrder('views', 'desc')"
                    ></i>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="stock" label="库存" min-width="100">
              <template slot="header">
                <div class="display-flex">
                  <div>库存</div>
                  <div class="display-flex sort-order">
                    <i
                      class="el-icon-sort-up icon-top"
                      :style="{
                        color:
                          sort == 'stock' && order == 'asc' ? '#7438d5' : '',
                      }"
                      @click="sortOrder('stock', 'asc')"
                    ></i>
                    <i
                      class="el-icon-sort-down icon-bottom"
                      :style="{
                        color:
                          sort == 'stock' && order == 'desc' ? '#7438d5' : '',
                      }"
                      @click="sortOrder('stock', 'desc')"
                    ></i>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="更新时间" min-width="148">
              <template slot-scope="scope">
                <div>
                  {{ scope.row.createTime }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="weight" label="排序" min-width="80">
              <template slot="header">
                <div class="display-flex">
                  <div>排序</div>
                  <div class="display-flex sort-order">
                    <i
                      class="el-icon-sort-up icon-top"
                      :style="{
                        color:
                          sort == 'weigh' && order == 'asc' ? '#7438d5' : '',
                      }"
                      @click="sortOrder('weigh', 'asc')"
                    ></i>
                    <i
                      class="el-icon-sort-down icon-bottom"
                      :style="{
                        color:
                          sort == 'weigh' && order == 'desc' ? '#7438d5' : '',
                      }"
                      @click="sortOrder('weigh', 'desc')"
                    ></i>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" min-width="170">
              <template slot-scope="scope">
                <el-popover placement="bottom" width="120" trigger="hover">
                  <div class="display-flex status-box">
                    <div
                      class="common-btn status-btn status-btn-1"
                      v-if="scope.row.status != 'up'"
                      @click="editStatus(scope.row.id, 'up')"
                    >
                      上架
                    </div>
                    <div
                      class="common-btn status-btn status-btn-2"
                      v-if="scope.row.status != 'down'"
                      @click="editStatus(scope.row.id, 'down')"
                    >
                      下架
                    </div>
                    <div
                      class="common-btn status-btn status-btn-3"
                      v-if="scope.row.status != 'hidden'"
                      @click="editStatus(scope.row.id, 'hidden')"
                    >
                      隐藏
                    </div>
                  </div>
                  <span
                    slot="reference"
                    style="cursor: pointer; margin-right: 12px"
                  >
                    <span
                      style="color: #7438d5"
                      v-if="scope.row.status == 'up'"
                      >{{ scope.row.status_text }}</span
                    >
                    <span
                      style="color: #ff5959"
                      v-if="scope.row.status == 'down'"
                      >{{ scope.row.status_text }}</span
                    >
                    <span
                      style="color: #999"
                      v-if="scope.row.status == 'hidden'"
                      >{{ scope.row.status_text }}</span
                    >
                  </span>
                </el-popover>
                  <el-button
                    class="el-button-text"
                    type="text"
                    @click="goodsOpt('edit', scope.row.id)"
                    >编辑
                  </el-button>
                  <el-button
                    class="el-button-text"
                    type="text"
                    @click="goodsOpt('copy', scope.row.id)"
                    >复制
                  </el-button>
                  <el-button
                    class="el-button-text"
                    type="text"
                    @click="goodsOpt('del', scope.row.id)"
                    >删除</el-button
                  >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-row>
      <el-row> </el-row>
      <!-- 上架 + 分页模块 -->
      <el-row class="pagenation">
        <div class="avue-crud__menu">
          <div class="avue-crud__left">
            <el-button
              plain
              type="primary"
              :size="option.size"
              @click="goodsOpt('up', null)"
              v-if="activeStatus != 'up'"
              >上架</el-button
            >
            <el-button
              plain
              type="warning"
              :size="option.size"
              @click="goodsOpt('down', null)"
              v-if="activeStatus != 'down'"
              >下架</el-button
            >
            <el-button
              plain
              type="danger"
              :size="option.size"
              @click="goodsOpt('del', null)"
              >删除</el-button
            >
          </div>
          <div class="avue-crud-right">
            <el-pagination
              align="right"
              background
              @size-change="sizeChange"
              @current-change="currentChange"
              :current-page="page.currentPage"
              :page-sizes="[10, 20, 30, 40, 50, 100]"
              :page-size="page.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.total"
            >
            </el-pagination>
          </div>
        </div>
      </el-row>
      <!-- 表单模块（弹窗） -->
      <el-dialog
        :title="title"
        :visible.sync="box"
        width="50%"
        :before-close="beforeClose"
        append-to-body
      >
        <el-form
          :disabled="view"
          :size="option.size"
          ref="form"
          :model="form"
          label-width="80px"
        >
          <!-- 表单字段 -->
          <el-form-item
            label="商品类型:normal=实体商品,virtual=虚拟商品"
            prop="type"
          >
            <el-input
              v-model="form.type"
              placeholder="请输入商品类型:normal=实体商品,virtual=虚拟商品"
            />
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入标题" />
          </el-form-item>
          <el-form-item label="副标题" prop="subtitle">
            <el-input v-model="form.subtitle" placeholder="请输入副标题" />
          </el-form-item>
          <el-form-item
            label="商品状态: 0:hidden=隐藏商品,1:up=上架,2:down=下架"
            prop="status"
          >
            <el-input
              v-model="form.status"
              placeholder="请输入商品状态: 0:hidden=隐藏商品,1:up=上架,2:down=下架"
            />
          </el-form-item>
          <el-form-item label="所属分类" prop="categoryIds">
            <el-input v-model="form.categoryIds" placeholder="请输入所属分类" />
          </el-form-item>
          <el-form-item label="商品主图" prop="image">
            <el-input v-model="form.image" placeholder="请输入商品主图" />
          </el-form-item>
          <el-form-item label="轮播图" prop="images">
            <el-input v-model="form.images" placeholder="请输入轮播图" />
          </el-form-item>
          <el-form-item label="图文详情" prop="content">
            <el-input v-model="form.content" placeholder="请输入图文详情" />
          </el-form-item>
          <el-form-item label="价格" prop="price">
            <el-input v-model="form.price" placeholder="请输入价格" />
          </el-form-item>
          <el-form-item label="原价" prop="originalPrice">
            <el-input v-model="form.originalPrice" placeholder="请输入原价" />
          </el-form-item>
          <el-form-item label="是否多规格" prop="isSku">
            <el-input v-model="form.isSku" placeholder="请输入是否多规格" />
          </el-form-item>
          <el-form-item label="显示销量" prop="showSales">
            <el-input v-model="form.showSales" placeholder="请输入显示销量" />
          </el-form-item>
          <el-form-item label="服务标签" prop="serviceIds">
            <el-input v-model="form.serviceIds" placeholder="请输入服务标签" />
          </el-form-item>
          <el-form-item
            label="发货方式:express=物流快递,selfetch=用户自提,store=商家配送,autosend=自动发货"
            prop="dispatchType"
          >
            <el-input
              v-model="form.dispatchType"
              placeholder="请输入发货方式:express=物流快递,selfetch=用户自提,store=商家配送,autosend=自动发货"
            />
          </el-form-item>
          <el-form-item label="发货模板" prop="dispatchIds">
            <el-input v-model="form.dispatchIds" placeholder="请输入发货模板" />
          </el-form-item>
        </el-form>
        <!-- 表单按钮 -->
        <span v-if="!view" slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            icon="el-icon-circle-check"
            :size="option.size"
            @click="handleSubmit"
            >提 交</el-button
          >
          <el-button
            icon="el-icon-circle-close"
            :size="option.size"
            @click="box = false"
            >取 消</el-button
          >
        </span>
      </el-dialog>
    </div>
  </basic-container>
</template>

<script>
import { getList, getDetail, add, update, remove } from "@/api/product/product";
import option from "@/const/product/product";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
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
      // 是否展示筛选面板
      chooseType: true,
      // 搜索关键字
      searchKey: "",
      // 最低价格
      priceFrist: 0,
      // 最高价格
      priceLast: 0,
      // 哪个活动分类按钮被激活
      activeType: "all",
      // 哪个排序按钮被激活
      activeStatus: "all",
      // 表单列表
      goodsData: [
        {
          id: 1,
          price: "12",
          sales: 12,
          views: 12,
          stock: 12,
          weight: 12,
          image:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          createTime: "2016-05-02",
          title: "test",
          is_sku: 1,
          activity_type: true,
          app_type: false,
          app_type_text: "",
          status: "up",
          tatus_text: "",
          activity_type_text_arr: "",
        },
      ],
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
      this.$refs.table.clearSelection();
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
      this.loading = true;
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, this.query)
      ).then((res) => {
        const data = res.data.data;
        this.page.total = data.total;
        // this.goodsData = data.records;
        this.loading = false;
        this.selectionClear();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// 引入 product 源码样式
@import "./style/product";

// 组件单独样式
.avue-crud {
  .topMenu {
    margin-bottom: 10px;
    .filter {
      .container {
        position: relative;
        .el-row {
          height: 50px;
          line-height: 50px;
          .lable {
            margin-right: 14px;
            font-size: 14px;
            text-align: right;
            vertical-align: middle;
            color: #606266;
            box-sizing: border-box;
            margin-right: 12px;
          }
          .pure-btn {
            width: 80px;
            border: 1px solid #e6e6e6;
            margin-right: 10px;
            height: 30px;
          }
          .choose-price {
            width: 140px;
          }
          .choose-price-line {
            margin: 0 14px;
          }
        }
      }
    }
  }
  .listMenu {
    .refresh-btn {
      margin-right: 20px;
    }
    .create-btn {
      margin-right: 40px;
    }
  }
  .pagenation {
    .avue-crud__menu {
      align-items: flex-end;
      button.el-button {
        margin-right: 20px;
      }
    }
  }
}

/deep/ .el-button-text-444 {
  cursor: pointer;
  color: #444;
}
</style>
