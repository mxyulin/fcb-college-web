<template>
  <!-- 查询模块 -->
  <div :hidden="!search">
    <el-form :inline="true" :size="option.size">
      <el-row :gutter="0" type="flex" justify="start" align="center">
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
        <el-col :span="6">
          <el-form-item label="搜索商品">
            <el-input
              :size="option.size"
              placeholder="请输入关键词"
              v-model="query.searchKey"
              @blur="getGoodsData"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <!-- 按钮组 -->
        <el-col :span="4">
          <el-button
            type="primary" 
            :size="option.size"
            @click="getGoodsData"
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
import { getList } from "@/api/product/product";
import option from "@/const/product/product";
import { mapGetters } from "vuex";
import { validatenull } from "@/util/validate";

export default {
  /* 
   * 父组件传来的数据 page
   * 其他子组件传来的数据 activeStatus
  */
  name: "Query",
  props: ["page", ],
  data() {
    return {
      // 是否展示查询模块
      search: true,
      // 加载中
      loading: true,
      // 表单配置
      option: option,
      // 
      page: page,
      // 查询信息
      query: {},
      // 活动类别
      promotions: [
        { label: "全部", value: 0 },
        { label: "拼团", value: 1 },
        { label: "秒杀", value: 2 },
        { label: "积分", value: 3 },
      ],
      // 表单列表
      data: [],
      // 父节点列表
      treeData: [],
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
    searchChange() {
      this.onLoad(this.page);
    },
    searchReset() {
      this.query = {};
      this.page.currentPage = 1;
      this.onLoad(this.page);
    },
    // 获取商品数据
    getGoodsData(params = {}) {
      let that = this;
      let { activeStatus, page: { currentPage, pageSize }, goodsData, query } = that;
      that.loading = true;
      getList(
        currentPage,
        pageSize,
        Object.assign(params, query)
      ).then((res) => {
        let data = res.data.data;
        that.page.total = data.total;
        // 全部
        if (activeStatus == 3) {
          that.goodsData = data.records;
        } else {
          // 非上架、下架、隐藏
          that.goodsData = data.records.filter((good) => {
            return good.status == activeStatus;
          });
        }
        that.loading = false;
        that.selectionClear();
      });
    },
  },
  mounted() {
  },
};
</script>

<style lang="scss" scoped>
</style>
