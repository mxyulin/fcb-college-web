<template>
  <el-drawer
    top="5vh"
    size="60%"
    append-to-body
    :wrapperClosable="false"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    @open="onDialogOpen"
    @close="onDialogClose"
  >
    <div slot="title">{{ dialogTitle }}</div>
    <!-- 资源表模块 -->
    <el-row
      :gutter="0"
      type="flex"
      justify="space-between"
      v-if="!isShowCategorySelector"
    >
      <el-col :span="layout.leftCol">
        <el-input
          placeholder="搜索类别"
          style="height: 45px"
          v-model="filterText"
          size="small"
        >
        </el-input>
        <el-tree
          ref="tree"
          empty-text="暂无节点数据"
          accordion
          :highlight-current="true"
          :expand-on-click-node="false"
          :node-key="id"
          :data="categoryList"
          :props="defaultProps"
          :filter-node-method="filterNodeTree"
          @node-click="onNodeClick"
        >
        </el-tree>
      </el-col>
      <el-col :span="layout.rightCol">
        <avue-crud
          :data="avueList"
          :option="avueOption"
          :table-loading="loading"
          :page.sync="page"
          :search.sync="search"
          :permission="permissionList"
          @refresh-change="onRefreshChange"
          @selection-change="onSelectionChange"
          @current-change="onPageChange"
          @size-change="onPageChange"
          ref="crud"
        >
          <template slot="link" slot-scope="scope">
            <el-image
              lazy
              style="width: 80px; height: 80px"
              :src="scope.row.link"
              :preview-src-list="[scope.row.link]"
              :fit="fit"
            ></el-image>
          </template>
          <template slot="goods" slot-scope="scope">
            <div class="display-flex" style="justify-content: space-evenly">
              <el-image
                lazy
                style="width: 80px; height: 80px"
                :src="scope.row.image"
                :preview-src-list="[scope.row.image]"
                :fit="fit"
              ></el-image>
              <div>
                <div>{{ scope.row.title }}</div>
                <div>{{ scope.row.subtitle }}</div>
              </div>
            </div>
          </template>
          <template slot="type" slot-scope="scope">
            <span v-show="scope.row.type == 'normal'">实体商品</span>
            <span v-show="scope.row.type == 'virtual'">虚拟商品</span>
            <span v-show="scope.row.type == 'cash'">代金券</span>
            <span v-show="scope.row.type == 'discount'">折扣券</span>
          </template>
          <template slot="status" slot-scope="scope">
            <span v-show="scope.row.status == 0">隐藏中</span>
            <span v-show="scope.row.status == 1">上架中</span>
            <span v-show="scope.row.status == 2">下架中</span>
          </template>
          <template slot="image" slot-scope="scope">
            <el-image
              lazy
              style="width: 80px; height: 80px"
              :src="scope.row.image"
              :preview-src-list="[scope.row.image]"
              :fit="fit"
            ></el-image>
          </template>
          <template slot="picUrls" slot-scope="{ row }">
            <el-image
              lazy
              style="width: 80px; height: 80px"
              :src="formatPicUrls(row)"
              :preview-src-list="formatPicUrls(row)"
              :fit="fit"
            >
              <div slot="error" class="image-slot">
                <i
                  class="el-icon-picture-outline"
                  style="font-size: 64px; color: #dddddd"
                ></i>
              </div>
            </el-image>
          </template>
          <template slot="state" slot-scope="scope">
            <span v-show="scope.row.state == 1">已发布</span>
            <span v-show="scope.row.state == 2">未发布</span>
          </template>
          <template slot="menuLeft">
            <el-button
              v-if="tableType == 'image' || tableType == 'images'"
              type="primary"
              size="small"
              icon="el-icon-upload2"
              @click="attatchUpload"
              >上传</el-button
            >
          </template>
          <!-- 单选按钮 -->
          <template slot-scope="{ row }" slot="menu">
            <el-button size="small" type="primary" @click="onSelect(row)"
              >选择</el-button
            >
          </template>
          <!-- 多选按钮 -->
          <template slot="page" v-if="isShowMutipleCheckbox">
            <el-col :span="1">
              <el-button type="primary" size="small" @click="onMutipleSlect"
                >确定</el-button
              >
            </el-col>
          </template>
        </avue-crud>
        <el-drawer
          append-to-body
          title="附件上传"
          width="50%"
          :wrapperClosable="false"
          :modal-append-to-body="true"
          :close-on-click-modal="false"
          :visible.sync="showDialogForAttach"
          :before-close="onDialogForAttachClose"
        >
        <div style="padding:10px 20px;">
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
              type="info"
              plain
              icon="el-icon-folder-opened"
              >选取文件</el-button
            >
            <el-button
              style="float:right; "
              size="small"
              type="primary"
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
      </el-col>
    </el-row>
    <!-- 商品分类级联选择器 -->
    <el-row
      :gutter="15"
      type="flex"
      style="height: 75vh"
      justify="start"
      v-if="isShowCategorySelector"
    >
      <el-col :span="4">
        <el-cascader
          clearable
          filterable
          size="medium"
          ref="goodsCategoryCascader"
          v-model="goodsCategorySelection"
          :options="categoryList"
          :props="cascaderProps"
          :show-all-levels="false"
        >
        </el-cascader>
      </el-col>
      <el-col :span="20">
        <el-button type="primary" size="medium" @click="onSelectGoodsCategory">
          确定
        </el-button>
      </el-col>
    </el-row>
  </el-drawer>
</template>

<script>
import website from "@/config/website";
import { mapGetters } from "vuex";
import { dateFormat } from "@/util/date";
import { getToken } from "@/util/auth";
import { getList as getImageCategory } from "@/api/resource/attachcategory";
import { getList as getImageList } from "@/api/resource/attach";
import { getList as getGoodsCategory } from "@/api/product/productcategory";
import { getList as getGoodsList } from "@/api/product/product";
import { getList as getLinkList } from "@/api/resource/link";
import { getList as getCouponsList } from "@/api/promote/coupons";
import { getList as getActivityList } from "@/api/promote/promote";
import { getList as getArticleList } from "@/api/news/article";

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
      /* 状态 */
      loading: false,
      uploadLoading: false,
      showDialogForAttach: false,

      /* 配置项 */
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        pagerCount: 7,
        layout: "slot, total, sizes, prev, pager, next, jumper, ->",
      },
      layout: {
        leftCol: 3,
        rightCol: 20,
      },
      defaultProps: {
        label: "name",
        children: "children",
      },
      avueOption: {
        rowKey: "id",
        align: "center",
        height: 500,
        menuWidth: 100,
        menu: true,
        header: true,
        border: true,
        searchBtn: false,
        selection: false,
        reserveSelection: true,
        menuFixed: false,
        selectionFixed: false,
        search: {
          name: "",
        },
        column: [],
      },
      cascaderProps: {
        multiple: false,
        checkStrictly: true,
        emitPath: false,
        label: "name",
        value: "id",
        children: "children",
      },

      /* 数据源 */
      fileList: [],
      avueList: [],
      categoryList: [],
      selectionList: [],
      goodsCategorySelection: [],
      filterText: "",
      currentCategoryId: null,
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
    // 表格按钮展示控制
    permissionList() {
      return {
        addBtn: false,
        editBtn: false,
        delBtn: false,
      };
    },
    isShowMutipleCheckbox() {
      const { tableType } = this;
      return tableType == "images" ||
        tableType == "goods-list" ||
        tableType == "category-tabs" ||
        tableType == "coupons"
        ? true
        : false;
    },
    isShowCategorySelector() {
      const { tableType } = this;
      return tableType == "category-tabs" || tableType == "goods-group"
        ? true
        : false;
    },
    uploadHeaders() {
      let headers = {};
      headers[website.tokenHeader] = "bearer " + getToken();
      return headers;
    },
  },
  watch: {
    // 节点搜索
    filterText(newVal) {
      this.$refs.tree.filter(newVal);
    },
  },
  methods: {
    async getCategoryList(type) {
      let result = null;
      switch (type) {
        case "image":
          result = await getImageCategory();
          break;
        case "goods":
          result = await getGoodsCategory();
          break;
      }
      const {
        data: { code, data },
      } = result;
      if (code == 200) {
        this.categoryList = data;
        return "ok";
      }
      return Promise.reject(new Error("faile"));
    },
    async getList(params) {
      const { tableType, page } = this;
      let result = null;
      this.loading = true;
      if (tableType == "image" || tableType == "images") {
        result = await getImageList(page.currentPage, page.pageSize, params);
      } else if (tableType == "link") {
        result = await getLinkList(page.currentPage, page.pageSize, params);
      } else if (tableType == "goods-list") {
        result = await getGoodsList(page.currentPage, page.pageSize, params);
      } else if (tableType == "coupons") {
        result = await getCouponsList(page.currentPage, page.pageSize, params);
      } else if (tableType == "groupon") {
        result = await getActivityList(
          page.currentPage,
          page.pageSize,
          params,
          {
            type: "groupon",
          }
        );
      } else if (tableType == "seckill") {
        result = await getActivityList(
          page.currentPage,
          page.pageSize,
          params,
          {
            type: "seckill",
          }
        );
      } else if (tableType == "rich-text") {
        result = await getArticleList(page.currentPage, page.pageSize, params);
      }
      const {
        data: { code, data },
      } = result;
      if (code == 200) {
        this.page.total = data.total;
        this.avueList = data.records;
        this.loading = false;
        return "ok";
      }
      return Promise.reject(new Error("faile"));
    },
    onDialogOpen() {
      const { tableType } = this;
      let getCategoryListPromise = null;
      // 根据选择的资源类型不同，提供差异化的表格或级联选择器
      switch (tableType) {
        case "image":
          this.avueOption.menu = true;
          this.avueOption.selection = false;
          this.avueOption.column = [
            {
              label: "标题",
              prop: "originalName",
              sortable: true,
              overHidden: true,
            },
            {
              label: "预览",
              prop: "link",
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
          getCategoryListPromise = this.getCategoryList("image");
          break;
        case "images":
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
          getCategoryListPromise = this.getCategoryList("image");
          break;
        case "link":
          this.layout.leftCol = 0;
          this.layout.rightCol = 24;
          this.avueOption.menu = true;
          this.avueOption.selection = false;
          this.avueOption.column = [
            {
              label: "链接名称",
              prop: "name",
              overHidden: true,
            },
            {
              label: "链接分组",
              prop: "linkGroup",
              overHidden: true,
            },
            {
              label: "链接路径",
              prop: "path",
              overHidden: true,
            },
          ];
          this.getList();
          break;
        case "goods-group":
          this.cascaderProps.multiple = false;
          getCategoryListPromise = this.getCategoryList("goods");
          break;
        case "goods-list":
          this.avueOption.menu = false;
          this.avueOption.selection = true;
          this.avueOption.column = [
            {
              label: "商品",
              prop: "goods",
              overHidden: true,
            },
            {
              label: "商品类型",
              prop: "type",
              overHidden: true,
            },
            {
              label: "上架状态",
              prop: "status",
              overHidden: true,
            },
            {
              label: "更新时间",
              prop: "updateTime",
              overHidden: true,
            },
          ];
          getCategoryListPromise = this.getCategoryList("goods");
          break;
        case "category-tabs":
          this.cascaderProps.multiple = true;
          getCategoryListPromise = this.getCategoryList("goods");
          break;
        case "coupons":
          this.layout.leftCol = 0;
          this.layout.rightCol = 24;
          this.avueOption.menu = false;
          this.avueOption.selection = true;
          this.avueOption.column = [
            {
              label: "名称",
              prop: "name",
              overHidden: true,
            },
            {
              label: "减免额度",
              prop: "amount",
              overHidden: true,
              formatter: (row, column, cellVal) => {
                return ` - ￥${cellVal}`;
              },
            },
            {
              label: "使用门槛",
              prop: "enough",
              overHidden: true,
              formatter: (row, column, cellVal) => {
                return `￥${cellVal}`;
              },
            },
            {
              label: "描述",
              prop: "description",
              overHidden: true,
            },
            {
              label: "状态",
              prop: "status",
              overHidden: true,
            },
            {
              label: "领取期限",
              prop: "gettime",
              overHidden: true,
            },
            {
              label: "使用期限",
              prop: "usetime",
              overHidden: true,
            },
          ];
          this.getList();
          break;
        case "groupon":
          this.layout.leftCol = 0;
          this.layout.rightCol = 24;
          this.avueOption.menu = true;
          this.avueOption.selection = false;
          this.avueOption.column = [
            {
              label: "名称",
              prop: "title",
              overHidden: true,
            },
            {
              label: "开始时间",
              prop: "starttime",
              overHidden: true,
              formatter(row, val) {
                return dateFormat(new Date(val * 1000));
              },
            },
            {
              label: "结束时间",
              prop: "endtime",
              overHidden: true,
              formatter(row, val) {
                return dateFormat(new Date(val * 1000));
              },
            },
            {
              label: "说明",
              prop: "richtextTitle",
              overHidden: true,
            },
            // {
            //   label: "状态",
            //   prop: "status",
            //   overHidden: true,
            // },
          ];
          this.getList();
          break;
        case "seckill":
          this.layout.leftCol = 0;
          this.layout.rightCol = 24;
          this.avueOption.menu = true;
          this.avueOption.selection = false;
          this.avueOption.column = [
            {
              label: "名称",
              prop: "title",
              overHidden: true,
            },
            {
              label: "开始时间",
              prop: "starttime",
              overHidden: true,
              formatter(row, val) {
                return dateFormat(new Date(val * 1000));
              },
            },
            {
              label: "结束时间",
              prop: "endtime",
              overHidden: true,
              formatter(row, val) {
                return dateFormat(new Date(val * 1000));
              },
            },
            {
              label: "说明",
              prop: "richtextTitle",
              overHidden: true,
            },
            // {
            //   label: "状态",
            //   prop: "status",
            //   overHidden: true,
            // },
          ];
          this.getList();
          break;
        case "rich-text":
          this.layout.leftCol = 0;
          this.layout.rightCol = 24;
          this.avueOption.menu = true;
          this.avueOption.selection = false;
          this.avueOption.column = [
            {
              label: "封面",
              prop: "picUrls",
              overHidden: true,
            },
            {
              label: "文章标题",
              prop: "title",
              overHidden: true,
            },
            {
              label: "发布状态",
              prop: "state",
              overHidden: true,
            },
            {
              label: "作者",
              prop: "author",
              overHidden: true,
            },
            {
              label: "更新时间",
              prop: "updateTime",
              overHidden: true,
            },
          ];
          this.getList();
          break;
      }
      // 优化交互体验，当分类数据渲染即可自动点击第一个节点并拉取表格数据
      if (getCategoryListPromise != null && !this.isShowCategorySelector) {
        getCategoryListPromise.then((res) => {
          if (res == "ok") {
            this.onRefreshChange();
          }
        });
      }
    },
    onDialogClose() {
      // 重置 layout 是为了初始化少写代码配布局
      this.layout.leftCol = 3;
      this.layout.rightCol = 20;
      if (this.isShowCategorySelector) {
        // *争对 el-cascader 组件自身 bug 打的补丁
        // *参考：https://github.com/ElemeFE/element/issues/16967
        this.$refs.goodsCategoryCascader.$children[1].activePath = [];
      } else {
        this.resetTheData();
      }
      this.$emit("update:dialogVisible", false);
    },
    // 搜索分类
    filterNodeTree(val, data, node) {
      if (!val) return true;
      return data.name.indexOf(val) != -1 ? true : false;
    },
    // 获取一个分类的数据
    onNodeClick({ id }) {
      this.currentCategoryId = id;
      this.getList({ categoryIds: id });
    },
    // 单选
    onSelect(row) {
      const {
        tableType,
        $attrs: { currentSelection, updateForm },
      } = this;
      updateForm(tableType, currentSelection, row);
      this.$emit("update:dialogVisible", false);
    },
    // 缓存多选行
    onSelectionChange(selection) {
      this.selectionList = selection;
    },
    // 多选
    onMutipleSlect() {
      const {
        tableType,
        selectionList,
        $attrs: { currentSelection, updateForm },
      } = this;
      if (selectionList.length == 0) {
        return this.$message({
          message: "请至少选择一条数据",
          type: "warning",
        });
      }
      updateForm(tableType, currentSelection, selectionList);
      this.$emit("update:dialogVisible", false);
    },
    // 选择一个商品分类的所有数据并更新组件预览和组件表单（级联选择器）
    onSelectGoodsCategory() {
      const {
        tableType,
        goodsCategorySelection,
        page,
        $attrs: { currentSelection, updateForm },
      } = this;
      let ids = "",
        categoryName = "",
        categoryTabs = [];
      if (goodsCategorySelection.length == 0) {
        return this.$message({
          message: "请至少选择一条数据",
          type: "warning",
        });
      }
      if (tableType == "goods-group") {
        ids = goodsCategorySelection;
        categoryName =
          this.$refs.goodsCategoryCascader.getCheckedNodes()[0].label;
      } else {
        ids = goodsCategorySelection
          .map((item) => {
            return item;
          })
          .join(",");
        categoryTabs = this.$refs.goodsCategoryCascader
          .getCheckedNodes()
          .map(({ data: { name, description } }) => {
            return { name, description };
          });
      }
      getGoodsList(page.currentPage, page.pageSize, { categoryIds: ids }).then(
        ({ data: { code, data } }) => {
          if (code == 200) {
            data.ids = ids;
            data.categoryName = categoryName;
            data.categoryTabs = categoryTabs;
            updateForm(tableType, currentSelection, data);
            this.onDialogClose();
          }
        }
      );
    },
    onRefreshChange() {
      // 优化用户体验，刷新即可得到第一个节点数据
      if (this.categoryList.length > 0) {
        return this.$refs.tree.$children[0].handleClick();
      }
      if (this.layout.leftCol == 0) {
        return this.getList();
      }
    },
    onPageChange() {
      this.getList({ categoryIds: this.currentCategoryId });
    },
    resetTheData() {
      // 重置分页器
      this.page.currentPage = 1;
      this.page.pageSize = 10;
      // 重置所有数据源
      this.filterText = "";
      this.categoryList = [];
      this.avueList = [];
      this.selectionList = [];
      this.goodsCategorySelection = [];
      // 清空多选缓存
      if (this.isShowMutipleCheckbox) {
        this.$refs.crud.$refs.table.clearSelection();
      }
    },
    // 格式化 picUrls
    formatPicUrls({ picUrls }) {
      if (picUrls != "") {
        return JSON.parse(picUrls)[0];
      }
      return picUrls;
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
    onUploadProgress() {
      this.uploadLoading = true;
    },
    onUploadExceed() {
      this.$message.error("最大上传5个文件");
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
  },
};
</script>

<style lang="scss" scoped>
.display-flex {
  display: flex;
  align-items: center;
}
</style>
