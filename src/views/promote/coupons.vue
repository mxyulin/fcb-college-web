<template>
  <basic-container>
    <div class="avue-crud">
      <el-row :hidden="!search" style="padding:5px">
        <!-- 查询模块 -->
        <el-form :inline="true" :size="option.size" :model="query">
          <template>
            <el-form-item label="字段">
              <el-input v-model="query.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="字段">
              <el-input v-model="query.type" placeholder="请输入类型:cash=代金券,discount=折扣券"></el-input>
            </el-form-item>
            <el-form-item label="字段">
              <el-input v-model="query.gettime" placeholder="请输入领取周期"></el-input>
            </el-form-item>
            <el-form-item label="字段">
              <el-input v-model="query.usetime" placeholder="请输入有效期"></el-input>
            </el-form-item>
            <el-form-item label="字段">
              <el-input v-model="query.usetimestart" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="字段">
              <el-input v-model="query.usetimeend" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="字段">
              <el-input v-model="query.gettimestart" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="字段">
              <el-input v-model="query.gettimeend" placeholder="请输入"></el-input>
            </el-form-item>
          </template>
          <!-- 查询按钮 -->
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="searchChange">搜索</el-button>
            <el-button icon="el-icon-delete" @click="searchReset()">清空</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <div class="avue-crud__menu">
          <!-- 头部左侧按钮模块 -->
          <div class="avue-crud__left">
            <el-button :size="option.size" type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
            <el-button :size="option.size" type="danger" icon="el-icon-delete" @click="handleDelete" plain>删除
            </el-button>
          </div>
          <!-- 头部右侧按钮模块 -->
          <div class="avue-crud__right">
            <el-button :size="option.size" icon="el-icon-refresh" @click="searchChange" circle></el-button>
            <el-button :size="option.size" icon="el-icon-search" @click="searchHide" circle></el-button>
          </div>
        </div>
      </el-row>
      <el-row>
        <!-- 列表模块 -->
        <el-table ref="table" v-loading="loading" :size="option.size" @selection-change="selectionChange" :data="data"
                  style="width: 100%"
                  :border="option.border">
          <el-table-column type="selection" v-if="option.selection" width="55" align="center"></el-table-column>
          <el-table-column type="expand" v-if="option.expand" align="center"></el-table-column>
          <el-table-column v-if="option.index" label="#" type="index" width="50" align="center">
          </el-table-column>
          <template v-for="(item,index) in option.column">
            <!-- table字段 -->
            <el-table-column v-if="item.hide!==true"
                             :prop="item.prop"
                             :label="item.label"
                             :width="item.width"
                             :key="index">
            </el-table-column>
          </template>
          <!-- 操作栏模块 -->
          <el-table-column prop="menu" label="操作" :width="180" align="center">
            <template slot-scope="{row}">
              <el-button :size="option.size" type="text" icon="el-icon-view" @click="handleView(row)">查看</el-button>
              <el-button :size="option.size" type="text" icon="el-icon-edit" @click="handleEdit(row)">编辑</el-button>
              <el-button :size="option.size" type="text" icon="el-icon-delete" @click="rowDel(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <!-- 分页模块 -->
        <el-pagination
          align="right" background
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total">
        </el-pagination>
      </el-row>
      <!-- 表单模块 -->
      <el-dialog :title="title" :visible.sync="box" width="50%" :before-close="beforeClose" append-to-body>
        <el-form :disabled="view" :size="option.size" ref="form" :model="form" label-width="80px">
          <!-- 表单字段 -->
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入名称"/>
          </el-form-item>
          <el-form-item label="类型:cash=代金券,discount=折扣券" prop="type">
              <el-select v-model="form.type" clearable placeholder="请选择类型:cash=代金券,discount=折扣券">
                  <el-option
                    v-for="item in typeData"
                    :key="item.dictKey"
                    :label="item.dictValue"
                    :value="item.dictKey">
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="库存" prop="stock">
            <el-input v-model="form.stock" placeholder="请输入库存"/>
          </el-form-item>
          <el-form-item label="每人限制" prop="limit">
            <el-input v-model="form.limit" placeholder="请输入每人限制"/>
          </el-form-item>
          <el-form-item label="领取周期" prop="gettime">
            <el-date-picker v-model="form.gettime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择领取周期"></el-date-picker>
          </el-form-item>
          <el-form-item label="有效期" prop="usetime">
            <el-date-picker v-model="form.usetime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择有效期"></el-date-picker>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="form.description" placeholder="请输入描述"/>
          </el-form-item>
          <el-form-item label="" prop="usetimestart">
            <el-date-picker v-model="form.usetimestart" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择"></el-date-picker>
          </el-form-item>
          <el-form-item label="" prop="usetimeend">
            <el-date-picker v-model="form.usetimeend" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择"></el-date-picker>
          </el-form-item>
          <el-form-item label="" prop="gettimestart">
            <el-date-picker v-model="form.gettimestart" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择"></el-date-picker>
          </el-form-item>
          <el-form-item label="" prop="gettimeend">
            <el-date-picker v-model="form.gettimeend" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择"></el-date-picker>
          </el-form-item>
        </el-form>
        <!-- 表单按钮 -->
        <span v-if="!view" slot="footer" class="dialog-footer">
          <el-button type="primary" icon="el-icon-circle-check" :size="option.size" @click="handleSubmit">提 交</el-button>
          <el-button icon="el-icon-circle-close" :size="option.size" @click="box = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/promote/coupons";
  import option from "@/const/promote/coupons";
  import {mapGetters} from "vuex";
  import {getDictionary} from '@/api/system/dict'

export default {
  data() {
    return {
      // 弹框标题
      title: '',
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
        total: 40
      },
      // 表单数据
      form: {},
      // 选择行
      selectionList: [],
      // 表单配置
      option: option,
      // 表单列表
      data: [],
    }
  },
  mounted() {
    this.init();
    this.onLoad(this.page);
  },
  computed: {
    ...mapGetters(["permission"]),
    ids() {
      let ids = [];
      this.selectionList.forEach(ele => {
        ids.push(ele.id);
      });
      return ids.join(",");
    }
  },
  methods: {
    init() {
    },
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
            message: "操作成功!"
          });
        });
      } else {
        update(this.form).then(() => {
          this.box = false;
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        })
      }
    },
    handleAdd() {
      this.title = '新增'
      this.form = {}
      this.box = true
    },
    handleEdit(row) {
      this.title = '编辑'
      this.box = true
      getDetail(row.id).then(res => {
        this.form = res.data.data;
      });
    },
    handleView(row) {
      this.title = '查看'
      this.view = true;
      this.box = true;
      getDetail(row.id).then(res => {
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
        type: "warning"
      })
        .then(() => {
          return remove(this.ids);
        })
        .then(() => {
          this.selectionClear();
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        });
    },
    rowDel(row) {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return remove(row.id);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        });
    },
    beforeClose(done) {
      done()
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
      getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.page.total = data.total;
        this.data = data.records;
        this.loading = false;
        this.selectionClear();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 20px;
}
</style>
