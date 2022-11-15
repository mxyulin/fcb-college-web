<template>
  <!-- home user 工具箱模块 -->
  <div>
    <template v-for="(item, idx) in toolsBox">
      <div :key="idx" v-if="checkToolsShow(item.show)">
        <div class="left-menu-title">
          <span>{{ item.name }}</span>
        </div>
        <!-- 拖放模块组件(封装拖放组件暂不实现) -->
        <div class="left-menu-container">
          <template v-for="(ite, idx) in item.data">
            <div
              :key="idx"
              v-if="checkToolsShow(ite.show)"
              class="left-menu-container-item"
              :class="ite.type"
              @click.stop="selectTools(ite.type)"
            >
              <img :src="ite.image" />
              <div class="menu-item-tip">{{ ite.name }}</div>
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import option from "@/const/decorate/dodecorate";

export default {
  /*
   * 父组件传来的数据 fromtype templateData centerSelect isPageType
   * 父组件绑定的事件 showForm
   */
  name: "ToolsBox",
  props: ["fromtype", "templateData", "centerSelect", "isPageType"],
  data() {
    return {
      // 页面配置
      option: option,
      // 工具箱数据
      toolsBox: [
        {
          name: "图文",
          show: "common",
          data: [
            {
              name: "轮播图",
              type: "banner",
              image:
                "https://demo.shopro.top/assets/addons/shopro/img/decorate/banner.png",
              flag: false,
              show: "common",
            },
            {
              name: "菜单组",
              type: "menu",
              image:
                "https://demo.shopro.top/assets/addons/shopro/img/decorate/menu.png",
              flag: false,
              show: "common",
            },
            {
              name: "广告魔方",
              type: "adv",
              image:
                "https://demo.shopro.top/assets/addons/shopro/img/decorate/adv.png",
              flag: false,
              show: "common",
            },
            {
              name: "标题栏",
              type: "title-block",
              image:
                "https://demo.shopro.top/assets/addons/shopro/img/decorate/title-block.png",
              flag: false,
              show: "home",
            },
            {
              name: "宫格导航",
              type: "grid-list",
              image:
                "https://demo.shopro.top/assets/addons/shopro/img/decorate/grid-list.png",
              flag: false,
              show: "user",
            },
            {
              name: "列表导航",
              type: "nav-list",
              image:
                "https://demo.shopro.top/assets/addons/shopro/img/decorate/nav-list.png",
              flag: false,
              show: "user",
            },
          ],
        },
        {
          name: "商品组",
          show: "common",
          data: [
            {
              name: "商品分类",
              type: "goods-group",
              image:
                "https://demo.shopro.top/assets/addons/shopro/img/decorate/goods-group.png",
              flag: false,
              show: "home",
            },
            {
              name: "分类选项卡",
              type: "category-tabs",
              image:
                "https://demo.shopro.top/assets/addons/shopro/img/decorate/category_tabs.png",
              flag: false,
              show: "home",
            },
            {
              name: "自定义商品",
              type: "goods-list",
              image:
                "https://demo.shopro.top/assets/addons/shopro/img/decorate/goods-list.png",
              flag: false,
              show: "common",
            },
          ],
        },
        {
          name: "活动营销",
          show: "home",
          data: [
            {
              name: "优惠券",
              type: "coupons",
              image:
                "https://demo.shopro.top/assets/addons/shopro/img/decorate/coupon.png",
              flag: false,
              show: "home",
            },
            {
              name: "拼团",
              type: "groupon",
              image:
                "https://demo.shopro.top/assets/addons/shopro/img/decorate/groupon.png",
              show: "home",
            },
            {
              name: "秒杀",
              type: "seckill",
              image:
                "https://demo.shopro.top/assets/addons/shopro/img/decorate/secKill.png",
              flag: false,
              show: "home",
            },
            {
              name: "小程序直播",
              type: "live",
              image:
                "https://demo.shopro.top/assets/addons/shopro/img/decorate/live.png",
              flag: false,
              show: "home",
            },
          ],
        },
        {
          name: "其他",
          show: "common",
          data: [
            {
              name: "搜索框",
              type: "search",
              image:
                "https://demo.shopro.top/assets/addons/shopro/img/decorate/search.png",
              flag: false,
              show: "home",
            },
            {
              name: "富文本",
              type: "rich-text",
              image:
                "https://demo.shopro.top/assets/addons/shopro/img/decorate/rich-text.png",
              flag: false,
              show: "common",
            },
            {
              name: "订单卡片",
              type: "order-card",
              image:
                "https://demo.shopro.top/assets/addons/shopro/img/decorate/order-card.png",
              flag: false,
              show: "user",
            },
            {
              name: "资产卡片",
              type: "wallet-card",
              image:
                "https://demo.shopro.top/assets/addons/shopro/img/decorate/wallet-card.png",
              flag: false,
              show: "user",
            },
          ],
        },
      ],
      // 工具表单类型
      fromtype: this.fromtype,
      // 装修类型
      isPageType: this.isPageType,
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
  methods: {
    init() {},
    // 动态展示工具箱
    checkToolsShow(showStatus) {
      return (
        this.fromtype == "custom" ||
        showStatus == "common" ||
        showStatus == this.isPageType
      );
    },
    // ?选择工具模块
    selectTools(type) {
      let form = this.cloneComponent(type);
      let flag = false;
      // *templateData 的数据来自后面数组拼接
      this.templateData.forEach((i) => {
        if (i.type == "category-tabs") {
          flag = true;
        }
      });
      /* 非分类选项卡 */
      if (this.centerSelect == null) {
        // 简单props数据可写
        this.centerSelect = this.templateData.length;
        if (type != "category-tabs" && this.templateData.length > 1) {
          this.centerSelect = this.templateData.length;
        }
      } else {
        this.centerSelect += 1;
        if (
          type != "category-tabs" &&
          this.centerSelect == this.templateData.length
        ) {
          if (flag) {
            this.centerSelect -= 1;
          }
        }
      }
      // 选择分类选项卡时
      if (type == "category-tabs") {
        if (!flag) {
          this.centerSelect = this.templateData.length;
          // 新增一条模板数据
          this.templateData.splice(this.centerSelect, 0, form);
          this.$emit("showForm", this.centerSelect);
        }
      } else {
        this.templateData.splice(this.centerSelect, 0, form);
        this.$emit("showForm", this.centerSelect);
      }
    },
    // 克隆组件初始数据
    cloneComponent(type) {
      let form = {};
      switch (type) {
        case "search":
          form = {
            name: "搜索",
            content: "",
            type: "search",
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
                    "/assets/addons/shopro/img/decorate/image-default3.png",
                  path: "",
                  path_name: "",
                  path_type: 1,
                },
                {
                  name: "标题",
                  image:
                    "/assets/addons/shopro/img/decorate/image-default3.png",
                  path: "",
                  path_name: "",
                  path_type: 1,
                },
                {
                  name: "标题",
                  image:
                    "/assets/addons/shopro/img/decorate/image-default3.png",
                  path: "",
                  path_name: "",
                  path_type: 1,
                },
                {
                  name: "标题",
                  image:
                    "/assets/addons/shopro/img/decorate/image-default3.png",
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
                    "/assets/addons/shopro/img/decorate/image-default3.png",
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
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "@/views/dodecorate/style/dodecorate_origin";
</style>
