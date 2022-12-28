<template>
  <el-dialog
    :width="width"
    :visible.sync="dialogVisible"
    :append-to-body="true"
    :close-on-click-modal="false"
    :before-close="beforeClose"
    @open="beforeOpen"
  >
    <div slot="title">{{ dialogTitle }}</div>
    <!-- 资源表 -->
    <el-row :gutter="0" type="flex" justify="space-between">
      <el-col :span="3">
        <el-input
          placeholder="搜索类别"
          style="height: 45px"
          v-model="filterText"
          :size="option.size"
        >
        </el-input>
        <el-tree
          accordion
          ref="tree"
          empty-text="暂无节点数据"
          :node-key="id"
          :data="nodeTree"
          :props="defaultProps"
          :highlight-current="true"
          :filter-node-method="filterNodeTree"
          @node-click="onNodeClick"
        >
        </el-tree>
      </el-col>
      <el-col :span="20">
        <avue-crud
          :data="avueList"
          :option="avueOption"
          :table-loading="loading"
          :page.sync="page"
          :search.sync="search"
          :permission="permissionList"
          @refresh-change="refreshTable"
          @select="onSelect"
          @select-all="onSelect"
          ref="crud"
        >
          <template slot="menuLeft">
            <el-radio-group
              v-if="tableType == 'link'"
              v-model="linkType"
              :size="option.size"
            >
              <el-radio-button label="image" border>图片</el-radio-button>
              <el-radio-button label="goods" border>商品</el-radio-button>
              <el-radio-button label="marketing" border>营销页</el-radio-button>
              <el-radio-button label="article" border>文章</el-radio-button>
            </el-radio-group>
            <el-button
              v-if="tableType == 'image' || tableType == 'images'"
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
          <template slot-scope="{ row }" slot="menu">
            <el-button
              :size="option.size"
              type="primary"
              @click="singleSlect(row)"
              >选择</el-button
            >
          </template>
          <template slot="page" v-if="isMutiple">
            <el-col :span="1">
              <el-button
                type="primary"
                :size="option.size"
                @click="mutipleSlect"
                >确定</el-button
              >
            </el-col>
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
              :data="nodeTree"
              :node-key="id"
              highlight-current
              :filter-node-method="filterNodeTree"
              @node-click="onNodeClick"
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
              v-if="tableType == 'goods-list'"
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
              @click="singleSlect(row)"
              >选择</el-button
            >
          </template>
        </avue-crud>
      </el-col>
    </el-row> -->
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import option from "@/const/decorate/dodecorate";
import { getList as getImageCategory } from "@/api/resource/attachcategory";
import { getList as getImageList } from "@/api/resource/attach";
import { getList as getGoodsList } from "@/api/product/product";
import { getTree as getGoodsCategory } from "@/api/product/productcategory";

export default {
  name: "resourceTable",
  props: {
    dialogVisible: Boolean,
    dialogTitle: String,
    width: String,
    tableType: String,
  },
  data() {
    return {
      loading: false,
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        pagerCount: 7,
        layout: "slot, total, sizes, prev, pager, next, jumper, ->",
      },
      // 链接表类型
      linkType: "image",
      //
      nodeTree: [],
      avueList: [],
      selectionList: [],
      pictUrl: [],
      filterText: "",
      defaultProps: {
        label: "name",
        children: "children",
      },
      nodeData: {},
      nodeId: null,
      avueOption: {
        header: true,
        search: true,
        border: true,
        menu: true,
        selection: false,
        menuWidth: 100,
        align: "center",
        search: {
          name: "",
        },
        column: [],
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
      //
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
    // 表格按钮权限控制
    permissionList() {
      return {
        addBtn: false,
        editBtn: false,
        delBtn: false,
      };
    },
    // el-ui组件全局配置
    option() {
      return option;
    },
    // 多选状态
    isMutiple() {
      const { tableType } = this;
      return tableType == "images" || tableType == "goods" ? true : false;
    },
  },
  watch: {
    // 节点树过滤
    filterText(newVal) {
      this.$refs.tree.filter(newVal);
    },
  },
  methods: {
    getNodeTree(tableType) {
      switch (tableType) {
        case "image":
          getImageCategory().then(({ data: { data } }) => {
            this.nodeTree = data;
            this.$nextTick(() => {
              this.refreshTable();
            });
          });
          break;
        case "link":
          break;
        case "goods":
          getGoodsCategory().then(({ data: { data } }) => {
            this.nodeTree = data;
          });
          break;
      }
    },
    getList(page, params = {}) {
      const { tableType } = this;
      this.loading = true;
      if (tableType == "image" || tableType == "images") {
        getImageList(page.currentPage, page.pageSize, params).then(
          ({ data: { data } }) => {
            this.page.total = data.total;
            this.avueList = data.records;
            this.pictUrl = this.avueList.map((item) => {
              return item.domainUrl;
            });
            this.loading = false;
            this.clearSelection();
          }
        );
      } else if (tableType == "link") {
        // 获取链接列表数据
      } else if (tableType == "goods-group" || tableType == "goods-list") {
        getGoodsList(page.currentPage, page.pageSize, params).then(
          ({ data: { data } }) => {
            this.page.total = data.total;
            this.avueList = data.records;
            this.loading = false;
            this.clearSelection();
          }
        );
      }
    },
    // 组件初始化
    beforeOpen() {
      const { tableType } = this;
      // 重置列表和表格
      this.nodeTree = [];
      this.avueList = [];
      // 根据选择的资源类型不同，提供差异化的表格
      switch (tableType) {
        case "image":
          this.defaultProps.label = "name";
          this.avueOption.menu = true;
          this.avueOption.selection = false;
          this.avueOption.column = [
            {
              label: "标题",
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
              label: "宽度",
              prop: "width",
              overHidden: true,
            },
            {
              label: "高度",
              prop: "height",
              overHidden: true,
            },
            {
              label: "创建时间",
              prop: "createTime",
              sortable: true,
              overHidden: true,
            },
          ];
          this.getNodeTree("image");
          break;
        case "images":
          this.defaultProps.label = "name";
          this.avueOption.menu = false;
          this.avueOption.selection = true;
          this.avueOption.column = [
            {
              label: "标题",
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
              label: "宽度",
              prop: "width",
              overHidden: true,
            },
            {
              label: "高度",
              prop: "height",
              overHidden: true,
            },
            {
              label: "创建时间",
              prop: "createTime",
              sortable: true,
              overHidden: true,
            },
          ];
          this.getNodeTree("image");
          break;
        case "link":
          this.defaultProps.label = "name";
          this.getNodeTree("link");
          this.hideClumn("extension", "width", "height");
          break;
        case "goods-group":
          this.defaultProps.label = "title";
          this.getNodeTree("goods");
          this.shangpinAvueOption.menu = false;
          this.shangpinAvueOption.selection = false;
          break;
        case "goods-list":
          this.defaultProps.label = "title";
          this.getNodeTree("goods");
          this.shangpinAvueOption.menu = true;
          this.shangpinAvueOption.selection = true;
          break;
      }
    },
    beforeClose(done) {
      this.$emit("update:dialogVisible", false);
      done();
    },
    // 隐藏表格列
    hideClumn(...args) {
      this.avueOption.column.forEach((item) => {
        if (args.indexOf(item.prop) != -1) {
          item.hide = true;
        } else {
          item.hide = false;
        }
      });
    },
    // 过滤（搜索）分类
    filterNodeTree(val, data, node) {
      if (!val) return true;
      return data.name.indexOf(val) != -1 ? true : false;
    },
    // 获取对应分类表格数据
    onNodeClick(data, node) {
      this.nodeId = node.id;
      this.nodeData = data;
      this.getList(this.page, { categoryIds: this.nodeData.id });
    },
    // 单选
    singleSlect(row) {
      const {
        tableType,
        $attrs: { currentSelection, updateForm },
      } = this;
      updateForm(tableType, currentSelection, row);
      this.$emit("update:dialogVisible", false);
    },
    onSelect(selection, row) {
      this.selectionList = selection;
    },
    // 多选
    mutipleSlect() {
      const {
        tableType,
        selectionList,
        $attrs: { currentSelection, updateForm },
      } = this;
      updateForm(tableType, currentSelection, selectionList)
      this.$emit("update:dialogVisible", false);
    },
    // 刷新表格
    refreshTable() {
      // 优化用户体验，刷新即可得到第一个节点数据
      this.$refs.tree.$children[0].handleClick();
    },
    // 清空已选
    clearSelection() {
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
