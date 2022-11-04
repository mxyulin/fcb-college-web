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
                  <el-switch v-model="chooseType" active-color="#7536D0" inactive-color="#E9EBEF">
                  </el-switch>
                </el-form-item>
              </el-form>
            </div>
            <div class="avue-right">
              <el-input :size="option.size" placeholder="请输入标题" suffix-icon="el-icon-search" v-model="searchKey">
              </el-input>
            </div>
          </div>
        </el-row>
        <el-collapse-transition>
          <el-row :hidden="!chooseType">
            <div class="filter">
              <div class="container">
                <el-row class="display-flex">
                  <div class="lable">活动类别</div>
                  <div class="pure-btn common-btn" :class="activeType == `all` ? `choose-btn-active` : ``"
                    @click="changeActiveType('all')">
                    全部
                  </div>
                  <div class="pure-btn common-btn" :class="activeType == `group` ? `choose-btn-active` : ``"
                    @click="changeActiveType('group')">
                    拼团
                  </div>
                  <div class="pure-btn common-btn" :class="activeType == `seckill` ? `choose-btn-active` : ``"
                    @click="changeActiveType('seckill')">
                    秒杀
                  </div>
                  <div class="pure-btn common-btn" :class="activeType == `score` ? `choose-btn-active` : ``"
                    @click="changeActiveType('score')">
                    积分
                  </div>
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
            <el-button :size="option.size" icon="el-icon-refresh" @click="searchChange" class="refresh-btn"></el-button>
            <el-button :size="option.size" type="primary" icon="el-icon-plus" @click="handleAdd" class="create-btn">新增
            </el-button>
            <el-radio-group v-model="activeStatus" :size="option.size" fill="#7536D0" class="sort-btn-group">
              <el-radio-button label="all">全部</el-radio-button>
              <el-radio-button label="up">已上架</el-radio-button>
              <el-radio-button label="down">已下架</el-radio-button>
              <el-radio-button label="hidden">已隐藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 头部右侧按钮模块 -->
          <div class="avue-crud__right">
            <el-button :size="option.size" icon="el-icon-delete" @click="recyclebin">回收站</el-button>
          </div>
        </div>
      </el-row>
      <!-- 列表模块 -->
      <el-row>
        <el-table ref="table" v-loading="loading" :size="option.size" @selection-change="selectionChange" :data="data"
          style="width: 100%" :border="option.border">
          <el-table-column type="selection" v-if="option.selection" width="55" align="center"></el-table-column>
          <el-table-column type="expand" v-if="option.expand" align="center"></el-table-column>
          <el-table-column v-if="option.index" label="#" type="index" width="50" align="center">
          </el-table-column>
          <template v-for="(item, index) in option.column">
            <!-- table字段 -->
            <el-table-column v-if="item.hide !== true" :prop="item.prop" :label="item.label" :width="item.width"
              :key="index">
            </el-table-column>
          </template>
          <!-- 操作栏模块 -->
          <el-table-column prop="menu" label="操作" :width="180" align="center">
            <template slot-scope="{ row }">
              <el-button :size="option.size" type="text" icon="el-icon-view" @click="handleView(row)">查看</el-button>
              <el-button :size="option.size" type="text" icon="el-icon-edit" @click="handleEdit(row)">编辑</el-button>
              <el-button :size="option.size" type="text" icon="el-icon-delete" @click="rowDel(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!-- 分页模块 -->
      <el-row class="pagenation">
        <div class="avue-crud__menu">
          <div class="avue-crud__left">
            <el-button :plain="true" type="primary" :size="option.size" @click="xxx">上架</el-button>
            <el-button :plain="true" type="warning" :size="option.size" @click="xxx">下架</el-button>
            <el-button :plain="true" type="danger" :size="option.size" @click="xxx">删除</el-button>
          </div>
          <div class="avue-crud-right">
            <el-pagination align="right" background @size-change="sizeChange" @current-change="currentChange"
              :current-page="page.currentPage" :page-sizes="[10, 20, 30, 40, 50, 100]" :page-size="page.pageSize"
              layout="total, sizes, prev, pager, next, jumper" :total="page.total">
            </el-pagination>
          </div>
        </div>
      </el-row>
      <!-- 表单模块 -->
      <el-dialog :title="title" :visible.sync="box" width="50%" :before-close="beforeClose" append-to-body>
        <el-form :disabled="view" :size="option.size" ref="form" :model="form" label-width="80px">
          <!-- 表单字段 -->
          <el-form-item label="商品类型:normal=实体商品,virtual=虚拟商品" prop="type">
            <el-input v-model="form.type" placeholder="请输入商品类型:normal=实体商品,virtual=虚拟商品" />
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入标题" />
          </el-form-item>
          <el-form-item label="副标题" prop="subtitle">
            <el-input v-model="form.subtitle" placeholder="请输入副标题" />
          </el-form-item>
          <el-form-item label="商品状态: 0:hidden=隐藏商品,1:up=上架,2:down=下架" prop="status">
            <el-input v-model="form.status" placeholder="请输入商品状态: 0:hidden=隐藏商品,1:up=上架,2:down=下架" />
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
          <el-form-item label="发货方式:express=物流快递,selfetch=用户自提,store=商家配送,autosend=自动发货" prop="dispatchType">
            <el-input v-model="form.dispatchType"
              placeholder="请输入发货方式:express=物流快递,selfetch=用户自提,store=商家配送,autosend=自动发货" />
          </el-form-item>
          <el-form-item label="发货模板" prop="dispatchIds">
            <el-input v-model="form.dispatchIds" placeholder="请输入发货模板" />
          </el-form-item>
        </el-form>
        <!-- 表单按钮 -->
        <span v-if="!view" slot="footer" class="dialog-footer">
          <el-button type="primary" icon="el-icon-circle-check" :size="option.size" @click="handleSubmit">提 交
          </el-button>
          <el-button icon="el-icon-circle-close" :size="option.size" @click="box = false">取 消</el-button>
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
      // 表单列表
      data: [],
      // 是否展示筛选面板
      chooseType: true,
      // 搜索关键字
      searchKey: "",
      // 激活哪个分类按钮
      activeType: "all",
      // 激活哪个排序按钮
      activeStatus: "",
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
    init() { },
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
        this.data = data.records;
        this.loading = false;
        this.selectionClear();
      });
    },
    // 切换被激活的按钮
    changeActiveType(activeType) {
      this.activeType = activeType;
    },
  },
};
</script>

<!-- <style lang="less" scoped>
.el-pagination {
  margin-top: 20px;
}

#colors() {
  primary: #7536d0;
}

// 重写 el-input-group 前后修饰元素
/deep/ .el-input-group__append,
.el-input-group__prepend {
  width: 30px;
  text-align: center;
  padding: 0;
}

// 公共flex
.display-flex {
  display: flex;
  align-items: center;
}

// 公共按钮样式
.common-btn {
  height: 32px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

// 按钮激活
.choose-btn-active {
  background-color: #7536d0;
  border: none;
  color: #fff;
}

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
</style> -->
