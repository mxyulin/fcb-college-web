<template>
  <el-dialog
    :width="width"
    :visible.sync="dialogVisible"
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="beforeClose"
  >
    <div slot="title">{{ dialogTitle }}</div>
    <!-- 图文表 -->
    <el-row
      :gutter="0"
      type="flex"
      justify="space-between"
      v-if="tableType == 'tuwenbiao'"
    >
      <el-col :span="3">
        <el-tree
          accordion
          :data="treeData"
          :props="defaultProps"
          :node-key="id"
          :highlight-current="true"
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
          ref="tree"
        >
        </el-tree>
      </el-col>
      <el-col :span="20">
        <avue-crud
          :data="data"
          :option="tuwenAvueOption"
          :table-loading="loading"
          :page.sync="page"
          :search.sync="search"
          :permission="permissionList"
          @refresh-change="refreshTable"
          ref="crud"
        >
          <template slot="menuLeft">
            <el-radio-group  v-model="linkType" :size="option.size">
              <el-radio-button label="image" border>图片</el-radio-button>
              <el-radio-button label="goods" border>商品</el-radio-button>
              <el-radio-button label="marketing" border>营销页</el-radio-button>
              <el-radio-button label="article" border>文章</el-radio-button>
            </el-radio-group>
            <el-button
              v-if="resourceType == 'picture'"
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
    <!-- 商品表 -->
    <!-- <el-row
      :gutter="0"
      type="flex"
      justify="space-between"
      v-if="tableType == 'shangpinbiao'"
    >
      <el-col :span="3">
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
              ref="tree"
              :props="defaultProps"
              :data="treeData"
              :node-key="id"
              highlight-current
              :filter-node-method="filterNode"
              @node-click="handleNodeClick"
            >
            </el-tree>
          </el-scrollbar>
        </div>
      </el-col>
      <el-col :span="20">
        <avue-crud
          :data="data"
          :option="shangpinAvueOption"
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
              v-if="resourceType == 'goods-list'"
              >确定</el-button
            >
          </template>
          <template slot="goods" slot-scope="scope">
            <el-row :gutter="10" type="flex" align="middle">
              <el-col :span="12">
                <el-image
                  style="width: 80px; height: 80px"
                  :src="scope.row.image"
                  :preview-src-list="[scope.row.image]"
                  :fit="fit"
                ></el-image>
              </el-col>
              <el-col :span="12">
                <div>{{ scope.row.title }}</div>
                <div>{{ scope.row.subtitle }}</div>
                <div
                  v-for="(tag, idx) of scope.row.activity_discounts_tags"
                  :key="idx"
                >
                  {{ tag }}
                </div>
              </el-col>
            </el-row>
          </template>
          <template slot-scope="{ row }" slot="menu">
            <el-button
              :size="option.size"
              type="primary"
              @click="handleSlect(row)"
              >选择</el-button
            >
          </template>
        </avue-crud>
      </el-col>
    </el-row> -->
    <template slot="footer">
      <el-button
        type="primary"
        :size="option.size"
        v-if="tableType == 'shangpinbiao' && resourceType != 'goods-list'"
        >确定</el-button
      >
    </template>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import option from "@/const/decorate/dodecorate";
import { getList as getCategoryList } from "@/api/resource/attachcategory";
import { getList as getPictureList } from "@/api/resource/attach";
import { getList as getGoodsList } from "@/api/product/product";
import { getTree } from "@/api/product/productcategory";

export default {
  name: "resourceTable",
  props: {
    dialogVisible: Boolean,
    dialogTitle: String,
    width: String,
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
      // 链接表类型
      linkType: 'image',
      // 节点树
      treeData: [],
      filterText: "",
      // 树组件默认配置
      defaultProps: {
        label: "name",
        children: "children",
      },
      nodeData: {},
      nodeId: null,
      // 图文表配置
      tuwenAvueOption: {
        header: true,
        search: true,
        border: true,
        menu: true,
        menuWidth: 100,
        align: "center",
        search: {
          name: "",
        },
        column: [
          {
            label: "标题",
            prop: "name",
            sortable: true,
            overHidden: true,
            hide: false,
          },
          {
            label: "预览",
            prop: "link",
            overHidden: true,
            hide: false,
          },
          {
            label: "文件类型",
            prop: "extension",
            overHidden: true,
            hide: false,
          },
          {
            label: "宽度",
            prop: "width",
            overHidden: true,
            hide: false,
          },
          {
            label: "高度",
            prop: "height",
            overHidden: true,
            hide: false,
          },
          {
            label: "创建时间",
            prop: "createTime",
            sortable: true,
            overHidden: true,
            hide: false,
          },
        ],
      },
      // 商品表配置
      shangpinAvueOption: {
        header: true,
        search: true,
        border: true,
        menu: true,
        menuWidth: 100,
        selection: true,
        align: "center",
        search: {
          name: "",
        },
        column: [
          {
            label: "商品",
            prop: "goods",
            overHidden: true,
            hide: false,
          },
          {
            label: "参与活动",
            prop: "activity_type",
            overHidden: true,
            hide: false,
          },
          {
            label: "库存",
            prop: "stock",
            overHidden: true,
            hide: false,
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
    resourceType() {
      return this.$attrs.resourceType;
    },
    tableType() {
      const { resourceType } = this;
      let result = "";
      switch (resourceType) {
        case "picture":
          result = "tuwenbiao";
          break;
        case "link":
          result = "tuwenbiao";
          break;
        case "goods-group":
          result = "shangpinbiao";
          break;
        case "goods-list":
          result = "shangpinbiao";
          break;
        case "image":
          result = "tuwenbiao";
          break;
      }
      return result;
    },
  },
  watch: {
    // 树节点过滤
    filterText(newVal) {
      this.$refs.tree.filter(newVal);
    },
    // 表格初始化
    dialogVisible(newVal) {
      const { resourceType } = this;

      // 重置列表和表格
      this.treeData = [];
      this.data = [];
      if (newVal) {
        // 根据选择的资源类型不同，提供差异化的表格
        switch (resourceType) {
          case "picture":
            this.defaultProps.label = "name";
            this.loadCategoryTree("picture");
            break;
          case "link":
            this.defaultProps.label = "name";
            this.loadCategoryTree("link");
            this.hideClumn("extension", "width", "height");
            break;
          case "goods-group":
            this.defaultProps.label = "title";
            this.loadCategoryTree("goods");
            this.shangpinAvueOption.menu = false;
            this.shangpinAvueOption.selection = false;
            break;
          case "goods-list":
            this.defaultProps.label = "title";
            this.loadCategoryTree("goods");
            this.shangpinAvueOption.menu = true;
            this.shangpinAvueOption.selection = true;
            break;
          case "image":
            this.defaultProps.label = "name";
            this.loadCategoryTree("picture");
            break;
        }
      }
    },
  },
  methods: {
    // 列隐藏显示
    hideClumn(...args) {
      const { tableType } = this;
      if (tableType == "tuwenbiao") {
        this.tuwenAvueOption.column.forEach((col) => {
          if (args.indexOf(col.prop) != -1) {
            col.hide = true;
          } else {
            col.hide = false;
          }
        });
      } else {
      }
    },
    // 关闭弹窗
    beforeClose(done) {
      this.$emit("update:dialogVisible", false);
      done();
    },
    // 获取节点树
    loadCategoryTree(resourceType) {
      // 根据不同的资源类型返回不同的树节点数据
      switch (resourceType) {
        case "picture":
          getCategoryList().then(({ data: { data } }) => {
            this.treeData = data;
          });
          break;
        case "link":
          this.treeData = [
            {
              id: "img",
              name: "图片",
              parentId: "0",
            },
            {
              id: "goods",
              name: "商品",
              parentId: "0",
            },
            {
              id: "page",
              name: "营销页",
              parentId: "0",
            },
            {
              id: "doc",
              name: "文章",
              parentId: "0",
            },
          ];
          break;
        case "goods":
          getTree().then(({ data: { data } }) => {
            this.treeData = data;
          });
          break;
        case "iamge":
          getCategoryList().then(({ data: { data } }) => {
            this.treeData = data;
          });
          break;
      }
    },
    // 获取表格数据
    loadDataList(page, params = {}) {
      const { resourceType } = this;
      this.loading = true;
      if (resourceType == "picture" || resourceType == "image") {
        getPictureList(page.currentPage, page.pageSize, params).then(
          ({ data: { data } }) => {
            this.page.total = data.total;
            this.data = data.records;
            this.pictUrl = this.data.map((item) => {
              return item.domainUrl;
            });
            this.loading = false;
            this.selectionClear();
          }
        );
      } else if (resourceType == "link") {
        // 获取链接列表数据
      } else if (
        resourceType == "goods-group" ||
        resourceType == "goods-list"
      ) {
        getGoodsList(page.currentPage, page.pageSize, params).then(
          ({ data: { data } }) => {
            console.log("测试", data);
            this.page.total = data.total;
            this.data = data.records;
            this.loading = false;
            this.selectionClear();
          }
        );
      }
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
    // 选择资源
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
};
</script>

<style lang="scss" scoped>
</style>
