<template>
  <el-dialog
    width="75%"
    :visible.sync="dialogVisible"
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="beforeClose"
  >
    <div slot="title">选择{{ dialogTitle }}</div>
    <!-- 资源表 -->
    <el-row gutter="0" type="flex" justify="space-between">
      <el-col :span="4">
        <div>
          <el-scrollbar>
            <el-input
              :size="option.size"
              placeholder="搜索分类"
              v-model="filterText"
              style="margin-bottom: 10px"
            >
            </el-input>
            <el-tree
              :props="defaultProps"
              :data="treeDta"
              :node-key="id"
              :highlight-current="true"
              :filter-node-method="filterNode"
              @node-click="handleNodeClick"
              ref="tree"
            >
            </el-tree>
          </el-scrollbar>
        </div>
      </el-col>
      <el-col :span="19">
        <avue-crud
          :data="data"
          :option="avueOption"
          :table-loading="loading"
          :page.sync="page"
          :search.sync="search"
          :permission="permissionList"
          @refresh-change="refreshTable"
          ref="crud"
        >
          <template slot="menuLeft">
            <el-button
              type="primary"
              :size="option.size"
              icon="el-icon-upload2"
              @click="handleUpload"
              >上传</el-button
            >
          </template>
          <template slot="link" slot-scope="scope">
            <el-image
              style="width: 80px; height: 80px"
              :src="scope.link"
              :preview-src-list="[scope.link]"
              :fit="fit"
            ></el-image>
          </template>
          <template slot="categoryName">{{ nodeData.name }}</template>
          <template slot-scope="{ row }" slot="menu">
            <el-button
              :size="option.size"
              type="primary"
              @click="handleSlect(row)"
              >选择</el-button
            >
          </template>
        </avue-crud>
        <el-dialog
          title="图片上传"
          append-to-body
          :visible.sync="attachBox"
          width="555px"
        >
          <el-upload
            action="/api/fcb-resource/oss/endpoint/put-file-attach"
            :multiple="true"
            :on-preview="handlePreview"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :before-remove="handleBeforeRemove"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
            ref="upload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件, 且不超过500kb
            </div>
          </el-upload>
        </el-dialog>
      </el-col>
    </el-row>
    <div slot="footer"></div>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import option from "@/const/decorate/dodecorate";
import { validatenull } from "@/util/validate";
import { getList as getCategoryList } from "@/api/resource/attachcategory";
import { getList } from "@/api/resource/attach";

export default {
  name: "resourceTable",
  props: {
    dialogVisible: Boolean,
    dialogTitle: String,
  },
  data() {
    return {
      option: option,
      loading: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
        pagerCount: 7,
      },
      query: {},

      /*
       *节点树
       */
      treeDta: [],
      filterText: "",
      defaultProps: {
        children: "children",
        label: "name",
      },
      nodeData: {},
      nodeId: null,
      /*
       *表格
       */
      avueOption: {
        header: true,
        search: true,
        border: true,
        menuWidth: 100,
        align: "center",
        search: {
          name: "",
        },
        column: [
          {
            label: "类别",
            prop: "categoryName",
            overHidden: true,
          },
          {
            label: "文件名",
            prop: "name",
            sortable: true,
            overHidden: true,
          },
          {
            label: "预览",
            prop: "link",
            overHidden: true,
          },
          {
            label: "文件类型",
            prop: "extension",
            overHidden: true,
          },
          {
            label: "创建时间",
            prop: "createTime",
            sortable: true,
            overHidden: true,
          },
        ],
      },
      data: [],
      selectionList: [],
      pictUrl: [],
      attachBox: false,
      fileList: [],
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
    // 表格按钮权限
    permissionList() {
      return {
        addBtn: false,
        editBtn: false,
        delBtn: false,
      };
    },
  },
  watch: {
    // 树节点过滤
    filterText(newVal) {
      this.$refs.tree.filter(newVal);
    },
    dialogVisible(newVal) {
      const { resourceType } = this.$attrs;
      // 重置列表和表格
      this.treeDta = [];
      this.data = [];
      // 获取节点树
      if (newVal) {
        // 根据用户所选资源类型不同，提供不同的节点树
        switch (resourceType) {
          case "picture":
            this.loadCategoryTree();
            break;
        }
      } else {
        this.treeDta = [];
      }
    },
  },
  methods: {
    init() {},
    // 关闭弹窗
    beforeClose(done) {
      this.$emit("update:dialogVisible", false);
      done();
    },
    // 获取节点树
    loadCategoryTree() {
      getCategoryList().then(({ data: { data } }) => {
        this.treeDta = data;
      });
    },
    // 获取表格数据
    loadDataList(page, params = {}) {
      let that = this;
      that.loading = true;
      getList(page.currentPage, page.pageSize, params).then(
        ({ data: { data } }) => {
          that.page.total = data.total;
          that.data = data.records;
          that.pictUrl = that.data.map((item) => {
            return item.domainUrl;
          });
          that.loading = false;
          that.selectionClear();
        }
      );
    },
    // 过滤（搜索）分类
    filterNode(val, data, node) {
      if (!val) return true;
      return data.name.indexOf(val) != -1 ? true : false;
    },
    // 获取对应分类表格数据
    handleNodeClick(data, node) {
      this.nodeId = node.id;
      this.nodeData = data;
      this.loadDataList(this.page, { categoryIds: this.nodeData.id });
    },
    // 选择图片
    handleSlect(row) {
      const { resourceType, currentListIdx, updateForm } = this.$attrs;
      updateForm(resourceType, currentListIdx, row);
      this.$emit("update:dialogVisible", false);
    },
    // 刷新表格
    refreshTable() {
      // 优化用户体验，刷新即刻得到第一个节点数据
      this.$refs.tree.$children[0].handleClick();
      this.$refs.crud.refreshTable();
    },
    // 清空已选
    selectionClear() {
      this.selectionList = [];
      // this.$refs.crud.clearSelection();
    },
    /*
     *上传图片
     */
    // 打开上传
    handleUpload() {
      this.attachBox = true;
    },
    // 上传成功
    uploadSuccess(res, file, fileList) {},
    // 上传失败
    uploadError(err, file, fileList) {},
    // 预览图片
    handlePreview(file) {},
    // 删除文件前
    handleBeforeRemove(file, fileList) {},
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>
