<template>
  <basic-container>
    <div class="avue-crud">
      <el-row>
        <el-alert
        title="使用模板后，客户端重启才会生效!"
        type="info"
        show-icon  :closable="false">
      </el-alert>
      </el-row>

      <el-row>
        <!-- 列表模块 -->
        <div id="decorate-index" v-cloak>
          <div class="my-template" style="margin-bottom:20px;">
            <div class="temp-item" v-if="templateList.length">
              <div class="temp-item-margin item-hover" v-for="(item, index) in templateList" :key="index">
                <div class="foreach-item">
                  <div class="foreach-item-title">
                    <div class="item-title-left">
                      {{ item.name }}
                    </div>
                    <el-tag type="success" size="mini" v-if="item.status == 1" effect="plain">正在使用</el-tag> 

                  </div>
                  <div class="temp-item-img">
                    <img v-if="item.image" :src="item.image">
                  </div>
                  <div class="temp-item-pla">
                    <div class="display-flex">
                      <span class="tip">支持平台：</span><span class="tip-body">{{ getPlatform(item.platform) }}</span>
                    </div>
                    <div class="display-flex" style="margin-top:6px">
                      <span class="tip">备注：</span> <span class="tip-body">{{ item.memo }}</span>
                    </div>
                    <div class="display-flex" style="margin-top:6px">
                      <span class="tip">更新时间：</span>
                      <span class="tip-body">{{ item.updateTime }}</span>
                    </div>
                  </div>
                  <div class="item-mask">
                    <div class="item-mask-body">
                      <div class="btn-common item-mask-item" @click="onPreviewShow(index, item.id)">
                        预览模板
                      </div>
                      <div class="btn-common item-mask-item" @click="onSubmitToUse(index, item.id)">
                        使用模板
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <el-empty v-else description="没有模板"></el-empty>
          </div>


          <el-dialog title="模板预览" :visible.sync="previewDialog" :before-close="onPreviewClose" append-to-body>
            <div class="preview-body">
              <div class="web-preview">
                <iframe id="preview" src="" frameborder="1" height="600px"></iframe>
              </div>
              <!--Fast.api.cdnurl(iframeSrc)-->
              <div class="code-preview">
                <div>
                  <div class="template-title">{{ previewData.name }}</div>
                  <div class="template-company">{{ previewData.memo }}</div>
                  <div class="template-platform" v-if="previewData.platform">
                    <img>
                  </div>
                </div>
                <div class="wechart-code">
                  <!---Fast.api.cdnurl(qrcodeSrc)--->
                  <div class="code-item"><img class="code-item-img" src="" />
                    <div class="code-title">微信扫描二维码即可预览</div>
                  </div>
                </div>
              </div>
            </div>
          </el-dialog>
        </div>

      </el-row>



    </div>
  </basic-container>
</template>

<script>
import { getList, setToUse } from "@/api/decorate/decorate";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      templateList: [],
      query: {},
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      previewDialog: false,
      previewData: {}
    }
  },
  mounted() {
    this.onLoad(this.page);
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  methods: {
    onLoad(page, params = {}) {
      const that = this;
      that.loading = true;
      that.query["type"] = "shop";
      that.query["status"] = 1;

      getList(page.currentPage, page.pageSize, Object.assign(params, that.query)).then(res => {
        let data = res.data.data;
        that.page.total = data.total;
        that.page.total = data.total;
        that.templateList = data.records;
        that.loading = false;
        debugger;
      });
    },

    getPlatform(platform) {
      if (!platform) { return ""; }
      let names = [];

      if (platform.indexOf("H5")) {
        names.push(" H5 ");
      }
      if (platform.indexOf("wxOfficialAccount")) {
        names.push("公众号");
      }
      if (platform.indexOf("wxMiniProgram")) {
        names.push("微信小程序");
      }
      if (platform.indexOf("App")) {
        names.push("APP");
      }

      return names.join(" , ");

    },
    onSubmitToUse(index, id) {
      const that = this;
      let item = that.records[index];
      setToUse(item).then(() => {
        this.box = false;
        //this.onLoad(this.page);
        this.$message({
          type: "success",
          message: "操作成功!"
        });
      })
    },

    onPreviewShow(index, id) {
      const that = this;
      that.previewDialog = true;
      that.previewData = that.records[index];
    },
    onPreviewClose() {
      const that = this;
      that.previewDialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
#decorate-index {
  font-family: Source Han Sans SC;
  color: #fff;
  background: #fff;
  border-radius: 10px 10px 0px 0px;
}

.btn-common {
  width: 100px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  border: 1px solid #fff;
  border-radius: 4px;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
  display: block;
}



.temp-item {
  // background: #F7F7FA;
  // border-radius: 10px;
  // padding: 0px 18px 20px 0;
  // margin: 0 12px;
  display: flex;
  flex-wrap: wrap;
}



.foreach-item {
  // width: 260px;
  height: 450px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 0 12px;
  position: relative;
  overflow: hidden;
}

.temp-item-margin {
  margin-left: 18px;
  margin-top: 20px;
}

.item-mask {
  position: absolute;
  left: 0;
  top: 40px;
  width: 100%;
  min-width: 260px;
  height: 410px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  display: none;
}

.item-mask-body {
  height: 410px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0);
  flex-direction: column;
}

.foreach-item-title {
  font-size: 14px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item-title-left {
  color: #444;
  cursor: pointer;
}

.item-title-left:hover {
  color: #7438D5;
}

.status-release {
  color: #7438D5;
}

.status-cancel {
  color: #FF6017;
}



.item-hover:hover .item-mask {
  display: block;
}

.item-mask-item {
  margin-bottom: 20px;
  align-items: center;
  display: flex;
  justify-content: center;
}

.item-mask-item:hover {
  background: #7438D5;
  border-color: #7438D5;
}

.item-mask-item img {
  margin-right: 12px;
}

.item-mask-item:last-child {
  margin-bottom: 0;
}

.item-mask-buy {
  background: #7438D5;
  border: none;
}

.temp-item-img {
  width: 236px;
  /* height: 408px; */
}

.temp-item-img img {
  width: 100%;
  height: 100%;
  border: none;
}

.temp-item-pla {
  color: #fff;
  padding: 10px 0 12px;
  position: absolute;
  bottom: 0;
  width: 266px;
  margin-left: -12px;
  background: rgba(0, 0, 0, 0.5);
}

// .el-dialog {
//   width: 500px;
//   /* height: 330px; */
// }

.el-dialog__header {
  border-radius: 10px 10px 0 0;
}

@keyframes go {
  0% {
    transform: rotateZ(0);
  }

  100% {
    transform: rotateZ(360deg);
  }
}

.display-flex {
  display: flex;
}

.tip {
  display: block;
  width: 68px;
  text-align: justify;
  text-align-last: justify;
  font-size: 13px !important;
  flex-shrink: 0;
  padding-left: 10px;
}

.tip-body {
  text-align: justify;
  text-align-last: justify;
  font-size: 13px !important;
  flex-shrink: 0;

}

.el-form-item:last-child {
  margin-bottom: 0px;
}

[v-cloak] {
  display: none
}

/* 预览弹框 */
.el-dialog {
  width: 700px;
  height: 740px;
  border-radius: 10px;
  margin-top: 4vh !important;
}

.el-dialog__header {
  border-radius: 10px 10px 0 0;
}

.el-dialog__body {
  padding: 50px 40px 50px 75px;
}

.preview-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.web-preview {
  height: 300px;
  width: 300px;
  background: url('/assets/addons/shopro/img/decorate/preview_bg.png');
  padding: 18px;
}

#preview {
  border: none;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  border-radius: 26px;
}

.code-preview {
  width: 200px;
  height: 594px;
  padding-top: 28px;
}

.template-title {
  font-size: 18px;
  color: #444;
  margin-bottom: 14px;
}

.template-company {
  color: #999;
  font-size: 12px;
  margin-bottom: 14px;
}

.template-platform {
  color: #FF5306;
  font-size: 14px;
  display: flex;
}

.template-platform img {
  margin-right: 5px;
}

.wechart-code {
  margin-top: 64px;
}

.code-title {
  margin-top: 18px;
  font-size: 12px;
  color: #999;
}

.code-item {
  width: 132px;
  height: 132px;
}

.code-item-img {
  width: 100%;
  height: 100%;
}

.el-dialog__title {
  font-size: 16px;
}

.el-dialog__headerbtn .el-dialog__close {
  font-size: 18px;
}
</style>
