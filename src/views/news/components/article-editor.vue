<template>
   
   <el-drawer :title="formTitle" :before-close="handleClose" :visible.sync="drawerVisible" size="60%"
      append-to-body="true">
      <avue-form :option="formOption" ref='couponsForm' v-model="form" @submit="handleSubmit">
        <!-- <template slot="gettime">
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
        </template>-->

        <template slot="coverType">
          <el-row>
            <el-col :span="24">
              <el-radio-group v-model="form.coverType" @input="handleScopeChange">
                <el-radio label="0">无图</el-radio>
                <el-radio label="1">单图</el-radio>
                <el-radio label="2">三图</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
          <el-row v-if="form.coverType == 1">
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
      <resourceTable width="75%" dialogTitle="选择图片" tableType="image" :dialogVisible.sync="dialogVisible"
      :updateForm="updateForm" v-bind="$attrs" />
    </el-drawer>

 
</template>

<script> 
 
import { getList, getDetail, submit } from "@/api/news/article";
export default {
  components: {
    // quillEditor
  },
  data() {
    return {
      drawerVisible: true,
      form:{
        category: "2",//
        title: "",//h1标题
        titleType: 1,//文章标题:1 = 单标题，2= 多标题
        otherTitle: '',//多标题
        content: "",//富文本
        coverType: 0 ,//图片类型判断0代表无图1单图2多图
        picUrls: null,//图片数组 单多合并
        copyRight: "版权",//
        author: "作者",//
        tags: ""//
      },
      formOption: {
        height: 'auto',
        calcHeight: 30,
        tip: false,
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
          component: "AvueUeditor",
          span: 24, 
          
          options: {
            customConfig: {
              toolbarConfig:{
                toolbarKeys:[
                  'code',
                  'headerSelect'
                ]
              }
            },//wangEditor编辑的配置
            action: "/api/blade-resource/oss/endpoint/put-file",
            props: {
                res: "data",
                url: "link",
            },
          }, 
          customConfig: {
            lineHeights: ['1', '1.15', '1.6', '2', '2.5', '3'],
           
          },
          // //是否启用oss(qiniu/ali)
          // oss:'',
          // headers:{},
        },
        {
          label: "标题设置",
          prop: "titleType",
          type: "radio",
          border: true,
          span: 24,
          dicData: [
            {
              label: "单标题",
              value: "1"
            }, 
            {
              label: "多标题",
              value: "2"
            }
          ],
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
        }]
      },
      // 富文本
      richtext: null,
       
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
    handleClose() {
      this.drawerVisible = false;
    },
    handleSubmit() {
      const that = this;   
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