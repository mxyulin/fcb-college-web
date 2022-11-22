<template>
  <!-- 表单模块（弹窗） -->
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
      ref="goodsForm"
      :model="form"
      label-width="100px"
      :rules="rules"
    >
      <!-- 表单字段 -->
      <el-form-item label="商品分类" prop="type">
        <el-select v-model="form.type" :placeholder="form.type">
          <el-option
            v-for="item in goodsType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="商品副标题" prop="subtitle">
        <el-input v-model="form.subtitle" placeholder="请输入副标题" />
      </el-form-item>
      <el-form-item label="商品状态" prop="status">
        <el-select v-model.number="form.status" :placeholder="form.status">
          <el-option
            v-for="item in goodsStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品主图" prop="image">
        <el-input v-model="form.image" placeholder="请输入商品主图地址" />
      </el-form-item>
      <el-form-item label="轮播图" prop="images">
        <el-input v-model="form.images" placeholder="请输入轮播图" />
      </el-form-item>
      <el-form-item label="图文详情" prop="content">
        <el-input
          type="textarea"
          v-model="form.content"
          placeholder="请输入图文详情"
        />
      </el-form-item>
      <div class="display-flex">
        <el-form-item label="价格" prop="price">
          <el-input v-model.number="form.price" placeholder="请输入价格" />
        </el-form-item>
        <el-form-item label="原价" prop="originalPrice">
          <el-input
            v-model.number="form.originalPrice"
            placeholder="请输入原价"
          />
        </el-form-item>
      </div>
      <div class="display-flex">
        <el-form-item label="是否多规格" prop="isSku">
          <el-radio-group v-model="form.isSku">
            <el-radio :label="true" border>是</el-radio>
            <el-radio :label="false" border>否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="显示销量" prop="showSales">
          <el-input
            v-model.number="form.showSales"
            placeholder="请输入显示销量"
          />
        </el-form-item>
      </div>
      <el-form-item label="服务标签" prop="serviceIds">
        <el-input v-model="form.serviceIds" placeholder="请输入服务标签" />
      </el-form-item>
      <el-form-item label="发货方式" prop="dispatchType">
        <el-select v-model="form.dispatchType" :placeholder="form.dispatchType">
          <el-option
            v-for="item in dispatchTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发货模板" prop="dispatchIds">
        <el-input
          v-model="form.dispatchIds"
          placeholder="请输入发货模板"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 表单按钮 -->
    <span v-if="!view" slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        icon="el-icon-circle-check"
        :size="option.size"
        @click="handleSubmit('goodsForm')"
        >提 交</el-button
      >
      <el-button
        icon="el-icon-circle-close"
        :size="option.size"
        @click="box = false"
        >取 消</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import option from "@/const/product/product";
import { validatenull } from "@/util/validate";

export default {
  /*
   * 父组件传来的数据
   * 父组件绑定的事件
   */
  name: "Form",
  props: ["title", "box", "form", "view"],
  data() {
    return {
      // 表单配置
      option: option,
      // 表单验证规则
      rules: {
        type: [
          {
            required: true,
            message: "请至少选择一个商品分类",
            trigger: "change",
          },
        ],
        title: [
          { required: true, message: "请输入商品标题", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur",
          },
        ],
        subtitle: [
          { required: true, message: "请输入商品副标题", trigger: "blur" },
          {
            min: 1,
            max: 100,
            message: "长度在 1 到 100 个字符",
            trigger: "blur",
          },
        ],
        status: [
          {
            type: "number",
            required: true,
            message: "请至少选择一个商品状态",
            trigger: "change",
          },
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        originalPrice: [
          { required: true, message: "请输入商品原价", trigger: "blur" },
        ],
        isSku: [
          {
            type: "boolean",
            required: true,
            message: "请至少选择一个选项",
            trigger: "change",
          },
        ],
        showSales: [
          {
            type: "number",
            required: true,
            message: "请输入显示销量",
            trigger: "blur",
          },
        ],
        dispatchType: [
          {
            required: true,
            message: "请至少选择一个发货方式",
            trigger: "change",
          },
        ],
      },
      // 所有商品分类
      goodsType: [
        { label: "实体商品", value: "normal" },
        { label: "虚拟商品", value: "virtual" },
      ],
      // 所有商品状态
      goodsStatus: [
        { label: "上架", value: 1 },
        { label: "下架", value: 2 },
        { label: "隐藏", value: 0 },
      ],
      // 所有发货方式
      dispatchTypes: [
        { label: "物流快递", value: "express" },
        { label: "用户自提", value: "selfetch" },
        { label: "商家配送", value: "store" },
        { label: "自动发货", value: "autosend" },
      ],
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
    beforeClose(done) {
      this.$emit("beforeClose", done);
    },
    handleSubmit(formName) {
      this.$emit("handleSubmit", formName)
    }
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "@/views/product/styles/product";
</style>
