<template>
  <!-- 表单模块（弹窗） -->
  <el-dialog
    width="55%"
    top="5vh"
    class="body"
    append-to-body
    :title="title"
    :visible.sync="dialogFormVisible"
    :before-close="onBeforeClose"
  >
    <div class="preview-body">
      <el-steps class="steps-display" :active="stepActive" simple>
        <el-step title="1、基础信息"></el-step>
        <el-step title="2、规格/价格"></el-step>
        <el-step title="3、商品详情"></el-step>
      </el-steps>
      <div class="good-detail-body">
        <el-form
          label-width="auto"
          label-position="right"
          class="demo-goodsDetail"
          ref="form"
          :model="form"
          :rules="rules"
          :size="option.size"
        >
          <!-- 基础信息 -->
          <div v-if="stepActive == 0">
            <el-form-item label="商品形式：" prop="type">
              <el-radio-group v-model="form.type" :size="option.size">
                <el-radio border label="normal">实体商品</el-radio>
                <el-radio border label="virtual">虚拟商品</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="商品标题：" prop="title">
              <el-input v-model="form.title" :size="option.size"></el-input>
            </el-form-item>
            <el-form-item label="副标题：" prop="subtitle">
              <el-input v-model="form.subtitle" :size="option.size"></el-input>
            </el-form-item>
            <el-form-item label="商品状态：" prop="status">
              <el-radio-group v-model="form.status" :size="option.size">
                <el-radio :label="1">上架</el-radio>
                <el-radio :label="0">隐藏</el-radio>
                <el-radio :label="2">下架</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="商品主图：" prop="image">
              <div class="display-flex">
                <div
                  v-if="!form.image"
                  key="image-button"
                  class="add-img display-flex"
                  @click="addImage('image')"
                >
                  <i class="el-icon-plus"></i>
                </div>
                <div v-else key="image-result" class="goods-images">
                  <el-image
                    style="width= 100%; height: 100%;"
                    :src="form.image"
                    :fit="fit"
                    :preview-src-list="[form.image]"
                  ></el-image>
                  <i
                    class="el-icon-error top-right-error"
                    @click="removeImage('image')"
                  ></i>
                </div>
                <span class="msg-tip">
                  作用于商城列表、分享头图；建议尺寸：750*750像素
                </span>
              </div>
            </el-form-item>
            <el-form-item label="轮播图：" prop="images">
              <div class="display-flex" style="flex-wrap: wrap">
                <div class="display-flex" style="flex-wrap: wrap">
                  <div class="display-flex">
                    <div
                      v-for="(image, index) of form.images"
                      :key="index"
                      class="goods-images"
                    >
                      <el-image
                        style="width= 100%; height: 100%;"
                        :src="'link' in image ? image.link : undefined"
                        :fit="fit"
                        :preview-src-list="[image.link]"
                      ></el-image>
                      <i
                        class="el-icon-error top-right-error"
                        @click="removeImage('images', index)"
                      ></i>
                    </div>
                  </div>
                </div>
                <div
                  v-if="imagesLength < 5"
                  class="add-img display-flex"
                  @click="addImage('images')"
                >
                  <i class="el-icon-plus"></i>
                </div>
                <span class="msg-tip" style="margin-left: 0">
                  作用于商品详情顶部轮播，轮播图可以拖拽图片调整顺序
                </span>
              </div>
            </el-form-item>
            <el-form-item label="商品分类：" prop="categoryIds">
              <el-cascader
                filterable
                clearable
                v-model="form.categoryIds"
                placeholder="点击选择商品分类"
                :props="{
                  multiple: true,
                  emitPath: false,
                  checkStrictly: true,
                  label: 'name',
                  children: 'children',
                  value: 'id',
                }"
                :size="option.size"
                :options="goodsCategory"
                @visible-change="getCategory"
              >
              </el-cascader>
            </el-form-item>
            <el-form-item label="虚增销量：" prop="showSales">
              <el-input
                type="number"
                v-model="form.showSales"
                :size="option.size"
              ></el-input>
            </el-form-item>
            <el-form-item label="浏览人数：" prop="views">
              <el-input
                type="number"
                v-model="form.views"
                :size="option.size"
              ></el-input>
            </el-form-item>
            <el-form-item label="收藏人数：" prop="likes">
              <el-input type="number" v-model="form.likes" :size="option.size">
              </el-input>
            </el-form-item>
            <el-form-item label="配送方式：" prop="dispatchType">
              <el-radio-group v-model="form.dispatchType">
                <el-radio
                  :label="item.value"
                  v-for="(item, indexs) in dispatchType"
                  :key="indexs"
                  >{{ item.name }}</el-radio
                >
              </el-radio-group>
              <!-- 
                    <el-popover placement="bottom" width="220" trigger="hover">
                      <div class="popover-container">
                        <p>
                          1.选择上门自提配送方式，商品
                          <br />
                          购买之后会产生一个核销码。
                        </p>
                        <p>2.实体商品一个订单只可核销一次</p>
                      </div>
                      <i
                        class="question-tip el-icon-question"
                        slot="reference"
                      ></i>
                    </el-popover> -->
            </el-form-item>
          </div>
          <!-- 规格和价格 -->
          <div v-if="stepActive == 1">
            <el-form-item label="商品规格：" prop="isSku">
              <el-radio-group v-model="form.isSku" :size="option.size">
                <el-radio :label="false">单规格</el-radio>
                <el-radio :label="true">多规格</el-radio>
              </el-radio-group>
              <sapn class="msg-tip" style="margin-left: 8px">
                如果商品参与了拼团,秒杀,积分商城等活动,编辑规格可能导致活动规格不可用
              </sapn>
            </el-form-item>
            <el-form-item label="售卖价格：" prop="price">
              <el-input
                v-enter-number
                type="number"
                v-model="form.price"
                style="width: 300px"
                :size="option.size"
              >
                <template slot="append">元</template>
              </el-input>
              <span class="msg-tip">商品没有优惠的情况下售卖的价格</span>
            </el-form-item>
            <el-form-item label="划线价格：" prop="originalPrice">
              <el-input
                v-enter-number
                type="number"
                v-model="form.originalPrice"
                style="width: 300px"
                :size="option.size"
              >
                <template slot="append">元</template>
              </el-input>
              <span class="msg-tip">
                划线价在商品列表及详情会以划线形式显示
              </span>
            </el-form-item>
            <el-form-item label="商品库存：" prop="stock">
              <div class="display-flex">
                <el-input
                  v-positive-integer
                  type="number"
                  min="0"
                  v-model="form.stock"
                  style="width: 300px"
                  :size="option.size"
                >
                  <template slot="append">个</template>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item label="商品重量：">
              <el-input
                disabled
                type="input"
                v-model="form.weight"
                style="width: 300px"
                :size="option.size"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="商品编号：">
              <el-input
                disabled
                type="input"
                v-model="form.sn"
                style="width: 300px"
                :size="option.size"
              >
              </el-input>
            </el-form-item>
          </div>
          <!-- 商品详情 -->
          <div v-if="stepActive == 2">
            <el-form-item label="服务标签：">
              <el-cascader
                filterable
                clearable
                v-model="form.serviceIds"
                placeholder="点击选择服务标签"
                :size="option.size"
                :options="serviceOptions"
                :props="{ multiple: true, emitPath: false }"
              >
              </el-cascader>
            </el-form-item>
            <el-form-item label="参数详情：">
              <div class="goods-detail-table">
                <div class="display-flex goods-detail-item">
                  <div class="goods-detail-name">参数名称</div>
                  <div class="goods-detail-msg">内容</div>
                  <div class="goods-detail-del">删除</div>
                  <div class="goods-detail-move">移动</div>
                </div>
                <draggable
                  tag="div"
                  ghostclass="ghost"
                  handle=".goods-detail-move"
                  :list="form.params"
                  :animation="500"
                >
                  <div
                    class="display-flex goods-detail-item"
                    v-for="(it, index) in form.params"
                    :key="index"
                  >
                    <div class="goods-detail-name">
                      <el-input
                        type="input"
                        v-model="it.title"
                        style="width: 90px"
                        :size="option.size"
                      >
                      </el-input>
                    </div>
                    <div class="goods-detail-msg">
                      <el-input
                        type="input"
                        v-model="it.content"
                        style="width: 348px"
                        :size="option.size"
                      >
                      </el-input>
                    </div>
                    <el-button
                      type="text"
                      :size="option.size"
                      @click="delParams(index)"
                      >删除</el-button
                    >
                    <div class="goods-detail-move">
                      <img
                        src="https://demo.shopro.top/assets/addons/shopro/img/goods/move.png"
                      />
                    </div>
                  </div>
                </draggable>
              </div>
              <el-button
                type="primary"
                icon="el-icon-plus"
                :size="option.size"
                @click="addParams"
                >添加参数</el-button
              >
            </el-form-item>
            <el-form-item label="图文详情：">
              <el-input
                type="textarea"
                placeholder="请输入内容"
                :rows="5"
                :size="option.size"
                v-model="form.content"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <!-- 资源表 -->
    <div slot="footer" class="dialog-footer">
      <el-button :size="option.size" plain v-if="stepActive > 0" @click="goBack"
        >上一步</el-button
      >
      <el-button
        type="primary"
        :size="option.size"
        v-if="stepActive < 2"
        @click="goNext"
        >下一步</el-button
      >
      <el-button
        type="primary"
        v-if="stepActive == 2"
        :size="option.size"
        @click="handleSubmit"
        >提交</el-button
      >
    </div>
    <resourceTable
      width="55%"
      dialogTitle="选择图片"
      :tableType="tableType"
      :dialogVisible.sync="dialogVisible"
      :updateForm="updateForm"
      :currentSelection="currentSelection"
      v-bind="$attrs"
    />
  </el-dialog>
</template>

<script>
import { getDetail, add, update } from "@/api/product/product";
import { getList as getGoodsCategory } from "@/api/product/productcategory";
import { mapGetters } from "vuex";
import option from "@/const/product/product";
import draggable from "vuedraggable";

export default {
  name: "Form",
  components: {
    draggable,
  },
  props: {
    title: String,
    dialogFormVisible: Boolean,
    currentRow: Object,
  },
  data() {
    return {
      // 资源表状态
      dialogVisible: false,
      // 资源表类型
      tableType: "",
      // 用于组图的选择，表示数组中第几张图片
      currentSelection: null,
      // 步骤状态
      stepActive: 0,

      // *表单状态
      // 商品分类
      goodsCategory: [],
      // 发货方式
      dispatchType: [
        { value: "express", name: "物流快递" },
        { value: "selfetch", name: "自提/到店" },
        { value: "store", name: "商家配送" },
      ],
      // 服务标签
      serviceOptions: [
        { value: "1", label: "consulting" },
        { value: "2", label: "急速退款" },
        { value: "3", label: "退货保证" },
        { value: "4", label: "七天退换" },
        { value: "5", label: "正品保证" },
      ],
      // 表单
      form: {
        // 基本信息
        type: "normal",
        title: "",
        subtitle: "",
        status: 1,
        image: "",
        images: [],
        sales: "",
        showSales: "1",
        views: "1",
        likes: "1",
        categoryIds: [], // 提交时需要整理成字符串
        dispatchType: "express",
        // 规格和价格
        isSku: false,
        price: "",
        originalPrice: "",
        stock: "1",
        weight: null, // 未用
        sn: "", // 未用
        // 商品详情
        serviceIds: [], // 提交时需要整理成字符串
        params: [], // 提交时需要整理成字符串
        content: "",
      },
      // 验证规则
      rules: {
        title: [
          {
            required: true,
            message: "请输入商品标题",
            trigger: "blur",
          },
        ],
        subtitle: [
          {
            required: true,
            message: "请输入商品副标题",
            trigger: "blur",
          },
        ],
        image: [
          {
            required: true,
            message: "请上传商品主图",
            trigger: "change",
          },
        ],
        images: [
          {
            required: true,
            message: "请上传商品轮播图",
            trigger: "change",
          },
        ],
        categoryIds: [
          {
            required: true,
            message: "请选择商品分类",
            trigger: "change",
          },
        ],
        showSales: [
          {
            trigger: "change",
            validator: (rule, value, callback) => {
              value = Number(value);
              if (this.form.showSales == "") {
                this.form.showSales = "1";
                callback(new Error("请输入有效的销量"));
              } else {
                if (value < 0) {
                  this.form.showSales = "1";
                  callback(new Error("输入的销量不能小于0"));
                }
                if (this.form.showSales.indexOf(".") != -1) {
                  this.form.sales = "1";
                  callback(new Error("输入的销量不能为小数"));
                }
                callback();
              }
            },
          },
        ],
        views: [
          {
            trigger: "change",
            validator: (rule, value, callback) => {
              value = Number(value);
              if (this.form.views == "") {
                this.form.views = "1";
                callback(new Error("请输入有效的浏览数"));
              } else {
                if (value < 0) {
                  this.form.views = "1";
                  callback(new Error("输入的浏览数不能小于0"));
                }
                if (this.form.views.indexOf(".") != -1) {
                  this.form.views = "1";
                  callback(new Error("输入的浏览数不能为小数"));
                }
                callback();
              }
            },
          },
        ],
        likes: [
          {
            trigger: "change",
            validator: (rule, value, callback) => {
              value = Number(value);
              if (this.form.likes == "") {
                this.form.likes = "1";
                callback(new Error("请输入有效的收藏数"));
              } else {
                if (value < 0) {
                  this.form.likes = "1";
                  callback(new Error("输入的收藏数不能小于0"));
                }
                if (this.form.likes.indexOf(".") != -1) {
                  this.form.likes = "1";
                  callback(new Error("输入的收藏数不能为小数"));
                }
                callback();
              }
            },
          },
        ],
        // 规格和价格
        price: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              value = Number(value);
              if (this.form.price == "") {
                callback(new Error("请输入正确的价格"));
              } else {
                if (value < 0) {
                  this.form.price = "";
                  callback(new Error("输入的价格不能小于0"));
                }
                callback();
              }
            },
          },
        ],
        originalPrice: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              value = Number(value);
              if (this.form.originalPrice == "") {
                callback(new Error("请输入正确的价格"));
              } else {
                if (value < 0) {
                  this.form.originalPrice = "";
                  callback(new Error("输入的价格不能小于0"));
                }
                callback();
              }
            },
          },
        ],
        stock: [
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              value = Number(value);
              if (this.form.stock == "") {
                this.form.stock = "1";
                callback(new Error("请输入有效的库存数量"));
              } else {
                if (value < 0) {
                  this.form.stock = "1";
                  callback(new Error("输入的库存数量不能小于0"));
                }
                if (this.form.stock.indexOf(".") != -1) {
                  this.form.stock = "1";
                  callback(new Error("输入的库存数量不能为小数"));
                }
                callback();
              }
            },
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    option() {
      return option;
    },
    imagesLength() {
      return this.form.images.length;
    },
  },
  watch: {
    dialogFormVisible(newVal) {
      const { currentRow, title } = this;
      if (newVal && title == "编辑商品") {
        getDetail(currentRow.id).then(({ data: { code, data } }) => {
          if (code == 200) {
            const {
              categoryIds,
              serviceIds,
              params,
              showSales,
              views,
              likes,
              images,
            } = data;
            this.getCategory(true);
            data.categoryIds = categoryIds ? categoryIds.split(",") : [];
            data.serviceIds = serviceIds ? serviceIds.split(",") : [];
            data.params = params ? JSON.parse(params) : [];
            data.images = images ? JSON.parse(images) : [];
            data.showSales = showSales.toString();
            data.views = views.toString();
            data.likes = likes.toString();
            Object.assign(this.form, data);
          }
        });
      }
    },
  },
  methods: {
    // 重置表单
    resetForm() {
      this.$refs.form.clearValidate();
      Object.assign(this.form, {
        // 基本信息
        type: "normal",
        title: "",
        subtitle: "",
        status: 1,
        image: "",
        images: [],
        sales: "",
        showSales: "1",
        views: "1",
        likes: "1",
        categoryIds: [],
        dispatchType: "express",
        // 规格和价格
        isSku: false,
        price: "",
        originalPrice: "",
        stock: "1",
        weight: null,
        sn: "",
        // 商品详情
        serviceIds: [],
        params: [],
        content: "",
      });
      this.stepActive = 0;
    },
    // 更新表单
    updateForm(tableType, currentSelection, data) {
      switch (tableType) {
        case "image":
          const { link } = data;
          this.form.image = link;
          break;
        case "images":
          data.forEach((item, index) => {
            if (this.form.images.length < 5) {
              this.form.images.push(item);
            }
          });
          break;
      }
    },
    // 提交表单
    handleSubmit() {
      // 格式化表单字段
      const { form } = this,
        formatForm = {
          categoryIds: form.categoryIds.join(","),
          serviceIds: form.serviceIds.join(","),
          images: JSON.stringify(form.images),
          params: JSON.stringify(form.params),
        };
      // 深拷贝 form
      let copyForm = Object.assign({}, form);
      // 合并格式化后的字段
      copyForm = Object.assign(copyForm, formatForm);
      add(copyForm).then(() => {
        this.resetForm();
        this.$emit("getGoodsData");
        this.$emit("update:dialogFormVisible", false);
        this.$message({
          type: "success",
          message: "操作成功！",
        });
      });
    },
    // 关闭表单
    onBeforeClose(done) {
      this.resetForm();
      this.$emit("update:dialogFormVisible", false);
      done();
    },
    // 拉取商品分类
    getCategory(visible) {
      if (visible) {
        getGoodsCategory().then(({ data: { data } }) => {
          this.goodsCategory = data;
        });
      }
    },
    // 添加商品参数
    addParams() {
      this.form.params.push({
        title: "",
        content: "",
      });
    },
    // 删除商品参数
    delParams(index) {
      this.form.params.splice(index, 1);
    },
    // 下一步
    goNext() {
      if (this.stepActive == 2) return;
      this.$refs.form.validate().then(() => {
        this.stepActive++;
      });
    },
    // 上一步
    goBack() {
      const { stepActive } = this;
      if (stepActive == 0) return;
      this.$refs.form.clearValidate();
      this.stepActive--;
    },
    // 添加图片
    addImage(type, index) {
      this.tableType = type;
      this.dialogVisible = true;
    },
    // 移除图片
    removeImage(type, index) {
      switch (type) {
        case "image":
          this.form.image = "";
          break;
        case "images":
          this.form.images.splice(index, 1);
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/views/product/styles/product/form";

.steps-display /deep/ .el-step__icon {
  display: none;
}
.steps-display /deep/ .el-step__title {
  font-size: 14px;
}
.body /deep/ .el-dialog__body {
  padding: 0;
}
.top-right-error {
  position: absolute;
  top: -7px;
  right: -7px;
}
.goods-images {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 4px;
  border: 1px solid #333;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>

