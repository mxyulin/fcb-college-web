<template>
  <basic-container>
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               :page.sync="page"
               :permission="permissionList"
               :before-open="beforeOpen"
               v-model="form"
               ref="crud"
               @row-update="rowUpdate"
               @row-save="rowSave"
               @row-del="rowDel"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @current-change="currentChange"
               @size-change="sizeChange"
               @refresh-change="refreshChange"
               @on-load="onLoad">

      <template slot="menuLeft">
        <el-button type="primary" size="small" v-if="permission.coupons_add" icon="el-icon-plus"
          @click="handleOpen(null)">新增
        </el-button>
        <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"
                   plain
                   v-if="permission.promote_delete"
                   @click="handleDelete">删 除
        </el-button>
      </template>
      
    </avue-crud>

    <el-drawer :title="formTitle" :before-close="handleClose" :visible.sync="dialogVisible" size="60%"
      append-to-body="true">
      <newlyAdded />
      
      
    </el-drawer> 
  </basic-container>
</template>

<script>
import { getList, getDetail, add, update, remove } from "@/api/promote/promote";
import option from "@/const/promote/promote";
import { mapGetters } from "vuex";
import newlyAdded from "./components/add.vue";


export default {
  components:{newlyAdded},
  data() {
    return {
      dialogVisible:false,
      form: {},
      formTitle: "新增活动",
      query: {},
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0,
      },
      selectionList: [],
      option: option,
      data: [],
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.promote_add, false),
        viewBtn: this.vaildData(this.permission.promote_view, false),
        delBtn: this.vaildData(this.permission.promote_delete, false),
        editBtn: this.vaildData(this.permission.promote_edit, false),
      };
    },
    ids() {
      let ids = [];
      this.selectionList.forEach((ele) => {
        ids.push(ele.id);
      });
      return ids.join(",");
    },
  },
  methods: {
    handleOpen(row) {
      console.log(row)
      if (row) {
        //   getDetail(row.id).then(res => {
        //     let data = res.data.data;
        //     let gettime = data.gettime;
        //     if (gettime) {
        //       gettime = gettime.split("~");
        //       data.gettime = gettime;
        //     }
        //     let usetime = data.usetime;
        //     if (usetime) {
        //       usetime = usetime.split("~");
        //       data.usetime = usetime;
        //     }
        //     this.useScope = func.isEmpty(data.goodsIds) ? "all" : "some";
        //     this.form = data;
        //     this.dialogVisible = true;
        //     this.formTitle = '编辑优惠券';
        //   });
      } else {
        this.form = {
          type: "cash",
        };
        this.formTitle = "新增优惠券";
        this.dialogVisible = true;
      }
    },
    handleSubmit() {
      const that = this;

      // submit(that.form).then(res => {
      //   this.$message({
      //     type: "success",
      //     message: "操作成功!"
      //   });
      //   that.handleClose();
      //   this.onLoad(this.page);
      // });
    },
    handleClose() {
      this.dialogVisible = false;
    },

    rowSave(row, done, loading) {
      add(row).then(
        () => {
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
      currentChange(currentPage){
        this.page.currentPage = currentPage;
      },
      sizeChange(pageSize){
        this.page.pageSize = pageSize;
      },
      refreshChange() {
        this.onLoad(this.page, this.query);
      },
      onLoad(page, params = {}) {
        this.loading = true;
        getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
          const data = res.data.data;
          this.page.total = data.total;
          this.data = data.records;
          this.loading = false;
          this.selectionClear();
        });
      }
    }
  };
</script>

<style>
</style>
