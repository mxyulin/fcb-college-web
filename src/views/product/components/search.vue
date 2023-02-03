<template>
   <el-drawer
    size="30%"
    top="5vh"
    class="body" 
    append-to-body
    title="搜索商品"
    :visible.sync="dialogSearchVisible"
    :before-close="onBeforeClose"
  >

 <!-- 查询模块 -->
  <div style="padding:10px 20px;">
    <el-form ref="form" :size="option.size"  :model="queryForm" label-width="80px">
      <el-form-item label="商品名称" >
        <el-input
              :size="option.size"
              placeholder="请输入关键词"
              v-model="queryForm.searchKey"
            >
            </el-input>
      </el-form-item>
      <el-form-item label="活动类别">
        <el-select
                v-model="queryForm.promotionType"
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
      </el-form-item>
       
      <el-form-item label="价格区间">
        <el-input
          v-model="queryForm.priceFrist"
          :size="option.size"
          style="width: 110px"
          placeholder="最低价"
        >
          <template slot="append">元</template>
        </el-input>
        <span> - </span>
        <el-input
          v-model="queryForm.priceLast"
          :size="option.size"
          style="width: 110px"
          placeholder="最高价"
        >
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      
      
      
      <el-form-item  style="text-align:right">
        <el-button
            :size="option.size"
            @click="searchReset"
            icon="el-icon-delete"
            plain
            >清空</el-button
          >

        <el-button
            type="primary"
            :size="option.size"
            @click="searchChange"
            icon="el-icon-search"
            >搜索</el-button
          >
          
      </el-form-item>
  
    </el-form>
  </div>
</el-drawer>
</template>

<script>
import { mapGetters } from "vuex";
import option from "@/const/product/product"; 

export default {
  name: "SearchPanel", 
  props: {
    page:Object,
    title: String,
    dialogSearchVisible: Boolean,
    currentRow: Object,
  },
  data() {
    return {
      // 表单配置
      option: option,
      // 查询信息
      queryForm: {},
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
    onBeforeClose(done) {
      this.resetForm();
      this.$emit("update:dialogSearchVisible", false);
      done();
    },
    resetForm() {
      this.$refs.form.clearValidate();
    },
    // 条件查询
    searchChange() {  
      this.$emit("loadProductList", Object.assign({}, this.queryForm));
      this.$emit("update:dialogSearchVisible", false);
    },
    // 重置查询条件
    searchReset() {
      this.queryForm = {};
      this.page.currentPage = 1; 
      this.$emit("loadProductList");
      this.$emit("update:dialogSearchVisible", false);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>
