<template>
  <basic-container>
    <el-row>
      <el-col :span="1"></el-col>
      <el-col :span="22">
        <el-container>
          <el-header style="text-align: center;">
            <el-row>
              <el-col :span="4">
                <el-button type="text" @click="onBack" size="min" icon="el-icon-arrow-left"
                  style="color:white;">重新上传</el-button>
              </el-col>
              <el-col :span="16" style="font-size:18px;font-wigth:2;">试题和解析
              </el-col>
              <el-col :span="4">
                <el-button type="text" size="min" style="color:white;">确认提交<i
                    class="el-icon-arrow-right el-icon--right"></i></el-button>
              </el-col>
            </el-row>
          </el-header>
          <el-main>
            <el-scrollbar class="scroll-wrapper">
              <el-table :data="questionPreviewList" border>
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
            </el-scrollbar>
          </el-main>
        </el-container>
      </el-col>
      <el-col :span="1"></el-col>
    </el-row>
  </basic-container>
</template>

<script>
import { getViewList, clearCache } from "@/api/questions/questions";
import { mapGetters } from "vuex";
export default {
  components: {
  },
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
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      questionPreviewList: [],
      hasError: false,
      selectionList: [],
      data: []
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
    onBack() {
      this.$confirm('确定要放弃本次导入的数据吗？')
        .then(_ => {
          clearCache().then(res => {
            this.$emit("onChangeStep", 1);
          });
        }).catch(_ => { });


    },
    loadPreviewCache() {
      const that = this;
      that.questionPreviewList = [];
      getViewList({}).then(res2 => {
        let dataList = res2.data.data;
        console.log(dataList);
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
              let tmpArray = qs.body.replaceAll("<G8INPUT/>", "(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)");
              qsItem["body"] = JSON.parse(tmpArray);
            } else {
              qsItem["body"] = JSON.parse(qs.body);
            }

          }

          if (qs["options"]) {
            qsItem["options"] = JSON.parse(qs.options);
          }

          qsItem["answer"] = [];
          if ("PD" == qs.type) {
            let v = qs.answer.indexOf("Y");
            qsItem["answer"] = v ? ["正确"] : ["错误"];
          } else if ("TK" == qs.type) {
            if (qs["answer"]) {
              qsItem["answer"].push(JSON.parse(qs.answer).join(" 、"));
            }
          } else {
            if (qs["answer"]) {
              qsItem["answer"] = JSON.parse(qs.answer);
            }
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
