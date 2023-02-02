<template>
  <basic-container>
    <el-row :gutter="10" type="flex">
      <el-col :span="6" v-loading="treeLoading">
        <div
          class="display-flex"
          style="justify-content: space-between; padding-bottom: 10px"
        >
          <span>图片分类</span>
          <el-button
            v-if="permission.attach_add"
            type="primary"
            size="small"
            plain
            icon="el-icon-plus"
            @click="addCategory"
            >新 增</el-button
          >
        </div>
        <el-tree
          ref="tree"
          check-strictly
          highlight-current
          render-after-expand
          default-expand-all
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
            @mouseleave="hideMenu"
            @mouseenter="showMenu(data)"
          >
            <input
              type="text"
              :ref="'input' + data.id"
              :value="node.label"
              :disabled="currentEditId == data.id ? false : true"
              :class="
                data.id == currentEditId
                  ? 'custom-tree-node-input-active'
                  : 'custom-tree-node-input'
              "
            />
            <span v-show="currentShowId == data.id">
              <!-- permission.attach_edit && currentEditId == null -->
              <el-button
                type="text"
                size="small"
                v-if="currentEditId == null"
                @click.stop="editCurrentCategoryById(data, $event)"
              >
                编辑
              </el-button>
              <!-- permission.attach_edit && currentEditId == data.id -->
              <el-button
                type="text"
                size="small"
                v-else-if="currentEditId == data.id"
                @click.stop="updateCategoryName(data)"
              >
                确定
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
      </el-col>
      <el-col :span="18">
        <avue-crud
          ref="crud"
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
          <template slot="link" slot-scope="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.link"
              :preview-src-list="[scope.row.link]"
              :fit="fit"
            ></el-image>
          </template>
          <template slot-scope="{ row }" slot="attachSize">
            <el-tag>{{ `${row.attachSize / 1000} KB` }}</el-tag>
          </template>
          <template slot-scope="{ type, size, row }" slot="menu">
            <el-button
              icon="el-icon-copy-document"
              :size="size"
              :type="type"
              @click="copyImgUrl(row)"
              >复制地址</el-button
            >
          </template>
        </avue-crud>
      </el-col>
    </el-row>
    <el-drawer
      title="新增分类"
      width="30%"
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
    </el-drawer>

    <el-drawer
      append-to-body
      title="上传"
      width="30%"
      :visible.sync="showDialogForAttach"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :before-close="onDialogForAttachClose"
      ><div style="padding: 10px">
        <el-upload
          multiple
          ref="upload"
          list-type="picture"
          accept="image/png, image/jpeg"
          action="/api/fcb-resource/oss/endpoint/put-file-attach"
          v-loading="uploadLoading"
          :headers="uploadHeaders"
          :data="{ categoryIds: currentCategoryId }"
          :limit="5"
          :auto-upload="false"
          :file-list="fileList"
          :on-success="onUploadSuccess"
          :on-error="onUploadError"
          :on-progress="onUploadProgress"
          :on-exceed="onUploadExceed"
        >
          <el-button
            slot="trigger"
            size="small"
            type="primary"
            plain
            icon="el-icon-folder-opened"
            >选取文件</el-button
          >
          <el-button
            style="float: right"
            size="small"
            type="primary"
            plain
            icon="el-icon-upload"
            @click="submitUpload"
          >
            上 传
          </el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </div>
    </el-drawer>
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
  remove as removeImage,
} from "@/api/resource/attach";
import { mapGetters } from "vuex";
import { getToken } from "@/util/auth";
import website from "@/config/website";

export default {
  data() {
    return {
      /* status */
      treeLoading: false,
      crudloading: false,
      uploadLoading: false,
      showDialogForAttach: false,
      showDialogForCategory: false,
      /* options */
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
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
            prop: "originalName",
            search: true,
          },
          {
            label: "附件大小",
            prop: "attachSize",
          },
        ],
      },
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
      /* data */
      query: {},
      fileList: [],
      imageList: [],
      categoryForm: {},
      categoryList: [],
      selectionList: [],
      currentShowId: null,
      currentEditId: null,
      currentCategoryId: null,
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
    uploadHeaders() {
      let headers = {};
      headers[website.tokenHeader] = "bearer " + getToken();
      return headers;
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
            this.$nextTick(() => {
              if (this.categoryList.length > 0) {
                this.$refs.tree.$children[0].handleClick();
              }
            });
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
      this.currentCategoryId = id;
      this.getImageListByCategoryId({ categoryIds: id });
    },
    addCategory() {
      this.showDialogForCategory = true;
    },
    showMenu({ id }) {
      this.currentShowId = id;
    },
    hideMenu() {
      this.currentShowId = null;
    },
    editCurrentCategoryById({ id }) {
      this.currentEditId = id;
      this.$nextTick(() => {
        this.$refs["input" + id].focus();
      });
    },
    updateCategoryName(row) {
      let newVal = this.$refs["input" + row.id].value;
      Object.assign(row, { name: newVal });
      updateCategory(row).then(({ data: { code } }) => {
        if (code == 200) {
          this.getCategoryListForTheTree();
          this.$message.success("操作成功!");
        }
      });
      this.currentEditId = null;
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
            this.$message.success("操作成功!");
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
    onUploadSuccess(response, file, fileList) {
      const { code } = response;
      if (code == 200) {
        this.uploadLoading = false;
        this.$refs.upload.clearFiles();
        this.showDialogForAttach = false;
        this.$nextTick(() => {
          this.onRefreshChange();
        });
      }
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
          this.onRefreshChange();
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
          this.onRefreshChange();
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
      const { currentCategoryId } = this;
      this.clearSelection();
      this.getImageListByCategoryId({ categoryIds: currentCategoryId });
    },
    // 复制
    copyImgUrl({ link }) {
      navigator.permissions
        .query({ name: "clipboard-write" })
        .then(({ state, onchange }) => {
          if (state == "granted") {
            navigator.clipboard.writeText(link).then(
              () => {
                this.$message.success("操作成功！");
              },
              () => {
                this.$message.error("操作失败！");
              }
            );
          } else if (state == "prompt") {
            this.$message.warning("请在浏览器设置中打开剪切板写入权限！");
          } else if (state == "denied") {
            this.$message.error("无法获取剪切板写入权限！");
          }
        });
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
}
.img-item {
  width: 100%;
}
.alertsize {
  margin-top: 4px;
  height: 35px;
}
.custom-tree-node-input {
  width: 60%;
  border: 0;
  padding: 1px 5px;
}

.custom-tree-node-input-active {
  width: 60%;
  border: 0;
  border-radius: 3px;
  outline: 1px solid #333;
  padding: 1px 5px;
}
</style>
