<template>
  <basic-container>
    <div class="avue-crud">
      <el-row>
        <div class="avue-crud__menu">
          <!-- 头部左侧按钮模块 -->
          <div class="avue-crud__left">
            <el-button
              :size="option.size"
              type="primary"
              icon="el-icon-plus"
              @click="handleAdd"
              >新增</el-button
            >
          </div>
          <!-- 头部右侧按钮模块 -->
          <div class="avue-crud__right">
            <el-button
              :size="option.size"
              icon="el-icon-refresh"
              @click="searchChange"
              circle
            ></el-button>
          </div>
        </div>
      </el-row>
      <el-row>
        <!-- 列表模块 -->
        <div id="decorate-index" v-cloak>
          <div class="my-template">
            <div class="temp-item" v-if="templateList.length">
              <div
                class="temp-item-margin item-hover"
                v-for="(item, index) in templateList"
                :key="index"
              >
                <div class="foreach-item">
                  <div class="foreach-item-title">
                    <div class="item-title-left" @click="handleEdit(item.id)">
                      {{ item.name }}
                    </div>
                    <el-tag
                      type="success"
                      size="mini"
                      v-if="item.status == 1"
                      effect="plain"
                      >已发布</el-tag
                    >
                    <el-tag
                      type="danger"
                      size="mini"
                      v-if="item.status == 0"
                      effect="plain"
                      >未发布</el-tag
                    >
                  </div>
                  <div class="temp-item-img">
                    <img v-if="item.image" :src="item.image" />
                  </div>
                  <div class="temp-item-pla">
                    <div class="display-flex">
                      <span class="tip">支持平台：</span
                      ><span class="tip-body">{{
                        getPlatform(item.platform)
                      }}</span>
                    </div>
                    <div class="display-flex" style="margin-top: 6px">
                      <span class="tip">备注：</span>
                      <span class="tip-body">{{ item.memo }}</span>
                    </div>
                    <div class="display-flex" style="margin-top: 6px">
                      <span class="tip">更新时间：</span>
                      <span class="tip-body">{{ item.updateTime }}</span>
                    </div>
                  </div>
                  <div class="item-mask">
                    <div class="item-mask-body">
                      <div
                        class="btn-common item-mask-item"
                        @click="handleDecorate(item.id)"
                      >
                        <img
                          src="/assets/addons/shopro/img/decorate/decorate-btn.png"
                          alt=""
                        />装修
                      </div>
                      <div
                        class="btn-common item-mask-item"
                        @click="handleEdit(item.id)"
                      >
                        <img
                          src="/assets/addons/shopro/img/decorate/edit-btn.png"
                          alt=""
                        />编辑
                      </div>
                      <div
                        v-if="item.status != 1"
                        class="btn-common item-mask-item"
                        @click="handleRelease(item.id)"
                      >
                        <img
                          src="/assets/addons/shopro/img/decorate/release-btn.png"
                          alt=""
                        />发布
                      </div>
                      <div
                        v-if="item.status == 1"
                        class="btn-common item-mask-item"
                        @click="handleDown(item.id)"
                      >
                        <img
                          src="/assets/addons/shopro/img/decorate/down-btn.png"
                          alt=""
                        />下架
                      </div>
                      <div
                        class="btn-common item-mask-item"
                        @click="handleCopy(item.id)"
                      >
                        <img
                          src="/assets/addons/shopro/img/decorate/copy-btn.png"
                          alt=""
                        />复制
                      </div>
                      <div
                        v-if="item.status != 'normal'"
                        class="btn-common item-mask-item"
                        @click="handleRemove(item.id)"
                      >
                        <img
                          src="/assets/addons/shopro/img/decorate/delete-btn.png"
                          alt=""
                        />删除
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <el-empty v-else description="没有模板"></el-empty>
          </div>

          <!-- 表单模块 -->
          <el-dialog
            :title="title"
            :visible.sync="box"
            width="50%"
            :before-close="beforeClose"
            append-to-body
          >
            <el-form
              :disabled="view"
              :size="option.size"
              ref="form"
              :model="form"
              label-width="80px"
            >
              <!-- 表单字段 -->
              <el-form-item label="模板名称" prop="name">
                <el-input
                  type="text"
                  placeholder="最多可输入10个字"
                  v-model="form.name"
                  maxlength="10"
                >
                </el-input>
              </el-form-item>
              <el-form-item label="备注" prop="memo">
                <el-input
                  type="text"
                  placeholder="最多可输入12个字"
                  v-model="form.memo"
                  maxlength="12"
                >
                </el-input>
              </el-form-item>

              <el-form-item label="支持平台">
                <el-checkbox-group v-model="form.platform">
                  <el-checkbox label="wxMiniProgram">微信小程序</el-checkbox>
                  <el-checkbox label="wxOfficialAccount"
                    >微信公众号</el-checkbox
                  >
                  <el-checkbox label="H5">H5</el-checkbox>
                  <el-checkbox label="App">App</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-form>
            <!-- 表单按钮 -->
            <span v-if="!view" slot="footer" class="dialog-footer">
              <el-button
                type="primary"
                icon="el-icon-circle-check"
                :size="option.size"
                @click="handleSubmit"
                >提 交
              </el-button>
              <el-button
                icon="el-icon-circle-close"
                :size="option.size"
                @click="box = false"
                >取 消</el-button
              >
            </span>
          </el-dialog>
        </div>
      </el-row>
      <el-row style="margin-bottom: 20px">
        <!-- 分页模块 -->
        <el-pagination
          align="right"
          background
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
        >
        </el-pagination>
      </el-row>
    </div>
    <DoDecorate :dodecorateVisible.sync="dodecorateVisible" :dodecorateOptions="dodecorateOptions"/>
  </basic-container>
</template>

<script>
import { mapGetters } from "vuex"; 
import option from "@/const/decorate/decorate";
import {
  getList,
  getDetail,
  add,
  update,
  remove,
  copy,
} from "@/api/decorate/decorate";
import DoDecorate from "@/views/decorate/dodecorate"

export default {
  data() {
    return {
      // 弹框标题
      title: "新建模板",
      // 是否展示弹框
      box: false,
      // 加载中
      loading: true,
      // 是否为查看模式
      view: false,
      // 查询信息
      query: {},
      //选择的平台
      platformArray: [],
      // 分页信息
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 40,
      },
      // 表单数据
      form: { name: "", memo: "", platform: [] },
      // 表单配置
      option: option,
      // 表单列表
      templateList: [],
      dodecorateVisible: false,
      dodecorateOptions: {
        decorateId: null,
        fromType: "shop"
      }
    };
  },
  mounted() {
    this.init();
    this.onLoad(this.page);
  },
  components: {
    DoDecorate
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  methods: {
    init() {},
    searchChange() {
      this.onLoad(this.page);
    },

    handleSubmit() {
      const that = this;
      if (!that.form.platform || that.form.platform.length < 1) {
        that.$message({
          type: "warning",
          message: "请至少要选择平台!",
        });
        return;
      }
      that.form.platform = that.form.platform.join(",");
      if (!that.form.id) {
        add(that.form).then(() => {
          that.box = false;
          that.onLoad(that.page);
          that.$message({
            type: "success",
            message: "操作成功!",
          });
        });
      } else {
        update(that.form).then(() => {
          that.box = false;
          that.onLoad(that.page);
          that.$message({
            type: "success",
            message: "操作成功!",
          });
        });
      }
    },
    handleAdd() {
      this.title = "新增模板";
      this.form = { name: "", memo: "", platform: [] };
      this.box = true;
    },
    getPlatform(platform) {
      if (!platform) {
        return "";
      }
      let names = [];

      if (platform.indexOf("H5") >= 0) {
        names.push(" H5 ");
      }
      if (platform.indexOf("wxOfficialAccount") >= 0) {
        names.push("公众号");
      }
      if (platform.indexOf("wxMiniProgram") >= 0) {
        names.push("微信小程序");
      }
      if (platform.indexOf("App") >= 0) {
        names.push("APP");
      }

      return names.join(" , ");
    },

    handleCopy(id) {
      copy({ id: id }).then(() => {
        this.box = false;
        this.onLoad(this.page);
        this.$message({
          type: "success",
          message: "操作成功!",
        });
      });
    },
    handleEdit(id) {
      const that = this;
      that.title = "编辑模板";
      that.box = true;
      getDetail(id).then((res) => {
        that.form = res.data.data;
        let platform = that.form.platform;
        that.form.platform = platform.split(",");
      });
    },
    handleDecorate(decorateId) {
      this.dodecorateOptions.decorateId = decorateId;
      this.dodecorateVisible = true;
    },
    handleRelease(id) {
      update({ id: id, status: 1 }).then(() => {
        this.box = false;
        this.onLoad(this.page);
        this.$message({
          type: "success",
          message: "操作成功!",
        });
      });
    },
    handleDown(id) {
      update({ id: id, status: 0 }).then(() => {
        this.box = false;
        this.onLoad(this.page);
        this.$message({
          type: "success",
          message: "操作成功!",
        });
      });
    },
    handleRemove(id) {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return remove(id);
        })
        .then(() => {
          this.onLoad(this.page);
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        });
    },
    beforeClose(done) {
      done();
      this.form = {};
      this.view = false;
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage;
      this.onLoad(this.page);
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.onLoad(this.page);
    },
    onLoad(page, params = {}) {
      const that = this;
      that.loading = true;
      that.query["type"] = "shop";
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, that.query)
      ).then((res) => {
        const data = res.data.data;
        that.page.total = data.total;
        let records = data.records;

        records.forEach((item) => {
          let platform = item.platform;
          item.platform = platform.split(",");
        });

        that.templateList = records;
        that.loading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 20px;
}

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
  color: #7438d5;
}

.status-release {
  color: #7438d5;
}

.status-cancel {
  color: #ff6017;
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
  background: #7438d5;
  border-color: #7438d5;
}

.item-mask-item img {
  margin-right: 12px;
}

.item-mask-item:last-child {
  margin-bottom: 0;
}

.item-mask-buy {
  background: #7438d5;
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
  display: none;
}
</style>
