<template>
  <!-- 表单模块（弹窗） -->
  <el-drawer
    size="60%"
    top="5vh"
    class="body"
    :wrapperClosable="false"
    append-to-body
    :title="title"
    :visible.sync="dialogFormVisible"
    :before-close="onBeforeClose"
  >
    <el-row slot="title">
      <el-col :span="4">{{title}}</el-col>
      <el-col :span="20"> <el-steps class="steps-display" :active="stepActive" simple>
            <el-step title="1、基础信息"></el-step>
            <el-step title="2、规格/价格"></el-step>
            <el-step title="3、商品详情"></el-step>
          </el-steps>
      </el-col>
    </el-row>    

    <div class="product-form" >  
      <div class="good-detail-body">
        <el-form
          ref="form"
          label-width="15%"
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
                  key="image-button"
                  class="add-img display-flex"
                  v-if="!form.image"
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
                :props="{
                  multiple: true,
                  emitPath: false,
                  checkStrictly: true,
                  label: 'title',
                  children: 'children',
                  value: 'value',
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
            <el-form-item label="收藏人数：" prop="likes" >
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
              <!-- <el-input
                type="textarea"
                placeholder="请输入内容"
                :rows="5"
                :size="option.size"
                v-model="form.content"
              ></el-input> -->
              <AvueUeditor v-model="form.content" :options="contentOption"></AvueUeditor>

            </el-form-item>  
          </div>

          <el-form-item  style="text-align:right;padding-bottom: 10px;">
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
                >提 交</el-button
              >
            </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 资源表 -->
    
    <resource-table
      width="60%"
      dialogTitle="选择图片"
      :tableType="tableType"
      :dialogVisible.sync="dialogVisible"
      :updateForm="updateForm"
      :currentSelection="currentSelection"
      v-bind="$attrs"
    />
  </el-drawer>
</template>

<script>
import { getDetail, add } from "@/api/product/product";
import { getTree as getGoodsCategory } from "@/api/product/productcategory";
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
      contentOption: {

      },
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
      // 格式化表单
      const { categoryIds, serviceIds, images, params } = this.form;
      this.form.categoryIds = categoryIds.join(",");
      this.form.serviceIds = serviceIds.join(",");
      this.form.images = JSON.stringify(images);
      this.form.params = JSON.stringify(params);
      add(this.form).then(() => {
        this.resetForm();
        this.$emit("loadProductList");
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
 #productform {
    background: #fff;
    padding: 0 20px;
    overflow: auto;
    color: #666;
}
//////////////////////////////////////////////////////
.display-flex {
    display: flex;
    align-items: center;
}
.display-flex-c {
    display: flex;
    justify-content: center;
    align-items: center;
}

.shopro-screen-button {
    background: #409eff;
    color: #fff;
}

//////////////////////////////////////////////////////
.display-flex-c /deep/ .el-input__inner {
    display: block;
    padding: 0;
    margin-top: 3px;
    border: 0px;
}

.commodity-classification {
    flex-wrap: wrap;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    padding: 0 5px;
}

.btn-common {
    line-height: 32px;
    height: 32px;
    cursor: pointer;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn-box {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    justify-content: space-between;
}

.refresh-btn {
    width: 32px;
    border: 1px solid #e6e6e6;
    font-size: 14px;
    margin-right: 20px;
}

.create-goods,
.add-params,
.add-level1-sku {
    width: 98px;
    color: #fff;
}

.create-goods span,
.add-params span,
.add-level1-sku span {
    margin-left: 8px;
}

.goods-name {
    display: flex;
    align-items: center;
}

.goods-img {
    width: 34px;
    height: 34px;
    margin-right: 10px;
}

.el-table,
.el-table thead,
.el-table th {
    color: #444;
    font-weight: 500 !important;
}

/* el-dialog */
.el-dialog {
    width: 800px;
    height: 70vh;
    margin: 15vh auto;
}

.el-dialog__header {
    padding: 16px 20px 10px;
}

.el-dialog__title {
    font-size: 14px;
    color: #444;
}

.el-dialog__headerbtn {
    font-size: 14px;
    color: #999;
}

.el-dialog__body {
    padding: 0;
}

.el-step.is-simple .el-step__title {
    font-size: 14px;
    font-weight: 600;
}

.el-step.is-simple .el-step__icon {
    display: none;
}

.el-step__title.is-finish {
    color: #7438d5;
}

.el-step__title.is-process {
    color: #666;
    font-weight: 500;
}

.el-step__title.is-wait {
    color: #999;
}

.el-form-item {
    margin-bottom: 20px;
}

.good-detail-body {
    padding: 20px 25px 10px 5px;
    // height: calc(100vh - 100px);
    height: 600px;
    overflow: none;
}
 

.goods-type {
    width: 162px;
    height: 58px;
    border-radius: 4px;
    position: relative;
    margin-right: 20px;
}

.goods-type-img {
    border-radius: 4px;
}

.goods-type-selected {
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    border-radius: 50%;
    background: #7438d5;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
    display: none;
    position: absolute;
    top: -8px;
    right: -8px;
}

.el-input__inner,
.el-input__icon {
    line-height: 34px;
    height: 34px;
}

.display-flex {
    display: flex;
    align-items: center;
}

.add-img {
    width: 60px;
    height: 60px;
    border: 1px dashed #e6e6e6;
    border-radius: 4px;
    justify-content: center;
    margin-right: 30px;
    margin-bottom: 10px;
}

label {
    margin-bottom: 0;
}

.msg-tip {
    margin-left: 30px;
    color: #999;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    padding: 0 30px;
    padding-bottom: 10px;
}

.back-btn {
    width: 88px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    margin-right: 20px;
    color: #999;
    cursor: pointer;
}

.sub-btn {
    width: 88px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
}

.goods-detail-table {
    border: 1px solid #e6e6e6;
    border-bottom: none;
    margin-bottom: 20px;
}

.goods-detail-item {
    border-bottom: 1px solid #e6e6e6;
}

.goods-detail-item > div {
    padding: 5px 10px;
}

.goods-detail-name {
    width: 120px;
}

.goods-detail-msg {
    width: 378px;
}

.goods-detail-del,
.goods-detail-move {
    width: 50px;
    display: flex;
    justify-content: center;
    cursor: move;
}

.goods-detail-del-icon {
    color: #ff5959;
}

.del-image-btn {
    position: absolute;
    width: 14px;
    height: 14px;
    line-height: 14px;
    text-align: center;
    border-radius: 50%;
    font-size: 12px;
    font-weight: 600;
    background: #7438d5;
    color: #fff;
    top: -7px;
    right: -7px;
}

.label-auto {
    width: 100%;
    height: 100%;
}

.el-radio__input.is-checked + .el-radio__label,
.el-tabs__item.is-active,
.el-tabs__item:hover,
.el-pager li.active,
.el-cascader-node.in-active-path,
.el-cascader-node.is-active,
.el-cascader-node.is-selectable.in-checked-path,
.el-checkbox__input.is-checked + .el-checkbox__label,
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
    color: #7438d5;
}

.el-radio__input.is-checked .el-radio__inner,
.el-tabs__active-bar,
.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background: #7438d5;
    border-color: #7438d5;
}

.add-sku-box {
    padding: 10px 8px;
    border: 1px solid #e6e6e6;
}

.sku-item {
    background: #f9f9f9;
    height: 50px;
    padding: 10px;
}

.sku-item-level {
    height: auto;
}

.sku-item-level2 {
    height: auto;
    padding: 0;
    width: 600px;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    line-height: 30px;
}

.sku-children {
    margin-right: 18px;
    position: relative;
    width: 120px;
    margin-bottom: 10px;
}

.sku-children-del {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    position: absolute;
    top: -8px;
    right: -8px;
    background: #7536d0;
    color: #fff;
    font-weight: 600;
    justify-content: center;
}

.sku-img {
    width: 34px;
    height: 34px;
    border-radius: 4px;
    position: relative;
}

.sku-img i {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    position: absolute;
    top: -7px;
    right: -7px;
    background: #7536d0;
    color: #fff;
    font-weight: 600;
    justify-content: center;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.table-box {
    border: 1px solid #e6e6e6;
    margin: 20px 0;
    overflow-x: auto;
}

.table-box .table {
    table-layout: auto;
    margin: 0;
}

.table-box .table td,
.table-box .table th {
    white-space: nowrap;
    min-width: 80px;
}

.table-upload-img {
    width: 34px;
    height: 34px;
    color: #e6e6e6;
    border-radius: 2px;
    border: 1px solid #e6e6e6;
    display: flex;
    justify-content: center;
    align-items: center;
}

.all-edit-img {
    width: 14px;
    height: 14px;
    margin-left: 6px;
}

.sku-status {
    cursor: pointer;
}

.el-dialog__body .table {
    font-size: 12px;
    margin-bottom: 0;
}

.th-center {
    height: 34px;
    line-height: 34px;
}

.w-e-toolbar {
    display: flex;
    flex-wrap: wrap;
}

.el-cascader,
.el-select {
    width: 100%;
}

.el-popover .el-input {
    margin-bottom: 10px;
}

.color-999 {
    color: #999;
}

.popover-container > p {
    margin-bottom: 10px;
}

.question-tip {
    font-size: 24px;
    color: #ccc;
    margin-left: 18px;
}

.el-radio {
    margin-right: 10px;
}

.flex-1 {
    flex: 1;
}

.create-template {
    margin-left: 44px;
    cursor: pointer;
    color: #7536d0;
}

.el-tabs__content {
    height: 190px;
    overflow: auto;
}

.category-inputs input,
.category-inputs:focus input,
.category-inputs:hover input {
    background: none;
    border: none;
    border-color: rgba(0, 0, 0, 0) !important;
}

.nice-validator .el-input__inner {
    vertical-align: baseline !important;
}

.table-stock-warning-switch {
    line-height: 32px;
    height: 32px;
    margin-right: 8px;
}

.table-input {
    width: 80px;
}

.stock-warning-switch-tip {
    margin-left: 30px;
    color: #999;
    font-size: 12px;
}

.table-stock-warning-switch-tip {
    margin-left: 8px;
}

[v-cloak] {
    display: none;
}


.steps-display /deep/ .el-step__icon {
  display: none;
}
.steps-display /deep/ .el-step__title {
  font-size: 14px;
}
// .body /deep/ .el-dialog__body {
//   padding: 0;
// }
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

.el-steps--simple {
    padding: 5px 8%;
    // border-radius: 4px;
    background-color: #fff;
}

 

</style>

