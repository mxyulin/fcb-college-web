<template>
  <basic-container>
    <div class="avue-crud">
      <el-row :hidden="!search" style="padding:5px">
        <!-- 查询模块 -->
        <el-form :inline="true" :size="option.size" :model="query">
          <template>
            <el-form-item label="商品名称">
              <el-input v-model="query.userId" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="评论">
              <el-rate
                v-model="query.level">
              </el-rate>
            </el-form-item>
            <el-form-item label="评论时间"  >
                <el-col :span="22">
                    <el-date-picker  placeholder="选择日期" v-model="query.createTime" style="width: 100%;"></el-date-picker>
                </el-col>
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
          <!-- <el-table-column v-if="option.index" label="#" type="index" width="50" align="center">
          </el-table-column> -->
          <template >
            <!-- table字段 -->
            <el-table-column  prop="id" label="用户名称">
            <template>
            </template>
          </el-table-column>
          <el-table-column prop="level" label="评价星级">
           <template v-slot="{row}">
              <el-rate
                v-model="row.level"
                disabled
                show-score
                text-color="#ff9900">
                </el-rate>
              </template>
          </el-table-column>
          <el-table-column prop="content" label="评价内容">
            <template>

            </template>
          </el-table-column>

          <el-table-column prop="status" label="显示状态" v-slot="{row}">
            <el-switch
              v-model="row.level >= 3 ? true : false"
              active-text="显示"
              inactive-text="隐藏">
            </el-switch>
            <template>

            </template>
          </el-table-column>

          <el-table-column prop="replyContent" label="回复内容">
            <template>

            </template>
          </el-table-column>

          <el-table-column prop="createTime" label="创建时间">
            <template>

            </template>
          </el-table-column>
          </template>
          <!-- 操作栏模块 -->
          <el-table-column prop="menu" label="操作" :width="180" align="center">
            <template slot-scope="{row}">
              <!-- <el-button :size="option.size" type="text" icon="el-icon-view" @click="handleView(row)">查看</el-button> -->
              <el-button :size="option.size" type="primary" icon="el-icon-view" @click="handleView(row)" circle></el-button>            
              <!-- <el-button :size="option.size" type="text" icon="el-icon-edit" @click="handleEdit(row)">编辑</el-button> -->
              <el-button :size="option.size" type="success" icon="el-icon-edit" @click="handleEdit(row)" circle></el-button>
              <!-- <el-button :size="option.size" type="text" icon="el-icon-delete" @click="rowDel(row)">删除</el-button> -->
              <el-button :size="option.size" type="danger" icon="el-icon-delete" @click="rowDel(row)" circle></el-button>
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
      <el-drawer :title="title" :visible.sync="box" width="50%" :before-close="beforeClose" append-to-body>
        <el-form :disabled="view" :size="option.size" ref="form" :model="form" label-width="80px">
          <!-- 表单字段 -->
          <el-form-item label="用户" prop="userId">
            <el-input v-model="form.userId" placeholder="请输入用户"/>
          </el-form-item>
          <el-form-item label="评价星级" prop="level">
            <el-rate
                v-model="form.level"
                show-text>
              </el-rate>
          </el-form-item>
          <el-form-item label="评价内容" prop="content">
            <el-input v-model="form.content" placeholder="请输入评价内容"/>
          </el-form-item>
          <!-- <el-form-item label="显示状态" prop="status">
            <el-input v-model="form.status" placeholder="请输入显示状态"/>
          </el-form-item> -->
          <el-form-item label="回复内容" prop="replyContent">
            <el-input v-model="form.replyContent" placeholder="请输入回复内容"/>
          </el-form-item>
          <!-- <el-form-item label="回复时间" prop="replytime">
            <el-input v-model="form.replytime" placeholder="请输入回复时间"/>
          </el-form-item> -->
        </el-form>
        <!-- 表单按钮 -->
        <span v-if="!view" slot="footer" class="dialog-footer">
          <el-button type="primary" icon="el-icon-circle-check" :size="option.size" @click="handleSubmit">提 交</el-button>
          <el-button icon="el-icon-circle-close" :size="option.size" @click="box = false">取 消</el-button>
        </span>
      </el-drawer>
    </div>
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/product/comment";
  import option from "@/const/product/comment";
  import {mapGetters} from "vuex";
  import {getDictionary} from '@/api/system/dict'
  import admin from "../../util/admin";

export default {
  data() {
    return {
      value1:true,
      value: null,
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
      form: {
          //  userId:null,
          //  level:0,
          //  content:null,
          //  status:null,
          //  replyContent:null,
          //  replytime:null
      },
      // 选择行
      selectionList: [],
      // 表单配置
      option: option,
      // 表单列表
      data: [
      ],
      selectDate: null
    }
  },
  created(){
this.onLoad(this.page)
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
      const that = this;
      this.onLoad(this.page);
    },
    searchReset() {
      const that = this;
      that.query = {};
      that.page.currentPage = 1;
      that.onLoad(this.page);
    },
    handleSubmit() {
      const that = this;
      if (!that.form.id) {
        add(that.form).then(() => {
          that.box = false;
          that.onLoad(that.page);
          that.$message({
            type: "success",
            message: "操作成功!"
          });
        });
      } else {
        update(that.form).then(() => {
          that.box = false;
          that.onLoad(that.page);
          that.$message({
            type: "success",
            message: "操作成功!"
          });
        })
      }
    },
     handleAdd() {
      const that = this;
      that.title = '新增'
      that.form = {}
      that.box = true
    },
    handleEdit(row) {
      const that = this;
      that.title = '编辑'
      that.box = true
      getDetail(row.id).then(res => {
        that.form = res.data.data;
      });
    },
    handleView(row) {
      const that = this;
      that.title = '查看'
      that.view = true;
      that.box = true;
      getDetail(row.id).then(res => {
        that.form = res.data.data;
      });
    },
    handleDelete() {
      const that = this;
      if (that.selectionList.length === 0) {
        that.$message.warning("请选择至少一条数据");
        return;
      }
      that.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return remove(that.ids);
        })
        .then(() => {
          that.selectionClear();
          that.onLoad(that.page);
          that.$message({
            type: "success",
            message: "操作成功!"
          });
        });
    },
    rowDel(row) {
      const that = this;
      that.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return remove(row.id);
        })
        .then(() => {
          that.onLoad(that.page);
          that.$message({
            type: "success",
            message: "操作成功!"
          });
        });
    },
    beforeClose(done) {
      const that = this;
      done()
      that.form = {};
      that.view = false;
    },
    selectionChange(list) {
      const that = this;
      that.selectionList = list;
    },
    selectionClear() {
      const that = this;
      that.selectionList = [];
      that.$refs.table.clearSelection();
    },
    currentChange(currentPage) {
      const that = this;
      that.page.currentPage = currentPage;
      that.onLoad(that.page);
    },
    sizeChange(pageSize) {
      const that = this;
      that.page.pageSize = pageSize;
      that.onLoad(that.page);
    },
    onLoad(page, params = {}) {
      const that = this;
      that.loading = true;
      getList(page.currentPage, page.pageSize, Object.assign(params, that.query)).then(res => {
        const data = res.data.data;
        // console.log(data.records);
        that.page.total = data.total;
        that.data = data.records;
        that.loading = false;
        that.selectionClear();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 20px;
}
.el-rate{
  margin-top: 5px;
}
</style>
