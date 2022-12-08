<template>
  <basic-container>
    <avue-crud :option="option" :table-loading="loading" :data="questiongList" :page.sync="page" :permission="permissionList"
       v-model="form" ref="crud"   
      @search-change="searchChange" @search-reset="searchReset" @selection-change="selectionChange"
      @current-change="currentChange" @size-change="sizeChange" @refresh-change="refreshChange" @on-load="onLoad">
      <template slot="menuLeft">
        <el-button type="primary" size="small" plain v-if="permission.questions_add" icon="el-icon-upload2"
          @click="handleImport">批量上传
        </el-button> 
         
      </template>

      <template slot-scope="{row}" slot="questionType">
         {{row.diffLevel}} 
      </template> 
      <template slot-scope="{row}" slot="questionBody">
        {{row.type}} {{row.profile}} {{row.options}}
      </template>
      <template slot-scope="{row}" slot="state">
         {{row.state}}  
      </template>

      <template slot-scope="scope" slot="menu">
        <el-button type="text"
                   icon="el-icon-video-play"
                   size="small"
                   v-if="permission.questions_view"
                   @click="handlePreview(scope.row)">预览
        </el-button>
        <el-button type="text"
                   icon="el-icon-download"
                   size="small"
                   v-if="permission.questions_edit"
                   @click.stop="handleExport(scope.row)">导出
        </el-button>
        <!--el-icon-check-->
        <el-button type="text"
                   icon="el-icon-close"
                   size="small"
                   v-if="permission.questions_delete"
                   @click.stop="handleStatus(scope.row)">下架
        </el-button>
      </template>

    </avue-crud>  
    <import-dialog ref="questionPanel" @refreshChange="refreshChange"/>
    <preview-dialog ref="previewPanel"/>
    
  </basic-container>
</template>

<script>
import { getList, getDetail, add, update, remove } from "@/api/questions/questions";
import option from "@/const/questions/questions";
import { mapGetters } from "vuex";
import importDialog from "./components/import-dialog"; 
import previewDialog from "./components/preview-dialog"; 

export default {
  components: { 
    importDialog,
    previewDialog 
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
      questiongList: []
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        addBtn: false,
        viewBtn: false,//this.vaildData(this.permission.questions_view, false),
        delBtn: false,//this.vaildData(this.permission.questions_delete, false),
        editBtn: false,//this.vaildData(this.permission.questions_edit, false)
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
    handleImport() {
      this.$refs.questionPanel.showImprtBox();
    }, 
    handlePreview(row) {
      // let qs = this.questiongList[row.$index];
      // debugger;
      this.$refs.previewPanel.showQuestion(row);
     },
    handleExport(row) {
      // update(row).then(() => {
      //   this.onLoad(this.page);
      //   this.$message({
      //     type: "success",
      //     message: "操作成功!"
      //   });
      //   done();
      // }, error => {
      //   loading();
      //   console.log(error);
      // });
    },
    handleStatus(row) {
      // this.$confirm("确定将选择数据删除?", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
      //     return remove(row.id);
      //   })
      //   .then(() => {
      //     this.onLoad(this.page);
      //     this.$message({
      //       type: "success",
      //       message: "操作成功!"
      //     });
      //   });
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
        that.questiongList = data.records;
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
</style>
