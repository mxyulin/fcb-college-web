<template>
  <!-- home user 工具箱模块 -->
  <div>
    <template v-for="(item, idx) in toolsBox">
      <div :key="idx" v-if="toolsShow(item.show)">
        <div class="left-menu-title">
          <span>{{ item.name }}</span>
        </div>
        <!-- 拖放暂不实现) -->
        <div class="left-menu-container">
          <template v-for="(ite, idx) in item.data">
            <div
              :key="idx"
              v-if="toolsShow(ite.show)"
              class="left-menu-container-item"
              :class="ite.type"
              @click.stop="selectTools(ite.type)"
            >
              <el-link
                type="primary"
                :underline="false"
                :icon="ite.icon"
              ></el-link>
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
import draggable from "vuedraggable";
import option from "@/const/decorate/dodecorate";

export default {
  name: "ToolsBox",
  components: {
    draggable,
  },
  props: {
    fromtype: String,
    isPageType: String,
  },
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
              icon: "icon-carousel",
              flag: false,
              show: "common",
            },
            {
              name: "菜单组",
              type: "menu",
              icon: "icon-caidan1",
              flag: false,
              show: "common",
            },
            {
              name: "广告魔方",
              type: "adv",
              icon: "icon-guanggao",
              flag: false,
              show: "common",
            },
            {
              name: "标题栏",
              type: "title-block",
              icon: "icon-biaoti",
              flag: false,
              show: "home",
            },
            {
              name: "宫格导航",
              type: "grid-list",
              icon: "icon-jiugongge",
              flag: false,
              show: "user",
            },
            {
              name: "列表导航",
              type: "nav-list",
              icon: "icon-ziyuan",
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
              icon: "icon-shangpin",
              flag: false,
              show: "home",
            },
            {
              name: "分类选项卡",
              type: "category-tabs",
              icon: "icon-xuanxiangqia",
              flag: false,
              show: "home",
            },
            {
              name: "自定义商品",
              type: "goods-list",
              icon: "icon-zidingyishuju",
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
              icon: "icon-wodeyouhuiquan",
              flag: false,
              show: "home",
            },
            {
              name: "拼团",
              type: "groupon",
              icon: "icon-gengduopintuan",
              show: "home",
            },
            {
              name: "秒杀",
              type: "seckill",
              icon: "icon-miaosha1",
              flag: false,
              show: "home",
            },
            {
              name: "小程序直播",
              type: "live",
              icon: "icon-xianchangzhibo",
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
              icon: "icon-sousuo",
              flag: false,
              show: "home",
            },
            {
              name: "富文本",
              type: "rich-text",
              icon: "icon-fuwenbenkuang",
              flag: false,
              show: "common",
            },
            {
              name: "订单卡片",
              type: "order-card",
              icon: "icon-dingdan",
              flag: false,
              show: "user",
            },
            {
              name: "资产卡片",
              type: "wallet-card",
              icon: "icon-zichanguanli-",
              flag: false,
              show: "user",
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  methods: {
    // *渲染工具的逻辑判断
    toolsShow(toolsBelong) {
      return (
        this.fromtype == "custom" ||
        toolsBelong == "common" ||
        toolsBelong == this.isPageType
      );
    },
    selectTools(type) {
      this.$emit("selectTools", type);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/views/decorate/style/dodecorate_origin";
</style>
