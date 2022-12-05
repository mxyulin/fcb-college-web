<template>
  <el-row>
    <el-col :span="5">
      <div class="left-panel">
        <el-scrollbar>
          <basic-container>
            <el-input placeholder="输入关键字进行过滤" v-model="filterText">
            </el-input>
            <el-tree class="filter-tree" :data="list" :props="defaultProps" default-expand-all
              :filter-node-method="filterNode" @node-click="handleNodeClick" ref="tree">
            </el-tree>
          </basic-container>
        </el-scrollbar>
      </div>
    </el-col>
    <el-col :span="19">
      <basic-container>
        <avue-crud :option="option" :table-loading="loading" :data="data" :page.sync="page" :permission="permissionList"
          :before-open="beforeOpen" v-model="form" ref="crud" @row-del="rowDel" @search-change="searchChange"
          @search-reset="searchReset" @selection-change="selectionChange" @current-change="currentChange"
          @size-change="sizeChange" @refresh-change="refreshChange" @on-load="loadDataList">
          <template slot="link" slot-scope="scope">
            <img class="img-item"
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170216%2F25f661a8abd043bf926128544b343d81_th.jpeg&refer=http%3A%2F%2Fimg.mp.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671358453&t=db91b4b31f6d663575288ab9e6713b76"
              alt="">
          </template>
          <template slot="menuLeft">
            <el-button type="primary" size="small" plain v-if="permission.attach_upload" icon="el-icon-upload2"
              @click="handleUpload">上 传
            </el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" plain v-if="permission.attach_delete"
              @click="handleDelete">删 除
            </el-button>
          </template>
          <template slot-scope="scope" slot="menu">
            <el-button type="text" icon="el-icon-download" size="small" v-if="permission.attach_download"
              @click="handleDownload(scope.row)">下载
            </el-button>
          </template>
          <template slot-scope="{row}" slot="attachSize">
            <el-tag>{{ `${row.attachSize} KB` }}</el-tag>
          </template>
        </avue-crud>
        <el-dialog title="附件管理" append-to-body :visible.sync="attachBox" width="555px">
          <avue-form ref="form" :option="attachOption" v-model="attachForm" :upload-after="uploadAfter">
          </avue-form>
        </el-dialog> 
      </basic-container>
    </el-col>
  </el-row>
</template>

<script>
import { getList as getCategoryList } from "@/api/resource/attachcategory";
import { getList, getDetail, remove } from "@/api/resource/attach";
import { mapGetters } from "vuex";

export default {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  data() {
    return {
      filterText: '',
      list: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
      ,
      form: {},
      query: {},
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      attachBox: false,
      selectionList: [],
      option: {
        height: 'auto',
        calcHeight: 30,
        tip: false,
        searchShow: true,
        searchMenuSpan: 6,
        border: true,
        index: true,
        viewBtn: true,
        selection: true,
        dialogClickModal: false,
        column: [
          {
            label: "附件图片",
            prop: "link",
            slot: true,  // 将slot 设置为true， 在模板中slot 为prop
            rules: [{
              required: true,
              message: "请输入附件地址",
              trigger: "blur"
            }]
          },
          {
            label: "附件域名",
            prop: "domainUrl",
            search: true,
            rules: [{
              required: true,
              message: "请输入附件域名",
              trigger: "blur"
            }]
          },
          {
            label: "附件名称",
            prop: "name",
            search: true,
            rules: [{
              required: true,
              message: "请输入附件名称",
              trigger: "blur"
            }]
          },
          {
            label: "附件原名",
            prop: "originalName",
            search: true,
            rules: [{
              required: true,
              message: "请输入附件原名",
              trigger: "blur"
            }]
          },
          {
            label: "附件拓展名",
            prop: "extension",
            rules: [{
              required: true,
              message: "请输入附件拓展名",
              trigger: "blur"
            }]
          },
          {
            label: "附件大小",
            prop: "attachSize",
            slot: true,
            rules: [{
              required: true,
              message: "请输入附件大小",
              trigger: "blur"
            }]
          },
        ]
      },
      data: [], // 列表地址
      selectNodeId: null, 
      pictUrl: ["https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170216%2F25f661a8abd043bf926128544b343d81_th.jpeg&refer=http%3A%2F%2Fimg.mp.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671358453&t=db91b4b31f6d663575288ab9e6713b76"], // 图片地址
      attachForm: {},
      attachOption: {
        submitBtn: false,
        emptyBtn: false,
        column: [
          {
            label: '附件上传',
            prop: 'attachFile',
            type: 'upload',
            drag: true,
            loadText: '模板上传中，请稍等',
            span: 24,
            propsHttp: {
              res: 'data'
            },
            action: "/api/fcb-resource/oss/endpoint/put-file-attach"
          }
        ]
      }
    };
  },
  mounted() {
     this.loadCategoryTree();
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        addBtn: false,
        editBtn: false,
        viewBtn: false,
        delBtn: this.vaildData(this.permission.attach_delete, false)
      };
    },
    ids() {
      let ids = [];
      this.selectionList.forEach(ele => {
        ids.push(ele.id);
      });
      return ids.join(",");
    }
  },
  methods: {
    handleNodeClick(node) {
      const that = this;
      that.selectNodeId = node.id; 
      that.query['categoryIds'] = that.selectNodeId;
      that.loadDataList(that.page, that.query);
    },
    filterNode(value, list) { 
      if (!value) return true;
      return list.name.indexOf(value) !== -1;
    },
    handleUpload() {
      this.attachBox = true;

    },
    uploadAfter(res, done, loading, column) {
      this.attachBox = false;
      this.refreshChange();
      done();
    },
    handleDownload(row) {
      window.open(`${row.link}`);
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
          this.loadDataList(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
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
          that.loadDataList(that.page);
          that.$message({
            type: "success",
            message: "操作成功!"
          });
          that.$refs.crud.toggleSelection();
        });
    },
    beforeOpen(done, type) {
      if (["edit", "view"].includes(type)) {
        getDetail(that.form.id).then(res => {
          that.form = res.data.data;
        });
      }
      done();
    },
    searchReset() {
      this.query = {};
      this.loadDataList(this.page);
    },
    searchChange(params, done) {
      this.query = params;
      this.page.currentPage = 1;
      this.loadDataList(this.page, params);
      done();
    },
    selectionChange(list) {
      this.selectionList = list;
    },
    selectionClear() {
      this.selectionList = [];
      this.$refs.crud.toggleSelection();
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    refreshChange() {
      this.loadDataList(this.page, this.query);
    }, 
    loadCategoryTree(page, params = {}) {
      const that = this;
      that.loading = true;
      getCategoryList(that.page.currentPage, that.page.pageSize, Object.assign(params, that.query)).then(res => {
        this.list = res.data.data
        this.page.total = data.total;
        this.data = data.records;
        this.loading = false;
        this.selectionClear();
      });
    },
    loadDataList(page, params = {}) {
      const that = this;
      that.loading = true;
      let tmpParam = Object.assign(params, that.query.id);
      getList(page.currentPage, page.pageSize, tmpParam).then(res => {
        const data = res.data.data;
        that.page.total = data.total;
        that.data = data.records;
        // 对数据做处理遍历data.records这个数组拿到每个数组里的url地址给img标签
        that.pictUrl = that.data.map(item => {
          return item.domainUrl
        })
        // console.log(that.pictUrl);
        that.loading = false;
        that.selectionClear();
      });
    }
  }
};
</script>

<style lang="scss" scoped> 
.left-panel {
  height: 800px;
}

.img-item {
  width: 100%;
}
</style>
