<template>
  <el-row>
    <!-- 资源表 -->
    <el-col :span="5">
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
      <!-- <avue-crud :option="option" :table-loading="loading" :data="data" :page.sync="page" :permission="permissionList"
          :before-open="beforeOpen" v-model="form" ref="crud" @row-del="rowDel" @search-change="searchChange"
          @search-reset="searchReset" @selection-change="selectionChange" @current-change="currentChange"
          @size-change="sizeChange" @refresh-change="refreshChange" @on-load="loadDataList">
          <template slot="link">
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
        </avue-crud> -->
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from "vuex";
import option from "@/const/decorate/dodecorate";
import { validatenull } from "@/util/validate";
import { getList as getCategoryList } from "@/api/resource/attachcategory";
import { getList, getDetail, remove } from "@/api/resource/attach";

export default {
  name: "ResourceTable",
  props: [
    {
      dialogOption: {
        type: Object,
        required: true,
        default: () => {},
      },
    },
  ],
  data() {
    return {
      /* 公共数据 */
      option: option,
      loading: false,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      query: {},

      /* 节点树 */
      treeDta: [],
      filterText: "",
      defaultProps: {
        children: "children",
        label: "name",
      },
      selectNodeId: null,

      /* 表格 */
      data: [],
      selectionList: [],
      pictUrl: [],
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
  },
  watch: {
    // 树节点过滤
    filterText(newVal) {
      this.$refs.tree.filter(newVal);
    },
  },
  methods: {
    init() {},
    // 获取分类节点数据
    loadCategoryTree() {
      let that = this;
      getCategoryList().then(({ data: { data } }) => {
        that.treeDta = data;
      });
    },
    // 过滤（搜索）分类
    filterNode(val, data, node) {
      if (!val) return true;
      return data.name.indexOf(val) != -1 ? true : false;
    },
    // 获取对应分类表格
    handleNodeClick(data, node) {
      let that = this;
      that.selectNodeId = data.id;
      that.loadDataList(that.page, { categoryIds: that.selectNodeId });
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
    // 清空已选
    selectionClear() {
      this.selectionList = [];
      // this.$refs.crud.toggleSelection();
    },
  },
  mounted() {
    this.loadCategoryTree();
  },
};
</script>

<style lang="scss" scoped>
</style>
