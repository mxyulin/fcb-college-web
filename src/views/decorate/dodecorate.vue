<template>
  <el-dialog
    :modal="false"
    :fullscreen="true"
    :visible.sync="dialogVisible"
    :before-close="dialogBeforeClose"
  >
    <div v-cloak class="laoding" style="height: calc(100vh - 90px)">
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
      <el-container style="height: calc(100vh - 100px)">
        <!-- 左边栏 -->
        <el-aside
          v-if="
            isPageType == 'home' || isPageType == 'user' || fromtype == 'custom'
          "
          class="decorate-left"
          width="265px"
          style="text-align: center"
        >
          <ToolsBox
            :fromtype="fromtype"
            :isPageType="isPageType"
            @showForm="showForm"
            @selectTools="selectTools"
          />
        </el-aside>
        <!-- App 装修区 -->
        <el-main class="center-body" style="text-align: center">
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
              @reSortList="reSortList"
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
              style="
                display: flex;
                flex-direction: column;
                align-items: flex-end;
              "
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
              <div>
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
          <div class="decorate-body-buttom" v-if="fromtype == 'shop'">
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
            :popupIndex.sync="popupIndex"
            :templateData.sync="templateData"
            :updateForm="updateForm"
            @showForm="showForm"
            v-bind="$attrs"
          />
        </el-aside>
      </el-container>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { Loading } from "element-ui";
import option from "@/const/decorate/dodecorate";
import { submit, getList } from "@/api/decorate/decoratecontent";
import AppLayout from "@/views/decorate/components/applayout";
import ToolsBox from "@/views/decorate/components/toolsbox";
import ToolsForm from "@/views/decorate/components/toolsform";

export default {
  data() {
    return {
      test: 0,
      // 全局组件配置
      option: option,
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
      // 表单类型（shop & page）
      // fromtype: "shop",

      // 模板数据（默认带首页轮播图)
      templateData: [],
      // 表单数据
      templateForm: {},
      // 模板定制名
      customName: "",
      // 自定义模板数据
      customData: [],

      /* 装修数据 */
      homeData: {
        content: [
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
      },
      userData: {
        content: [
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
      },
      tabbarData: {
        content: [
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
      },
      popupData: {
        content: [
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
      },
      floatButtonData: {
        content: [
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
      },

      // 选中的模板
      centerSelect: null,
      // 选中的弹窗提醒
      popupIndex: null,

      /* 模板预览（未用） */
      // httpsDlocked: true,
      // // 小程序预览来源
      // iframeSrc: "",
      // // 二维码来源
      // qrcodeSrc: "",
      // // 微信码来源
      // wxacodeSrc: "",
      // // 模板预览标题
      // iframeTitle: "",
      // // 模板预览版权
      // iframeCopyright: [],
      // // 模板预览平台
      // iframePlatform: "",
      // // 模板预览开关
      // previewDialog: false,
    };
  },
  components: {
    ToolsBox,
    AppLayout,
    ToolsForm,
  },
  props: {
    dialogOpt: {
      type: Object,
      required: true,
      default: () => {
        return {
          dialogVisible: false,
          decorateId: null,
          formType: "",
        };
      },
    },
  },
  computed: {
    ...mapGetters(["permission"]),
    decorateId() {
      return this.dialogOpt.decorateId;
    },
    fromtype() {
      return this.dialogOpt.formType;
    },
    dialogVisible() {
      return this.dialogOpt.dialogVisible;
    },
  },
  watch: {
    templateData: {
      deep: true,
      handler(newVal, oldVal) {
        this.templateForm = newVal.length == 0 ? {} : this.templateForm;
      },
    },
    isPageType(newVal, oldVal) {
      // 重置弹窗索引
      this.popupIndex = null;
      // 如果切换装修类型
      if (oldVal) {
        this.cachePreData(oldVal);
      }
      this.loadTemplateDate(newVal);
      if (newVal != "home") {
        // 选择第一个组件
        this.centerSelect = 0;
      } else {
        if (this.homeData.content.length > 0) {
          // 选择第一个组件
          this.centerSelect = 0;
        } else {
          // 没有组件初始化 centerSelect
          this.centerSelect = null;
        }
      }
      this.showForm(this.centerSelect);
    },
    decorateId: {
      handler() {
        this.init();
      },
    },
    dialogVisible(newVal) {
      if (newVal) {
        this.init();
      }
    }
  },
  methods: {
    // 装修数据初始化
    init() {
      // 启用 loading
      let loadingInstance = Loading.service({
        target: ".laoding",
        fullscreen: false,
        lock: true,
      });
      // 获取当前模板数据
      const { decorateId, fromtype } = this;
      getList(decorateId).then((res) => {
        const { homeData, userData, tabbarData, popupData, floatButtonData } =
          res.data.data;
        // 默认渲染首页装修数据
        if (fromtype == "shop") {
          this.homeData = homeData
            ? homeData
            : {
                content: [
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
              };
          this.userData = userData ? userData : this.userData;
          this.tabbarData = tabbarData ? tabbarData : this.tabbarData;
          this.popupData = popupData ? popupData : this.popupData;
          this.floatButtonData = floatButtonData
            ? floatButtonData
            : this.floatButtonData;
        } else {
          // 自定义装修数据仅放 homeData
          this.homeData = homeData ? homeData : { content: [] };
        }
        this.loadTemplateDate("home");
        // 关闭 loading
        this.$nextTick(() => {
          loadingInstance.close();
        });
      });
    },
    // 渲染表单数据
    showForm(index) {
      const that = this;
      that.centerSelect = index;
      that.templateForm = that.templateData[index];
    },
    // 更新表单数据
    updateForm(type, index, data) {
      const that = this;
      const { name, link, path, pathName } = data;
      switch (type) {
        case "picture":
          if (index != -1) {
            that.templateForm.content.list[index].name = name;
            that.templateForm.content.list[index].image = link;
          } else {
            // 悬浮主按钮处理
            that.templateForm.content.image = link;
          }
          break;
        case "link":
          that.templateForm.content.list[index].path = path;
          that.templateForm.content.list[index].path_name = pathName;
          break;
      }
    },
    // 缓存之前的装修数据
    cachePreData(type) {
      switch (type) {
        case "home":
          this.homeData.content = this.templateData;
          break;
        case "user":
          this.userData.content = this.templateData;
          break;
        case "tabbar":
          this.tabbarData.content = this.templateData;
          break;
        case "popup":
          this.popupData.content = this.templateData;
          break;
        case "float-button":
          this.floatButtonData.content = this.templateData;
          break;
      }
    },
    // 加载当前装修数据
    loadTemplateDate(type) {
      switch (type) {
        case "home":
          this.templateData = this.homeData.content;
          break;
        case "user":
          this.templateData = this.userData.content;
          break;
        case "tabbar":
          this.templateData = this.tabbarData.content;
          break;
        case "popup":
          this.templateData = this.popupData.content;
          break;
        case "float-button":
          this.templateData = this.floatButtonData.content;
          break;
      }
    },
    // 变更底部导航选择状态
    tabbarSelected(index) {
      this.templateData[0].content.list.forEach((i) => {
        i.selected = false;
      });
      this.templateData[0].content.list[index].selected = true;
    },
    // 添加APP装修组件
    selectTools(type) {
      let length = this.templateData.length,
        form = this.cloneComponent(type),
        categoryTabsAtEnd = false;
      if (length != 0) {
        // * 判断一下分类选项卡是否在末尾
        categoryTabsAtEnd =
          this.templateData[length - 1].type == "category-tabs" ? true : false;
      }
      /* 业务逻辑：分类选项卡始终置于APP装修模板末尾，且不可变动位置 */
      // 第一次添加APP组件
      if (this.centerSelect == null) {
        this.centerSelect = length;
        // 特殊情况：第一次添加非分类选项卡组件且末尾有分类选项卡组件，就只能在其前面添加此组件
        if (type != "category-tabs" && categoryTabsAtEnd) {
          this.centerSelect = length - 1;
        }
      } else {
        // 继续添加APP组件
        this.centerSelect += 1;
        // 特殊情况：分类选项卡选中且添加的是非分类选项卡，就只能在其前面添加此组件
        if (
          type != "category-tabs" &&
          this.centerSelect == length &&
          categoryTabsAtEnd
        ) {
          this.centerSelect -= 1;
        }
      }
      /*
       *如果添加的是分类选项卡就都走这儿的逻辑覆盖前面的 centerSelect
       */
      if (type == "category-tabs") {
        // 如果末尾有分类选项卡则选中它后立刻 return
        if (categoryTabsAtEnd) {
          this.centerSelect = length - 1;
          return;
        }
        this.centerSelect = length;
      }
      this.templateData.splice(this.centerSelect, 0, form);
      this.showForm(this.centerSelect);
    },
    // 克隆装修组件初始数据
    cloneComponent(type) {
      let form = {};
      switch (type) {
        case "search":
          form = {
            name: "搜索",
            type: "search",
            content: "搜索文本",
          };
          break;
        case "banner":
          form = {
            name: "轮播图",
            type: "banner",
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
          };
          break;
        case "menu":
          form = {
            name: "菜单组",
            type: "menu",
            content: {
              name: "",
              style: 4,
              list: [
                {
                  name: "标题",
                  image:
                    "https://demo.shopro.top/assets/addons/shopro/img/decorate/image-default3.png",
                  path: "",
                  path_name: "",
                  path_type: 1,
                },
                {
                  name: "标题",
                  image:
                    "https://demo.shopro.top/assets/addons/shopro/img/decorate/image-default3.png",
                  path: "",
                  path_name: "",
                  path_type: 1,
                },
                {
                  name: "标题",
                  image:
                    "https://demo.shopro.top/assets/addons/shopro/img/decorate/image-default3.png",
                  path: "",
                  path_name: "",
                  path_type: 1,
                },
                {
                  name: "标题",
                  image:
                    "https://demo.shopro.top/assets/addons/shopro/img/decorate/image-default3.png",
                  path: "",
                  path_name: "",
                  path_type: 1,
                },
              ],
            },
          };
          break;
        case "live":
          form = {
            name: "小程序直播",
            type: "live",
            content: {
              style: 1,
              ids: "",
              name: "",
              timeData: [],
            },
          };
          break;
        case "adv":
          form = {
            name: "广告魔方",
            type: "adv",
            content: {
              list: [
                {
                  name: "",
                  image: "",
                  path: "",
                  path_name: "",
                  path_type: 1,
                },
              ],
              name: "",
              style: 1,
            },
          };
          break;
        case "goods-group":
          form = {
            name: "商品分类",
            type: "goods-group",
            content: {
              id: "",
              name: "",
              style: 1,
              category_name: "",
              image: "",
              timeData: [],
            },
          };
          break;
        case "goods-list":
          form = {
            name: "自定义商品",
            type: "goods-list",
            content: {
              ids: "",
              image: "",
              name: "",
              style: 1,
              timeData: [],
            },
          };
          break;
        case "coupons":
          form = {
            name: "优惠券",
            type: "coupons",
            content: {
              ids: "",
              name: "",
              style: 1,
              bgcolor1: "#EFC480",
              bgcolor2: "#EFC480",
              pricecolor: "#4F3A1E",
              color: "#A8700D",
              timeData: [],
            },
          };
          break;
        case "groupon":
          form = {
            name: "拼团",
            type: "groupon",
            content: {
              id: "",
              name: "",
              style: 1,
              groupon_name: "",
              timeData: [],
              team_num: "",
            },
          };
          break;
        case "seckill":
          form = {
            name: "秒杀",
            type: "seckill",
            content: {
              id: "",
              name: "",
              style: 1,
              seckill_name: "",
              timeData: [],
            },
          };
          break;
        case "nav-list":
          form = {
            name: "列表导航",
            type: "nav-list",
            content: {
              name: "",
              list: [
                {
                  name: "标题",
                  image:
                    "https://demo.shopro.top/assets/addons/shopro/img/decorate/image-default3.png",
                  path: "",
                  path_name: "",
                  path_type: 1,
                },
              ],
            },
          };
          break;
        case "grid-list":
          form = {
            name: "宫格列表",
            type: "grid-list",
            content: {
              name: "",
              list: [
                {
                  name: "标题",
                  image: "",
                  path: "",
                  path_name: "",
                  path_type: 1,
                },
                {
                  name: "标题",
                  image: "",
                  path: "",
                  path_name: "",
                  path_type: 1,
                },
                {
                  name: "标题",
                  image: "",
                  path: "",
                  path_name: "",
                  path_type: 1,
                },
                {
                  name: "标题",
                  image: "",
                  path: "",
                  path_name: "",
                  path_type: 1,
                },
              ],
            },
          };
          break;
        case "rich-text":
          form = {
            name: "富文本",
            type: "rich-text",
            content: {
              id: "",
              name: "",
              content: "",
            },
          };
          break;
        case "title-block":
          form = {
            name: "标题栏",
            type: "title-block",
            content: {
              name: "",
              color: "#000000",
              image: "",
            },
          };
          break;
        case "order-card":
          form = {
            name: "订单卡片",
            type: "order-card",
            content: {},
          };
          break;
        case "wallet-card":
          form = {
            name: "资产卡片",
            type: "wallet-card",
            content: {},
          };
          break;
        case "category-tabs":
          form = {
            name: "分类选项卡",
            type: "category-tabs",
            content: {
              ids: "",
              category_arr: [],
              style: 1,
              timeData: [],
            },
          };
          break;
      }
      return form;
    },
    // 禁止分类选项卡上移
    reSortList() {
      let length = this.templateData.length;
      if (this.templateData[length - 2].type == "category-tabs") {
        const [categoryTabs] = this.templateData.splice(length - 2, 1);
        this.templateData.push(categoryTabs);
        this.centerSelect = length - 2;
        this.showForm(this.centerSelect);
      }
    },
    // 删除装修组件
    centerDel(idx) {
      const that = this;
      that.templateData.splice(idx, 1);
      that.centerSelect = idx;
      if (that.centerSelect == 0) {
        if (that.templateData.length > 1) {
          that.templateForm = that.templateData[that.centerSelect - 1];
        } else {
          that.centerSelect = null;
        }
      } else {
        that.showForm(that.centerSelect - 1);
      }
    },
    // 保存装修数据
    saveDecorateData() {
      const {
        homeData,
        userData,
        tabbarData,
        popupData,
        floatButtonData,
        decorateId,
        fromtype,
      } = this;
      let decorateData = {};
      if (fromtype == "shop") {
        decorateData = {
          homeData,
          userData,
          tabbarData,
          popupData,
          floatButtonData,
          decorateId,
        };
      } else {
        decorateData = {
          homeData,
          decorateId,
        };
      }
      submit(decorateData)
        .then((res) => {
          this.$message({
            message: "保存成功",
            type: "success",
          });
        })
        .catch((err) => {
          this.$message({
            message: "保存失败",
            type: "error",
          });
        });
    },
    // 关闭装修 Dialog
    dialogBeforeClose(done) {
      this.dialogOpt.dialogVisible = false;
      done();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/views/decorate/style/dodecorate_origin";
</style>

<style lang="scss">
* {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}
</style>
