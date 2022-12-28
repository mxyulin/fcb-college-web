<template>
  <!-- 查询模块 -->
  <div :hidden="!search">
    <el-form :inline="true" :size="option.size">
      <el-row :gutter="0" type="flex" justify="start" align="top">
        <!-- 活动类别 -->
        <el-col :span="4">
          <el-form-item label="活动类别">
            <div>
              <el-select
                v-model="query.promotionType"
                placeholder="请选择"
                style="width: 100px"
              >
                <el-option
                  v-for="item in promotions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-col>
        <!-- 价格区间 -->
        <el-col :span="7">
          <el-form-item label="价格区间">
            <el-input
              v-model="query.priceFrist"
              :size="option.size"
              style="width: 110px"
              placeholder="最低价"
            >
              <template slot="append">元</template>
            </el-input>
            <span> - </span>
            <el-input
              v-model="query.priceLast"
              :size="option.size"
              style="width: 110px"
              placeholder="最高价"
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </el-col>
        <!-- 搜索商品 -->
        <el-col :span="5">
          <el-form-item label="商品">
            <el-input
              :size="option.size"
              placeholder="请输入关键词"
              v-model="query.searchKey"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <!-- 按钮组 -->
        <el-col :span="4">
          <el-button
            type="primary"
            :size="option.size"
            @click="searchChange"
            icon="el-icon-search"
            >搜索</el-button
          >
          <el-button
            :size="option.size"
            @click="searchReset"
            icon="el-icon-delete"
            plain
            >清空</el-button
          >
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import option from "@/const/product/product";
import { validatenull } from "@/util/validate";

export default {
  name: "Query",
  props: ["page", "search"],
  data() {
    return {
      // 表单配置
      option: option,
      // 查询信息
      query: {},
      // 活动类别
      promotions: [
        { label: "全部", value: 0 },
        { label: "拼团", value: 1 },
        { label: "秒杀", value: 2 },
        { label: "积分", value: 3 },
      ],
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  methods: {
    init() {},
    // 条件查询
    searchChange() {
      this.$emit("getGoodsData", Object.assign({}, this.query));
    },
    // 重置查询条件
    searchReset() {
      this.query = {};
      this.page.currentPage = 1;
      this.$emit("getGoodsData");
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>
