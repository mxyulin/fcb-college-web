<template>
  <el-drawer :title="formTitle" :before-close="handleClose" :wrapperClosable="false" :visible.sync="drawerVisible"
    size="60%" append-to-body="true">
    <avue-form :option="formOption" ref='newsForm' v-model="form" @submit="handleSubmit">
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
        <el-row v-if="(form.titleType == 2)">
          <el-col :span="24">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span>不同标题会推荐给不同用户，获得更多推荐流量</span>
                <el-popover placement="right" width="426" trigger="hover">
                  <div>
                    <div>将为每个用户推荐出对他最有吸引力的一个标题，提升读者的体验，获得更多流量</div>
                    <img src="/img/help/title-demo.png" style="width:400px;" />
                  </div>
                  <el-button slot="reference" style="float: right; " type="text">示例</el-button>
                </el-popover>
              </div>

              <el-input placeholder="请输入内容" style="margin:8px 0;" v-model="theOtherTitle[index]"
                v-for="(it, index) in theOtherTitle" :key="index" maxlength="30" show-word-limit size="small">
                <template slot="append"><i class="el-icon-delete" style="cursor:pointer;"
                    @click="onRemoveOtherTitle(index)"></i>
                  </template> 
              </el-input>

              <div class="error-tip">{{ otherTitleTip }}</div>
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
        <AvueUeditor v-model="form.content" :options="contentOption"></AvueUeditor>
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
            <div class="error-tip">{{ coverImageTip }}</div>
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
            <div class="error-tip">{{ coverImageTip }}</div>
          </el-col>
        </el-row>
      </template>
    </avue-form>

    <resourceTable width="75%" dialogTitle="选择图片" tableType="image" :dialogVisible.sync="resourceVisible"
      :updateForm="resourceCallback" v-bind="$attrs" />
    <div slot="title">
      <el-button @click="handleSubmit" size="small" icon="el-icon-s-promotion" type="primary">浏览并发布</el-button>
    </div>
  </el-drawer>


</template>

<script>

import { submit } from "@/api/news/article";
export default {
  data() {
    return {
      drawerVisible: false,
      // 图片组件
      resourceVisible: false,
      form: {},
      theCoverUrls: ['', '', ''],
      theOtherTitle: [''],
      coverImageTip: '',
      otherTitleTip: '',
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
            span: 24,
            rules: [
              {
                required: true,
                message: "请输入内容",
                trigger: "blur"
              }
            ]
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
      contentOption: {

      },
      curImgIndex: null,
    };
  },
  computed: {
    otherTitleCount() {
      return 5 - this.theOtherTitle.length;
    }
  },
  methods: {
    resetForm() {
      this.form = {
        category: 2,
        title: "",
        titleType: "1",
        otherTitle: "",
        content: "",
        coverType: "1",
        picUrls: "",
        copyRight: "1",
        author: "",
        tags: ""
      };
      this.theCoverUrls = ['', '', ''];
      this.theOtherTitle = [''];
      this.otherTitleTip = '';
      this.coverImageTip = '';

    },
    showBox(article) {
      this.resetForm();

      if (article != null) {
        if (article.picUrls != "") {
          this.theCoverUrls = JSON.parse(article.picUrls);
        }

        if (article.otherTitle != "") {
          this.theOtherTitle = JSON.parse(article.otherTitle);
        }

        this.form = article;
      }

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
      // let rel = that.$refs.newsForm.validate();
      // if (!rel) {
      //   return;
      // }
      that.coverImageTip = "";
      that.otherTitleTip = "";

      if (that.form.titleType > 1) {
        let titles = [];

        if (that.form.titleType == 2) {
          for (let i = 0; i < that.theOtherTitle.length; i++) {
            let t = that.theOtherTitle[i];
            if (t == '') {
              that.otherTitleTip = "请填写标题";
              return;
            }

            titles.push(t);
          }
        }
        that.form.otherTitle = JSON.stringify(that.titles);

      } else {
        that.form.otherTitle = "";
      }

      if (that.form.coverType > 0) {
        let picUrls = [];
        if (that.form.coverType == 1) {
          let url = that.theCoverUrls[0];
          if (url == '') {
            that.coverImageTip = "请选择封展示封面";
            return;
          }
        }

        if (that.form.coverType == 2) {
          for (let i = 0; i < that.theCoverUrls.length; i++) {
            let url = that.theCoverUrls[i];
            if (url == '') {
              that.coverImageTip = "请选择封展示封面";
              return;
            }
            picUrls.push(url);
          }
        }
        that.form.picUrls = JSON.stringify(picUrls);
      } else {
        that.form.picUrls = "";
      }



      submit(that.form).then(res => {
        this.$message({
          type: "success",
          message: "操作成功!"
        });

        that.$nextTick(res => {
          that.$emit("refreshChange");
          that.$refs.newsForm.resetForm();
          that.resetForm();
          that.handleClose();

        });

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

.error-tip {
  color: #F56C6C;
  font-size: 12px;
  line-height: 1;
}
</style>

