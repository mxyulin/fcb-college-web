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
    <div id="product" v-cloak>
      <div class="preview-body">
        <el-steps class="steps-display" :active="stepActive" simple>
          <el-step title="1、基础信息"></el-step>
          <el-step title="2、规格/价格"></el-step>
          <el-step title="3、商品详情"></el-step>
        </el-steps>

        <div class="good-detail-body">
          <el-form :rules="rules" label-width="110px" class="demo-product" ref="product">
            <div v-if="stepActive == 1">
              <el-form-item label="商品形式：" :prop="type">
                <div class="display-flex">
                  <div
                    class="goods-type"
                    :style="{
                      border:
                        product.type == 'normal'
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
                        display: product.type == 'normal' ? 'block' : '',
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
                        product.type == 'virtual'
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
                        display: product.type == 'virtual' ? 'block' : '',
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
                  <el-radio label="up">上架</el-radio>
                  <el-radio label="hidden">隐藏</el-radio>
                  <el-radio label="down">下架</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="排序：" prop="weigh">
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
                <el-input type="number" v-model="product.show_sales" size="small"></el-input>
              </el-form-item>

              <el-form-item label="浏览人数：">
                <el-input type="number" size="small"></el-input>
              </el-form-item>

              <div>
                <el-form-item label="配送方式：" prop="dispatch_type">
                  <div class="display-flex">
                    <el-checkbox-group
                      v-model="timeData.dispatch_type_arr"
                      @change="dispatchTypeChange"
                    >
                      <el-checkbox
                        :label="item.id"
                        v-for="(item, indexs) in dispatchType"
                        :key="indexs"
                        @change="getDispatchTemplateData(item.id)"
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
                    product.dispatch_type == 1 ||
                    product.dispatch_type == 12 ||
                    product.dispatch_type == 123 ||
                    product.dispatch_type == 13 ||
                    product.dispatch_type == 132 ||
                    product.dispatch_type == 321 ||
                    product.dispatch_type == 21 ||
                    product.dispatch_type == 31
                  "
                >
                  <div class="display-flex">
                    <div class="flex-1">
                      <el-select
                        v-model="product.express_ids"
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
                    product.dispatch_type == 3 ||
                    product.dispatch_type == 23 ||
                    product.dispatch_type == 123 ||
                    product.dispatch_type == 13 ||
                    product.dispatch_type == 132 ||
                    product.dispatch_type == 321 ||
                    product.dispatch_type == 32 ||
                    product.dispatch_type == 31
                  "
                >
                  <div class="display-flex">
                    <div class="flex-1">
                      <el-select
                        v-model="product.store_ids"
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
                    product.dispatch_type == 23 ||
                    product.dispatch_type == 2 ||
                    product.dispatch_type == 12 ||
                    product.dispatch_type == 123 ||
                    product.dispatch_type == 132 ||
                    product.dispatch_type == 321 ||
                    product.dispatch_type == 21 ||
                    product.dispatch_type == 213 ||
                    product.dispatch_type == 231 ||
                    product.dispatch_type == 32
                  "
                >
                  <div class="display-flex">
                    <div class="flex-1">
                      <el-select
                        v-model="product.selfetch_ids"
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
                  <el-radio-group v-model="product.is_sku">
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
                v-if="product.is_sku == 1"
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
                v-if="product.is_sku == 0"
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
                    v-model="product.original_price"
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
              <div v-if="product.is_sku == 0">
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
                    v-model="product.stock_warning_switch"
                    active-color="#7438D5"
                    inactive-color="#eee"
                  ></el-switch>
                  <span
                    v-if="!product.stock_warning_switch"
                    class="stock-warning-switch-tip"
                    >使用默认库存预警</span
                  >
                </el-form-item>
                <el-form-item
                  label="库存预警："
                  v-if="product.stock_warning_switch"
                >
                  <div class="display-flex">
                    <el-input
                      v-positive-integer
                      type="number"
                      min="0"
                      v-model="product.stock_warning"
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
              <!-- <div v-if="product.is_sku == 1">
                  <div class="add-sku-box">
                    <div class="" v-for="(s, k) in skuList">
                      <div
                        class="display-flex sku-item"
                        style="justify-content: space-between"
                      >
                        <div class="display-flex">
                          <div>规格名称：</div>
                          <div style="width: 120px">
                            <el-input
                              type="input"
                              v-model="skuList[k]['name']"
                              maxlength="5"
                              placeholder="请输入名称"
                            >
                            </el-input>
                          </div>
                        </div>

                        <div
                          style="width: 20px; height: 20px"
                          @click="deleteMainSku(k)"
                        >
                          <img
                            class="label-auto"
                            src="/assets/addons/shopro/img/goods/close.png"
                          />
                        </div>
                      </div>
                      <div
                        class="display-flex sku-item sku-item-level"
                        style="background: #fff; padding: 10px 20px"
                      >
                        <div style="width: 60px">规格值：</div>
                        <div class="display-flex sku-item sku-item-level2">
                          <div
                            class="sku-children"
                            v-for="(sc, c) in s.children"
                          >
                            <el-input
                              type="input"
                              v-model="skuList[k]['children'][c]['name']"
                              size="small"
                              placeholder="请输入规格值"
                              maxlength="22"
                            >
                            </el-input>
                            <div
                              class="display-flex sku-children-del"
                              @click="deleteChildrenSku(k, c)"
                            >
                              <img
                                class="label-auto"
                                src="/assets/addons/shopro/img/goods/close.png"
                              />
                            </div>
                          </div>
                          <span
                            style="color: #7536d0; cursor: pointer"
                            @click="addChildrenSku(k)"
                            >添加</span
                          >
                        </div>
                      </div>
                    </div>
                    <div class="display-flex sku-item">
                      <div
                        class="btn-common add-level1-sku"
                        @click="addMainSku"
                      >
                        <i class="el-icon-plus"></i>
                        <span>添加规格</span>
                      </div>
                    </div>
                  </div>
                  <div
                    class="table-box"
                    v-show="skuPrice.length && skuList.length"
                  >
                    <table class="table">
                      <thead>
                        <tr>
                          <template v-for="(item, i) in skuList" :key="i">
                            <th v-if="item.children.length">
                              {{ item.name }}
                            </th>
                          </template>
                          <th>图片</th>
                          <th>
                            <div class="display-flex">
                              <span>价格(元)</span>
                              <el-popover
                                placement="top"
                                width="160"
                                v-model="allEditPopover.price"
                              >
                                <el-input
                                  v-enter-number
                                  v-model="allEditDatas"
                                  placeholder="请输入内容"
                                  size="small"
                                >
                                </el-input>
                                <div style="text-align: right; margin: 0">
                                  <el-button
                                    size="mini"
                                    type="text"
                                    @click="allEditData('price', 'cancel')"
                                    >取消</el-button
                                  >
                                  <el-button
                                    type="primary"
                                    size="mini"
                                    @click="allEditData('price', 'define')"
                                    >确定</el-button
                                  >
                                </div>
                                <div slot="reference">
                                  <img
                                    class="all-edit-img"
                                    src="/assets/addons/shopro/img/goods/batch.png"
                                  />
                                </div>
                              </el-popover>
                            </div>
                          </th>
                          <th>
                            <div class="display-flex">
                              <span>库存(个)</span>
                              <el-popover
                                placement="top"
                                width="160"
                                v-model="allEditPopover.stock"
                              >
                                <el-input
                                  v-positive-integer
                                  v-model="allEditDatas"
                                  placeholder="请输入内容"
                                  size="small"
                                >
                                </el-input>
                                <div style="text-align: right; margin: 0">
                                  <el-button
                                    size="mini"
                                    type="text"
                                    @click="allEditData('stock', 'cancel')"
                                    >取消</el-button
                                  >
                                  <el-button
                                    type="primary"
                                    size="mini"
                                    @click="allEditData('stock', 'define')"
                                    >确定</el-button
                                  >
                                </div>
                                <div slot="reference">
                                  <img
                                    class="all-edit-img"
                                    src="/assets/addons/shopro/img/goods/batch.png"
                                  />
                                </div>
                              </el-popover>
                            </div>
                          </th>
                          <th>
                            <div class="display-flex">
                              <span>库存预警(个)</span>
                              <el-popover
                                placement="top"
                                width="200"
                                v-model="allEditPopover.stock_warning"
                              >
                                <div class="table-stock-warning-switch">
                                  <el-switch
                                    v-model="allstock_warning_switch"
                                    active-color="#7438D5"
                                    inactive-color="#eee"
                                  ></el-switch>
                                  <span
                                    v-if="!allstock_warning_switch"
                                    class="stock-warning-switch-tip table-stock-warning-switch-tip"
                                    >使用默认库存预警</span
                                  >
                                </div>
                                <el-input
                                  v-positive-integer
                                  v-if="allstock_warning_switch"
                                  v-model="allEditDatas"
                                  placeholder="请输入内容"
                                  size="small"
                                >
                                </el-input>
                                <div style="text-align: right; margin: 0">
                                  <el-button
                                    size="mini"
                                    type="text"
                                    @click="
                                      allEditData('stock_warning', 'cancel')
                                    "
                                    >取消
                                  </el-button>
                                  <el-button
                                    type="primary"
                                    size="mini"
                                    @click="
                                      allEditData(
                                        'stock_warning',
                                        'define',
                                        'stock_warning_switch'
                                      )
                                    "
                                  >
                                    确定</el-button
                                  >
                                </div>
                                <div slot="reference">
                                  <img
                                    class="all-edit-img"
                                    src="/assets/addons/shopro/img/goods/batch.png"
                                  />
                                </div>
                              </el-popover>
                            </div>
                          </th>
                          <th>
                            <div class="display-flex">
                              <span>重量</span>
                              <el-popover
                                placement="top"
                                width="160"
                                v-model="allEditPopover.weight"
                              >
                                <el-input
                                  v-model="allEditDatas"
                                  placeholder="请输入内容"
                                  size="small"
                                >
                                </el-input>
                                <div style="text-align: right; margin: 0">
                                  <el-button
                                    size="mini"
                                    type="text"
                                    @click="allEditData('weight', 'cancel')"
                                    >取消</el-button
                                  >
                                  <el-button
                                    type="primary"
                                    size="mini"
                                    @click="allEditData('weight', 'define')"
                                    >确定</el-button
                                  >
                                </div>
                                <div slot="reference">
                                  <img
                                    class="all-edit-img"
                                    src="/assets/addons/shopro/img/goods/batch.png"
                                  />
                                </div>
                              </el-popover>
                            </div>
                          </th>
                          <th>
                            <div class="display-flex">
                              <span>编码</span>
                              <el-popover
                                placement="top"
                                width="160"
                                v-model="allEditPopover.sn"
                              >
                                <el-input
                                  v-model="allEditDatas"
                                  placeholder="请输入内容"
                                  size="small"
                                >
                                </el-input>
                                <div style="text-align: right; margin: 0">
                                  <el-button
                                    size="mini"
                                    type="text"
                                    @click="allEditData('sn', 'cancel')"
                                    >取消</el-button
                                  >
                                  <el-button
                                    type="primary"
                                    size="mini"
                                    @click="allEditData('sn', 'define')"
                                    >确定</el-button
                                  >
                                </div>
                                <div slot="reference">
                                  <img
                                    class="all-edit-img"
                                    src="/assets/addons/shopro/img/goods/batch.png"
                                  />
                                </div>
                              </el-popover>
                            </div>
                          </th>
                          <th>当前状态</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, i) in skuPrice" :key="i">
                          <td v-for="(v, j) in item.goods_sku_text" :key="j">
                            <span class="th-center">{{ v }}</span>
                          </td>
                          <td>
                            <div class="display-flex table-upload-img">
                              <div class="sku-img" v-if="item.image">
                                <img
                                  :src="Fast.api.cdnurl(item.image)"
                                  class="label-auto"
                                />
                                <i
                                  class="el-icon-close"
                                  @click="delImg('sku', i)"
                                ></i>
                              </div>
                              <div v-else @click="addImg('sku', i, false)">
                                <i
                                  class="el-icon-plus"
                                  style="font-size: 18px"
                                ></i>
                              </div>
                            </div>
                          </td>
                          <td>
                            <el-input
                              v-enter-number
                              class="table-input"
                              v-model="item.price"
                            >
                            </el-input>
                          </td>
                          <td>
                            <el-input
                              v-positive-integer
                              class="table-input"
                              type="number"
                              min="0"
                              v-model="item.stock"
                            >
                            </el-input>
                          </td>
                          <td>
                            <div class="display-flex">
                              <div class="table-stock-warning-switch">
                                <el-switch
                                  v-model="item.stock_warning_switch"
                                  @change="changeStockWarningSwitch(1, i)"
                                  active-color="#7438D5"
                                  inactive-color="#eee"
                                ></el-switch>
                                <span
                                  v-if="!item.stock_warning_switch"
                                  class="stock-warning-switch-tip table-stock-warning-switch-tip"
                                  >使用默认库存预警</span
                                >
                              </div>
                              <el-input
                                v-positive-integer
                                type="number"
                                min="0"
                                class="table-input"
                                v-if="item.stock_warning_switch"
                                v-model="item.stock_warning"
                              >
                              </el-input>
                            </div>
                          </td>
                          <td>
                            <el-input
                              class="table-input"
                              v-model="item.weight"
                            ></el-input>
                          </td>
                          <td>
                            <el-input
                              class="table-input"
                              v-model="item.sn"
                            ></el-input>
                          </td>
                          <td>
                            <span
                              class="sku-status th-center"
                              @click="editStatus(i)"
                            >
                              {{ item.status == "up" ? "上架" : "下架" }}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
              </div> -->
            </div>

            <div v-if="stepActive == 3">
              <el-form-item label="服务标签：">
                <div class="display-flex">
                  <div class="flex-1">
                    <el-select
                      v-model="timeData.service_ids_arr"
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
                      :list="product.params_arr"
                      :options="{ animation: 500 }"
                      :animation="500"
                      tag="div"
                      ghostclass="ghost"
                      class="center-draggable"
                    >
                      <div
                        class="display-flex goods-detail-item"
                        v-for="(it, index) in product.params_arr"
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
                  <div class="btn-common add-params shopro-screen-button" @click="addParams">
                    <i class="el-icon-plus"></i>
                    <span>添加参数</span>
                  </div>
                </div>
              </el-form-item>
            </div>
            <form
              id="add-form"
              class="form-horizontal"
              role="form"
              data-toggle="validator"
              method="POST"
              action=""
              v-show="stepActive == 3"
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
                <!-- 富文本 -->
                <div style="flex: 1">
                  <textarea
                    id="c-content"
                    class="form-control editor"
                    rows="5"
                    name="row[content]"
                    cols="50"
                  ></textarea>
                </div>
              </div>
            </form>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="back-btn" v-if="stepActive > 1" @click="gonextback">
          上一步
        </div>
        <div
          class="btn-common sub-btn shopro-screen-button"
          v-if="stepActive < 3"
          @click="gotoback('product')"
        >
          下一步
        </div>
        <div class="btn-common sub-btn shopro-screen-button" @click="saveProduct" v-if="stepActive == 3">确定</div>
      </span>
    </div>
  </el-dialog>
</template>

<script>
// 树表
import { getList } from "@/api/product/productcategory";
import { submit } from "@/api/product/product";
import { mapGetters } from "vuex";
import option from "@/const/product/product";
import { validatenull } from "@/util/validate";
import draggable from "vuedraggable";


export default {
  components: {
    draggable,
  },
  /*
   * 父组件传来的数据
   * 父组件绑定的事件
   */
  name: "Form",
  props: ["title", "box", "form", "view"],
  el: "#product",
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
        // visible:1,
        // categoryTab:'',


        params_arr: [{ title: "", content: "" }],
        service_ids: "",
        dispatch_ids_arr: [],
        dispatch_ids: "",
        dispatch_type_arr: [],
        dispatch_type: "",
        express_ids: "",
        store_ids: "",
        selfetch_ids: "",
        is_sku: "",
        price: "",
        original_price: "",
        stock: "",
        stock_warning_switch: "",
        stock_warning: "",
        weight: "",
        sn: "",
      },

      // 原页面
      categoryOptions: [],
      category_ids_all: {},
      categoryTab: null,
      stepActive: 1,
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
        { id: 1, name: "物流快递" },
        { id: 2, name: "自提/到店" },
        { id: 3, name: "商家配送" },
      ],

      serviceOptions: [
        { value: "ab", id: "1", name: "consulting" },
        { value: "ac", id: "2", name: "急速退款" },
        { value: "af", id: "3", name: "退货保证" },
        { value: "ah", id: "4", name: "七天退换" },
        { value: "aj", id: "5", name: "正品保证" },
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
      this.product.dispatch_type = val.join("");
      console.log("va2", this.product.dispatch_type);
    },
    getDispatchTemplateData(vala) {
      // this.goodsDetailida
      // console.log('va2',vala)
    },
    serviceChange(val) {
      this.product.service_ids = val.join(",");
    },
    addParams() {
      this.product.params_arr.push({
        title: "",
        content: "",
      });
    },
    delParams(index) {
      this.product.params_arr.splice(index, 1);
    },
    changeGoodsType(type) {
      this.product.type = type;
      this.product.dispatch_ids_arr = [];
      this.product.dispatch_ids = "";
      this.product.dispatch_type_arr = [];
      this.product.dispatch_type = "";
      this.timeData.dispatch_type_arr = [];
      this.product.express_ids = "";
      this.product.store_ids = "";
      this.product.selfetch_ids = "";
    },
    // 上下翻页
    gonextback() {
      this.stepActive--;
    },
    gotoback(formName) {
      this.stepActive++;
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     this.stepActive++;
      //   } else {
      //     return false;
      //   }
      // });
    },

    // 发请求
    saveProduct(){
      console.log('res')
      submit(this.product
      ).then((res) => {
        console.log(res)
      });
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
