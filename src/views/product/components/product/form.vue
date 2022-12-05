<template>
  <!-- 表单模块（弹窗） -->
  <el-dialog
    :title="title"
    :visible.sync="box"
    width="60%"
    :before-close="beforeClose"
    append-to-body
    class="body"
  >
    <!-- <el-form
        :disabled="view"
        :size="option.size"
        ref="goodsForm"
        :model="form"
        label-width="100px"
        :rules="rules"
      >
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
      </el-form> -->

    <!-- 内容 -->
    <div id="productform" v-cloak>
      <div class="preview-body">
        <el-steps class="steps-display" :active="stepActive" simple>
          <el-step title="1、基础信息"></el-step>
          <el-step title="2、规格/价格"></el-step>
          <el-step title="3、商品详情"></el-step>
        </el-steps>
        <div class="good-detail-body">
          <el-form :rules="rules" label-width="110px" class="demo-goodsDetail">
            <div v-if="stepActive == 1">
              <el-form-item label="商品形式：" :prop="type">
                <div class="display-flex">
                  <div
                    class="goods-type"
                    :style="{
                      border:
                        goodsDetail.type == 'normal'
                          ? '1px solid #7438D5'
                          : '1px solid #E6E6E6',
                    }"
                    @click="changeGoodsType('normal')"
                  >
                    <img
                      class="label-auto goods-type-img"
                      src="https://demo.shopro.top/assets/addons/shopro/img/goods/entity.png"
                    />
                    <div
                      class="goods-type-selected"
                      :style="{
                        display: goodsDetail.type == 'normal' ? 'block' : '',
                      }"
                    >
                      <img
                        src="https://demo.shopro.top/assets/addons/shopro/img/goods/selected.png"
                      />
                    </div>
                  </div>

                  <div
                    class="goods-type"
                    @click="changeGoodsType('virtual')"
                    :style="{
                      border:
                        goodsDetail.type == 'virtual'
                          ? '1px solid #7438D5'
                          : '1px solid #E6E6E6',
                    }"
                  >
                    <img
                      class="label-auto goods-type-img"
                      src="https://demo.shopro.top/assets/addons/shopro/img/goods/virtual.png"
                    />
                    <div
                      class="goods-type-selected"
                      :style="{
                        display: goodsDetail.type == 'virtual' ? 'block' : '',
                      }"
                    >
                      <img
                        src="https://demo.shopro.top/assets/addons/shopro/img/goods/selected.png"
                      />
                    </div>
                  </div>
                </div>
              </el-form-item>

              <el-form-item label="商品标题：" prop="title">
                <el-input
                  type="input"
                  v-model="goodsDetail.title"
                  size="small"
                ></el-input>
              </el-form-item>

              <el-form-item label="副标题：" prop="subtitle">
                <el-input
                  type="input"
                  v-model="goodsDetail.subtitle"
                  size="small"
                ></el-input>
              </el-form-item>

              <el-form-item label="商品状态：" prop="status">
                <el-radio-group v-model="goodsDetail.status">
                  <el-radio label="up">上架</el-radio>
                  <el-radio label="hidden">隐藏</el-radio>
                  <el-radio label="down">下架</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="排序：" prop="weigh">
                <div class="display-flex">
                  <el-input
                    type="number"
                    v-model="goodsDetail.weigh"
                    style="width: 300px"
                    size="small"
                  >
                  </el-input>
                  <div class="msg-tip">排序的大小默认按照从大到小排列</div>
                </div>
              </el-form-item>

              <el-form-item label="商品主图：" prop="image">
                <div class="display-flex">
                  <div class="add-img display-flex">
                    <i class="el-icon-plus"></i>
                  </div>
                  <div class="msg-tip">
                    作用于商城列表、分享头图；建议尺寸：750*750像素
                  </div>
                </div>
              </el-form-item>

              <el-form-item label="轮播图：" prop="images">
                <div class="display-flex" style="flex-wrap: wrap">
                  <div class="add-img display-flex">
                    <i class="el-icon-plus"></i>
                  </div>
                  <div class="msg-tip" style="margin-left: 0">
                    作用于商品详情顶部轮播，轮播图可以拖拽图片调整顺序
                  </div>
                </div>
              </el-form-item>

              <el-form-item label="商品分类：" prop="category_ids">
                <div class="display-flex">

                  <el-popover
                    placement="bottom-start"
                    width="600"
                    v-model="visible"
                    class="display-flex-c"
                  >

                    <div>
                      <el-tabs
                        v-if="categoryOptions && categoryOptions.length > 0"
                        v-model="categoryTab"
                      >
                        <el-tab-pane
                          v-for="(tab, indexn) in categoryOptions"
                          :label="tab.name"
                          :name="tab.id"
                          :key="indexn"
                        >
                          <el-cascader-panel
                            v-model="category_ids_all[categoryTab]"
                            :options="tab.children"
                            :props="{
                              multiple: true,
                              checkStrictly: true,
                              value: 'id',
                              label: 'name',
                              children: 'children',
                              emitPath: false,
                            }"
                            clearable
                            @change="changeCategoryIds"
                          >
                          </el-cascader-panel>
                        </el-tab-pane>
                      </el-tabs>
                      <div
                        style="width: 100%; text-align: center"
                        v-if="categoryOptions && categoryOptions.length == 0"
                      >
                        没有分类,请选择去创建
                      </div>
                    </div>

                    <div slot="reference">
                      <div class="display-flex commodity-classification">
                        <!-- <div style="margin-right: 5px;
                                            bottom: 5px;
                                            height: 28px;
                                            line-height: 28px;
                                            padding: 0 5px;
                                            border: 1px solid #e6e6e6;
                                            border-radius: 4px;background: #f9f9f9;" >
                                                <i class="el-icon-close"></i>
                                            </div> -->
                        <el-input
                          class="category-inputs"
                          size="mini"
                          style="
                            background: none;
                            border: none;
                            width: 120px;
                            height: 34px;
                          "
                        ></el-input>
                      </div>
                    </div>

                  </el-popover>

                  <div
                    style="
                      cursor: pointer;
                      color: #7438d5;
                      margin-left: 30px;
                      flex-shrink: 0;
                    "
                  >
                    新建分类
                  </div>
                </div>
              </el-form-item>

              <el-form-item label="虚增销量：">
                <el-input type="number" size="small"></el-input>
              </el-form-item>

              <el-form-item label="浏览人数：">
                <el-input type="number" size="small"></el-input>
              </el-form-item>

              <div>
                <el-form-item label="配送方式：" prop="dispatch_type">
                  <div class="display-flex">
                    <el-checkbox-group v-model="timeData.dispatch_type_arr">
                      <el-checkbox
                        :label="item.id"
                        v-for="(item, indexs) in dispatchType"
                        :key="indexs"
                        >{{ item.name }}</el-checkbox
                      >
                    </el-checkbox-group>

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
                    </el-popover>
                  </div>
                </el-form-item>

                <el-form-item label="物流快递：" prop="express_ids">
                  <div class="display-flex">
                    <div class="flex-1">
                      <el-select placeholder="请选择" size="small">
                        <el-option> </el-option>
                      </el-select>
                    </div>
                    <div class="create-template">新建模板</div>
                  </div>
                </el-form-item>

                <el-form-item label="商家配送：">
                  <div class="display-flex">
                    <div class="flex-1">
                      <el-select placeholder="请选择" size="small"> </el-select>
                    </div>
                    <div class="create-template">新建模板</div>
                  </div>
                </el-form-item>

                <el-form-item label="到店/自提：" prop="selfetch_ids">
                  <div class="display-flex">
                    <div class="flex-1">
                      <el-select placeholder="请选择" size="small">
                        <el-option> </el-option>
                      </el-select>
                    </div>
                    <div class="create-template">新建模板</div>
                  </div>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="back-btn" v-if="stepActive > 1" @click="gonextback">
          上一步
        </div>
        <div
          class="btn-common sub-btn"
          v-if="stepActive < 3"
          @click="gotoback('goodsDetail')"
        >
          下一步
        </div>
        <div
          class="btn-common sub-btn"
          v-if="stepActive == 3"
          @click="submitForm('goodsDetail')"
        >
          确定
        </div>
      </span>
    </div>
  </el-dialog>
</template>

<script>
// 树表
import { getList } from "@/api/product/productcategory";

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
      // rules: {
      //   weigh: 2,
      //   type: [
      //     {
      //       required: true,
      //       message: "请至少选择一个商品分类",
      //       trigger: "change",
      //     },
      //   ],
      //   title: [
      //     { required: true, message: "请输入商品标题", trigger: "blur" },
      //     {
      //       min: 1,
      //       max: 100,
      //       message: "长度在 1 到 100 个字符",
      //       trigger: "blur",
      //     },
      //   ],
      //   subtitle: [
      //     { required: true, message: "请输入商品副标题", trigger: "blur" },
      //     {
      //       min: 1,
      //       max: 100,
      //       message: "长度在 1 到 100 个字符",
      //       trigger: "blur",
      //     },
      //   ],
      //   status: [
      //     {
      //       type: "number",
      //       required: true,
      //       message: "请至少选择一个商品状态",
      //       trigger: "change",
      //     },
      //   ],
      //   price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
      //   originalPrice: [
      //     { required: true, message: "请输入商品原价", trigger: "blur" },
      //   ],
      //   isSku: [
      //     {
      //       type: "boolean",
      //       required: true,
      //       message: "请至少选择一个选项",
      //       trigger: "change",
      //     },
      //   ],
      //   showSales: [
      //     {
      //       type: "number",
      //       required: true,
      //       message: "请输入显示销量",
      //       trigger: "blur",
      //     },
      //   ],
      //   dispatchType: [
      //     {
      //       required: true,
      //       message: "请至少选择一个发货方式",
      //       trigger: "change",
      //     },
      //   ],
      // },
      // 所有商品分类
      // goodsType: [
      //   { label: "实体商品", value: "normal" },
      //   { label: "虚拟商品", value: "virtual" },
      // ],
      // 所有商品状态
      // goodsStatus: [
      //   { label: "上架", value: 1 },
      //   { label: "下架", value: 2 },
      //   { label: "隐藏", value: 0 },
      // ],
      // 所有发货方式
      // dispatchTypes: [
      //   { label: "物流快递", value: "express" },
      //   { label: "用户自提", value: "selfetch" },
      //   { label: "商家配送", value: "store" },
      //   { label: "自动发货", value: "autosend" },
      // ],

      // 原页面
      categoryOptions: [],
      category_ids_all: {},
      categoryTab: null,
      stepActive: 1,
      visiblesb: false,
      goodsDetail: [
        {
          weigh: 1,
          status: "up",
          title: "标题",
          subtitle: "副标题",
          dispatch_ids_arr: [],
          dispatch_ids: "",
          dispatch_type_arr: [],
          dispatch_type: "",
          express_ids: "",
          store_ids: "",
          selfetch_ids: "",
        },
      ],
      timeData: {
        images_arr: [],
        category_ids_arr: [],
        dispatch_type_arr: [], //类型
        dispatch_ids_arr: [], //id数组
        service_ids_arr: [], //服务
      },
      timeData: {
        images_arr: [],
        category_ids_arr: [],
        dispatch_type_arr: [], //类型
        dispatch_ids_arr: [], //id数组
        service_ids_arr: [], //服务
      },
      dispatchType: [
        { id: 1, name: "物流快递" },
        { id: 2, name: "自提/到店" },
        { id: 3, name: "商家配送" },
      ],
      rules: {
        type: "normal",
        weigh: 2,
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
        status: [
          {
            required: true,
            message: "请选择商品状态",
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
        category_ids: [
          {
            required: true,
            message: "请选择商品分类",
            trigger: "change",
          },
        ],
        dispatch_type: [
          {
            required: true,
            message: "请选择配送方式",
            trigger: "blur",
          },
        ],
        dispatch_ids: [
          {
            required: true,
            message: "请选择运费模板",
            trigger: "blur",
          },
        ],
        express_ids: [
          {
            required: true,
            message: "请选择运费模板",
            trigger: "blur",
          },
        ],
        store_ids: [
          {
            required: true,
            message: "请选择配送模板",
            trigger: "blur",
          },
        ],
        selfetch_ids: [
          {
            required: true,
            message: "请选择自提模板",
            trigger: "blur",
          },
        ],
        autosend_ids: [
          {
            required: true,
            message: "请选择发货模板",
            trigger: "blur",
          },
        ],
        is_sku: [
          {
            required: true,
            message: "请选择商品规格",
            trigger: "blur",
          },
        ],
        price: [
          {
            required: true,
            message: "请输入价格",
            trigger: "blur",
          },
        ],
        original_price: [
          {
            required: true,
            message: "请输入划线价格",
            trigger: "blur",
          },
        ],
        weight: [
          {
            required: true,
            message: "请输入重量",
            trigger: "blur",
          },
        ],
        stock: [
          {
            required: true,
            message: "请输入库存",
            trigger: "blur",
          },
        ],
        service_ids: [
          {
            required: true,
            message: "请选择服务标签",
            trigger: "blur",
          },
        ],
      },

      // 弹框标题
      title: "",
      // 是否展示弹框
      box: false,
      // 是否显示查询
      search: "",
      // 加载中
      loading: true,
      // 是否为查看模式
      view: false,
      // 查询信息
      query: {},
      // 分页信息
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 40,
      },
      // 表单数据
      form: {},
      // 选择行
      selectionList: [],
    };
  },
  mounted() {
    this.getcommoditydata();
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
      this.$emit("handleSubmit", formName);
    },

    ////// 新加
    changeCategoryIds(ids) {
      let that = this;
      that.$set(that.category_ids_all, that.categoryTab, ids);
      // that.selectedcatArr = [];
      // that.goodsDetail.category_ids = [];
      // for (let tab in that.category_ids_all) {
      //   that.category_ids_all[tab].forEach((id) => {
      //     that.selectedcatArr = [
      //       ...new Set([
      //         ...that.selectedcatArr,
      //         {
      //           label: that
      //             .handleCategoryIdsLabel(that.categoryOptions, id)
      //             .reverse()
      //             .join("/"),
      //           id: id,
      //           pid: tab,
      //         },
      //       ]),
      //     ];
      //   });
      //   that.goodsDetail.category_ids.push(...that.category_ids_all[tab]);
      // }
      // that.goodsDetail.category_ids = that.goodsDetail.category_ids.join(",");
    },
    changeGoodsType(type) {
      this.goodsDetail.type = type;
      this.goodsDetail.dispatch_ids_arr = [];
      this.goodsDetail.dispatch_ids = "";
      this.goodsDetail.dispatch_type_arr = [];
      this.goodsDetail.dispatch_type = "";
      this.timeData.dispatch_type_arr = [];
      this.goodsDetail.express_ids = "";
      this.goodsDetail.store_ids = "";
      this.goodsDetail.selfetch_ids = "";
    },
    getcommoditydata(page, params = {}) {
      let that = this;
      that.loading = true;
      getList(
        that.page.currentPage,
        that.page.pageSize,
        Object.assign(params, that.query)
      ).then((res) => {
        that.categoryOptions = res.data.data.slice(8);
        console.log("树的数据：", that.categoryOptions);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/views/product/styles/product/form";
</style>

<style lang="scss" scoped>
/* 修改element */
.steps-display /deep/ .el-step__icon {
  display: none;
}
.steps-display /deep/ .el-step__title {
  font-size: 14px;
}
.body /deep/ .el-dialog__body {
  padding: 0;
}
</style>

<style scoped>
/* 修改element */
/* .steps-display >>> .el-step__icon{
    display: none;
  } */
</style>
