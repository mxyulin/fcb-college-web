<template>
  <basic-container>
    <avue-crud :option="option" :table-loading="loading" :data="newsList" :page.sync="page" :permission="permissionList"
      v-model="form" ref="crud" @search-change="searchChange" @search-reset="searchReset"
      @selection-change="selectionChange" @current-change="currentChange" @size-change="sizeChange"
      @refresh-change="refreshChange" @on-load="onLoad">
      <template slot="menuLeft">
        <el-button type="primary" size="small" plain icon="el-icon-edit" @click="onOpenEditor(null)">写文章
        </el-button>
      </template>

      <template slot-scope="{row}" slot="picUrls">
        <el-image class="cover-image" :src="row.picUrls[0]" :preview-src-list="row.picUrls">
          <div slot="error" class="image-add-btn">
            <i class="el-icon-picture-outline" style="font-size:64px;color:#dddddd"></i>
          </div>
        </el-image>
      </template>

      <template slot-scope="{row}" slot="status">
        <el-tag type="success" v-if="row.status == 1" effect="plain" size="small">已发布</el-tag>
        <el-tag type="warning" v-else effect="plain" size="small">未发布</el-tag>
      </template>

      <template slot-scope="scope" slot="menu">
        <!-- <el-button type="text" icon="el-icon-video-play" size="small" v-if="permission.news_view"
          @click="handlePreview(scope.row)">预览
        </el-button> -->
        <el-button type="text" icon="el-icon-edit" size="small" v-if="permission.news_edit"
          @click.stop="onOpenEditor(scope.row.id)">编辑
        </el-button>
        <!--el-icon-check-->
        <el-button type="text" icon="el-icon-download" size="small" v-if="scope.row.status == 1"
          @click.stop="handleStatus(scope.row, 0)">下架
        </el-button>
        <el-button type="text" icon="el-icon-upload2" size="small"  v-else
          @click.stop="handleStatus(scope.row, 1)">上架 
        </el-button>
        <el-button type="text" icon="el-icon-delete" size="small" v-if="permission.news_delete"
          @click.stop="handleDel(scope.row)">删除

        </el-button>
      </template>

    </avue-crud>
    <article-editor ref="articleEditPanel" @refreshChange="refreshChange" />
  </basic-container>
</template>

<script>
import { getList, getDetail, update, remove } from "@/api/news/article";
import option from "@/const/news/news";
import { mapGetters } from "vuex";
import ArticleEditor from "./components/article-editor"

export default {
  components: {
    ArticleEditor
  },
  data() {
    return {
      form: {},
      query: {},
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      selectionList: [],
      option: option,
      newsList: []
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        addBtn: false,
        viewBtn: false,//this.vaildData(this.permission.news_view, false),
        delBtn: false,//this.vaildData(this.permission.news_delete, false),
        editBtn: false,//this.vaildData(this.permission.news_edit, false)
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
  mounted() {
  },
  methods: {
    onOpenEditor(id) {
      if (id) {
        getDetail(id).then(res => {
          let doc = res.data.data;
          this.$refs.articleEditPanel.showBox(doc);
        });

      } else {
        this.$refs.articleEditPanel.showBox();
      }

    },
    handlePreview(row) {
      // this.$refs.previewPanel.showQuestion(row);
    },

    handleStatus(row, status) {
      let txt = status == 0 ? "确定将该文章下架吗？" : "确定将该文章上架吗？";
      this.$confirm(txt, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return update({ id: row.id, status: status });
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        });
    },
    handleDel(row) {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return remove(row.id);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        });
    },
    searchReset() {
      this.query = {};
      this.onLoad(this.page);
    },
    searchChange(params, done) {
      this.query = params;
      this.page.currentPage = 1;
      this.onLoad(this.page, params);
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
      this.onLoad(this.page, this.query);
    },
    onLoad(page, params = {}) {
      const that = this;
      that.loading = true;
      getList(page.currentPage, page.pageSize, Object.assign(params, that.query)).then(res => {
        let data = res.data.data;
        that.page.total = data.total;
        let list = data.records;
        for (let i = 0; i < list.length; ++i) {
          if (list[i].picUrls != "") {
            list[i].picUrls = JSON.parse(list[i].picUrls);
          }
          if (list[i].otherTitle != "") {
            list[i].otherTitle = JSON.parse(list[i].otherTitle);
          }
        }

        that.newsList = list;

        that.loading = false;
        that.selectionClear();
      });
    }
  }
};
</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.cover-image {
  width: 100px;
  height: 100px;
  margin: 0 8px;
}

.image-add-btn {
  background-color: #fafafa;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  color: #999;
  border: 1px dashed #e6e6e6;
  border-radius: 4px;
}
</style>
