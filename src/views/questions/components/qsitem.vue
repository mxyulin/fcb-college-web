<template>
  <basic-container>
    <avue-crud :option="option" :table-loading="loading" :data="data" :page.sync="page" :permission="permissionList"
      :before-open="beforeOpen" v-model="form" ref="crud" @row-update="rowUpdate" @row-save="rowSave" @row-del="rowDel"
      @search-change="searchChange" @search-reset="searchReset" @selection-change="selectionChange"
      @current-change="currentChange" @size-change="sizeChange" @refresh-change="refreshChange" @on-load="onLoad">
      <template slot="menuLeft">
        <el-button type="primary" size="small" plain v-if="permission.questions_add" icon="el-icon-upload2"
          @click="handleUpload">批量上传
        </el-button>
        <el-button type="danger" size="small" icon="el-icon-delete" plain v-if="permission.questions_delete"
          @click="handleDelete">删 除
        </el-button>
      </template>
    </avue-crud>

    <el-dialog title="批量导入试题" append-to-body :visible.sync="showUploadBox" width="400px">
      <el-steps :active="importStep">
        <el-step title="1.下载模板" icon="el-icon-edit"></el-step>
        <el-step title="2.上传文件" icon="el-icon-upload"></el-step>
        <el-step title="3.确认导入" icon="el-icon-picture"></el-step>
      </el-steps>
      <avue-form ref="form" :option="importOption" v-model="importForm" :upload-after="uploadAfter">
      </avue-form>
    </el-dialog>

    <el-drawer title="试题导入预览" :visible.sync="showPreview" size="100%" append-to-body="true">
      <el-row>
        <el-col :span="2"></el-col>
        <el-col :span="20">
          <el-container>
            <el-header style="text-align: right; font-size: 12px">
              <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>查看</el-dropdown-item>
                  <el-dropdown-item>新增</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span>王小虎</span>
            </el-header>
            <el-main>
              <el-table :data="questionPreviewList" border>
                <el-table-column prop="id" label="序号" width="60">
                </el-table-column>
                <el-table-column label="试题和解析">
                  <template slot-scope="scope">
                    <div v-if="hasError">
                      <h7 v-html="scope.row.title"></h7>
                      <div v-html="scope.row.message" style="background-color: #fef0f0; color: #F56C6C;"></div>
                    </div>
                    <div style="width:100%;" v-else>
                      <div style="width:100%;" v-if="scope.row.resource">
                        {{ scope.row.id }}、<el-tag type="success" size="small" effect="plain">{{ scope.row.type
                        }}</el-tag>
                        <span v-for="sub  of scope.row.resource " :key="sub">
                          <span v-html="sub"></span>
                          <p />
                        </span>
                      </div>
                      <div style="width:100%;" v-if="scope.row.body">
                        {{ scope.row.id }}、<el-tag type="success" size="small" effect="plain">{{ scope.row.type
                        }}</el-tag>
                        <span v-for="sub  of scope.row.body " :key="sub">
                          <span v-html="sub"></span>
                          <p />
                        </span>
                      </div>
                      <div style="width:100%;" v-if="scope.row.options">
                        <p v-for="sub  of scope.row.options " :key="sub">
                          <span v-html="sub"></span>
                        </p>
                      </div>
                    </div>

                    <div style="width:100%;" v-if="scope.row.answer">
                      <span>[答案]</span>
                      <span v-for="sub  of scope.row.answer " :key="sub">
                        <span v-html="sub"></span>
                        <p />
                      </span>
                    </div>
                    <div style="width:100%;" v-if="scope.row.explain">
                      [解析]
                      <span v-for="sub  of scope.row.explain " :key="sub">
                        <span v-html="sub"></span>
                        <p />
                      </span>
                    </div>

                    <div style="width:100%;" v-if="scope.row.diffLevel">
                      [难度]
                      {{ scope.row.diffLevel }}
                    </div>
                    <div style="width:100%;" v-if="scope.row.tags">
                      [标签]
                      <span v-for="sub  of scope.row.tags " :key="sub">
                        <el-tag effect="plain" type="info" size="small" style="margin:0 5px;">{{ sub }}</el-tag>
                      </span>
                    </div>
                  </template>
                </el-table-column> 
              </el-table>
            </el-main>
          </el-container>
        </el-col>
        <el-col :span="2"></el-col>
      </el-row>

    </el-drawer>

  </basic-container>
</template>

<script>
import { getList, getDetail, add, update, remove, getViewList } from "@/api/questions/questions";
import option from "@/const/questions/questions";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      qsTypeMap: {
        "DX": "单选题",
        "DUX": "多选题",
        "PD": "判断题",
        "TK": "填空题",
        "JD": "问答题",
        "CLT": "材料题",
      },
      form: {},
      query: {},
      loading: true,
      showUploadBox: false,
      showPreview: false,
      importStep: 1,
      uploadUrl: "",
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      questionPreviewList: [],
      hasError: false,
      selectionList: [],
      option: option,
      data: [],
      importForm: {},
      importOption: {
        submitBtn: false,
        emptyBtn: false,
        column: [
          {
            label: '导入试题',
            prop: 'file',
            type: 'upload',
            drag: true,
            loadText: '文件上传中，请稍等',
            span: 24,
            propsHttp: {
              res: 'data'
            },
            action: "/api/fcb-questions/questions/import"
          }
        ]
      }
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
    this.loadPreviewCache();
  },
  methods: {
    /**
     * 
     { "id": -1,  "updateTime": "", "status": -1,  "categoryId": -1, "type": "DX", "diffLevel": "简单", "tags": "[\"常考\",\"基础题\"]", "profile": "有关运算符重载正确的是（）A）C++语言允许在重载运算符时改变运算符的操作个数", "resource": "", "body": "[\"有关运算符重\",\"载正确的是（）\"]", "options": "[\"A）C++语言允许在重载运算符时改变运算符的操作个数\",\"B）C++语言允许在重载运算符时改变运算符的优先级\",\"C）C++语言允许在重载运算符时改变运算符的结合性\"]", "answer": "[\"C\"]", "explain": "[\"\"]", "videoUrl": "", "useCount": -1, "subIds": "", "subQuestion": [], "subQuestionData": [] }

     */
    uploadAfter(res, done, loading, column) {
      const that = this;
      that.showUploadBox = false;
      that.questionPreviewList = [];
      that.hasError = false;

      if (res instanceof Array) {
        if (res.length > 0) {
          that.questionPreviewList = res;
          that.hasError = true;
          that.showPreview = true;
        }
      }

      if (!that.hasError) {
        that.loadPreviewCache();
      }
      done();
    },
    handleUpload() {
      this.showUploadBox = true;
    },

    loadPreviewCache() {
      const that = this;
      that.questionPreviewList = [];
      getViewList({}).then(res2 => {
        let dataList = res2.data.data;
        // 
        for (let i = 0; i < dataList.length; ++i) {
          let qs = dataList[i];
          let qsItem = {};
          qsItem["id"] = qs.id;
          qsItem["type"] = that.qsTypeMap[qs.type];

          if (qs["resource"]) {
            qsItem["resource"] = JSON.parse(qs.resource);
          }

          if (qs["body"]) {
            if ("TK" == qs.type) {
              let tmpArray = JSON.parse(qs.body);
              // let str = "";
              // tmpArray.forEach(item=>{
              //   if("[]"== item){
              //     str +=  "(_____)";
              //   }else{
              //     str += item;
              //   }
              // }); 
              qsItem["body"] = tmpArray;
            } else {
              qsItem["body"] = JSON.parse(qs.body);
            }

          }

          if (qs["options"]) {
            qsItem["options"] = JSON.parse(qs.options);
          }


          if ("PD" != qs.type) {
            if (qs["answer"]) {
              qsItem["answer"] = JSON.parse(qs.answer);
            }
          } else {
            let v = qs.answer.indexOf("Y");
            qsItem["answer"] = v ? ["正确"] : ["错误"];
          }


          if (qs["explain"]) {
            qsItem["explain"] = JSON.parse(qs.explain);
          }

          if (qs["diffLevel"]) {
            qsItem["diffLevel"] = qs.diffLevel;
          }

          if (qs["tags"]) {
            qsItem["tags"] = JSON.parse(qs.tags);
          }


          that.questionPreviewList.push(qsItem);
        }
        // debugger;
      });
      if (dataList.length > 0) {
        that.showPreview = true;
      }
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
      this.loading = true;
      // getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
      //   const data = res.data.data;
      //   this.page.total = data.total;
      //   this.data = data.records;
      //   this.loading = false;
      //   this.selectionClear();
      // });
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
