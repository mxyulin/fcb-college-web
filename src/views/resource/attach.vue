<template>
  <basic-container>
    <el-row :gutter="10" type="flex">
      <el-col :span="6">
        <el-card v-loading="treeLoading">
          <div
            slot="header"
            class="display-flex"
            style="justify-content: space-between"
          >
            <span>图片分类</span>
            <el-button
              v-if="permission.attach_add"
              type="primary"
              size="small"
              icon="el-icon-plus"
              @click="addCategory"
              >新 增</el-button
            >
          </div>
          <el-tree
            ref="tree"
            show-checkbox
            check-strictly
            highlight-current
            render-after-expand
            node-key="id"
            :props="{
              label: 'name',
              children: 'children',
            }"
            :data="categoryList"
            :expand-on-click-node="false"
            @node-click="onNodeClick"
          >
            <sapn
              class="custom-tree-node display-flex"
              slot-scope="{ node, data }"
            >
              <span>{{ node.label }}</span>
              <span>
                <el-button
                  type="text"
                  size="small"
                  v-if="permission.attach_edit"
                >
                  编辑
                </el-button>
                <el-button
                  v-if="permission.attach_delete"
                  type="text"
                  size="small"
                  @click.stop="deleteCurrentCategoryById(data)"
                >
                  删除
                </el-button>
              </span>
            </sapn>
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="18">
        <avue-crud
          ref="crud"
          v-model="crudForm"
          :data="imageList"
          :page.sync="page"
          :option="crudOptions"
          :table-loading="crudloading"
          :permission="permissionList"
          @row-del="deleteAttach"
          @search-change="onSearchChange"
          @search-reset="resetSearchQueryObj"
          @selection-change="onSelectionChange"
          @current-change="onCurrentChange"
          @size-change="onSizeChange"
          @refresh-change="onRefreshChange"
          @on-load="getImageListByCategoryId"
        >
          <template slot="link" slot-scope="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.link"
              :preview-src-list="[scope.row.link]"
              :fit="fit"
            ></el-image>
          </template>
          <template slot="menuLeft">
            <el-button
              type="primary"
              size="small"
              plain
              v-if="permission.attach_upload"
              icon="el-icon-upload2"
              @click="attatchUpload"
              >上 传
            </el-button>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              plain
              v-if="permission.attach_delete"
              @click="deleteAttachs"
              >删 除
            </el-button>
          </template>
          <template slot-scope="{ row }" slot="attachSize">
            <el-tag>{{ `${row.attachSize / 1000} KB` }}</el-tag>
          </template>
        </avue-crud>
      </el-col>
    </el-row>
    <el-dialog
      title="新增分类"
      :visible.sync="showDialogForCategory"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
    >
      <avue-form
        ref="categoryForm"
        v-model="categoryForm"
        :option="categoryFormOptions"
        @submit="onCategoryFormSubmit"
      >
      </avue-form>
    </el-dialog>
    <el-dialog
      append-to-body
      title="附件上传"
      width="25%"
      :visible.sync="showDialogForAttach"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :before-close="onDialogForAttachClose"
    >
      <el-upload
        multiple
        ref="upload"
        list-type="picture"
        accept="image/png, image/jpeg"
        action="/api/fcb-resource/oss/endpoint/put-file-attach"
        v-loading="uploadLoading"
        :limit="5"
        :auto-upload="false"
        :file-list="fileList"
        :on-success="onUploadSuccess"
        :on-error="onUploadError"
        :on-progress="onUploadProgress"
        :on-exceed="onUploadExceed"
      >
        <el-button slot="trigger" size="small" type="primary"
          >选取文件</el-button
        >
        <el-button
          style="margin-left: 10px"
          size="small"
          type="success"
          @click="submitUpload"
          >上传到服务器</el-button
        >
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-dialog>
  </basic-container>
</template>

<script>
import {
  getList as getCategoryList,
  add as addCategory,
  update as updateCategory,
  remove as removeCategory,
} from "@/api/resource/attachcategory";
import {
  getList as getImageList,
  getDetail as getDetailOfImage,
  remove as removeImage,
} from "@/api/resource/attach";
import { mapGetters } from "vuex";

export default {
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  data() {
    return {
      categoryForm: {},
      categoryList: [],
      categoryFormOptions: {
        size: "small",
        labelPosition: "right",
        menuPosition: "right",
        column: [
          {
            label: "分类名称",
            prop: "categoryName",
            span: 24,
            rules: {
              required: true,
              message: "请输入分类名称",
              trigger: "blur",
            },
          },
          {
            label: "父级分类",
            prop: "parentId",
            type: "cascader",
            showAllLevels: false,
            checkStrictly: true,
            emitPath: false,
            disabled: false,
            span: 24,
            tip: "注意：选择一个节点作为新建节点的父级，若不选择则意味着新建一个祖先节点！",
            tipPlacement: "top",
            props: {
              label: "name",
              value: "id",
            },
            dicData: [],
            focus: () => {
              const { categoryList } = this;
              this.categoryFormOptions.column[1].dicData = categoryList;
            },
          },
        ],
      },
      treeLoading: false,
      crudloading: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      crudForm: {},
      imageList: [],
      /*  */
      formLabelWidth: "80px",
      // 新增
      showDialogForCategory: false,
      // 编辑
      dialogmodify: false,
      nameupdate: null,

      options: [],
      selectvalue: [],

      filterText: "",

      query: {},

      showDialogForAttach: false,
      selectionList: [],
      selectNodeId: 123,
      crudOptions: {
        size: "small",
        height: "61vh",
        header: true,
        border: true,
        searchShow: false,
        searchMenuSpan: 5,
        menuFixed: false,
        selectionFixed: false,
        rowKey: "id",
        selection: true,
        reserveSelection: true,
        dialogClickModal: false,
        column: [
          {
            label: "附件图片",
            prop: "link",
          },
          {
            label: "附件名称",
            prop: "name",
            search: true,
          },
          {
            label: "附件大小",
            prop: "attachSize",
          },
          {
            label: "附件状态",
            prop: "status",
          },
        ],
      },
      pictUrl: [
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170216%2F25f661a8abd043bf926128544b343d81_th.jpeg&refer=http%3A%2F%2Fimg.mp.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1671358453&t=db91b4b31f6d663575288ab9e6713b76",
      ], // 图片地址
      fileList: [],
      uploadLoading: false,
    };
  },
  mounted() {
    this.getCategoryListForTheTree();
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      const { attach_delete, attach_edit } = this.permission;
      return {
        addBtn: false,
        viewBtn: false,
        delBtn: attach_delete,
        editBtn: false,
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
    onCategoryFormSubmit({ categoryName, parentId }, done) {
      addCategory({
        name: categoryName,
        parentId: parentId ? parentId : "0",
      }).then(({ data: { code } }) => {
        if (code == 200) {
          this.$refs.categoryForm.resetForm();
          this.showDialogForCategory = false;
          this.getCategoryListForTheTree();
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          done();
        } else {
          this.$message({
            type: "error",
            message: "操作失败!",
          });
        }
      });
    },
    getCategoryListForTheTree() {
      const { page } = this;
      this.treeLoading = true;
      getCategoryList(page.currentPage, page.pageSize).then(
        ({ data: { code, data } }) => {
          if (code == 200) {
            this.categoryList = data;
            this.$refs.tree.setCheckedKeys([]);
            this.treeLoading = false;
          }
        }
      );
    },
    getImageListByCategoryId(params = {}) {
      const { page } = this;
      this.crudloading = true;
      getImageList(page.currentPage, page.pageSize, params).then(
        ({ data: { code, data } }) => {
          if (code == 200) {
            this.page.total = data.total;
            this.page.pageSize = data.size;
            this.page.currentPage = data.current;
            this.imageList = data.records;
            this.$refs.crud.$refs.table.clearSelection();
            this.crudloading = false;
          }
        }
      );
    },
    onNodeClick({ id }) {
      this.getImageListByCategoryId({ categoryIds: id });
    },
    addCategory() {
      this.showDialogForCategory = true;
    },
    deleteCurrentCategoryById({ id }) {
      this.$confirm("确定删除当前分类？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        removeCategory(id).then(({ data: { code } }) => {
          if (code == 200) {
            this.getCategoryListForTheTree();
            this.$message({
              type: "success",
              message: "操作成功！",
            });
          }
        });
      });
    },
    attatchUpload() {
      this.showDialogForAttach = true;
    },
    onDialogForAttachClose(done) {
      if (this.uploadLoading) {
        this.$refs.upload.abort();
        this.uploadLoading = false;
      }
      this.$refs.upload.clearFiles();
      this.showDialogForAttach = false;
      done();
    },
    onUploadProgress() {
      this.uploadLoading = true;
    },
    onUploadSuccess(response) {
      this.this.uploadLoading = false;
      console.log("测试", response);
      // onRefreshChange
    },
    onUploadExceed() {
      this.$message.error("最大上传5个文件");
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    deleteAttach(row) {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return removeImage(row.id);
        })
        .then(() => {
          this.getImageListByCategoryId();
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
    },
    deleteAttachs() {
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
          return removeImage(that.ids);
        })
        .then(() => {
          that.getImageListByCategoryId(that.page);
          that.$message({
            type: "success",
            message: "操作成功!",
          });
          that.$refs.crud.toggleSelection();
        });
    },
    resetSearchQueryObj() {
      this.query = {};
      this.getImageListByCategoryId();
    },
    onSearchChange(params, done) {
      this.query = params;
      this.page.currentPage = 1;
      this.getImageListByCategoryId(params);
      done();
    },
    onSelectionChange(list) {
      this.selectionList = list;
    },
    clearSelection() {
      this.selectionList = [];
      this.$refs.crud.toggleSelection();
    },
    onCurrentChange(currentPage) {
      this.page.currentPage = currentPage;
    },
    onSizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    onRefreshChange() {
      this.clearSelection();
      this.getImageListByCategoryId();
    },
  },
};
</script>

<style lang="scss" scoped>
.display-flex {
  display: flex;
  align-items: center;
}
.custom-tree-node {
  flex: 1;
  justify-content: space-between;
  font-size: 14px;
  padding-left: 8px;
}
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
