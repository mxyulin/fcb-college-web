<template>
  <!-- 表单模块（弹窗） -->
  <el-drawer
    size="60%"
    top="5vh"
    class="body"
    append-to-body
    :title="title"
    :wrapperClosable="false"
    :visible.sync="dialogFormVisible"
    :before-close="onBeforeClose"
  >
    <el-row slot="title">
      <el-col :span="4">{{ title }}</el-col>
      <el-col :span="20">
        <el-steps class="steps-display" :active="stepActive" simple>
          <el-step title="1、基础信息"></el-step>
          <el-step title="2、规格/价格"></el-step>
          <el-step title="3、商品详情"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <div class="product-form">
      <div class="good-detail-body">
        <el-form
          status-icon
          ref="form"
          label-width="15%"
          v-loading="formLoading"
          :model="form"
          :rules="rules"
          :size="option.size"
        >
          <!-- 基础信息 -->
          <div v-show="stepActive == 0">
            <el-form-item label="商品形式：" prop="type">
              <el-radio-group v-model="form.type" :size="option.size">
                <el-radio border label="normal">实体商品</el-radio>
                <el-radio border label="virtual">虚拟商品</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="商品标题：" prop="title">
              <el-input
                v-model.trim="form.title"
                :size="option.size"
              ></el-input>
            </el-form-item>
            <el-form-item label="副标题：" prop="subtitle">
              <el-input
                v-model.trim="form.subtitle"
                :size="option.size"
              ></el-input>
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
                  style="margin-right: 30px; margin-bottom: 10px"
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
                  style="margin-right: 30px; margin-bottom: 10px"
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
                v-model.number="form.showSales"
                :size="option.size"
              ></el-input>
            </el-form-item>
            <el-form-item label="浏览人数：" prop="views">
              <el-input
                type="number"
                v-model.number="form.views"
                :size="option.size"
              ></el-input>
            </el-form-item>
            <el-form-item label="收藏人数：" prop="likes">
              <el-input
                type="number"
                v-model.number="form.likes"
                :size="option.size"
              >
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
          <div v-show="stepActive == 1">
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
            <el-form-item v-if="!form.isSku" label="商品库存：" prop="stock">
              <div class="display-flex">
                <el-input
                  type="number"
                  min="0"
                  v-model.number="form.stock"
                  style="width: 300px"
                  :size="option.size"
                >
                  <template slot="append">个</template>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item v-if="!form.isSku" label="商品重量：" prop="weight">
              <el-input
                type="number"
                v-model.number="form.weight"
                style="width: 300px"
                :size="option.size"
              >
                <template slot="append">kg</template>
              </el-input>
            </el-form-item>
            <el-form-item v-if="!form.isSku" label="商品编号：">
              <el-input
                disabled
                type="input"
                v-model="form.sn"
                style="width: 300px"
                :size="option.size"
              >
              </el-input>
            </el-form-item>
            <el-form-item v-if="form.isSku" label="多规格：" prop="skuList">
              <div class="add-sku-box">
                <div
                  class="add-sku-box"
                  style="margin-bottom: 10px"
                  v-for="(sku, skuIdx) of form.skuList"
                  :key="skuIdx"
                >
                  <div
                    class="display-flex sku-item"
                    style="justify-content: space-between"
                  >
                    <div class="display-flex">
                      <div>规格名称：</div>
                      <div style="width: 100px">
                        <el-input v-model.trim="sku.name"></el-input>
                      </div>
                    </div>
                    <div class="">
                      <el-button type="text" @click="delSku(skuIdx)"
                        >删 除</el-button
                      >
                    </div>
                  </div>
                  <div
                    class="display-flex sku-item"
                    style="height: auto; background: #fff; padding-bottom: 0"
                  >
                    <div class="display-flex">
                      <div style="margin-left: 14px; width: 56px">规格值：</div>
                      <div class="display-flex sku-item-level2">
                        <div
                          class="sku-children"
                          v-for="(skuVal, skuValIdx) in sku.content"
                          :key="skuValIdx"
                        >
                          <el-input v-model="skuVal.name"></el-input>
                          <i
                            class="el-icon-error del-image-btn"
                            @click="delSkuContentName(skuIdx, skuValIdx)"
                          ></i>
                        </div>
                        <el-button
                          type="text"
                          size="medium"
                          @click="addSkuContentName(skuIdx)"
                          >添加</el-button
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="sku-item" style="margin-bottom: 10px">
                  <el-button type="primary" icon="el-icon-plus" @click="addSku"
                    >添加规格</el-button
                  >
                </div>
              </div>
            </el-form-item>
            <el-form-item
              v-if="form.skuPriceList.length != 0 && form.isSku"
              prop="skuPriceList"
            >
              <div class="add-sku-box" style="margin-top: 10px">
                <el-table
                  size="mini"
                  style="width: 100%"
                  v-if="form.skuPriceList"
                  :data="form.skuPriceList"
                >
                  <el-table-column
                    min-width="75"
                    v-for="(sku, idx) of form.skuList"
                    :key="idx"
                    :label="sku.name"
                  >
                    <template slot-scope="scope">
                      {{ scope.row.goodsSkuText[idx] }}
                    </template>
                  </el-table-column>
                  <el-table-column min-width="75" label="图片" prop="image">
                    <template slot-scope="scope">
                      <div
                        key="image-button"
                        class="add-img display-flex"
                        v-if="!scope.row.image"
                        @click="addImage('image', scope.$index)"
                      >
                        <i class="el-icon-plus"></i>
                      </div>
                      <div v-else key="image-result" class="goods-images">
                        <el-image
                          style="width= 100%; height: 100%;"
                          :src="scope.row.image"
                          :fit="fit"
                          @click="addImage('image', scope.$index)"
                        ></el-image>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    min-width="120"
                    prop="price"
                    label="价格（元）"
                  >
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.price"
                        type="number"
                        size="medium"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    min-width="120"
                    prop="price"
                    label="库存（个）"
                  >
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.stock"
                        type="number"
                        size="medium"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    min-width="120"
                    prop="price"
                    label="库存预警（个）"
                  >
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.stockWarning"
                        type="number"
                        size="medium"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    min-width="120"
                    prop="price"
                    label="重量（kg）"
                  >
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.weight"
                        type="number"
                        size="medium"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column min-width="120" prop="sn" label="编码">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.sn" size="medium"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column min-width="120" prop="status" label="状态">
                    <template slot-scope="scope">
                      <el-button
                        v-if="scope.row.status == '1'"
                        type="text"
                        @click="changeSkuStatus(scope.row.status, scope.$index)"
                        >上架</el-button
                      >
                      <el-button
                        v-else
                        type="text"
                        @click="changeSkuStatus(scope.row.status, scope.$index)"
                        >下架</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-form-item>
          </div>
          <!-- 商品详情 -->
          <div v-show="stepActive == 2">
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
              <AvueUeditor
                v-model="form.content"
                :options="contentOption"
              ></AvueUeditor>
            </el-form-item>
          </div>
          <el-form-item style="text-align: right; padding-bottom: 10px">
            <el-button
              :size="option.size"
              plain
              v-if="stepActive > 0"
              @click="goBack"
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
              :loading="submitBtnLoading"
              @click="handleSubmit"
              >提 交</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
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
import { onlyPosIntNum, isOnlyChiNumEen } from "@/util/validate";

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
      /* status */
      stepActive: 0,
      dialogVisible: false,
      submitBtnLoading: false,
      formLoading: false,
      tableType: "",
      currentSelection: null, // 用于组图的选择，表示数组中第几张图片

      /* options */
      dispatchType: [
        { value: "express", name: "物流快递" },
        { value: "selfetch", name: "自提/到店" },
        { value: "store", name: "商家配送" },
      ],
      serviceOptions: [
        { value: "1", label: "consulting" },
        { value: "2", label: "急速退款" },
        { value: "3", label: "退货保证" },
        { value: "4", label: "七天退换" },
        { value: "5", label: "正品保证" },
      ],
      rules: {
        title: [
          {
            required: true,
            message: "请输入商品标题",
            trigger: "blur",
          },
        ],
        image: [
          {
            required: true,
            trigger: "change",
            message: "请上传商品主图",
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
            validator: (r, v, cb) => {
              this.form.showSales = onlyPosIntNum(v);
              cb();
            },
          },
        ],
        views: [
          {
            trigger: "change",
            validator: (r, v, cb) => {
              this.form.views = onlyPosIntNum(v);
              cb();
            },
          },
        ],
        likes: [
          {
            trigger: "change",
            validator: (r, v, cb) => {
              this.form.likes = onlyPosIntNum(v);
              cb();
            },
          },
        ],
        // 规格和价格
        price: [
          {
            required: true,
            trigger: "change",
            validator: (r, v, cb) => {
              this.form.price = this.valiPrice(v);
              cb();
            },
          },
        ],
        originalPrice: [
          {
            trigger: "change",
            validator: (r, v, cb) => {
              if (v.toString() == "") return cb();
              this.form.originalPrice = this.valiPrice(v);
              cb();
            },
          },
        ],
        stock: [
          {
            trigger: "change",
            validator: (r, v, cb) => {
              this.form.stock = onlyPosIntNum(v);
              cb();
            },
          },
        ],
        weight: [
          {
            trigger: "change",
            validator: (r, v, cb) => {
              this.form.weight = onlyPosIntNum(v);
              cb();
            },
          },
        ],
        skuList: [
          {
            trigger: "change",
            validator: (r, v, cb) => {
              v.forEach((sku) => {
                sku.name = isOnlyChiNumEen(sku.name);
                sku.content.forEach((sc) => {
                  sc.name = isOnlyChiNumEen(sc.name);
                });
              });
              cb();
            },
          },
        ],
        skuPriceList: [
          {
            trigger: "change",
            validator: (r, v, cb) => {
              console.log("测试", v);
              if (v.length == 0) return cb();
              v.forEach((sp) => {
                sp.price = this.valiPrice(sp.price);
                sp.stock = onlyPosIntNum(sp.stock);
                sp.stockWarning = onlyPosIntNum(sp.stockWarning);
                sp.weight = onlyPosIntNum(sp.weight);
              });
              cb();
            },
          },
        ],
      },
      contentOption: {},

      /* data */
      goodsCategory: [],
      form: {
        // 基本信息
        type: "normal",
        title: "",
        subtitle: "",
        status: 1,
        image: "",
        images: [],
        sales: "",
        showSales: "0",
        views: "0",
        likes: "0",
        categoryIds: [], // 提交时需要整理成字符串
        dispatchType: "express",

        // 规格和价格
        isSku: false,
        price: "1",
        originalPrice: "",
        stock: "0",
        weight: "0",
        sn: "", // 未用
        skuList: [],
        skuPriceList: [],

        // 商品详情
        serviceIds: [], // 提交时需要整理成字符串
        params: [], // 提交时需要整理成字符串
        content: "",
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
    "form.skuList": {
      deep: true,
      immediate: true,
      handler(newVal) {
        // debugger;
        let scNameArr = [];
        for (let sku of newVal) {
          let content = sku.content;
          if (content.length != 0) {
            let scName = content.map(({ name }) => {
              return name;
            });
            scNameArr.push(scName);
          } else {
            continue;
          }
        }

        if (scNameArr.length == 0) return;

        const Combination = function (chunks) {
          let res = [];
          // * 规格组合核心算法：二维穷举
          const twoDimensionalExhaustion = function (startIdx, prev) {
            let chunk = chunks[startIdx];
            let isLast = startIdx == chunks.length - 1;
            for (let skuName of chunk) {
              let cur = prev.concat(skuName); // 此处不能用 prev.push，因为需要返回数组
              if (isLast) {
                res.push({
                  goodsSkuText: cur, // 需转义字符串提交
                  goodsSkuIds: [], // 需转义字符串提交
                  image: "",
                  stock: "0",
                  stockWarning: "10",
                  sales: "0",
                  sn: "",
                  price: "0",
                  status: "0",
                  weight: "0",
                });
              } else {
                twoDimensionalExhaustion(startIdx + 1, cur);
              }
            }
          };
          twoDimensionalExhaustion(0, []);
          return res;
        };

        this.form.skuPriceList = Combination(scNameArr);
      },
    },
  },
  methods: {
    // 重置表单
    resetForm() {
      this.$refs.form.clearValidate();
      Object.assign(this.form, {
        type: "normal",
        title: "",
        subtitle: "",
        status: 1,
        image: "",
        images: [],
        sales: "",
        showSales: "0",
        views: "0",
        likes: "0",
        categoryIds: [],
        dispatchType: "express",
        isSku: false,
        price: "1",
        originalPrice: "",
        stock: "0",
        weight: "0",
        sn: "",
        skuList: [],
        skuPriceList: [],
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
          if (currentSelection != undefined) {
            this.form.skuPriceList[currentSelection].image = link;
          } else {
            this.form.image = link;
          }
          break;
        case "images":
          data.forEach((item) => {
            if (this.form.images.length < 5) {
              this.form.images.push(item);
            }
          });
          break;
      }
    },
    // 提交表单
    handleSubmit() {
      let form = Object.assign({}, this.form);
      // 格式化表单
      const { categoryIds, serviceIds, images, params } = form;
      this.submitBtnLoading = true;
      this.formLoading = true;
      form.categoryIds = categoryIds.join(",");
      form.serviceIds = serviceIds.join(",");
      form.images = JSON.stringify(images);
      form.params = JSON.stringify(params);
      form.skuPriceList.forEach((sp) => {
        sp.goodsSkuText = sp.goodsSkuText.join(",");
        sp.goodsSkuIds = JSON.stringify(sp.goodsSkuIds);
        return sp;
      });
      add(form).then(({ data: { code } }) => {
        if (code == 200) {
          this.submitBtnLoading = false;
          this.formLoading = false;
          this.resetForm();
          this.$emit("loadProductList");
          this.$emit("update:dialogFormVisible", false);
          this.$message.success("操作成功！");
        }
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
      this.currentSelection = index;
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
    addSku() {
      this.form.skuList.push({ name: "", content: [] });
    },
    delSku(index) {
      this.form.skuList.splice(index, 1);
    },
    addSkuContentName(skuIdx) {
      this.form.skuList[skuIdx].content.push({ name: "", disabled: false });
    },
    delSkuContentName(skuIdx, skuValIdx) {
      this.form.skuList[skuIdx].content.splice(skuValIdx, 1);
    },
    changeSkuStatus(status, index) {
      let sp = this.form.skuPriceList[index];
      status == "1" ? (sp.status = "0") : (sp.status = "1");
    },
    valiPrice(val) {
      let str = val.toString();
      let num = Number(val);
      str = num < 0 ? "0" : str;
      if (str.indexOf(".") > -1 && str.slice(str.indexOf(".")).length > 3) {
        str = str.slice(0, str.indexOf(".") + 3);
      }
      return str;
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
  border: 3px dashed #e6e6e6;
  border-radius: 4px;
  justify-content: center;
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
  width: 18px;
  height: 18px;
  line-height: 14px;
  text-align: center;
  border-radius: 50%;
  font-size: 18px;
  font-weight: 100;
  color: #f56c6c;
  top: -9px;
  right: -9px;
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
  padding: 10px 8px 0 8px;
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
  display: flex;
  position: relative;
  width: 100px;
  margin-bottom: 10px;
  margin-right: 18px;
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
  color: #f56c6c;
  top: -7px;
  right: -7px;
}
.goods-images {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 4px;
  border: 3px dashed #e6e6e6;
  margin-right: 10px;
  margin-bottom: 10px;
}

.el-steps--simple {
  padding: 5px 8%;
  // border-radius: 4px;
  background-color: #fff;
}
</style>

