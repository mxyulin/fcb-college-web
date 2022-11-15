<template>
  <basic-container
    id="decorateApp"
    v-cloak
    style="height: calc(100vh - 129px)"
    v-loading="loading"
  >
    <el-header>
      <!-- 顶部按钮组 -->
      <el-row :gutter="0" type="flex" justify="space-between">
        <el-col :span="21">
          <div class="title-msg">店铺装修</div>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" size="mini" plain>预览</el-button>
          <el-button type="primary" :size="option.size">保存</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container style="height: calc(100vh - 229px)">
      <!-- 左边栏 -->
      <el-aside
        v-if="
          isPageType == 'home' || isPageType == 'user' || fromtype == 'custom'
        "
        class="decorate-left"
        width="265px"
      >
        <ToolsBox
          :fromtype="fromtype"
          :isPageType="isPageType"
          :templateData="templateData"
          :centerSelect="centerSelect"
          @showForm="showForm"
        />
      </el-aside>
      <!-- 装修区画布 -->
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
          <!-- 自定义状态栏 -->
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
          <!-- 拖放模块 -->
          <Draggable
            :fromtype="fromtype"
            :isPageType="isPageType"
            :templateData="templateData"
            :templateForm="templateForm"
            :centerSelect="centerSelect"
            @centerDel="centerDel"
            @showForm="showForm"
          />
        </div>
        <!-- 底部导航 -->
        <div
          v-if="isPageType == 'tabbar'"
          class="item decorate-center-container"
          :style="{ height: isPageType == 'tabbar' ? '90%' : '100%' }"
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
        <!-- 画布底部按钮组 -->
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
      <el-aside class="right-container" width="350px"> 工具面板 </el-aside>
    </el-container>
  </basic-container>
</template>

<script>
import { mapGetters } from "vuex";
import option from "@/const/decorate/dodecorate";
import ToolsBox from "@/views/dodecorate/components/toolsbox";
import Draggable from "@/views/dodecorate/components/draggable";

export default {
  components: {
    ToolsBox,
    Draggable,
  },
  data() {
    return {
      // 页面配置
      option: option,
      // v-loading 状态
      loading: false,
      // 表单类型
      fromtype: new URLSearchParams(location.search).get("type"),
      // 装修类型
      isPageType: "home",
      // 定制名
      customName: new URLSearchParams(location.search).get("name"),
      // 模板列表数据
      templateData: [],
      // 工具的表单数据
      templateForm: {},
      // ?选项卡选择
      centerSelect: null,
      menuOption: {
        group: {
          name: "draggableName",
          pull: "clone",
          put: false,
        },
        ghostClass: "sortable-ghost",
        fallbackClass: "clone-item",
        fallbackOnBody: true,
      },
      defaultOption: {
        filter: ".undraggable",
        animation: 100,
        group: {
          name: "draggableName",
        },
        ghostClass: "sortable-ghost",
        fallbackClass: "clone-item",
        dragClass: "dragin-item",
      },
      saveHtml: null,

      decorateContent: "",
      group: "changepull",
      // toolsBox: [
      //   {
      //     name: "图文",
      //     show: "common",
      //     data: [
      //       {
      //         name: "轮播图",
      //         type: "banner",
      //         image: "/assets/addons/shopro/img/decorate/banner.png",
      //         flag: false,
      //         show: "common",
      //       },
      //       {
      //         name: "菜单组",
      //         type: "menu",
      //         image: "/assets/addons/shopro/img/decorate/menu.png",
      //         flag: false,
      //         show: "common",
      //       },
      //       {
      //         name: "广告魔方",
      //         type: "adv",
      //         image: "/assets/addons/shopro/img/decorate/adv.png",
      //         flag: false,
      //         show: "common",
      //       },
      //       {
      //         name: "标题栏",
      //         type: "title-block",
      //         image: "/assets/addons/shopro/img/decorate/title-block.png",
      //         flag: false,
      //         show: "home",
      //       },
      //       {
      //         name: "宫格导航",
      //         type: "grid-list",
      //         image: "/assets/addons/shopro/img/decorate/grid-list.png",
      //         flag: false,
      //         show: "user",
      //       },
      //       {
      //         name: "列表导航",
      //         type: "nav-list",
      //         image: "/assets/addons/shopro/img/decorate/nav-list.png",
      //         flag: false,
      //         show: "user",
      //       },
      //     ],
      //   },
      //   {
      //     name: "商品组",
      //     show: "common",
      //     data: [
      //       {
      //         name: "商品分类",
      //         type: "goods-group",
      //         image: "/assets/addons/shopro/img/decorate/goods-group.png",
      //         flag: false,
      //         show: "home",
      //       },
      //       {
      //         name: "分类选项卡",
      //         type: "category-tabs",
      //         image: "/assets/addons/shopro/img/decorate/category_tabs.png",
      //         flag: false,
      //         show: "home",
      //       },
      //       {
      //         name: "自定义商品",
      //         type: "goods-list",
      //         image: "/assets/addons/shopro/img/decorate/goods-list.png",
      //         flag: false,
      //         show: "common",
      //       },
      //     ],
      //   },
      //   {
      //     name: "活动营销",
      //     show: "home",
      //     data: [
      //       {
      //         name: "优惠券",
      //         type: "coupons",
      //         image: "/assets/addons/shopro/img/decorate/coupon.png",
      //         flag: false,
      //         show: "home",
      //       },
      //       {
      //         name: "拼团",
      //         type: "groupon",
      //         image: "/assets/addons/shopro/img/decorate/groupon.png",
      //         show: "home",
      //       },
      //       {
      //         name: "秒杀",
      //         type: "seckill",
      //         image: "/assets/addons/shopro/img/decorate/secKill.png",
      //         flag: false,
      //         show: "home",
      //       },
      //       {
      //         name: "小程序直播",
      //         type: "live",
      //         image: "/assets/addons/shopro/img/decorate/live.png",
      //         flag: false,
      //         show: "home",
      //       },
      //     ],
      //   },
      //   {
      //     name: "其他",
      //     show: "common",
      //     data: [
      //       {
      //         name: "搜索框",
      //         type: "search",
      //         image: "/assets/addons/shopro/img/decorate/search.png",
      //         flag: false,
      //         show: "home",
      //       },
      //       {
      //         name: "富文本",
      //         type: "rich-text",
      //         image: "/assets/addons/shopro/img/decorate/rich-text.png",
      //         flag: false,
      //         show: "common",
      //       },
      //       {
      //         name: "订单卡片",
      //         type: "order-card",
      //         image: "/assets/addons/shopro/img/decorate/order-card.png",
      //         flag: false,
      //         show: "user",
      //       },
      //       {
      //         name: "资产卡片",
      //         type: "wallet-card",
      //         image: "/assets/addons/shopro/img/decorate/wallet-card.png",
      //         flag: false,
      //         show: "user",
      //       },
      //     ],
      //   },
      // ],
      advStyleImage: [
        {
          src: "/assets/addons/shopro/img/decorate/adv_01.png",
          num: 1,
        },
        {
          src: "/assets/addons/shopro/img/decorate/adv_02.png",
          num: 2,
        },
        {
          src: "/assets/addons/shopro/img/decorate/adv_03.png",
          num: 3,
        },
        {
          src: "/assets/addons/shopro/img/decorate/adv_04.png",
          num: 3,
        },
        {
          src: "/assets/addons/shopro/img/decorate/adv_05.png",
          num: 3,
        },
        {
          src: "/assets/addons/shopro/img/decorate/adv_06.png",
          num: 3,
        },
        {
          src: "/assets/addons/shopro/img/decorate/adv_07.png",
          num: 5,
        },
      ],
      titleBlock: {
        isSelected: false,
        data: [
          {
            src: "https://file.shopro.top/imgs/title1.png",
            selected: false,
          },
          {
            src: "https://file.shopro.top/imgs/title2.png",
            selected: false,
          },
          {
            src: "https://file.shopro.top/imgs/title3.png",
            selected: false,
          },
          {
            src: "https://file.shopro.top/imgs/title4.png",
            selected: false,
          },
          {
            src: "https://file.shopro.top/imgs/title5.png",
            selected: false,
          },
        ],
        currentImage: "",
      },
      httpsDlocked: true,
      iframeSrc: "",
      qrcodeSrc: "",
      wxacodeSrc: "",
      iframeTitle: "",
      iframeCopyright: [],
      iframePlatform: "",
      previewDialog: false,
      advdrawer: false,
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
      // !未知对象Config
      homeData: [],
      userData: [],
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
                image: "",
                activeImage: "",
                path: "",
                path_name: "",
                path_type: 1,
                selected: false,
              },
              {
                name: "标题",
                image: "",
                activeImage: "",
                path: "",
                path_name: "",
                path_type: 1,
                selected: false,
              },
              {
                name: "标题",
                image: "",
                activeImage: "",
                path: "",
                path_name: "",
                path_type: 1,
                selected: false,
              },
              {
                name: "标题",
                image: "",
                activeImage: "",
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
                image: "",
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
            image: "",
            list: [],
          },
        },
      ],
      customData: [],
      decorate_id: new URLSearchParams(location.search).get("id"),
      popupIndex: null,
      isfloat: false,
      shoproName: "",
      saveLoading: false,
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
    //
  },
  watch: {
    templateData: {
      deep: true,
      handler: function (newVal, oldVal) {
        this.templateForm = newVal.length == 0 ? {} : this.templateForm;
      },
    },
    isPageType(newVal, oldVal) {
      this.popupIndex = null;
      // 如果是第二次切换装修类型
      if (oldVal) {
        this.cachePreData(oldVal);
      }
      this.cacheTemplateDate(newVal);
      if (newVal != "home") {
        this.centerSelect = 0;
      } else {
        if (this.homeData.length > 0) {
          this.centerSelect = 0;
        } else {
          this.centerSelect = null;
        }
      }
      this.showForm(this.centerSelect);
    },
  },
  methods: {
    init() {},
    // 工具表单展示
    showForm(index) {
      let that = this;
      that.centerSelect = index;
      that.templateForm = that.templateData[index];
    },
    // 删除选项卡
    centerDel(idx) {
      let that = this;
      that.templateData.splice(idx, 1);
      that.centerSelect = idx;
      if (that.centerSelect == 0) {
        if (that.templateData.length > 1) {
          that.templateForm = that.templateData[that.centerSelect];
        } else {
          that.centerSelect = null;
        }
      } else {
        that.centerSelect = that.centerSelect - 1;
        that.templateForm = that.templateData[that.centerSelect];
      }
    },
    // 底部导航栏选择
    tabbarSelected(index) {
      this.templateData[0].content.list.forEach((i) => {
        i.selected = false;
      });
      this.$set(this.templateData[0].content.list[index], "selected", true);
      this.$forceUpdate();
    },
    // 缓存上一次装修数据
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
    // templateData 加载当前装修类型的数据
    cacheTemplateDate(type) {
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
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "@/views/dodecorate/style/dodecorate_layout";
@import "@/views/dodecorate/style/dodecorate_origin";
</style>
