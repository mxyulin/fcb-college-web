<template>
  <el-drawer
    :modal="false"
    :fullscreen="true"
    :visible.sync="dodecorateVisible"
    :before-close="onDialogBeforeClose"
    @open="onDialogOpen"
  >
    <div v-cloak class="laoding" style="height: calc(100vh - 90px)">
      <el-heade height="40px">
        <el-row :gutter="0" type="flex" justify="space-between" align="center">
          <el-col :span="21">
            <div class="title-msg">{{ decorateTitle }}</div>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" size="small" plain>预 览</el-button>
            <el-button type="primary" size="small" @click="submitDecorateData"
              >保 存</el-button
            >
          </el-col>
        </el-row>
      </el-heade>
      <el-container style="height: calc(100vh - 100px)">
        <!-- 左边栏 toolsBox -->
        <el-aside
          v-if="
            isPageType == 'home' || isPageType == 'user' || fromtype == 'custom'
          "
          width="265px"
        >
          <ToolsBox
            :fromtype="fromtype"
            :isPageType="isPageType"
            @addDecorateComponent="addDecorateComponent"
          />
        </el-aside>
        <!-- 装修模板预览 -->
        <el-main class="center-body" style="text-align: center">
          <!-- 首页（含自定义）和个人中心 -->
          <div
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
              v-if="fromtype == 'shop' && isPageType == 'home'"
              style="position: absolute; z-index: 100"
            >
              <img
                src="https://demo.shopro.top//assets/addons/shopro/img/decorate/tabs-header.png"
              />
            </div>
            <!-- 自定义营销页状态栏 -->
            <div
              v-if="fromtype == 'custom'"
              style="position: relative; z-index: 100"
            >
              <img
                src="https://demo.shopro.top//assets/addons/shopro/img/decorate/tabs-header.png"
              />
              <div v-if="fromtype == 'custom'" class="custom-name">
                自定义页面装修
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
            <!-- App 装修预览 -->
            <AppDecoratePreview
              :fromtype="fromtype"
              :isPageType="isPageType"
              :templateData="templateData"
              :centerSelect.sync="centerSelect"
              @selectDecorateComponent="showDecorateForm"
              @removeDecorateComponent="removeDecorateComponent"
              @onTemplateListSortChange="onTemplateListSortChange"
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
                @click.stop="onTabbarSelected(index)"
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
              v-for="item in templateData"
              :key="item.id"
              class="board-item tabbar-body"
              style="height: 100%"
            >
              <div
                class="tabbar-body-item"
                style="height: 100%; background: #999; overflow: hidden"
              >
                <div style="position: relative; width: 292px; height: 454px">
                  <template v-for="(popup, idx) in item.content.list">
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
                      fit="contain"
                      :key="idx"
                      :src="popup.image"
                      @click="showCurrnetPopup"
                    >
                      <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"></i>
                      </div>
                    </el-image>
                  </template>
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
            <el-radio-group v-model="isPageType" size="small" fill="primary">
              <el-radio-button
                :label="item.type"
                v-for="(item, index) in appPageTypes"
                :key="index"
                >{{ item.name }}</el-radio-button
              >
            </el-radio-group>
          </div>
        </el-main>
        <!-- 右边栏 toolsForm -->
        <el-aside class="right-container" width="350px">
          <ToolsForm
            :fromtype="fromtype"
            :centerSelect="centerSelect"
            :templateForm="templateForm"
            :updateForm="updateForm"
            :templateData.sync="templateData"
            v-bind="$attrs"
          />
        </el-aside>
      </el-container>
    </div>
  </el-drawer>
</template>

<script>
import { Loading } from "element-ui";
import { submit, getList } from "@/api/decorate/decoratecontent";
import ToolsBox from "@/views/decorate/components/toolsbox";
import ToolsForm from "@/views/decorate/components/toolsform";
import AppDecoratePreview from "@/views/decorate/components/appdecoratepreview";

export default {
  data() {
    return {
      isPageType: "home",
      appPageTypes: [
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
      homeData: null,
      userData: null,
      tabbarData: null,
      popupData: null,
      floatButtonData: null,
      // 已选模板
      centerSelect: null,
      // popupIndex: null,
      // 装修模板
      templateData: null,
      // 装修组件表单
      templateForm: null,
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
    ToolsForm,
    AppDecoratePreview,
  },
  props: {
    dodecorateVisible: Boolean,
    dodecorateOptions: Object,
  },
  computed: {
    decorateId() {
      return this.dodecorateOptions.decorateId;
    },
    fromtype() {
      return this.dodecorateOptions.fromType;
    },
    decorateTitle() {
      return this.fromtype == "custom" ? "自定义页面装修" : "店铺装修";
    },
  },
  watch: {
    isPageType(newVal, oldVal) {
      // this.popupIndex = null;
      this.cachePreTemplateDataByPageType(oldVal);
      this.loadTemplateDateByPageType(newVal);
      if (newVal == "home" && this.templateData.length == 0) {
        this.centerSelect = null;
        // this.templateForm = {};
      } else {
        this.centerSelect = 0;
        this.showDecorateForm(0);
      }
    },
  },
  methods: {
    showCurrnetPopup(e) {
      console.log("测试", e.target.style.zIndex);
    },
    onDialogOpen() {
      this.init();
    },
    init() {
      // 启用 loading
      const loadingInstance = Loading.service({
        target: ".laoding",
        fullscreen: true,
        lock: true,
      });
      // 获取当前模板数据
      const { decorateId, fromtype } = this;
      getList(decorateId).then(({ data: { code, msg, data } }) => {
        if (code == 200) {
          const { homeData, userData, tabbarData, popupData, floatButtonData } =
            data;
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
            this.userData = userData
              ? userData
              : {
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
                };
            this.tabbarData = tabbarData
              ? tabbarData
              : {
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
                };
            this.popupData = popupData
              ? popupData
              : {
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
                };
            this.floatButtonData = floatButtonData
              ? floatButtonData
              : {
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
                };
          } else {
            // 自定义装修数据仅放 homeData
            this.homeData = homeData ? homeData : { content: [] };
          }
          this.loadTemplateDateByPageType("home");
          // 关闭 loading
          this.$nextTick(() => {
            loadingInstance.close();
          });
        } else {
          this.$message({
            type: "error",
            message: msg,
          });
        }
      });
    },
    // 展示组件表单
    showDecorateForm(idx) {
      const that = this;
      that.templateForm = that.templateData[idx];
    },
    // 更新组件表单
    updateForm(type, index, data) {
      const that = this;
      switch (type) {
        case "image": {
          const { originalName, link } = data;
          /*
           *由于底部导航的数据结构是两个图片链接字段在一个对象里，
           *所以针对该特殊情况传入的 index 不再是索引而是一个“索引对象”
           *索引对象的结构是 {idx: 0, key: "image"}
           *另外悬浮按钮的图片选择同理
           */
          if (typeof index == "number") {
            if (index > -1) {
              that.templateForm.content.list[index].name = originalName;
              that.templateForm.content.list[index].image = link;
            } else if (index == -1) {
              // 悬浮主按钮、用户中心头部背景图、标题栏背景图
              that.templateForm.content.image = link;
            } else {
              // 其他情况
            }
          }
          // 底部导航图标 + 悬浮按钮
          else {
            const { idx, key } = index;
            that.templateForm.content.list[idx].name = originalName;
            that.templateForm.content.list[idx][key] = link;
          }
          break;
        }
        case "link": {
          const { name, path } = data;
          that.templateForm.content.list[index].path_name = name;
          that.templateForm.content.list[index].path = path;
          break;
        }
        case "goods-list": {
          that.templateForm.content.timeData = data;
          that.templateForm.content.ids = that.getIds(data);
          break;
        }
        case "goods-group": {
          const { ids, categoryName, records } = data;
          that.templateForm.content.id = ids;
          that.templateForm.content.category_name = categoryName;
          that.templateForm.content.timeData = records;
          break;
        }
        case "category-tabs": {
          const { ids, categoryTabs, records } = data;
          that.templateForm.content.ids = ids;
          that.templateForm.content.category_arr = categoryTabs;
          that.templateForm.content.timeData = records;
          break;
        }
        case "coupons": {
          that.templateForm.content.timeData = data;
          that.templateForm.content.ids = that.getIds(data);
          break;
        }
        case "groupon": {
          const { id, title, rules, skuPriceList } = data;
          that.templateForm.content.id = id;
          that.templateForm.content.name = title;
          that.templateForm.content.teamNum = JSON.parse(rules).team_num;
          that.templateForm.content.timeData = skuPriceList;
          break;
        }
        case "seckill": {
          const { id, title, rules, goods } = data;
          that.templateForm.content.id = id;
          that.templateForm.content.seckillName = title;
          that.templateForm.content.timeData = goods;
          break;
        }
        case "rich-text": {
          const { id, title, content } = data;
          that.templateForm.content.id = id;
          that.templateForm.content.name = title;
          that.templateForm.content.content = content;
          break;
        }
      }
    },
    // 暂存装修数据
    cachePreTemplateDataByPageType(type) {
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
    // 加载装修数据
    loadTemplateDateByPageType(type) {
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
    onTabbarSelected(index) {
      this.templateData[0].content.list.forEach((i) => {
        i.selected = false;
      });
      this.templateData[0].content.list[index].selected = true;
    },
    // 添加APP装修组件
    addDecorateComponent(type) {
      const that = this;
      const { length } = that.templateData;
      let isCategoryTabsAtEnd = false;
      /* 业务逻辑：分类选项卡始终置于 APP 装修模板末尾，且不可变动位置 */
      /* 业务逻辑关键点：在于维护好状态 centerSelect  ，它决定了组件添加到哪个位置 */
      if (length != 0) {
        // * 判断分类选项卡是否在末尾
        isCategoryTabsAtEnd =
          that.templateData[length - 1].type == "category-tabs" ? true : false;
      }
      // 添加的是分类选项卡
      if (type == "category-tabs") {
        // 如果末尾有分类选项卡则选中它后立刻 return
        if (isCategoryTabsAtEnd) {
          return (that.centerSelect = length - 1);
        } else {
          that.centerSelect = length;
        }
      }
      // 非分类选项卡
      else {
        // 最开始添加非分类选项卡组件
        if (that.centerSelect == null) {
          // *特殊情况：末尾有分类选项卡组件，就只能在分类选项卡组件前面添加此组件
          that.centerSelect = isCategoryTabsAtEnd ? length - 1 : length;
        }
        // 最开始之后添加非分类选项卡组件
        else {
          // *特殊情况：分类选项卡被选中，就只能在其前面添加此组件而不是它后面
          that.centerSelect =
            isCategoryTabsAtEnd && that.centerSelect == length - 1
              ? length - 1
              : that.centerSelect + 1;
        }
      }
      const form = that.cloneDecorateComponentInitData(type);
      that.templateData.splice(that.centerSelect, 0, form);
      that.showDecorateForm(that.centerSelect);
    },
    // 克隆装修组件初始数据
    cloneDecorateComponentInitData(type) {
      let form = null;
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
              grouponName: "",
              timeData: [],
              teamNum: "",
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
              seckillName: "",
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
    // 装修组件排序控制
    onTemplateListSortChange() {
      const { templateData } = this;
      let length = templateData.length;
      // 禁止分类选项卡上移
      if (templateData[length - 2].type == "category-tabs") {
        const [categoryTabs] = templateData.splice(length - 2, 1);
        this.templateData.push(categoryTabs);
        this.centerSelect = length - 2;
        this.showDecorateForm(this.centerSelect);
      } else if (templateData[1].type == "user") {
        const [userCard] = templateData.splice(1, 1);
        this.templateData.unshift(userCard);
        this.centerSelect = 1;
        this.showDecorateForm(this.centerSelect);
      }
    },
    // 删除装修组件
    removeDecorateComponent(idx) {
      const that = this;
      that.templateData.splice(idx, 1);
      // 动态更新 centerSelect
      if (idx == 0) {
        that.centerSelect = that.templateData[0] ? 0 : null;
      } else {
        that.centerSelect = idx - 1;
      }
      //
      if (that.centerSelect != null) {
        that.showDecorateForm(that.centerSelect);
      }
    },
    submitDecorateData() {
      debugger;
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
        .then(() => {
          this.$message({
            message: "保存成功",
            type: "success",
          });
        })
        .catch(() => {
          this.$message({
            message: "保存失败",
            type: "error",
          });
        });
    },
    onDialogBeforeClose(done) {
      this.isPageType = "home";
      this.centerSelect = null;
      // this.popupIndex = null;
      this.templateForm = null;
      this.$emit("update:dodecorateVisible", false);
      done();
    },
    // 获取 ids
    getIds(arr) {
      return arr
        .map((item) => {
          return item.id;
        })
        .join(",");
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
