<template>
  <el-row>
    <el-col :span="5">
      <div class="left-panel">
        <el-scrollbar>
          <basic-container>
            <el-button type="primary" size="small" plain @click="onCreateNew"
              >新增</el-button
            >
            <el-dialog
              title="新增"
              append-to-body="ture"
              :visible.sync="showDialog"
            >
              <el-form>
                <el-form-item :label-width="formLabelWidth">
                  <el-input
                    v-model="nodeName"
                    clearable
                    class="inputwidth"
                    size="medium"
                    placeholder="请输入"
                  ></el-input>
                  <el-alert
                    v-show="alertif"
                    class="alertsize"
                    title="不能为空"
                    type="warning"
                    effect="dark"
                  >
                  </el-alert>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="rowSave">保存</el-button>
                <el-button @click="showDialog = false">取 消</el-button>
              </div>
            </el-dialog>

            <el-button type="info" size="small" @click="onEdit" plain
              >编辑</el-button
            >
            <el-dialog
              title="编辑"
              append-to-body="ture"
              :visible.sync="dialogmodify"
            >
              <el-form>
                <el-form-item :label-width="formLabelWidth">
                  <el-input
                    class="inputwidth"
                    size="medium"
                    placeholder="请输入"
                    v-model="nameupdate"
                  ></el-input>
                  <el-alert
                    v-show="alertif"
                    class="alertsize"
                    title="不能为空和不能等于原来的名字"
                    type="warning"
                    effect="dark"
                  >
                  </el-alert>
                </el-form-item>
              </el-form>
              
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="rowUpdate"
                  >保存</el-button
                >
                <el-button @click="dialogmodify = false">取 消</el-button>
              </div>
            </el-dialog>

            <el-button type="danger" size="small" plain @click="onRemove"
              >删 除</el-button
            >

            <el-tree
              class="filter-tree"
              :data="list"
              :props="defaultProps"
              default-expand-all
              :filter-node-method="filterNode"
              @node-click="handleNodeClick"
              ref="tree"
            >
            </el-tree>
          </basic-container>
        </el-scrollbar>
      </div>
    </el-col>
    <el-col :span="19">
      <basic-container>
        <avue-crud
          :option="option"
          :table-loading="loading"
          :data="data"
          :page.sync="page"
          :permission="permissionList"
          :before-open="beforeOpen"
          v-model="form"
          ref="crud"
          @row-del="rowDel"
          @search-change="searchChange"
          @search-reset="searchReset"
          @selection-change="selectionChange"
          @current-change="currentChange"
          @size-change="sizeChange"
          @refresh-change="refreshChange"
          @on-load="loadDataList"
        >
          <template slot="link">
            <img
              class="img-item"
              src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170216%2F25f661a8abd043bf926128544b343d81_th.jpeg&refer=http%3A%2F%2Fimg.mp.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671358453&t=db91b4b31f6d663575288ab9e6713b76"
              alt=""
            />
          </template>
          <template slot="menuLeft">
            <el-button
              type="primary"
              size="small"
              plain
              v-if="permission.attach_upload"
              icon="el-icon-upload2"
              @click="handleUpload"
              >上 传
            </el-button>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              plain
              v-if="permission.attach_delete"
              @click="handleDelete"
              >删 除
            </el-button>
          </template>
          <template slot-scope="scope" slot="menu">
            <el-button
              type="text"
              icon="el-icon-download"
              size="small"
              v-if="permission.attach_download"
              @click="handleDownload(scope.row)"
              >下载
            </el-button>
          </template>
          <template slot-scope="{ row }" slot="attachSize">
            <el-tag>{{ `${row.attachSize} KB` }}</el-tag>
          </template>
        </avue-crud>
        <el-dialog
          title="附件管理"
          append-to-body
          :visible.sync="attachBox"
          width="555px"
        >
          <avue-form
            ref="form"
            :option="attachOption"
            v-model="attachForm"
            :upload-after="uploadAfter"
          >
          </avue-form>
        </el-dialog>
      </basic-container>
    </el-col>
  </el-row>
</template>

<script>
import {
  getList as getCategoryList,
  add,
  update,
  remove as removeCategory,
} from "@/api/resource/attachcategory";
import { getList, getDetail, remove } from "@/api/resource/attach";
import { mapGetters } from "vuex";
import func from "@/util/func";

export default {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  data() {
    return {
      formLabelWidth: "80px",
      // 新增
      showDialog: false,
      nodeName: null,
      alertif: false,
      // 编辑
      dialogmodify:false,
      nameupdate: null,
      // 增删改
      curSelectNode: null,
      /////////////////////////////

      options: [],
      selectvalue: [],
      loading: false,

      filterText: "",
      list: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      form: {},
      query: {},
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      attachBox: false,
      selectionList: [],
      selectNodeId: 123,
      option: {
        height: "auto",
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
            slot: true, // 将slot 设置为true， 在模板中slot 为prop
            rules: [
              {
                required: true,
                message: "请输入附件地址",
                trigger: "blur",
              },
            ],
          },
          {
            label: "附件域名",
            prop: "domainUrl",
            search: true,
            rules: [
              {
                required: true,
                message: "请输入附件域名",
                trigger: "blur",
              },
            ],
          },
          {
            label: "附件名称",
            prop: "name",
            search: true,
            rules: [
              {
                required: true,
                message: "请输入附件名称",
                trigger: "blur",
              },
            ],
          },
          {
            label: "附件原名",
            prop: "originalName",
            search: true,
            rules: [
              {
                required: true,
                message: "请输入附件原名",
                trigger: "blur",
              },
            ],
          },
          {
            label: "附件拓展名",
            prop: "extension",
            rules: [
              {
                required: true,
                message: "请输入附件拓展名",
                trigger: "blur",
              },
            ],
          },
          {
            label: "附件大小",
            prop: "attachSize",
            slot: true,
            rules: [
              {
                required: true,
                message: "请输入附件大小",
                trigger: "blur",
              },
            ],
          },
        ],
      },
      data: [], // 列表地址
      pictUrl: [
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170216%2F25f661a8abd043bf926128544b343d81_th.jpeg&refer=http%3A%2F%2Fimg.mp.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671358453&t=db91b4b31f6d663575288ab9e6713b76",
      ], // 图片地址
      attachForm: {},
      attachOption: {
        submitBtn: false,
        emptyBtn: false,
        column: [
          {
            label: "附件上传",
            prop: "attachFile",
            type: "upload",
            drag: true,
            loadText: "模板上传中，请稍等",
            span: 24,
            propsHttp: {
              res: "data",
            },
            data: {
              categoryIds: null,
            },
            action: "/api/fcb-resource/oss/endpoint/put-file-attach",
          },
        ],
      },
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
        delBtn: this.vaildData(this.permission.attach_delete, false),
      };
    },
    ids() {
      let ids = [];
      this.selectionList.forEach((ele) => {
        ids.push(ele.id);
      });
      return ids.join(",");
    },
  },
  methods: {
    // 新增
    onCreateNew() {
      this.nodeName = "";
      this.showDialog = true;
    },
    rowSave() {
      let parentId = null;
      if (this.curSelectNode == null) {
        parentId = 0;
      } else {
        parentId = this.curSelectNode.id;
      }

      let params = { name: this.nodeName, parentId: parentId };

      if (func.isEmpty(this.nodeName)) {
        this.alertif = true;
        return;
      }
      // console.log("row", params);

      add(params).then(
        (res) => {
          this.loadCategoryTree();
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          this.showDialog = false;
        },
        (error) => {
          loading();
          console.log(error);
        }
      );
    },
    //  编辑有问题
    onEdit() {
      if (this.curSelectNode == null) {
        this.$confirm("请选则至少一条数据", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
      } else {
        // console.log('编辑')
        this.nameupdate = this.curSelectNode.name;
        this.dialogmodify = true;
      }
    },
    rowUpdate() {
      let params = this.curSelectNode
      if(func.isEmpty(this.nameupdate)||this.nameupdate===this.curSelectNode.name){
        this.alertif = true;
        return;
      }
      params.name=this.nameupdate
      // console.log(params)
      update(params).then(() => {
        this.loadCategoryTree();
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        this.dialogmodify = false;
      }, error => {
        console.log(error);
      });
    },

    // 删除handleDelete rowDel
    onRemove() {
      if (this.curSelectNode == null) {
        this.$confirm("请选则至少一条数据", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
      } else {
        this.$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            return removeCategory(this.curSelectNode.id);
          })
          .then(() => {
            this.loadCategoryTree();
            this.$message({
              type: "success",
              message: "操作成功!",
            });
          });
      }
    },
    ////////////////////////////////////////////////
    handleNodeClick(node) {
      this.curSelectNode = node;

      this.query["categoryIds"] = this.attachOption.column[0].data.categoryIds =
        node.id;
      this.loadDataList(this.page, this.query);
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
        type: "warning",
      })
        .then(() => {
          return remove(row.id);
        })
        .then(() => {
          this.loadDataList(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
    },
    handleDelete() {
      const that = this;
      if (that.selectionList.length === 0) {
        that.$message.warning("请选择至少一条数据");
        return;
      }
      that
        .$confirm("确定将选择数据删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          return remove(that.ids);
        })
        .then(() => {
          that.loadDataList(that.page);
          that.$message({
            type: "success",
            message: "操作成功!",
          });
          that.$refs.crud.toggleSelection();
        });
    },
    beforeOpen(done, type) {
      if (["edit", "view"].includes(type)) {
        getDetail(that.form.id).then((res) => {
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
      getCategoryList(
        that.page.currentPage,
        that.page.pageSize,
        Object.assign(params, that.query)
      ).then((res) => {
        this.list = res.data.data;
        // console.log('list',res.data.data)

        // this.data = data.records;
        this.loading = false;
        this.selectionClear();
      });
    },

    loadDataList(page, params = {}) {
      const that = this;
      that.loading = true;
      let tmpParam = Object.assign(params, that.query.id);
      getList(page.currentPage, page.pageSize, tmpParam).then((res) => {
        const data = res.data.data;
        that.page.total = data.total;
        that.data = data.records;
        // 对数据做处理遍历data.records这个数组拿到每个数组里的url地址给img标签
        // that.pictUrl = that.data.map(item => {
        //   return item.domainUrl
        // })
        // console.log(that.pictUrl);
        that.loading = false;
        that.selectionClear();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.left-panel {
  height: 800px;
  // min-width: 250px;
}

.img-item {
  width: 100%;
}
.alertsize {
  margin-top: 4px;
  height: 35px;
}
</style>
