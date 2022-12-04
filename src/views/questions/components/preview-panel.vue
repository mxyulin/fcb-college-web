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
              <el-col :span="16" style="font-size:18px;font-wigth:2;">
                导入试题
              </el-col>
              <el-col :span="4">
                <!-- <el-button type="text" size="min" @click="onNext" style="color:white;">确认提交<i
                    class="el-icon-arrow-right el-icon--right"></i></el-button> -->
              </el-col>
            </el-row>            
          </el-header>
          <el-main>
            <el-row>
              <el-col :span="24">
                <el-alert type="warning" show-icon :closable="false">
                  <template slot="title">
                    <span>即将导入的试题{{ questionPreviewList.length }}道</span>
                  </template>
                  <template slot="">
                    <span v-if="questionData.DX > 0" style="font-size:14px">单选题：{{ questionData.DX }}道</span>
                    <span v-if="questionData.DUX > 0" style="font-size:14px">多选题：{{ questionData.DUX }}道</span>，
                    <span v-if="questionData.PD > 0" style="font-size:14px">判断题：{{ questionData.PD }}道</span>，
                    <span v-if="questionData.TK > 0" style="font-size:14px">填空题：{{ questionData.TK }}道</span>，
                    <span v-if="questionData.JD > 0" style="font-size:14px">问答题：{{ questionData.JD }}道</span>，
                    <span v-if="questionData.CLT > 0" style="font-size:14px">材料题：{{ questionData.CLT }}道</span>
                  </template>
                </el-alert>
              </el-col>
            </el-row>
            <el-scrollbar class="scroll-wrapper">
              <el-table :data="questionPreviewList" :border="false" :show-header="false">
                <el-table-column label="">
                  <template slot-scope="scope"> 
                    <question-view :question="scope.row" :indexId="(index+1)"
                    @onReqImport="onReqImport"
                    @onReqRemove="onReqRemove"
                    ></question-view> 
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
import { getPreviewList, clearCache ,doImport } from "@/api/questions/questions";
import { mapGetters } from "vuex";
import questionView from "./question-view";
 

export default {
  components: {
    questionView
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
      questionData: {
        "DX": 0,
        "DUX": 0,
        "PD": 0,
        "TK": 0,
        "JD": 0,
        "CLT": 0,
      },
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      questionPreviewList: [],
      questionList: []
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
    onReqImport(id){
      const that = this;    
      doImport({id:id}).then(res=>{ 
        that.onReqRemove(id);	
      });
    }, 
    onReqRemove(id){
      const that = this;       
      for(let index = 0 ; index < that.questionPreviewList.length; ++index){
        let item = that.questionPreviewList[index];
        if(item.id == id){
          that.questionPreviewList.splice(index, 1);
          break;
        }        
      }
    },
    loadPreviewCache() {
      const that = this;
      that.questionPreviewList = [];
      getPreviewList({}).then(res2 => {
        that.questionList = res2.data.data;
        if(that.questionList.length < 1){
          this.$emit("onChangeStep", 1);
          return ;
        }
        // 
        for (let i = 0; i < that.questionList.length; ++i) {
          let qs = that.questionList[i];
          let qsItem = {};
          qsItem["id"] = qs.id;
          qsItem["type"] = that.qsTypeMap[qs.type];
          that.questionData[qs.type] += 1;

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
