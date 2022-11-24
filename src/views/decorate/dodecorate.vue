<template>
  <basic-container
    id="decorateApp"
    v-cloak
    style="height: calc(100vh - 120px)"
    v-loading="loading"
  >
    <el-heade height="40px">
      <!-- 顶部按钮组 -->
      <el-row :gutter="0" type="flex" justify="space-between" align="center">
        <el-col :span="21">
          <div class="title-msg">店铺装修</div>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" :size="option.size" plain>预览</el-button>
          <el-button
            type="primary"
            :size="option.size"
            @click="saveDecorateData"
            >保存</el-button
          >
        </el-col>
      </el-row>
    </el-heade>
    <el-container style="height: calc(100vh - 160px)">
      <!-- 左边栏 -->
      <el-aside
        v-if="
          isPageType == 'home' || isPageType == 'user' || fromtype == 'custom'
        "
        class="decorate-left el-aside-left"
        width="265px"
      >
        <ToolsBox
          :fromtype="fromtype"
          :isPageType="isPageType"
          :templateData.sync="templateData"
          :centerSelect.sync="centerSelect"
          @showForm="showForm"
        />
      </el-aside>
      <!-- App 装修区 -->
      <el-main class="center-body">
        <!-- 首页和个人中心 -->
        <div
          id="html2canvasWrap"
          v-if="
            isPageType != 'tabbar' &&
            isPageType != 'popup' &&
            isPageType != 'float-button'
          "
          class="
            item
            decorate-center-container decorate-center-container-scrollbar
          "
        >
          <!-- 首页状态栏 -->
          <div
            v-if="isPageType == 'home'"
            style="position: absolute; z-index: 100"
          >
            <img
              src="https://demo.shopro.top//assets/addons/shopro/img/decorate/tabs-header.png"
            />
            <div v-if="fromtype == 'custom'" class="custom-name">
              {{ customName }}
            </div>
          </div>
          <!-- 个人中心状态栏 -->
          <div
            v-if="fromtype == 'custom'"
            style="position: relative; z-index: 100"
          >
            <img
              src="https://demo.shopro.top//assets/addons/shopro/img/decorate/tabs-header.png"
            />
            <div v-if="fromtype == 'custom'" class="custom-name">
              {{ customName }}
            </div>
          </div>
          <!-- 空画板 -->
          <div
            v-if="templateData && templateData.length == 0"
            class="compotent-empty"
          >
            <img
              src="https://demo.shopro.top//assets/addons/shopro/img/decorate/zujian.png"
            />
          </div>
          <!-- App布局模块 -->
          <AppLayout
            :fromtype="fromtype"
            :isPageType="isPageType"
            :centerSelect="centerSelect"
            :templateData="templateData"
            @showForm="showForm"
            @centerDel="centerDel"
          />
        </div>
        <!-- 底部导航 -->
        <div
          v-if="isPageType == 'tabbar'"
          class="item decorate-center-container"
        >
          <div
            class="tabbar-body-item"
            style="height: 60px; justify-content: center"
            :style="{ background: templateData[0].content.bgcolor }"
          >
            <div
              v-for="(item, index) in templateData[0].content.list"
              :key="item.id"
              :style="{
                width: 100 / templateData[0].content.list.length + '%',
              }"
              @click.stop="tabbarSelected(index)"
            >
              <div
                style="
                  height: 25px;
                  margin-bottom: 6px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
                v-if="templateData[0].content.style != 3"
              >
                <img
                  v-if="item.image && templateData[0].content.style != 3"
                  style="width: 25px; height: 25px"
                  :src="item.selected ? item.activeImage : item.image"
                />
              </div>
              <div
                v-if="
                  templateData[0].content.style == 1 ||
                  templateData[0].content.style == 3
                "
                :style="{
                  color: item.selected
                    ? templateData[0].content.activeColor
                    : templateData[0].content.color,
                }"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
        <!-- 弹窗提醒 -->
        <div
          class="decorate-center-container"
          id="popupContainer"
          v-if="isPageType == 'popup'"
        >
          <div
            v-for="(item, index) in templateData"
            :key="item.id"
            class="board-item tabbar-body"
            style="height: 100%"
            @click.stop="showForm(index)"
          >
            <div
              class="tabbar-body-item"
              style="height: 100%; background: #999; overflow: hidden"
            >
              <div style="position: relative; width: 292px; height: 454px">
                <div
                  v-for="(popup, idx) in item.content.list"
                  :key="idx"
                  @click="popupIndex = index"
                >
                  <el-image
                    style="
                      width: 100%;
                      height: 100%;
                      background: #fff;
                      position: absolute;
                      border: 1px solid #e6e6e6;
                      border-radius: 5px;
                    "
                    :style="{
                      left: idx * 20 + 'px',
                      top: idx * 20 + 'px',
                    }"
                    :src="popup.image"
                    fit="contain"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 悬浮按钮 -->
        <div
          class="decorate-center-container"
          id="float-button-box"
          style="
            position: relative;
            height: calc(100vh - 230px);
            overflow: hidden;
          "
          v-if="isPageType == 'float-button'"
        >
          <div
            id="float-button"
            style="display: flex; flex-direction: column; align-items: flex-end"
          >
            <div
              style="
                display: flex;
                flex-direction: column;
                align-items: flex-end;
              "
            >
              <el-image
                v-for="(float, idx) in templateData[0].content.list"
                :key="idx"
                style="
                  width: 30px;
                  height: 30px;
                  border-radius: 15px;
                  margin-bottom: 10px;
                "
                :src="float.btnimage"
                fit="contain"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
            <div @click.stop="isfloat = !isfloat">
              <el-image
                style="width: 30px; height: 30px; border-radius: 15px"
                :src="templateData[0].content.image"
                fit="contain"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
          </div>
        </div>
        <!-- 底部按钮组 -->
        <div class="decorate-body-buttom">
          <el-radio-group
            v-model="isPageType"
            :size="option.size"
            fill="primary"
          >
            <el-radio-button
              :label="item.type"
              v-for="(item, index) in pageTypeList"
              :key="index"
              >{{ item.name }}</el-radio-button
            >
          </el-radio-group>
        </div>
      </el-main>
      <!-- 右边栏 -->
      <el-aside class="right-container" width="350px">
        <ToolsForm
          :fromtype="fromtype"
          :centerSelect="centerSelect"
          :templateForm="templateForm"
          :isfloat.sync="isfloat"
          :popupIndex.sync="popupIndex"
          :templateData.sync="templateData"
          @showForm="showForm"
        />
      </el-aside>
    </el-container>
  </basic-container>
</template>

<script>
import { mapGetters } from "vuex";
import option from "@/const/decorate/dodecorate";
import AppLayout from "@/views/decorate/components/applayout";
import ToolsBox from "@/views/decorate/components/toolsbox";
import ToolsForm from "@/views/decorate/components/toolsform";

export default {
  components: {
    ToolsBox,
    AppLayout,
    ToolsForm,
  },
  data() {
    return {
      // 全局组件配置
      option: option,
      // v-loading 状态
      loading: false,

      // 底部按钮组
      pageTypeList: [
        {
          name: "首页",
          type: "home",
        },
        {
          name: "个人中心",
          type: "user",
        },
        {
          name: "底部导航",
          type: "tabbar",
        },
        {
          name: "弹窗提醒",
          type: "popup",
        },
        {
          name: "悬浮按钮",
          type: "float-button",
        },
      ],
      // 装修类型
      isPageType: "home",
      // 模板组装数据，首页带一个顶部 banner 初始数据
      templateData: [
        {
          name: "轮播图",
          type: "banner",
          icon: "icon-carousel",
          content: {
            name: "",
            style: 1,
            height: 520,
            radius: 0,
            x: 0,
            y: 0,
            list: [
              {
                name: "",
                bgcolor: "",
                image: "",
                path: "",
                path_name: "",
                path_type: 1,
              },
            ],
          },
        },
      ],
      // 组装模板索引
      centerSelect: null,
      // 模板的表单数据
      templateForm: {},
      //
      group: "changepull",

      /* 模板预览 */
      httpsDlocked: true,
      // 小程序预览来源
      iframeSrc: "",
      // 二维码来源
      qrcodeSrc: "",
      // 微信码来源
      wxacodeSrc: "",
      // 模板预览标题
      iframeTitle: "",
      // 模板预览版权
      iframeCopyright: [],
      // 模板预览平台
      iframePlatform: "",
      // 模板预览开关
      previewDialog: false,
      // 模板预览 ID（用于获取模板预览相关数据）
      // decorate_id: new URLSearchParams(location.search).get("id"),

      /* 装修类型表单始数据 */
      homeData: [],
      userData: [
        {
          name: "个人中心",
          type: "user",
          content: {
            name: "",
            style: 2,
            image: "",
          },
        },
      ],
      tabbarData: [
        {
          type: "tabbar",
          name: "底部导航",
          content: {
            style: 1,
            color: "#000",
            activeColor: "#999",
            bgcolor: "#fff",
            list: [
              {
                name: "标题",
                image:
                  "http://file.shopro.top/uploads/20210527/c4591c74c27a49bda021257d3c889225.png",
                activeImage:
                  "http://file.shopro.top/uploads/20210527/558feb98726495d17128d07694d7ff47.png",
                path: "",
                path_name: "",
                path_type: 1,
                selected: false,
              },
              {
                name: "标题",
                image:
                  "http://file.shopro.top/uploads/20210527/d6e987bb27013691478ddce7ce700288.png",
                activeImage:
                  "http://file.shopro.top/uploads/20210527/f280b7f9ea18db0c80337d1c1cac6075.png",
                path: "",
                path_name: "",
                path_type: 1,
                selected: false,
              },
              {
                name: "标题",
                image:
                  "http://file.shopro.top/uploads/20210527/0ab4659f44404d6d4723c265ccd21f94.png",
                activeImage:
                  "http://file.shopro.top/uploads/20210527/5273d6e90fb45e3d9189fba9fcbea47c.png",
                path: "",
                path_name: "",
                path_type: 1,
                selected: false,
              },
              {
                name: "标题",
                image:
                  "http://file.shopro.top/uploads/20210527/406848d5827325fead27224decffd141.png",
                activeImage:
                  "http://file.shopro.top/uploads/20210527/8eca666cc43686d292113244b31e0664.png",
                path: "",
                path_name: "",
                path_type: 1,
                selected: false,
              },
            ],
          },
        },
      ],
      popupData: [
        {
          type: "popup",
          name: "弹窗提醒",
          content: {
            list: [
              {
                name: "",
                style: 1,
                image:
                  "http://file.shopro.top/uploads/20210522/9136ecddcddf6607184fab689207e7e3.png",
                btnimage: "",
                path: "",
                path_name: "",
                path_type: 1,
              },
            ],
          },
        },
      ],
      floatButtonData: [
        {
          type: "float-button",
          name: "悬浮按钮",
          content: {
            image:
              "http://file.shopro.top/uploads/20210518/f6b9c9d20d21df541ac52e9548486e1a.png",
            list: [
              {
                name: "关注",
                btnimage:
                  "http://file.shopro.top/uploads/20210522/875dd6d2b1980dbccbec0895f757cdff.png",
                style: 1,
                image: "",
                path_type: 1,
                path_name: "",
                path: "",
              },
              {
                name: "收藏",
                btnimage:
                  "http://file.shopro.top/uploads/20210522/5c50e0b17d64f448d271cfaac5039e00.png",
                style: 1,
                image: "",
                path_type: 1,
                path_name: "",
                path: "",
              },
              {
                name: "客服",
                btnimage:
                  "http://file.shopro.top/uploads/20210522/73234ab79bd6164b11f09a1b11df3f55.png",
                style: 1,
                image: "",
                path_type: 1,
                path_name: "",
                path: "",
              },
            ],
          },
        },
      ],
      customData: [],
      // 弹窗索引
      popupIndex: null,
      // 悬浮按钮状态
      isfloat: false,
      // 表单类型（shop & custom）
      fromtype: "shop",
      // 定制名（未用）
      customName: "",
      /* 暂时不用 */
      //#region
      // * 源码 draggable 组件配置
      // menuOption: {
      //   group: {
      //     name: "draggableName",
      //     pull: "clone",
      //     put: false,
      //   },
      //   ghostClass: "sortable-ghost",
      //   fallbackClass: "clone-item",
      //   fallbackOnBody: true,
      // },
      // defaultOption: {
      //   filter: ".undraggable",
      //   animation: 100,
      //   group: {
      //     name: "draggableName",
      //   },
      //   ghostClass: "sortable-ghost",
      //   fallbackClass: "clone-item",
      //   dragClass: "dragin-item",
      // },
      // ?缓存整个装修
      // saveHtml: null,
      // decorateContent: "",
      //#endregion
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    ids() {
      let ids = [];
      this.selectionList.forEach((ele) => {
        ids.push(ele.id);
      });
      return ids.join(",");
    },
  },
  watch: {
    templateData: {
      deep: true,
      handler: function (newVal, oldVal) {
        this.templateForm = newVal.length == 0 ? {} : this.templateForm;
      },
    },
    isPageType(newVal, oldVal) {
      // 重置弹窗索引
      this.popupIndex = null;
      // 如果是第二次切换装修类型
      if (oldVal) {
        this.cachePreData(oldVal);
      }
      this.loadTemplateDate(newVal);
      if (newVal != "home") {
        // 选择第一个组件
        this.centerSelect = 0;
      } else {
        if (this.homeData.length > 0) {
          // 选择第一个组件
          this.centerSelect = 0;
        } else {
          // 没有组件初始化 centerSelect
          this.centerSelect = null;
        }
      }
      this.showForm(this.centerSelect);
    },
  },
  methods: {
    init() {},
    // 展示工具表单
    showForm(index) {
      let that = this;
      that.centerSelect = index;
      that.templateForm = that.templateData[index];
    },
    // 缓存上一次装修的数据
    cachePreData(type) {
      let that = this;
      switch (type) {
        case "home":
          that.homeData = that.templateData;
          break;
        case "user":
          that.userData = that.templateData;
          break;
        case "tabbar":
          that.tabbarData = that.templateData;
          break;
        case "popup":
          that.popupData = that.templateData;
          break;
        case "float-button":
          that.floatButtonData = that.templateData;
          break;
      }
    },
    // 加载当前装修类型的数据
    loadTemplateDate(type) {
      let that = this;
      switch (type) {
        case "home":
          that.templateData = that.homeData;
          break;
        case "user":
          that.templateData = that.userData;
          break;
        case "tabbar":
          that.templateData = that.tabbarData;
          break;
        case "popup":
          that.templateData = that.popupData;
          break;
        case "float-button":
          that.templateData = that.floatButtonData;
          break;
      }
    },
    // 选择底部导航
    tabbarSelected(index) {
      let that = this;
      that.templateData[0].content.list.forEach((i) => {
        // i.selected = false;
        that.$set(i, "selected", false);
      });
      // that.templateData[0].content.list[index].selected = true;
      that.$set(that.templateData[0].content.list[index], "selected", true);
      // that.$forceUpdate();
    },
    // 删除装修组件
    centerDel(idx) {
      let that = this;
      that.templateData.splice(idx, 1);
      that.centerSelect = idx;
      if (that.centerSelect == 0) {
        if (that.templateData.length > 1) {
          that.templateForm = that.templateData[that.centerSelect - 1];
        } else {
          that.centerSelect = null;
        }
      } else {
        that.showForm( that.centerSelect - 1 )
      }
    },
    // 保存(提交)模板数据
    saveDecorateData() {
      console.log("首页", this.homeData);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "@/views/decorate/style/dodecorate_layout";
@import "@/views/decorate/style/dodecorate_origin";
</style>

<style lang="scss">
* {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}
</style>
