<template>
  <basic-container>
    <avue-crud :option="option" :table-loading="loading" :data="questiongList" :page.sync="page" :permission="permissionList"
      :before-open="beforeOpen" v-model="form" ref="crud" @row-update="rowUpdate" @row-save="rowSave" @row-del="rowDel"
      @search-change="searchChange" @search-reset="searchReset" @selection-change="selectionChange"
      @current-change="currentChange" @size-change="sizeChange" @refresh-change="refreshChange" @on-load="onLoad">
      <template slot="menuLeft">
        <el-button type="primary" size="small" plain v-if="permission.questions_add" icon="el-icon-upload2"
          @click="handleImport">批量上传
        </el-button> 
        <el-button type="danger" size="small" icon="el-icon-delete" plain v-if="permission.questions_delete"
          @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>  
    <import-dialog ref="questionPanel"/>
  </basic-container>
</template>

<script>
import { getList, getDetail, add, update, remove } from "@/api/questions/questions";
import option from "@/const/questions/questions";
import { mapGetters } from "vuex";
import importDialog from "./components/import-dialog"; 

export default {
  components: { 
    importDialog 
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
        viewBtn: this.vaildData(this.permission.questions_view, false),
        delBtn: this.vaildData(this.permission.questions_delete, false),
        editBtn: this.vaildData(this.permission.questions_edit, false)
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
    rowSave(row, done, loading) {
      add(row).then(() => {
        this.onLoad(this.page);
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        done();
      }, error => {
        loading();
        window.console.log(error);
      });
    },
    rowUpdate(row, index, done, loading) {
      update(row).then(() => {
        this.onLoad(this.page);
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        done();
      }, error => {
        loading();
        console.log(error);
      });
    },
    rowDel(row) {
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
    handleDelete() {
      if (this.selectionList.length === 0) {
        this.$message.warning("请选择至少一条数据");
        return;
      }
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return remove(this.ids);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.$refs.crud.toggleSelection();
        });
    },
    beforeOpen(done, type) {
      if (["edit", "view"].includes(type)) {
        getDetail(this.form.id).then(res => {
          this.form = res.data.data;
        });
      }
      done();
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
