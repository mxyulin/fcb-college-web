<template>
  <el-dialog
    top="5vh"
    append-to-body
    :width="width"
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
      <el-col :span="TableLayout.colLeft">
        <el-input
          placeholder="搜索类别"
          style="height: 45px"
          v-model="filterText"
          size="small"
        >
        </el-input>
        <el-tree
          accordion
          ref="tree"
          empty-text="暂无节点数据"
          :node-key="id"
          :data="categoryList"
          :props="defaultProps"
          :highlight-current="true"
          :filter-node-method="filterNodeTree"
          @node-click="onNodeClick"
        >
        </el-tree>
      </el-col>
      <el-col :span="TableLayout.colRight">
        <avue-crud
          :data="avueList"
          :option="avueOption"
          :table-loading="loading"
          :page.sync="page"
          :search.sync="search"
          :permission="permissionList"
          @refresh-change="refreshTable"
          @selection-change="onSelectionChange"
          @on-load="onPageChange"
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
              :src="JSON.parse(row.picUrls)[0]"
              :preview-src-list="[JSON.parse(row.picUrls)[0]]"
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
            <!-- 链接类别按钮组 -->
            <el-radio-group
              v-if="tableType == 'link'"
              v-model="linkType"
              size="small"
              @input="onLinkTypeChange"
            >
              <el-radio-button label="goods" border>商品</el-radio-button>
              <el-radio-button label="marketing" border>营销页</el-radio-button>
              <el-radio-button label="article" border>文章</el-radio-button>
            </el-radio-group>
            <!-- 上传图片 -->
            <el-button
              v-if="tableType == 'image' || tableType == 'images'"
              type="primary"
              size="small"
              icon="el-icon-upload2"
              @click="handleUpload"
              >上传</el-button
            >
          </template>
          <!-- 单选按钮 -->
          <template slot-scope="{ row }" slot="menu">
            <el-button size="small" type="primary" @click="onSelected(row)"
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
        <el-dialog
          title="图片上传"
          append-to-body
          :visible.sync="upload"
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
        <el-button
          type="primary"
          size="medium"
          @click="onSelectedGoodsCategory"
        >
          确定
        </el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { dateFormat } from "@/util/date";
import { getList as getImageCategory } from "@/api/resource/attachcategory";
import { getList as getImageList } from "@/api/resource/attach";
import { getList as getGoodsCategory } from "@/api/product/productcategory";
import { getList as getGoodsList } from "@/api/product/product";
import { getList as getPageList } from "@/api/decorate/decorate";
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
      loading: false,
      // 图片上传
      upload: false,
      // 链接表类型
      linkType: "goods",
      /* 配置项 */
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        pagerCount: 7,
        layout: "slot, total, sizes, prev, pager, next, jumper, ->",
      },
      TableLayout: {
        colLeft: 3,
        colRight: 20,
      },
      defaultProps: {
        label: "name",
        children: "children",
      },
      avueOption: {
        header: true,
        search: true,
        border: true,
        menu: true,
        selection: false,
        reserveSelection: true,
        rowKey: "id",
        menuWidth: 100,
        height: 500,
        align: "center",
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
      /* 数据 */
      filterText: "",
      categoryList: [],
      avueList: [],
      selectionList: [],
      goodsCategorySelection: [],
      goodsCategorySelectionNodes: [],
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
  },
  watch: {
    // 节点搜索
    filterText(newVal) {
      this.$refs.tree.filter(newVal);
    },
  },
  methods: {
    async getCategoryList(tableType) {
      let result = null;
      switch (tableType) {
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
        this.$nextTick(() => {
          if (!this.isShowCategorySelector) {
            this.refreshTable();
          }
        });
        return "ok";
      }
      return Promise.reject(new Error("faile"));
    },
    async getList() {
      const { tableType, page } = this;
      let result = null;
      this.loading = true;
      if (tableType == "image" || tableType == "images") {
        result = await getImageList(page.currentPage, page.pageSize);
      } else if (tableType == "link") {
        const { linkType } = this;
        switch (linkType) {
          case "goods":
            result = await getGoodsList(page.currentPage, page.pageSize);
            break;
          case "marketing":
            result = await getPageList(page.currentPage, page.pageSize, {
              type: "page",
            });
            break;
          case "article":
            result = await getArticleList(page.currentPage, page.pageSize);
            break;
        }
      } else if (tableType == "goods-list") {
        result = await getGoodsList(page.currentPage, page.pageSize);
      } else if (tableType == "coupons") {
        result = await getCouponsList(page.currentPage, page.pageSize);
      } else if (tableType == "groupon") {
        result = await getActivityList(page.currentPage, page.pageSize, {
          type: "groupon",
        });
        // result = {
        //   data: {
        //     code: 200,
        //     data: {
        //       total: 3,
        //       records: [
        //         {
        //           id: "001",
        //           title: "测试拼团",
        //           status: 0,
        //           richtextTitle: "拼团说明",
        //           starttimeText: "2022-10-17 00:00:00",
        //           endtimeText: "2023-11-26 00:00:00",
        //           rules: {
        //             teamNum: "789",
        //           },
        //           goods: [
        //             {
        //               title: "thinkBook14+",
        //               subtitle: "超级秒杀",
        //               grouponPrice: "89",
        //               originalPrice: "99",
        //               image:
        //                 "http://file.shopro.top/uploads/20210518/49de49c7c28bb727aec9b171b2511383.jpeg",
        //               sales: "199",
        //             },
        //             {
        //               title: "thinkBook14+",
        //               subtitle: "超级秒杀",
        //               grouponPrice: "89",
        //               originalPrice: "99",
        //               image:
        //                 "http://file.shopro.top/uploads/20210518/67cf223ca545805491e07e107db0772d.jpg",
        //               sales: "199",
        //             },
        //             {
        //               title: "thinkBook14+",
        //               subtitle: "超级秒杀",
        //               grouponPrice: "89",
        //               originalPrice: "99",
        //               image:
        //                 "http://file.shopro.top/uploads/20210518/1f85f33dbbe7c930831687052b1ba3fc.jpg",
        //               sales: "199",
        //             },
        //           ],
        //         },
        //       ],
        //     },
        //   },
        // };
      } else if (tableType == "seckill") {
        // result = await getActivityList(page.currentPage, page.pageSize, { type: "seckill" });
        result = {
          data: {
            code: 200,
            data: {
              total: 3,
              records: [
                {
                  id: "001",
                  title: "测试秒杀",
                  status: 0,
                  richtextTitle: "秒杀说明",
                  starttimeText: "2022-10-17 00:00:00",
                  endtimeText: "2023-11-26 00:00:00",
                  rules: {},
                  goods: [
                    {
                      title: "thinkBook14+",
                      subtitle: "超级秒杀",
                      price: "89",
                      originalPrice: "99",
                      image:
                        "http://file.shopro.top/uploads/20210518/49de49c7c28bb727aec9b171b2511383.jpeg",
                      sales: "199",
                    },
                    {
                      title: "thinkBook14+",
                      subtitle: "超级秒杀",
                      price: "89",
                      originalPrice: "99",
                      image:
                        "http://file.shopro.top/uploads/20210518/67cf223ca545805491e07e107db0772d.jpg",
                      sales: "199",
                    },
                    {
                      title: "thinkBook14+",
                      subtitle: "超级秒杀",
                      price: "89",
                      originalPrice: "99",
                      image:
                        "http://file.shopro.top/uploads/20210518/1f85f33dbbe7c930831687052b1ba3fc.jpg",
                      sales: "199",
                    },
                  ],
                },
              ],
            },
          },
        };
      } else if (tableType == "rich-text") {
        result = await getArticleList(page.currentPage, page.pageSize);
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
    // 初始化组件
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
          this.avueOption.menu = true;
          this.avueOption.selection = false;
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
          this.TableLayout.colLeft = 0;
          this.TableLayout.colRight = 24;
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
          this.TableLayout.colLeft = 0;
          this.TableLayout.colRight = 24;
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
            {
              label: "状态",
              prop: "status",
              overHidden: true,
            },
          ];
          this.getList();
          break;
        case "seckill":
          this.TableLayout.colLeft = 0;
          this.TableLayout.colRight = 24;
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
              prop: "starttimeText",
              overHidden: true,
            },
            {
              label: "结束时间",
              prop: "endtimeText",
              overHidden: true,
            },
            {
              label: "说明",
              prop: "richtextTitle",
              overHidden: true,
            },
            {
              label: "状态",
              prop: "status",
              overHidden: true,
            },
          ];
          this.getList();
          break;
        case "rich-text":
          this.TableLayout.colLeft = 0;
          this.TableLayout.colRight = 24;
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
      console.log("测试", getCategoryListPromise);
      // getCategoryListPromise
    },
    // 重置组件
    onDialogClose() {
      // *争对 el-cascader 组件自身 bug 打的补丁
      // *参考：https://github.com/ElemeFE/element/issues/16967
      if (this.isShowCategorySelector) {
        this.$refs.goodsCategoryCascader.$children[1].activePath = [];
      } else {
        this.resetData();
      }
      this.$emit("update:dialogVisible", false);
    },
    // 切换连接表
    onLinkTypeChange(linkType) {
      this.categoryList = [];
      this.avueList = [];
      switch (linkType) {
        case "goods":
          this.TableLayout.colLeft = 3;
          this.TableLayout.colRight = 20;
          this.onDialogOpen();
          break;
        case "marketing":
          this.TableLayout.colLeft = 0;
          this.TableLayout.colRight = 24;
          this.avueOption.menu = true;
          this.avueOption.selection = false;
          this.avueOption.column = [
            {
              label: "模板名称",
              prop: "name",
              overHidden: true,
            },
            {
              label: "预览",
              prop: "image",
              overHidden: true,
            },
            {
              label: "备注",
              prop: "memo",
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
        case "article":
          this.TableLayout.colLeft = 0;
          this.TableLayout.colRight = 24;
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
              label: "修改时间",
              prop: "updateTime",
              overHidden: true,
            },
          ];
          this.getList();
          break;
      }
    },
    // 搜索分类
    filterNodeTree(val, data, node) {
      if (!val) return true;
      return data.name.indexOf(val) != -1 ? true : false;
    },
    // 获取一个分类的数据
    onNodeClick(data, node) {
      const { id } = data;
      this.getList(this.page, { categoryIds: id });
    },
    // 单选
    onSelected(row) {
      const {
        tableType,
        linkType,
        $attrs: { currentSelection, updateForm },
      } = this;
      if (tableType == "link") {
        row.linkType = linkType;
      }
      updateForm(tableType, currentSelection, row);
      this.$emit("update:dialogVisible", false);
    },
    // 获取多选行
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
    onSelectedGoodsCategory() {
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
    refreshTable() {
      // 优化用户体验，刷新即可得到第一个节点数据
      if (this.categoryList.length > 0) {
        return this.$refs.tree.$children[0].handleClick();
      }
      if (this.TableLayout.colLeft == 0) {
        return this.getList();
      }
    },
    resetData() {
      this.linkType = "goods";
      this.TableLayout.colLeft = 3;
      this.TableLayout.colRight = 20;
      this.categoryList = [];
      this.avueList = [];
      this.selectionList = [];
      this.goodsCategorySelection = [];
      if (this.isShowMutipleCheckbox) {
        this.$refs.crud.$refs.table.clearSelection();
      }
    },
    onPageChange(page) {
      console.log("测试", page);
    },
    /*
     *上传图片
     */
    // 打开上传
    handleUpload() {
      this.upload = true;
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
.display-flex {
  display: flex;
  align-items: center;
}
</style>
