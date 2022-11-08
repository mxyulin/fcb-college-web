<template>
  <basic-container>
    <Query />
    <div class="avue-crud">
      <!-- 列表菜单 -->
      <el-row class="listMenu">
        <div class="avue-crud__menu">
          <!-- 头部左侧按钮模块 -->
          <div class="avue-crud__left">
            <el-switch
              v-model="chooseType"
              :active-color="primary"
              inactive-color="#E9EBEF"
            >
            </el-switch>
            <el-button
              :size="option.size"
              icon="el-icon-refresh"
              @click="getGoodsData"
              class="refresh-btn"
              circle
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
              <el-radio-button :label="3">全部</el-radio-button>
              <el-radio-button :label="1">已上架</el-radio-button>
              <el-radio-button :label="2">已下架</el-radio-button>
              <el-radio-button :label="0">已隐藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 头部右侧按钮模块 -->
          <div class="avue-crud__right">
            <el-button
              :size="option.size"
              icon="el-icon-delete"
              @click="recyclebin"
              disabled
              >回收站</el-button
            >
          </div>
        </div>
      </el-row>
      <!-- 列表模块 -->
      <el-row>
        <div v-loading="loading">
          <el-table
            stripe
            ref="table"
            :data="goodsData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            @row-dblclick="goodsOpt"
            :row-class-name="tableRowClassName"
            :cell-class-name="tableCellClassName"
            :header-cell-class-name="tableCellClassName"
          >
            <el-table-column type="selection" min-width="36"></el-table-column>
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
            <el-table-column label="商品" min-width="150">
              <template slot-scope="scope">
                <div class="display-flex goods-name">
                  <!-- 商品图 -->
                  <div>
                    <el-image
                      style="width: 58px; height: 58px"
                      :src="scope.row.image"
                      fit="contain"
                      class="image-slot"
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
                  {{ scope.row.updateTime }}
                </div>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" min-width="240">
              <template slot-scope="scope">
                <!-- 上架的下拉菜单 -->
                <el-popover placement="bottom" trigger="hover" width="100">
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
                <el-button type="text" icon="el-icon-s-order">复制 </el-button>
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
      <!-- 底部 -->
      <el-row>
        <div class="bottomMenu">
          <!-- 上架下架 -->
          <div class="display-flex">
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
          <!-- 分页模块 -->
          <el-pagination
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
          ref="goodsForm"
          :model="form"
          label-width="100px"
          :rules="rules"
        >
          <!-- 表单字段 -->
          <el-form-item label="商品分类" prop="type">
            <el-select v-model="form.type" :placeholder="form.type">
              <el-option
                v-for="item in goodsType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入标题" />
          </el-form-item>
          <el-form-item label="商品副标题" prop="subtitle">
            <el-input v-model="form.subtitle" placeholder="请输入副标题" />
          </el-form-item>
          <el-form-item label="商品状态" prop="status">
            <el-select v-model.number="form.status" :placeholder="form.status">
              <el-option
                v-for="item in goodsStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品主图" prop="image">
            <el-input v-model="form.image" placeholder="请输入商品主图地址" />
          </el-form-item>
          <el-form-item label="轮播图" prop="images">
            <el-input v-model="form.images" placeholder="请输入轮播图" />
          </el-form-item>
          <el-form-item label="图文详情" prop="content">
            <el-input
              type="textarea"
              v-model="form.content"
              placeholder="请输入图文详情"
            />
          </el-form-item>
          <div class="display-flex">
            <el-form-item label="价格" prop="price">
              <el-input v-model.number="form.price" placeholder="请输入价格" />
            </el-form-item>
            <el-form-item label="原价" prop="originalPrice">
              <el-input
                v-model.number="form.originalPrice"
                placeholder="请输入原价"
              />
            </el-form-item>
          </div>
          <div class="display-flex">
            <el-form-item label="是否多规格" prop="isSku">
              <el-radio-group v-model="form.isSku">
                <el-radio :label="true" border>是</el-radio>
                <el-radio :label="false" border>否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="显示销量" prop="showSales">
              <el-input
                v-model.number="form.showSales"
                placeholder="请输入显示销量"
              />
            </el-form-item>
          </div>
          <el-form-item label="服务标签" prop="serviceIds">
            <el-input v-model="form.serviceIds" placeholder="请输入服务标签" />
          </el-form-item>
          <el-form-item label="发货方式" prop="dispatchType">
            <el-select
              v-model="form.dispatchType"
              :placeholder="form.dispatchType"
            >
              <el-option
                v-for="item in dispatchTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发货模板" prop="dispatchIds">
            <el-input
              v-model="form.dispatchIds"
              placeholder="请输入发货模板"
            ></el-input>
          </el-form-item>
        </el-form>
        <!-- 表单按钮 -->
        <span v-if="!view" slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            icon="el-icon-circle-check"
            :size="option.size"
            @click="handleSubmit('goodsForm')"
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
import Query from "@/views/product/childen/query"
import { mapGetters } from "vuex";

export default {
  components: {
    Query,
  },
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
      // 上架状态(3是全部展示)
      activeStatus: 3,
      // 查询信息
      query: {
        // 活动类别
        activeType: "all",
        // 最低价格
        priceFrist: 0,
        // 最高价格
        priceLast: 0,
        // 搜索关键字
        searchKey: "",
      },
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
      chooseType: false,
      // 商品源数据
      goodsData: [],
      // 所有商品分类
      goodsType: [
        { label: "实体商品", value: "normal" },
        { label: "虚拟商品", value: "virtual" },
      ],
      // 所有商品状态
      goodsStatus: [
        { label: "上架", value: 1 },
        { label: "下架", value: 2 },
        { label: "隐藏", value: 0 },
      ],
      // 所有发货方式
      dispatchTypes: [
        { label: "物流快递", value: "express" },
        { label: "用户自提", value: "selfetch" },
        { label: "商家配送", value: "store" },
        { label: "自动发货", value: "autosend" },
      ],
      // 表单验证规则
      rules: {
        type: [
          {
            required: true,
            message: "请至少选择一个商品分类",
            trigger: "change",
          },
        ],
        title: [
          { required: true, message: "请输入商品标题", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur",
          },
        ],
        subtitle: [
          { required: true, message: "请输入商品副标题", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur",
          },
        ],
        status: [
          {
            type: "number",
            required: true,
            message: "请至少选择一个商品状态",
            trigger: "change",
          },
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        originalPrice: [
          { required: true, message: "请输入商品原价", trigger: "blur" },
        ],
        isSku: [
          {
            type: "boolean",
            required: true,
            message: "请至少选择一个选项",
            trigger: "change",
          },
        ],
        showSales: [
          {
            type: "number",
            required: true,
            message: "请输入显示销量",
            trigger: "blur",
          },
        ],
        dispatchType: [
          {
            required: true,
            message: "请至少选择一个发货方式",
            trigger: "change",
          },
        ],
      },
    };
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
    // 根据上架状态获取数据
    activeStatus() {
      this.getGoodsData(this.page);
    },
  },
  methods: {
    test() {
      console.log("测试");
    },
    // 初始化
    init() {},
    //
    searchHide() {
      this.search = !this.search;
    },
    // 重置搜查询信息
    searchReset() {
      this.query = {
        // 活动类别
        activeType: "all",
        // 最低价格
        priceFrist: 0,
        // 最高价格
        priceLast: 0,
        // 搜索关键字
        searchKey: "",
      };
      this.page.currentPage = 1;
      this.getGoodsData(this.page);
    },
    // 提交表单
    handleSubmit(formName) {
      let that = this;
      that.$refs[formName]
        .validate()
        .then(() => {
          if (!that.form.id) {
            add(that.form).then(() => {
              that.box = false;
              that.getGoodsData(that.page);
              that.$message({
                type: "success",
                message: "操作成功！",
              });
            });
          } else {
            update(that.form).then(() => {
              that.box = false;
              that.getGoodsData(that.page);
              that.$message({
                type: "success",
                message: "操作成功！",
              });
            });
          }
        })
        .catch(() => {
          that.$message({
            type: "error",
            message: "操作失败!",
          });
        });
    },
    // 增加商品
    handleAdd() {
      this.title = "新增商品";
      this.form = {};
      this.box = true;
    },
    // 编辑商品
    handleEdit(row) {
      this.title = "编辑商品";
      this.box = true;
      getDetail(row.id).then((res) => {
        this.form = res.data.data;
      });
    },
    // 查看商品详情
    handleView(row) {
      this.title = "查看";
      this.view = true;
      this.box = true;
      getDetail(row.id).then((res) => {
        this.form = res.data.data;
      });
    },
    // 删除所有选中行
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
          this.getGoodsData(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
    },
    // 删除当前行
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
          this.getGoodsData(this.page);
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
      this.getGoodsData(this.page);
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.getGoodsData(this.page);
    },
    // 获取商品数据
    getGoodsData(page, params = {}) {
      let that = this;
      let { activeStatus } = that;
      that.loading = true;
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, that.query)
      ).then((res) => {
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
    // 更新上架状态
    updateStatus(id, status) {
      let that = this;
      // 提交数据
      update({ id, status }).then((res) => {
        if (res.data.code == 200) {
          // 上架状态更新后获取最新列表数据
          that.getGoodsData(that.page);
        }
      });
    },
    //
    goodsOpt() {
      console.log("测试");
    },
  },
  mounted() {
    this.init();
    this.getGoodsData(this.page);
  },
};
</script>

<style lang="scss" scoped>
// 引入 product 源码样式
@import "@/views/product/styles/product";

// 组件单独样式
.avue-crud {

  .listMenu {
    .refresh-btn {
      margin-right: 20px;
    }
    .create-btn {
      margin-right: 40px;
    }
  }
  .bottomMenu {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 20px;
    min-height: 80px;
    button.el-button {
      margin-right: 20px;
    }
  }
}
</style>

<style lang="scss">
// *el-popover 与 app 组件平行，故不能限制样式的作用域（不能写 scoped）
.el-popover {
  min-width: 120px;
}
</style>
