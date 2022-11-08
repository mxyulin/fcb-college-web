<template>
  <basic-container>
    <div id="decorate-designer">
      <div class="designer-template">
        <!-- <div class="title">
          设计师模板
        </div> -->
        <div class="temp-item">
          <div class="foreach-item foreach-item-designer temp-item-margin item-hover" v-for="(item, index) in records"
            :key="index">
            <div class="temp-item-img-designer">
              <img :src="item.image">
            </div>
            <div class="designer-bottom">
              <div class="designer-bottom-title">
                {{ item.name }}
              </div>
              <div>
                平台：<span>{{ getPlatform(item.platform) }}</span>
              </div>
              <div>
                备注：<span>{{ item.memo }}</span>
              </div>
            </div>
            <div class="item-mask item-mask-designer">
              <div class="btn-common item-mask-item" @click="onPreviewShow(index, item.id)">
                预览模板
              </div>
              <div class="btn-common item-mask-item" @click="onSubmitToUse(index,item.id)">
                使用模板
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 预览弹框 -->
      <el-dialog title="模板预览" :visible.sync="previewDialog" :before-close="onPreviewClose">
        <div class="preview-body">
          <div class="web-preview">
            <iframe id="preview" src="" frameborder="1" height="600px"></iframe>
          </div><!--Fast.api.cdnurl(iframeSrc)-->
          <div class="code-preview">
            <div>
              <div class="template-title">{{ previewData.name }}</div>
              <div class="template-company">{{ previewData.memo }}</div>
              <div class="template-platform" v-if="previewData.platform">
                <img>
              </div>
            </div>
            <div class="wechart-code"><!---Fast.api.cdnurl(qrcodeSrc)--->
              <div class="code-item"><img class="code-item-img" src="" />
                <div class="code-title">微信扫描二维码即可预览</div>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
  </basic-container>
</template>

<script>
import { getList, setToUse } from "@/api/decorate/decorate";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      records: [],
      query: {},
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      previewDialog: false,
      previewData:{}
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
      that.query["type"] = "shop"
      getList(page.currentPage, page.pageSize, Object.assign(params, that.query)).then(res => {
        let data = res.data.data;
        that.page.total = data.total;
        that.page.total = data.total;
        that.records = data.records;
        that.loading = false;
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
    onSubmitToUse(index,id) {
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
#decorate-designer {
  font-family: Source Han Sans SC;
  color: #fff; 
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
}

.title {
  color: #444;
  height: 48px;
  line-height: 48px;
  padding: 0 22px;
  font-weight: 600;
  font-style: 14px;
}

.temp-item {
  /* height: 510px; */
  // background: #F7F7FA;
  border-radius: 10px;
  padding: 0px 0 20px 18px;
  margin: 0 12px;
  display: flex;
  flex-wrap: wrap;
}

.foreach-item {
  min-width: 260px;
  height: 450px;
  background: #fff;
  border-radius: 4px;
  padding: 0 12px;
  position: relative;
}

.foreach-item-designer {
  padding: 0
}

.temp-item-margin {
  margin-right: 18px;
  margin-top: 20px;
  overflow: hidden;
}

.item-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  min-width: 260px;
  height: 450px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  display: none;
  padding: 122px 80px;
}

.item-mask-designer {
  padding: 184px 80px;
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
}

.status-release {
  color: #7438D5;
}

.status-cancel {
  color: #FF6017;
}

.status-norelease {
  color: #666;
}

.item-hover:hover .item-mask {
  display: block;
}

.item-mask-item {
  margin-bottom: 20px;
}

.item-mask-item:hover {
  background: #7438D5;
  border-color: #7438D5;
}

.item-mask-item:last-child {
  margin-bottom: 0;
}

.temp-item-img {
  width: 236px;
  height: 340px;
}

.temp-item-img-designer {
  width: 260px;
  /* height: 450px; */
  position: relative;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #d7dae2;
}

.temp-item-img-designer img {
  width: 100%;
  height: 100%;
  border: none;
}

.designer-bottom {
  color: #fff;
  padding: 14px;
  font-size: 12px;
  position: absolute;
  width: 100%;
  bottom: 0px;
  background: rgba(0, 0, 0, 0.3);
  height: 72px;
}

.designer-bottom-title {
  margin-bottom: 8px;
  color: #fff;
  font-size: 16px;
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
  height: 594px;
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

.el-dialog__headerbtn .el-dialog__close:hover {
  color: #7438D5;
}

[v-cloak] {
  display: none
}
</style>
