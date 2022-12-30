<template>
  <!-- 内容 -->

  <div id="product" v-cloak>
    <div class="preview-body">
      <el-steps class="steps-display" :active="stepActive" simple>
        <el-step title="1、基础信息"></el-step>
        <el-step title="2、规格/价格"></el-step>
        <el-step title="3、商品详情"></el-step>
      </el-steps>

      <div class="good-detail-body">
        <el-form
          :rules="rules"
          label-width="110px"
          class="demo-product"
          ref="product"
        >
          <div v-if="stepActive == 1">
            <el-form-item label="商品形式：" :prop="type">
              <div class="display-flex">
                <div
                  class="goods-type"
                  :style="{
                    border:
                      this.displaytype.type == 'normal'
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
                      display: this.displaytype.type == 'normal' ? 'block' : '',
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
                      this.displaytype.type == 'virtual'
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
                      display:
                        this.displaytype.type == 'virtual' ? 'block' : '',
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
                v-model="product.title"
                size="small"
              ></el-input>
            </el-form-item>

            <el-form-item label="副标题：" prop="subtitle">
              <el-input
                type="input"
                v-model="product.subtitle"
                size="small"
              ></el-input>
            </el-form-item>

            <el-form-item label="商品状态：" prop="status">
              <el-radio-group v-model="product.status">
                <el-radio label="0">上架</el-radio>
                <el-radio label="1">隐藏</el-radio>
                <el-radio label="2">下架</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="排序：" prop="weight">
              <div class="display-flex">
                <el-input
                  type="number"
                  v-model="product.weigh"
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
                  v-model="product.visible"
                  class="display-flex-c"
                >
                  <div>
                    <el-tabs
                      v-if="categoryOptions && categoryOptions.length > 0"
                      v-model="product.categoryTab"
                    >
                      <el-tab-pane
                        v-for="(tab, indexn) in this.categoryOptions"
                        :label="tab.name"
                        :name="tab.id"
                        :key="indexn"
                      >
                        <!-- v-model="product.category_ids_all[categoryTab]" -->
                        <el-cascader-panel
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
              <el-input
                type="number"
                v-model="product.showSales"
                size="small"
              ></el-input>
            </el-form-item>

            <el-form-item label="浏览人数：">
              <el-input
                type="number"
                v-model="product.views"
                size="small"
              ></el-input>
            </el-form-item>

            <div>
              <el-form-item label="配送方式：" prop="dispatch_type">
                <div class="display-flex">
                  <el-checkbox-group
                    v-model="product.dispatchTypeArr"
                    @change="dispatchTypeChange"
                  >
                    <el-checkbox
                      :label="item.id"
                      v-for="(item, indexs) in dispatchType"
                      :key="indexs"
                      @change="getDispatchTemplateData"
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

              <el-form-item
                label="物流快递："
                prop="express_ids"
                v-if="
                  this.dispatch_type == 1 ||
                  this.dispatch_type == 12 ||
                  this.dispatch_type == 13 ||
                  this.dispatch_type == 123
                "
              >
                <div class="display-flex">
                  <div class="flex-1">
                    <el-select
                      v-model="product.expressIds"
                      placeholder="请选择"
                      size="small"
                    >
                      <el-option
                        v-for="item in this.dispatchOptions.express"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div class="create-template">新建模板</div>
                </div>
              </el-form-item>

              <el-form-item
                label="商家配送："
                prop="store_ids"
                v-if="
                  this.dispatch_type == 3 ||
                  this.dispatch_type == 13 ||
                  this.dispatch_type == 23 ||
                  this.dispatch_type == 123
                "
              >
                <div class="display-flex">
                  <div class="flex-1">
                    <el-select
                      v-model="product.storeIds"
                      placeholder="请选择"
                      size="small"
                    >
                      <el-option
                        v-for="item in dispatchOptions.store"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div class="create-template">新建模板</div>
                </div>
              </el-form-item>

              <el-form-item
                label="到店/自提："
                prop="selfetch_ids"
                v-if="
                  this.dispatch_type == 2 ||
                  this.dispatch_type == 12 ||
                  this.dispatch_type == 23 ||
                  this.dispatch_type == 123 
                "
              >
                <div class="display-flex">
                  <div class="flex-1">
                    <el-select
                      v-model="product.selfetchIds"
                      placeholder="请选择"
                      size="small"
                    >
                      <el-option
                        v-for="item in dispatchOptions.selfetch"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div class="create-template">新建模板</div>
                </div>
              </el-form-item>
            </div>
          </div>

          <div v-if="stepActive == 2">
            <el-form-item label="商品规格：" prop="is_sku">
              <div class="display-flex">
                <el-radio-group v-model="product.isSku">
                  <el-radio :label="0">单规格</el-radio>
                  <el-radio :label="1">多规格</el-radio>
                </el-radio-group>
                <div class="msg-tip" style="margin-left: 8px">
                  如果商品参与了拼团,秒杀,积分商城等活动,编辑规格可能导致活动规格不可用
                </div>
              </div>
            </el-form-item>
            <el-form-item
              label="售卖价格："
              prop="price"
              v-if="product.isSku == 1"
            >
              <div class="display-flex">
                <el-input
                  v-enter-number
                  type="text"
                  v-model="product.price"
                  style="width: 300px"
                  size="small"
                >
                </el-input>
                <div class="msg-tip">商品没有优惠的情况下售卖的价格</div>
              </div>
            </el-form-item>
            <el-form-item
              label="售卖价格："
              prop="price"
              v-if="product.isSku == 0"
            >
              <div class="display-flex">
                <el-input
                  v-enter-number
                  type="number"
                  v-model="product.price"
                  style="width: 300px"
                  size="small"
                >
                </el-input>
                <div class="msg-tip">商品没有优惠的情况下售卖的价格</div>
              </div>
            </el-form-item>
            <el-form-item label="划线价格：" prop="original_price">
              <div class="display-flex">
                <el-input
                  v-enter-number
                  type="number"
                  v-model="product.originalPrice"
                  style="width: 300px"
                  size="small"
                >
                  <template slot="append">元</template>
                </el-input>
                <div class="msg-tip">
                  划线价在商品列表及详情会以划线形式显示
                </div>
              </div>
            </el-form-item>
            <div v-if="product.isSku == 0">
              <el-form-item label="商品库存：" prop="stock">
                <div class="display-flex">
                  <el-input
                    v-positive-integer
                    type="number"
                    min="0"
                    v-model="product.stock"
                    style="width: 300px"
                    size="small"
                  >
                    <template slot="append">个</template>
                  </el-input>
                </div>
              </el-form-item>
              <el-form-item label="开启库存预警：">
                <el-switch
                  v-model="product.stockWarningSwitch"
                  active-color="#7438D5"
                  inactive-color="#eee"
                ></el-switch>
                <span
                  v-if="!product.stockWarningSwitch"
                  class="stock-warning-switch-tip"
                  >使用默认库存预警</span
                >
              </el-form-item>
              <el-form-item
                label="库存预警："
                v-if="product.stockWarningSwitch"
              >
                <div class="display-flex">
                  <el-input
                    v-positive-integer
                    type="number"
                    min="0"
                    v-model="product.stockWarning"
                    style="width: 300px"
                    size="small"
                  >
                    <template slot="append">个</template>
                  </el-input>
                </div>
              </el-form-item>
              <el-form-item label="商品重量：">
                <div class="display-flex">
                  <el-input
                    type="input"
                    v-model="product.weight"
                    style="width: 300px"
                    size="small"
                  >
                  </el-input>
                </div>
              </el-form-item>
              <el-form-item label="商品编号：">
                <div class="display-flex">
                  <el-input
                    type="input"
                    v-model="product.sn"
                    style="width: 300px"
                    size="small"
                  >
                  </el-input>
                </div>
              </el-form-item>
            </div>
          </div>

          <div v-if="stepActive == 3">
            <el-form-item label="服务标签：">
              <div class="display-flex">
                <div class="flex-1">
                  <el-select
                    v-model="product.serviceIdsArr"
                    placeholder="请选择"
                    multiple
                    size="small"
                  >
                    <el-option
                      v-for="item in this.serviceOptions"
                      :key="item.value"
                      :label="item.name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="create-template">新建标签</div>
              </div>
            </el-form-item>
            <el-form-item label="参数详情：">
              <div>
                <div class="goods-detail-table">
                  <div class="display-flex goods-detail-item">
                    <div class="goods-detail-name">参数名称</div>
                    <div class="goods-detail-msg">内容</div>
                    <div class="goods-detail-del">删除</div>
                    <div class="goods-detail-move">移动</div>
                  </div>
                  <draggable
                    :list="this.params_arr"
                    :options="{ animation: 500 }"
                    :animation="500"
                    tag="div"
                    ghostclass="ghost"
                    class="center-draggable"
                  >
                    <div
                      class="display-flex goods-detail-item"
                      v-for="(it, index) in this.params_arr"
                      :key="index"
                    >
                      <div class="goods-detail-name">
                        <el-input
                          type="input"
                          v-model="it.title"
                          style="width: 90px"
                          size="small"
                        >
                        </el-input>
                      </div>
                      <div class="goods-detail-msg">
                        <el-input
                          type="input"
                          v-model="it.content"
                          style="width: 348px"
                          size="small"
                        >
                        </el-input>
                      </div>
                      <div class="goods-detail-del">
                        <div
                          class="goods-detail-del-icon"
                          @click="delParams(index)"
                        >
                          删除
                        </div>
                      </div>
                      <div class="goods-detail-move">
                        <img
                          src="https://demo.shopro.top/assets/addons/shopro/img/goods/move.png"
                        />
                      </div>
                    </div>
                  </draggable>
                </div>
                <div
                  class="btn-common add-params shopro-screen-button"
                  @click="addParams"
                >
                  <i class="el-icon-plus"></i>
                  <span>添加参数</span>
                </div>
              </div>
            </el-form-item>
          </div>

          <div
            v-if="stepActive == 3"
            id="add-form"
            class="form-horizontal"
            role="form"
            data-toggle="validator"
            method="POST"
            action=""
          >
            <div
              class="display-flex"
              style="margin: 0; align-items: flex-start"
            >
              <label
                class="control-label"
                style="
                  width: 110px;
                  padding-left: 30px;
                  font-weight: 600;
                  font-size: 14px;
                  color: #606266;
                "
                >图文详情 :</label
              >
              <div style="flex: 1">
                <textarea
                  id="c-content"
                  class="form-control editor"
                  rows="5"
                  name="row[content]"
                  cols="50"
                >
富文本</textarea
                >
              </div>
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
        v-if="stepActive < 3"
        @click="gotoback"
        class="btn-common sub-btn shopro-screen-button"
      >
        下一步
      </div>
      <div
        class="btn-common sub-btn shopro-screen-button"
        v-if="stepActive == 3"
        @click="saveProduct"
      >
        确定
      </div>
    </span>
  </div>
</template>

<script>
// 树表
import { getList } from "@/api/product/productcategory";
// 表单提交
import { submitProduct } from "@/api/product/product";

import option from "@/const/product/product";
import draggable from "vuedraggable";
import querystring from 'querystring'

export default {
  components: {
    draggable,
  },
  /*
   * 父组件传来的数据
   * 父组件绑定的事件
   */
  // el: "#goodsSelect",
  data() {
    return {
      // 表单配置
      option: option,

      // 请求表单
      product: {
        // 商品形式
        type: 1,
        // 商品标题
        title: "标题",
        // 副标题
        subtitle: "副标题",
        // 商品状态
        status: 1,
        // 排序
        weigh: 1,
        // // 商品分类 暂时不管
        visible: 1,
        // categoryTab:'',
        // category_ids_all[categoryTab]
        // 虚增销量
        showSales: 1,
        // 浏览人数
        views: 1,
        // // 配送方式
        dispatchTypeArr: [],
        // 物流快递
        expressIds: 1,
        // 商家配送
        storeIds: 1,
        // 到店/自提
        selfetchIds: 1,
        // 商品规格
        isSku: 1,
        // 售卖价格
        price: 1,
        // 划线价格
        originalPrice: 1,
        // 商品库存
        stock: "",
        // 开启库存预警
        stockWarningSwitch: 0,
        // 库存预警
        stockWarning: "",
        // 商品重量
        weight: "",
        // 商品编号
        sn: "",
        // 服务标签
        serviceIdsArr: "",
        // 商品主图
        image:
          "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
        // 轮播图
        // images: [
        //   {
        //     id: 1,
        //     iamge: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        //     name: '图片',
        //     createDate: '',
        //   },
        //   {
        //     id: 2,
        //     iamge: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        //     name: '图片',
        //     createDate: 'q',
        //   },
        // ],
        images: [
          "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
          "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
        ],
      },

      dispatch_type: [],
      params_arr: [{ title: "", content: "" }],

      dispatch_type_arr: [],
      // 报错
      stepActive: 1,
      displaytype: {
        type: "",
      },

      // 原页面
      categoryOptions: [],
      category_ids_all: [],
      categoryTab: 1,
      visiblesb: false,

      dispatchOptions: {
        express: [
          { name: "全国包邮", id: 1 },
          { name: "全国包邮2", id: 2 },
          { name: "全国包邮3", id: 3 },
        ],
        selfetch: [
          { name: "全国包邮", id: 1 },
          { name: "全国包邮2", id: 2 },
          { name: "全国包邮3", id: 3 },
        ],
        store: [
          { name: "全国包邮", id: 1 },
          { name: "全国包邮2", id: 2 },
          { name: "全国包邮3", id: 3 },
        ],
      },

      timeData: {
        images_arr: [],
        category_ids_arr: [],
        dispatch_type_arr: [], //类型
        dispatch_ids_arr: [], //id数组
        service_ids_arr: "", //服务
      },
      dispatchType: [
        {label:'wlkd', id: 1, name: "物流快递" },
        {label:'ztdz', id: 2, name: "自提/到店" },
        {label:'sjps', id: 3, name: "商家配送" },
      ],

      serviceOptions: [
        { value: "JSTK", id: "JSTK", name: "急速退款" },
        { value: "THBZ", id: "THBZ", name: "退货保证" },
        { value: "QTTK", id: "QTTK", name: "七天退换" },
        { value: "ZPBZ", id: "ZPBZ", name: "正品保证" },
      ],

      // 表单验证
      rules: {
        type: [
          {
            required: true,
            message: "请选择优惠券类型",
            trigger: "blur",
          },
        ],
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
        weight: [
          {
            required: true,
            message: "请输入排序",
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
  watch: {
    // bian(){
    //         this.product.serviceIdsArr.a = this.timeData.category_ids_arr;
    //     },
  },
  mounted() {
    this.getcommoditydata();
  },
  computed: {},

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
      // that.product.category_ids = [];
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
      //   that.product.category_ids.push(...that.category_ids_all[tab]);
      // }
      // that.product.category_ids = that.product.category_ids.join(",");
    },
    dispatchTypeChange(val) {
      this.dispatch_type = val.sort().join('');

    },
    getDispatchTemplateData(vala) {
      // console.log("va2", vala);
      // this.goodsDetailida
    },
    // serviceChange(val) {
    //   this.product.service_ids = val.join(",");
    // },

    addParams() {
      this.params_arr.push({
        title: "",
        content: "",
      });
    },
    delParams(index) {
      this.params_arr.splice(index, 1);
    },

    changeGoodsType(type) {
      this.displaytype.type = type;
    },
    // 上下翻页
    gonextback() {
      this.stepActive--;
    },
    gotoback() {
      this.stepActive++;
    },

    // 发请求
    saveProduct() {
      JSON.stringify(this.product.images).push.this.product.images
      console.log("res1", this.product);
      console.log('res2',this.product.images)
      // console.log("res3", this.product.images.toString());
      // JSON.stringify()
      // console.log("res5", JSON.stringify(this.product.images));
      // console.log("res4", querystring.stringify(this.product.images));
      // console.log('res4',this.product.images.join(","))
      //  let a=this.product.images.join(",")
      //  console.log(a)
      // debugger
      // submitProduct(this.product
      // ).then((res) => {
      //   console.log(res)
      // });
    },

    getcommoditydata(page, params = {}) {
      let that = this;
      that.loading = true;
      getList(
        that.page.pageSize,
        Object.assign(params, that.query)
      ).then((res) => {
        that.categoryOptions = res.data.data.slice(8);
        // console.log("树的数据：", that.categoryOptions);
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
