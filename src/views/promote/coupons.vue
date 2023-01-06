<template>
  <basic-container>
    <avue-crud :option="tableOptions" :table-loading="loading" :data="data" :page.sync="page"
      :permission="permissionList" ref="crud" @row-del="rowDel" @search-change="searchChange"
      @search-reset="searchReset" @selection-change="selectionChange" @current-change="currentChange"
      @size-change="sizeChange" @refresh-change="refreshChange" @on-load="onLoad">
      <template slot="menuLeft">
        <el-button type="primary" size="small" v-if="permission.coupons_add" icon="el-icon-plus"
          @click="handleOpen(null)">新增
        </el-button>
        <el-button type="danger" size="small" icon="el-icon-delete" v-if="permission.coupons_delete"
          @click="handleDelete">删除
        </el-button>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button type="text" size="small" icon="el-icon-edit" v-if="permission.coupons_edit"
          @click.stop="handleOpen(scope.row)">编辑
        </el-button>
        <el-button type="text" size="small" style="margin-left:10px;" icon="el-icon-delete"
          v-if="permission.coupons_edit" @click.stop="rowDel(scope.row)">删除
        </el-button>
      </template>
      <template slot-scope="scope" slot="type">
        <el-tag type="success" effect="plain" v-if="scope.row.type == 'cash'">代金券</el-tag>
        <el-tag type="warning" effect="plain" v-if="scope.row.type == 'discount'">折扣券</el-tag>

      </template>
    </avue-crud>

    <el-drawer :title="formTitle" :before-close="handleClose" :visible.sync="dialogVisible" size="60%"
      append-to-body="true">
      <avue-form :option="formOption" ref='couponsForm' v-model="form" @submit="handleSubmit">
        <template slot="gettime">
          <el-date-picker v-model="form.gettime" type="datetimerange" range-separator="至"
            value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </template>

        <template slot="usetime">
          <el-date-picker v-model="form.usetime" type="datetimerange" range-separator="至"
            value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </template>

        <template slot="goodsIds">
          <el-row>
            <el-col :span="24">
              <el-radio-group v-model="useScope" @input="handleScopeChange">
                <el-radio label="all">全部商品</el-radio>
                <el-radio label="some">指定商品</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
          <el-row v-if="useScope == 'some'">
            <el-col :span="24">
              <el-popover placement="top" width="200" trigger="hover">
                商品名称<br/> 
                <el-image style="width: 64px; height: 64px;margin-left:10px;" slot="reference"
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="cover"></el-image>
              </el-popover>
              <el-popover placement="top" width="200" trigger="hover">
                商品名称<br/> 
                <el-image style="width: 64px; height: 64px;margin-left:10px;" slot="reference"
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="cover"></el-image>
              </el-popover>
              <el-button type="text"  icon="el-icon-plus" style="margin-left:10px;"  >设置商品</el-button>
            </el-col>
          </el-row>
        </template>
      </avue-form>
    </el-drawer>

  </basic-container>
</template>

<script>
import { getList, getDetail, submit, remove } from "@/api/promote/coupons";
import tableOptions from "@/const/promote/coupons";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      query: {},
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      selectionList: [],
      tableOptions: tableOptions,
      data: [],
      dialogVisible: false,
      form: {
        type: "cash"
      },
      formTitle: '新增优惠券',
      useScope: "all",
      formOption: {
        height: 'auto',
        calcHeight: 30,
        tip: false,
        border: true,
        column: [{
          label: "名称",
          prop: "name",
          type: "input",
          rules: [
            {
              required: true,
              message: "请输入优惠券名称",
              trigger: "blur"
            }
          ]
        },
        {
          label: "类型",
          prop: "type",
          type: "radio",
          border: true,
          dicData: [
            {
              label: "代金券",
              value: "cash"
            },
            {
              label: "折扣券",
              value: "discount"
            }
          ],
          hide: true,
          rules: [
            {
              required: true,
              message: "请选择优惠券类型",
              trigger: "blur"
            }
          ]
        },
        {
          label: "描述",
          prop: "description",
          type: "input",
          span: 24,
          addDisplay: true,
          editDisplay: true,
          viewDisplay: true,
          hide: true,
        },
        {
          label: "领取时间",
          prop: "gettime",
          type: "date",
          span: 24,
          format: "yyyy-MM-dd hh:mm:ss",
          valueFormat: "yyyy-MM-dd hh:mm:ss",
          rules: [
            {
              required: true,
              message: "请选择有效时间",
              trigger: "change",
            }
          ]
        },
        {
          label: "使用时间",
          prop: "usetime",
          type: "date",
          span: 24,
          format: "yyyy-MM-dd hh:mm:ss",
          valueFormat: "yyyy-MM-dd hh:mm:ss",
          rules: [
            {
              required: true,
              message: "使用时间",
              trigger: "change",
            }
          ]
        },
        {
          label: "发券总量",
          prop: "stock",
          type: "input-number",
          span: 12,
          min: 1,
          max: 2000,
          controlsPosition: '',
          tip: "发券总量只能增加不能减少，请谨慎设置",
          tipPlacement: "top",
          rules: [{
            required: true, validator: (rule, value, callback) => {
              // debugger;
              if (this.form.stock < value) {
                callback(new Error('发券总量只能增加不能减少'));
                this.form.stock = this.exitStock;
              } else {
                callback();
              }
            }, trigger: 'change'
          }]
        },
        {
          label: "每人限领",
          prop: "useLimit",
          type: "input-number",
          span: 12,
          min: 1,
          max: 10,
          controlsPosition: '',
          tip: "每人最多领取10张",
          tipPlacement: "top",
        },
        {
          label: "使用门槛",
          prop: "enough",
          type: "input-number",
          span: 12,
          min: 0,
          controlsPosition: '',
          rules: [
            {
              required: true,
              message: "使用门槛应大于0",
              trigger: "change",
            }
          ]
        },
        {
          label: "减免金额",
          prop: "amount",
          type: "input-number",
          span: 12,
          min: 1,
          controlsPosition: '',
          rules: [
            {
              required: true,
              message: "减免金额应大于0",
              trigger: "change",
            }
          ]
        },
        {
          label: "适用商品",
          prop: "goodsIds",
          type: "input",
          addDisplay: true,
          editDisplay: true,
          viewDisplay: true,
          hide: true,
          span: 24,
        }]
      },
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.coupons_add, false),
        viewBtn: this.vaildData(this.permission.coupons_view, false),
        delBtn: this.vaildData(this.permission.coupons_delete, false),
        editBtn: this.vaildData(this.permission.coupons_edit, false)
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
  methods: {
    handleOpen(row) {
      if (row) {
        getDetail(row.id).then(res => {
          let data = res.data.data;
          let gettime = data.gettime;
          if (gettime) {
            gettime = gettime.split("~");
            data.gettime = gettime;
          }

          let usetime = data.usetime;
          if (usetime) {
            usetime = usetime.split("~");
            data.usetime = usetime;
          }

          this.form = data;
          this.dialogVisible = true;
          this.formTitle = '编辑优惠券';
        });

      } else {
        this.form = {
          type: "cash"
        };
        this.formTitle = '新增优惠券';
        this.dialogVisible = true;
      }

    },
    handleSubmit() {
      const that = this;
      let gettime = that.form.gettime;
      if (gettime) {
        gettime = gettime[0] + "~" + gettime[1];
        that.form.gettime = gettime;

        let start = new Date(gettime[0]);
        if (start) {
          that.form["gettimestart"] = start.getTime() / 1000;
        } else {
          this.$message.warning("解析领取时间出错");
          return;
        }

        let end = new Date(gettime[1]);
        if (end) {
          that.form["gettimeend"] = end.getTime() / 1000;
        } else {
          this.$message.warning("解析使用时间出错");
        }
      }

      let usetime = that.form.usetime;
      if (usetime) {
        usetime = usetime[0] + "~" + usetime[1];
        that.form.usetime = usetime;

        let start = new Date(usetime[0]);
        if (start) {
          that.form["usetimestart"] = start.getTime() / 1000;
        } else {
          this.$message.warning("解析使用时间出错");
          return;
        }

        let end = new Date(usetime[1]);
        if (end) {
          that.form["usetimeend"] = end.getTime() / 1000;
        } else {
          this.$message.warning("解析使用时间出错");
        }
      }

      submit(that.form).then(res => {
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        that.handleClose();
        this.onLoad(this.page);
      });

      that.$refs.couponsForm.resetForm();
    },
    handleClose() {
      this.dialogVisible = false;
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
    handleScopeChange(v) {
      console.log("............" + v);
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
