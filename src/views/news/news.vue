<template>
  <div id="publish">
    <!-- <quillEditor 
    class="richtext" v-model="richtext"
    :options="editorOption"
    >

    </quillEditor> -->

    <!-- <div class="quill-editor" 
       v-quill:myQuillEditor="editorOption">
       
  </div>
  <div class="quill-editor" 
       :content="content"
       @change="onEditorChange($event)"
       v-quill:myQuillEditor="editorOption">
       
  </div> -->
    <div class="titleposition">
      <div class="displayflexh edit">
        <el-input v-model="inptitle" placeholder="请输入文章标题(2~30个字)"></el-input>
        <div style="width: 120px;">还需要输入</div>
      </div>
      <hr>
    </div>
    <div class="body">
      <!-- <div>
        <hr />
      </div> -->
      <br>

      <div class="mdBottom">
        <el-form>
          <el-form-item :label-width="formLabelWidth" label="标题设置：">
            <el-radio-group v-model="titleType">
              <el-radio label='1'>单标题</el-radio>
              <el-radio label='2'>多标题</el-radio>
            </el-radio-group>

            <div class="singletitle" v-show="titleType == '1'">
              <span>所有用户将会看到相同的标题</span>
            </div>
            <div v-show="titleType === '2'">
              <div class="singletitle displayflexh spanbetween">
                <span>不同标题会推荐给不同用户，获得更多推荐流量</span>
                <el-popover class="popoverm" placement="top-start" width="400" trigger="hover">
                  <p>
                    将为每个用户推荐出对他最有吸引力的一个标题，提升读者的体验，获得更多流量
                  </p>
                  <el-image :src="imageurl"></el-image>
                  <span slot="reference">实例</span>
                </el-popover>
              </div>

              <div class="btmargin">
                <div class="btpadding" v-for="(it, index) in this.params_title" :key="index">
                  <el-input class="elinputw" type="text" placeholder="请输入内容" v-model="it.text" maxlength="30"
                    show-word-limit size="small">
                  </el-input>
                  <div class="iconh" @click="delParams(index)">
                    <i class="el-icon-delete"></i>
                  </div>
                </div>
              </div>
              <div class="btmargin displayf boxsizi">
                <el-button @click="addParams" size="small" icon="el-icon-plus">添加标题</el-button>
                <p>还能添加 {{ 4-(params_title.length) }} 个</p>
              </div>
            </div>
          </el-form-item>

          <el-form-item :label-width="formLabelWidth" label="封面设置：">
            <el-radio-group v-model="imgchoice">
              <el-radio label="0">无封面</el-radio>
              <el-radio label="1">单图</el-radio>
              <el-radio label="2">三图</el-radio>
            </el-radio-group>
            <div v-show="imgchoice === '1'">
              <div class="displayf">
                <div class="bgimage-add" @click="onSelectImage(0)">
                  <!-- <i v-show="coverImgUrls.length==0" class="el-icon-plus"></i> -->
                  <i v-show="coverImgUrls[0] == null" class="el-icon-plus"></i>
                  <el-image class="elimagestyle" v-show="coverImgUrls[0] != null" :src="coverImgUrls[0]"></el-image>
                </div>
                <div class="stylespan" @click="dialogbrowse = true">浏览</div>
              </div>
              <p class="fontsizi">优质的封面有利于推荐，格式支持JPEG、PNG</p>
            </div>

            <div v-show="imgchoice === '2'">
              <div>
                <div class="displayf">
                  <div class="bgimage-add" @click="onSelectImage(0)">
                    <i v-show="coverImgUrls[0] == null" class="el-icon-plus"></i>
                    <el-image class="elimagestyle" v-show="coverImgUrls[0] != null" :src="coverImgUrls[0]"></el-image>
                  </div>
                  <div class="bgimage-add" @click="onSelectImage(1)">
                    <i v-show="coverImgUrls[1] == null" class="el-icon-plus"></i>
                    <el-image class="elimagestyle" v-show="coverImgUrls[1] != null" :src="coverImgUrls[1]"></el-image>
                  </div>
                  <div class="bgimage-add" @click="onSelectImage(2)">
                    <i v-show="coverImgUrls[2] == null" class="el-icon-plus"></i>
                    <el-image class="elimagestyle" v-show="coverImgUrls[2] != null" :src="coverImgUrls[2]"></el-image>
                  </div>
                  <div class="stylespan" @click="dialogbrowse = true">浏览</div>
                </div>
              </div>
              <p class="fontsizi">优质的封面有利于推荐，格式支持JPEG、PNG</p>
            </div>
          </el-form-item>
        </el-form>
        <div id="cleandialogpadding">
          <el-dialog :showClose="false" append-to-body="ture" width="500px" :visible.sync="dialogbrowse">
            <div class="dsdiv">
              <h2>推荐频道浏览</h2>
              <el-image class="elimage" :src="imagebrowse"></el-image>
              <el-button size="medium" class="buttoncenter" type="primary" @click="dialog = false">关闭浏览</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
    <div style="height: 100px"></div>
    <div class="container">
      <div class="containerflex">
        <div>
          <span @click="godingtop" v-show="mdtop">回到顶部<span><i class="el-icon-arrow-up"></i></span></span>
          <span @click="godingbottom" v-show="mdtbottom">回到设置<span><i class="el-icon-arrow-down"></i></span></span>
        </div>
        <div>
          <el-button plain>浏览</el-button>
          <el-button plain>定时发布</el-button>
          <el-button @click="obtainsubmit" type="primary">浏览并发布</el-button>
        </div>
      </div>
    </div>
    <!--  -->
    <resourceTable width="75%" dialogTitle="选择图片" tableType="image" :dialogVisible.sync="dialogVisible"
      :updateForm="updateForm" v-bind="$attrs" />
      <ArticleEditor/>
  </div>
</template>

<script>
// api api/news/article.js
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
// import { quillEditor } from 'vue-quill-editor'
import ArticleEditor from "./components/article-editor"
import { getList, getDetail, submit } from "@/api/news/article";
export default {
  components: {
    // quillEditor
    ArticleEditor
  },
  data() {
    return {
      // 富文本
      richtext: null,
      editorOption: { /* quill options */
        placeholder: '请在这输入',
        modules: {
          toolbar: [
            [
              'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
              { 'header': 1 }, { 'header': 2 }, { 'list': 'ordered' }, { 'list': 'bulleet' },
              { 'script': 'sub' }, { 'script': 'super' }, { 'indent': '-1' }, { 'indent': '+1' },
              { 'direction': 'rtl' }, { 'size': ['small', false, 'large', 'huge'] },
              { 'align': [] }, 'clean'
            ],
            // ['bold','italic','underline','strike'],//加粗，斜体，下划线，删除线
            // // ['blockquote','code-block'],//引用，代码块
            // [{'header':1},{'header':2}],//标题，1，2代表字体大小
            // [{'list':'ordered'},{'list':'bulleet'}],//列表
            // [{'script':'sub'},{'script':'super'}],//上下标
            // [{'indent':'-1'},{'indent':'+1'}],//缩进
            // [{'direction':'rtl'}],//文本方向
            // [{ 'size': ['small', false, 'large', 'huge'] }],  // 字体大小
            // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],  //几级标题
            // [{ 'color': [] }, { 'background': [] }],    //字体颜色与背景颜色
            // // [{ 'font': [] }],                   //字体
            // [{ 'align': [] }],      //对齐方式
            // ['clean'],                         // 删除字体样式
            // // ['image','video']//上传图片 ，上传视频

          ]

        }
      },
      // 锚点
      mdtop: true,
      mdtbottom: false,
      // 图片组件
      dialogVisible: false,
      dialogbrowse: false,
      imgchoice: '1',//图片判断判断0代表无图1单图2多图
      curImgIndex: null,
      // coverImgUrls:[//单多图片
      //   null,null,null
      // ],
      coverImgUrls: [//单多图片
      ],
      titleType: '1',//判断标题1 = 单标题，2= 多标题
      params_title: [{ text: "" }],
      imagebrowse:
        "https://lf6-cdn-tos.bytegoofy.com/goofy/pgcfe/mp/graphic/1ac3bb7600f29b9a8025ef0e4f8abbf9.png",
      imageurl:
        "https://lf6-cdn-tos.bytegoofy.com/goofy/pgcfe/mp/graphic/60963ee5fa0b51ff805c17eafb3b0eeb.png",
      inptitle: '',
      formLabelWidth: "100px",
      //
      resourcedata: [],

      //请求需要配置
      // 加载中
      loading: true,
      // 分页信息
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 40,
      },
      // 查询信息
      query: {},
    };
  },
  methods: {
    // 锚点
    godingtop() {
      this.mdtop = false
      this.mdtbottom = true
      this.$el.querySelector('.richtext')
        .scrollIntoView({ block: 'start', behavior: 'smooth' })
    },
    godingbottom() {
      this.mdtop = true
      this.mdtbottom = false
      this.$el.querySelector('.mdBottom')
        .scrollIntoView({ block: 'start', behavior: 'smooth' })
    },


    //选择图片
    onSelectImage(imgIndex) {
      this.dialogVisible = true
      this.curImgIndex = imgIndex;
    },
    updateForm(tableType, _, data) {
      this.resourcedata = data

      if (this.curImgIndex == 0) {
        this.coverImgUrls.length < 1 ? this.coverImgUrls.push(data.link) : this.coverImgUrls[0] = data.link;
        // this.coverImgUrls[0] = data.link
        // this.coverImgUrls.push(data.link)
      } else if (this.curImgIndex == 0) {
        this.coverImgUrls.length < 1 ? this.coverImgUrls.push(data.link) : this.coverImgUrls[0] = data.link;
      } else if (this.curImgIndex == 1) {
        this.coverImgUrls.length < 2 ? this.coverImgUrls.push(data.link) : this.coverImgUrls[1] = data.link;
      } else if (this.curImgIndex == 2) {
        this.coverImgUrls.length < 3 ? this.coverImgUrls.push(data.link) : this.coverImgUrls[2] = data.link;
      }
      // console.log('图片',data.link)
      // console.log('数组',this.coverImgUrls)
    },


    addParams() {
      if (this.params_title.length < 4) {
        this.params_title.push({
          name: "",
        });
      }
    },
    delParams(index) {
      if (this.params_title.length > 1) {
        this.params_title.splice(index, 1);
      }
    },
    obtaindata() {
      let that = this;
      that.loading = true;
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, that.query)
      ).then((res) => {
        console.log(res);
      });
    },
    obtaindetail() {
      let id = 2;
      getDetail(id).then((res) => {
        console.log(res);
      });
    },
    obtainsubmit() {
      // let that = this;
      // private微头条 String文章 coverType;问答
      let form = {
        category: "2",//
        title: this.inptitle,//h1标题
        titleType: this.titleType,//文章标题:1 = 单标题，2= 多标题
        otherTitle: '',//多标题
        content: this.richtext,//富文本
        coverType: this.imgchoice,//图片类型判断0代表无图1单图2多图
        picUrls: null,//图片数组 单多合并
        copyRight: "版权",//
        author: "作者",//
        tags: ""//
      };
      let params_title;
      let coverImgUrls;
      // 做判断
      if (this.titleType === '1') {
        form.otherTitle = '';
      } else if (this.titleType === '2') {
        params_title = JSON.stringify(this.params_title);
        form.otherTitle = params_title;
      }
      if (this.imgchoice === '0') {
        form.picUrls = ''
      } else if (this.imgchoice === '1') {
        form.picUrls = []
        form.picUrls[0] = this.coverImgUrls[0]
      } else if (this.imgchoice === '2') {
        coverImgUrls = JSON.stringify(this.coverImgUrls)//图片数组 单多合并
        form.picUrls = coverImgUrls
      }
      // JSON.stringify 数组转json // push ,title,this.imgchoice,this.coverimg,imgs
      // let params_title=JSON.stringify(this.params_title)//多标题
      // let coverImgUrls=JSON.stringify(this.coverImgUrls)//图片数组 单多合并
      console.log(form)


      // submit(form).then((res) => {
      //   console.log(res);
      // });
    },
    onEditorChange(event) {
      console.log('onEditorChange')
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/views/news/style/publish.scss"; //publish
</style>

<style scoped>
#publish /deep/ .quill-editor {
  height: 500px;
}

#publish /deep/ .ql-toolbar {
  width: 100%;
  min-width: 1000px;
  text-align: center;
  border: 0;
}

#publish /deep/ .quill-editor .ql-container {
  margin: auto;
  display: block;
  margin-top: 140px;
  border-left: 0;
  border-right: 0;
  width: 900px;
  height: 300px;
  padding-bottom: 10px;
}
</style>