<template>
  <el-drawer :title="formTitle" :before-close="handleClose" :wrapperClosable="false" :visible.sync="drawerVisible" size="60%"
    append-to-body="true">
    <avue-form :option="formOption" ref='couponsForm' v-model="form" @submit="handleSubmit">
      <template slot="title">
        <el-input placeholder="请输入文章标题(2~30个字)" v-model="form.title" minlength="2" maxlength="30" show-word-limit
          style="border:0px;" clearable>
        </el-input>
      </template>

      <template slot="titleType">
        <el-row>
          <el-col :span="24">
            <el-radio-group v-model="form.titleType" @input="onTitleTypeChange">
              <el-radio label="1">单标题</el-radio>
              <el-radio label="2">多标题</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row v-if="form.titleType == 2">
          <el-col :span="24">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span>不同标题会推荐给不同用户，获得更多推荐流量</span>
                <el-popover placement="right" width="200" trigger="hover">
                  <span>这要放一个图片</span>
                  <el-button slot="reference" style="float: right; " type="text">示例</el-button>
                </el-popover>
              </div>

              <el-input placeholder="请输入内容" style="margin:8px 0;" v-model="theOtherTitle[index]"
                v-for="(it, index) in theOtherTitle" :key="index" maxlength="30" show-word-limit size="small">
                <template slot="append"><i class="el-icon-delete" style="cursor:pointer;"
                    @click="onRemoveOtherTitle(index)"></i></template>
              </el-input>
              <div style="text-align:center;margin-top:10px;" v-if="otherTitleCount > 0">
                <el-button type="primary" icon="el-icon-plus" circle plain @click="onAddOtherTitle"></el-button>
                <span style="padding-left:5px;">添加标题</span>
                <span style="padding-left:20px;">还能添加 {{ otherTitleCount }} 个</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </template>

      <template slot="content">
          <AvueUeditor
            v-model="form.content"
            :options="contentOption"
          ></AvueUeditor>
      </template>

      <template slot="coverType">
        <el-row>
          <el-col :span="24">
            <el-radio-group v-model="form.coverType">
              <el-radio label="0">无图</el-radio>
              <el-radio label="1">单图</el-radio>
              <el-radio label="2">三图</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row v-if="form.coverType == 1">
          <el-col :span="24">
            <el-image class="cover-image" :src="theCoverUrls[0]" :preview-src-list="theCoverUrls[0]">
              <div slot="error" class="image-add-btn" @click="onSelectImage(0)">
                <i class="el-icon-plus"></i>
              </div>
            </el-image>
          </el-col>
        </el-row>
        <el-row v-if="form.coverType == 2">
          <el-col :span="24">
            <el-image class="cover-image" v-for="(it, index) in theCoverUrls" :key="index" :src="it"
              :preview-src-list="theCoverUrls[index]">
              <div slot="error" class="image-add-btn" @click="onSelectImage(index)">
                <i class="el-icon-plus"></i>
              </div>
            </el-image>
          </el-col>
        </el-row>
      </template>
    </avue-form>

    <resourceTable width="75%" dialogTitle="选择图片" tableType="image" :dialogVisible.sync="resourceVisible"
      :updateForm="resourceCallback" v-bind="$attrs" />
      <div slot="title">
        <!-- <el-button plain>浏览</el-button>
        <el-button plain>定时发布</el-button> -->
        <el-button @click="handleSubmit" size="small"  icon="el-icon-s-promotion"  type="primary">浏览并发布</el-button>
      </div>
  </el-drawer>


</template>

<script>

import {submit } from "@/api/news/article";
export default { 
  data() {
    return {
      drawerVisible: false,
      // 图片组件
      resourceVisible: false,
      form: {},
      theCoverUrls:['','',''],
      theOtherTitle:[''],
      formOption: {
        height: 'auto',
        calcHeight: 30,
        tip: false,
        emptyBtn: false, //隐藏清空按钮
        submitBtn: false, //隐藏提交按钮
        border: true,
        column: [
          {
            label: "",
            labelWidth: 0,
            prop: "title",
            type: "input",
            span: 24,
            rules: [
              {
                required: true,
                message: "请输入标题",
                trigger: "blur"
              }
            ]
          },
          {
            label: "",
            labelWidth: 0,
            prop: "content",
            span: 24             
          },
          {
            label: "标题设置",
            prop: "titleType",
            type: "radio",
            border: true,
            span: 24,
            hide: true,
            rules: [
              {
                required: true,
                message: "请选择标题设置",
                trigger: "blur"
              }
            ]
          },
          {
            label: "展示封面",
            prop: "coverType",
            type: "input",
            addDisplay: true,
            editDisplay: true,
            viewDisplay: true,
            hide: true,
            span: 24,
            rules: [
              {
                required: true,
                message: "请选择展示封面",
                trigger: "blur"
              }
            ]
          },
          {
            label: "来源",
            prop: "copyRight",
            type: "radio",
            border: true,
            dicData: [
              {
                label: "原创",
                value: "1"
              },
              {
                label: "转载",
                value: "2"
              }
            ],
            hide: true,
            rules: [
              {
                required: true,
                message: "请选择来源类型",
                trigger: "blur"
              }
            ]
          },
          {
            label: "作者",
            prop: "author",
            type: "input",
            hide: true, 
            rules: [
              {
                required: true,
                message: "请输入作者",
                trigger: "blur"
              }
            ]
          },

        ],
      },
      contentOption:{

      },
      curImgIndex: null,
    };
  },
  computed: {
    otherTitleCount() {
      return 5 - this.theOtherTitle.length;
    }
  },
  created() {
    this.resetForm();
  },
  methods: {
    resetForm() {
      this.form = {
        category: "2",
        title: "文章标题",
        titleType: "1",   //文章标题:1 = 单标题，2= 多标题
        otherTitle: "",  
        content: "",    //富文本
        coverType: "1",   //图片类型判断0代表无图1单图2多图
        picUrls: "",     
        copyRight: "原创",
        author: "作者",
        tags: ""
      };
      this.theCoverUrls = ['','',''];
      this.theOtherTitle = [''];
    },
    showBox() {
			this.drawerVisible = true;
		},
    handleClose() {
      this.drawerVisible = false;
    },
    //选择图片
    onSelectImage(imgIndex) {
      this.resourceVisible = true
      this.curImgIndex = imgIndex;
    },
    handleSubmit() {
      const that = this;

      if(that.form.coverType > 0){
         that.form.picUrls = JSON.stringify(that.theCoverUrls);
      }else{
         that.form.picUrls = "";
      }
 
      if(that.form.titleType > 1 ){
        that.form.otherTitle = JSON.stringify(that.theOtherTitle);
      }else{
        that.form.otherTitle = "";
      }
 
      console.log(that.form);  
      submit(that.form).then(res => {
        this.$message({
          type: "success",
          message: "操作成功!"
        });
      
        that.resetForm();
        that.$emit("refreshChange");
        that.handleClose(); 
      });      
    },
    onAddOtherTitle() {
      this.theOtherTitle.push('');
    },
    onRemoveOtherTitle(index) {
      this.theOtherTitle.splice(index, 1);
    },
    resourceCallback(tableType, _, data) {
    this.theCoverUrls[this.curImgIndex] = data.link; 
      // this.theCoverUrls[this.curImgIndex] = "https://lf6-cdn-tos.bytegoofy.com/goofy/pgcfe/mp/graphic/1ac3bb7600f29b9a8025ef0e4f8abbf9.png";
      console.log('图片', this.theCoverUrls);
    },
  },
};
</script>

<style lang="scss" >
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

