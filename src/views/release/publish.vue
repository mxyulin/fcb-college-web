<template>
  <div id="publish">
    <div class="richtext" >富文本编辑功能</div>
    <quillEditor></quillEditor>

    <div class="body">
      <div class="displayflexh edit">
        <h2>标题是单独h标签</h2>
        <div>文字输入范围</div>
      </div>
      <div>
        <hr />
      </div>
      <div class="edittext">富文本编写区</div>
      <div>
        <hr />
      </div>

      <div class="mdBottom">
      <el-form>
        <el-form-item :label-width="formLabelWidth" label="标题设置：">
          <el-radio-group
            @change="changetitle(titlechoice)"
            v-model="titlechoice"
          >
            <el-radio label="singletitle">单标题</el-radio>
            <el-radio label="multipletitles">多标题</el-radio>
          </el-radio-group>

          <div class="singletitle" v-show="titlechoice == 'singletitle'">
            <span>所有用户将会看到相同的标题</span>
          </div>
          <div v-show="titlechoice == 'multipletitles'">
            <div class="singletitle displayflexh spanbetween">
              <span>不同标题会推荐给不同用户，获得更多推荐流量</span>
              <el-popover
                class="popoverm"
                placement="top-start"
                width="400"
                trigger="hover"
              >
                <p>
                  将为每个用户推荐出对他最有吸引力的一个标题，提升读者的体验，获得更多流量
                </p>
                <el-image :src="imageurl"></el-image>
                <span slot="reference">实例</span>
              </el-popover>
            </div>

            <div class="btmargin">
              <div
                class="btpadding"
                v-for="(it, index) in this.params_title"
                :key="index"
              >
                <el-input
                  class="elinputw"
                  type="text"
                  placeholder="请输入内容"
                  v-model="it.text"
                  maxlength="30"
                  show-word-limit
                  size="small"
                >
                </el-input>
                <div class="iconh" @click="delParams(index)">
                  <i class="el-icon-delete"></i>
                </div>
              </div>
            </div>
            <div class="btmargin displayf boxsizi">
              <el-button @click="addParams" size="small" icon="el-icon-plus"
                >添加标题</el-button
              >
              <p>还能添加 {{4-(params_title.length)}} 个</p>
            </div>
          </div>
        </el-form-item>
        
        <el-form-item :label-width="formLabelWidth" label="封面设置：">
          <el-radio-group v-model="imgchoice">
            <el-radio label="Monograph">单图</el-radio>
            <el-radio label="Threefigures">三图</el-radio>
            <el-radio label="Nocover">无封面</el-radio>
          </el-radio-group>
          <div v-show="imgchoice == 'Monograph'">
            <div class="displayf">
              <div class="bgimage-add" @click="imgone('img')">
                <i v-show="coverimg==null" class="el-icon-plus"></i>
                <el-image class="elimagestyle" v-show="coverimg!=null" :src="coverimg"></el-image>
              </div>
              <div class="stylespan" @click="dialogbrowse = true">浏览</div>
            </div>
            <p class="fontsizi">优质的封面有利于推荐，格式支持JPEG、PNG</p>
          </div>

          <div v-show="imgchoice == 'Threefigures'">
            <div>
              <div class="displayf">
                <div class="bgimage-add" @click="imgone('imgs1')">
                  <i v-show="coverimgs[0]==null" class="el-icon-plus"></i>
                <el-image class="elimagestyle" v-show="coverimgs[0]!=null" :src="coverimgs[0]"></el-image>
                </div>
                <div class="bgimage-add" @click="imgone('imgs2')">
                  <i v-show="coverimgs[1]==null" class="el-icon-plus"></i>
                <el-image class="elimagestyle" v-show="coverimgs[1]!=null" :src="coverimgs[1]"></el-image>
                </div>
                <div class="bgimage-add" @click="imgone('imgs3')">
                  <i v-show="coverimgs[2]==null" class="el-icon-plus"></i>
                <el-image class="elimagestyle" v-show="coverimgs[2]!=null" :src="coverimgs[2]"></el-image>
                </div>
                <div class="stylespan" @click="dialogbrowse = true">浏览</div>
              </div>
            </div>
            <p class="fontsizi">优质的封面有利于推荐，格式支持JPEG、PNG</p>
          </div>
        </el-form-item>
      </el-form>
      <div id="cleandialogpadding">
        <el-dialog
          :showClose="false"
          append-to-body="ture"
          width="500px"
          :visible.sync="dialogbrowse"
        >
          <div class="dsdiv">
            <h2>推荐频道浏览</h2>
            <el-image class="elimage" :src="imagebrowse"></el-image>
            <el-button
              size="medium"
              class="buttoncenter"
              type="primary"
              @click="dialog = false"
              >关闭浏览</el-button
            >
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
    <resourceTable
      width="75%"
      dialogTitle="选择图片"
      tableType="image"
      :dialogVisible.sync="dialogVisible"
      :updateForm="updateForm"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
// api api/news/article.js
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { getList, getDetail, submit } from "@/api/news/article";
export default {
  components: {
    quillEditor
  },
  data() {
    return {
      // 锚点
      mdtop: true,
      mdtbottom: false,
      // 图片组件
      dialogVisible: false,
      dialogbrowse: false,
      imgif:null,
      coverimg:null,
      coverimgs:[
        null,null,null
      ],
      //
      imagebrowse:
        "https://lf6-cdn-tos.bytegoofy.com/goofy/pgcfe/mp/graphic/1ac3bb7600f29b9a8025ef0e4f8abbf9.png",
      imageurl:
        "https://lf6-cdn-tos.bytegoofy.com/goofy/pgcfe/mp/graphic/60963ee5fa0b51ff805c17eafb3b0eeb.png",
      params_title: [{ text: "" }],

      titlechoice: "singletitle",
      imgchoice: "Monograph",
      formLabelWidth: "100px",
      resourcedata:[],

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
    godingtop(){
      this.mdtop=false
      this.mdtbottom=true
      this.$el.querySelector('.richtext')
      .scrollIntoView({block:'start',behavior:'smooth'})
    },
    godingbottom(){
      this.mdtop=true
      this.mdtbottom=false
      this.$el.querySelector('.mdBottom')
      .scrollIntoView({block:'start',behavior:'smooth'})
    },


    //选择图片
    imgone(a){
      this.dialogVisible = true
      this.imgif=a
    },
    updateForm(tableType, _, data) {
      this.resourcedata=data
      if(this.imgif=='img'){
        this.coverimg = data.link
      }else if(this.imgif=='imgs1'){
        this.coverimgs[0] = data.link
      }else if(this.imgif=='imgs2'){
        this.coverimgs[1] = data.link
      }else if(this.imgif=='imgs3'){
        this.coverimgs[2] = data.link
      }
      console.log('数组',this.coverimgs)
    },

    
    ////
    changetitle(value) {
      // console.log(value)
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
      let form={
        titlechoice:this.titlechoice,
        params_title:null,
        imgchoice:this.imgchoice,
        coverimg:this.coverimg,
        coverimgs:null
      };
      // JSON.stringify 数组转json // push ,title,this.imgchoice,this.coverimg,imgs
      let params_title=JSON.stringify(this.params_title)
      let coverimgs=JSON.stringify(this.coverimgs)
      form.params_title=params_title
      form.coverimgs=coverimgs
      console.log(form)
      // let that = this;
      // submit(that.params).then((res) => {
      //   console.log(res);
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/views/release/style/publish.scss"; //publish
</style>