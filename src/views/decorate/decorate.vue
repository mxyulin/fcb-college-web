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
          <el-form-item label="模板名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入模板名称"/>
          </el-form-item>
          <el-form-item label="页面分类:shop=商城,custom=自定义,preview=临时预览" prop="type">
            <el-input v-model="form.type" placeholder="请输入页面分类:shop=商城,custom=自定义,preview=临时预览"/>
          </el-form-item>
          <el-form-item label="图片" prop="image">
            <el-input v-model="form.image" placeholder="请输入图片"/>
          </el-form-item>
          <el-form-item label="备注" prop="memo">
            <el-input v-model="form.memo" placeholder="请输入备注"/>
          </el-form-item>
          <el-form-item label="状态 normal=0, hidden=1 " prop="status">
            <el-input v-model="form.status" placeholder="请输入状态 normal=0, hidden=1 "/>
          </el-form-item>
          <el-form-item label="适用平台:H5=H5,wxOfficialAccount=微信公众号网页,wxMiniProgram=微信小程序,App=App,preview=预览" prop="platform">
            <el-input v-model="form.platform" placeholder="请输入适用平台:H5=H5,wxOfficialAccount=微信公众号网页,wxMiniProgram=微信小程序,App=App,preview=预览"/>
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
  import {getList, getDetail, add, update, remove} from "@/api/decorate/decorate";
  import option from "@/const/decorate/decorate";
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
