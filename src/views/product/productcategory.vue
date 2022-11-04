<template>
  <basic-container>
    <div class="avue-crud">
      <el-row :hidden="!search" style="padding:5px">
        <!-- 查询模块 -->
        <el-form :inline="true" :size="option.size" :model="query">
          <template>
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
                  row-key="id"
                  :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
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
      <!-- 表单模块 -->
      <el-dialog :title="title" :visible.sync="box" width="50%" :before-close="beforeClose" append-to-body>
        <el-form :disabled="view" :size="option.size" ref="form" :model="form" label-width="80px">
          <!-- 表单字段 -->
          <el-form-item label="" prop="title">
            <el-input v-model="form.name" placeholder="请输入"/>
          </el-form-item>
          <el-form-item label="栏目类型" prop="type">
              <el-select v-model="form.type" clearable placeholder="请选择栏目类型">
                  <el-option
                    v-for="item in typeData"
                    :key="item.dictKey"
                    :label="item.dictValue"
                    :value="item.dictKey">
                  </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="图片" prop="title">
            <el-input v-model="form.image" placeholder="请输入图片"/>
          </el-form-item>
          <el-form-item label="父ID" prop="parentId">
              <el-tree
                :data="treeData"
                v-model="form.parentId"
                placeholder="请选择父ID"
                :props="defaultProps"
                @node-click="handleNodeClick">
              </el-tree>
          </el-form-item>
          <el-form-item label="权重" prop="title">
            <el-input v-model="form.weigh" placeholder="请输入权重"/>
          </el-form-item>
          <el-form-item label="描述" prop="title">
            <el-input v-model="form.description" placeholder="请输入描述"/>
          </el-form-item>
          <el-form-item label="状态" prop="title">
            <el-input v-model="form.status" placeholder="请输入状态"/>
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
  import {getList, getDetail, getTree, add, update, remove} from "@/api/product/productcategory";
  import option from "@/const/product/productcategory";
  import {getDictionary} from '@/api/system/dict';
  import {mapGetters} from "vuex";
  import {validatenull} from "@/util/validate";

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
      // 树型默认配置
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 表单数据
      form: {},
      // 选择行
      selectionList: [],
      // 表单配置
      option: option,
      // 表单列表
      data: [],
      // 父节点列表
      treeData: [],
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
    handleNodeClick(data) {
      this.form.parentId = data.id;
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
      if (validatenull(this.form.parentId)) {
        this.form.parentId = 0;
      }
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
        this.data = res.data.data;
        this.loading = false;
        getTree().then(res => {
          this.treeData = res.data.data;
        });
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
