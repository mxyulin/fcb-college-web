<template>
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
              <el-form-item label="商品形式：" prop="type">
                <div class="display-flex">
                  <div class="goods-type">
                    <img
                      class="label-auto goods-type-img"
                      src="https://demo.shopro.top/assets/addons/shopro/img/goods/entity.png"
                    />
                    <div class="goods-type-selected">
                      <img
                        src="https://demo.shopro.top/assets/addons/shopro/img/goods/virtual.png"
                      />
                    </div>
                  </div>
                  <div class="goods-type">
                    <img
                      class="label-auto goods-type-img"
                      src="https://demo.shopro.top/assets/addons/shopro/img/goods/virtual.png"
                    />
                    <div class="goods-type-selected">
                      <img
                        src="https://demo.shopro.top/assets/addons/shopro/img/goods/virtual.png"
                      />
                    </div>
                  </div>
                </div>
              </el-form-item>

              <el-form-item label="商品标题：" prop="title">
                <el-input size="small"></el-input>
              </el-form-item>

              <el-form-item label="副标题：" prop="subtitle">
                <el-input size="small"></el-input>
              </el-form-item>

              <el-form-item label="商品状态：" prop="status">
                <el-radio-group>
                  <el-radio label="up">上架</el-radio>
                  <el-radio label="hidden">隐藏</el-radio>
                  <el-radio label="down">下架</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="排序：" prop="weigh">
                <div class="display-flex">
                  <el-input type="number" style="width: 300px" size="small">
                  </el-input>
                  <div class="msg-tip">排序的大小默认按照从大到小排列</div>
                </div>
              </el-form-item>

              <el-form-item label="商品主图：" prop="image">
                <div class="display-flex">
                  <!-- <div class="goods-image-box display-flex">
                    <div class="goods-images" style="margin-right: 0">
                      <img class="label-auto" style="border-radius: 4px" />
                      <div class="del-image-btn">
                        <img
                          class="label-auto"
                          src="/assets/addons/shopro/img/goods/close.png"
                        />
                      </div>
                    </div>
                  </div> -->
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
                  <!-- <div
                    class="goods-image-box display-flex"
                    style="flex-wrap: wrap"
                    v-if="timeData.images_arr"
                  >
                    <draggable
                      class="display-flex"
                      :list="timeData.images_arr"
                      v-bind="$attrs"
                      :options="{ animation: 500 }"
                      @end="imagesDrag"
                    >
                      <div
                        class="goods-images"
                        v-for="(it, index) in timeData.images_arr"
                      >
                        <img
                          class="label-auto"
                          :src="Fast.api.cdnurl(it)"
                          style="border-radius: 4px"
                        />
                        <div
                          class="del-image-btn"
                          @click="delImg('images', index)"
                        >
                          <img
                            class="label-auto"
                            src="/assets/addons/shopro/img/goods/close.png"
                          />
                        </div>
                      </div>
                    </draggable>
                  </div> -->
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
                  <el-popover placement="bottom-start" width="600">
                    <div slot="reference">
                      <div
                        class="display-flex"
                        style="
                          flex-wrap: wrap;
                          border: 1px solid #e6e6e6;
                          border-radius: 4px;
                          padding: 0 5px;
                        "
                      >
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

                    <el-checkbox-group>
                      <el-checkbox>
                      </el-checkbox>
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
                >
                  <div class="display-flex">
                    <div class="flex-1">
                      <el-select
                        placeholder="请选择"
                        size="small"
                      >
                        <el-option
                        >
                        </el-option>
                      </el-select>
                    </div>
                    <div
                      class="create-template"
                    >
                      新建模板
                    </div>
                  </div>
                </el-form-item>

                <!-- <el-form-item
                  label="商家配送："
                  prop="store_ids"
                  v-if="
                    goodsDetail.dispatch_type &&
                    goodsDetail.dispatch_type.indexOf('store') != -1 &&
                    goodsDetail.type == 'normal'
                  "
                >
                  <div class="display-flex">
                    <div class="flex-1">
                      <el-select
                        v-model="goodsDetail.store_ids"
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
                    <div
                      class="create-template"
                      @click="createTemplate('store')"
                    >
                      新建模板
                    </div>
                  </div>
                </el-form-item> -->

                <!-- <el-form-item
                  label="到店/自提："
                  prop="selfetch_ids"
                  v-if="
                    goodsDetail.dispatch_type &&
                    goodsDetail.dispatch_type.indexOf('selfetch') != -1
                  "
                >
                  <div class="display-flex">
                    <div class="flex-1">
                      <el-select
                        v-model="goodsDetail.selfetch_ids"
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
                    <div
                      class="create-template"
                      @click="createTemplate('selfetch')"
                    >
                      新建模板
                    </div>
                  </div>
                </el-form-item> -->
              </div>

              <!-- <el-form-item label="商品类型：" prop="dispatch_type" v-if="goodsDetail.type=='virtual'">
                            <el-radio-group v-model="goodsDetail.dispatch_type" @change="dispatchTypeChanger">
                                <el-radio label="selfetch"><span>核销券</span><span class="color-999"
                                        style="margin-left: 6px;">(商品需到店核销)</span>
                                    <el-popover placement="bottom" width="220" trigger="hover">
                                        <div class="popover-container">
                                            <p>1.虚拟商品一个订单可核销多次</p>
                                        </div>
                                        <i class="question-tip el-icon-question" slot="reference"></i>
                                    </el-popover>
                                </el-radio>
                                <el-radio label="autosend"><span>其他</span><span class="color-999"
                                        style="margin-left: 6px;">(商品可自动发货)</span></el-radio>
                            </el-radio-group>
                        </el-form-item> -->

              <!-- <div v-if="goodsDetail.type!='normal'">
                            <el-form-item label="到店/自提：" prop="selfetch_ids"
                                v-if="goodsDetail.dispatch_type && goodsDetail.dispatch_type.indexOf('selfetch')!=-1">
                                <div class="display-flex">
                                    <div class="flex-1">
                                        <el-select v-model="goodsDetail.selfetch_ids" placeholder="请选择" size="small">
                                            <el-option v-for="item in dispatchOptions.selfetch" :key="item.id"
                                                :label="item.name" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div class="create-template" @click="createTemplate('selfetch')">
                                        新建模板
                                    </div>
                                </div>
                            </el-form-item>
                            <el-form-item label="自动发货：" prop="autosend_ids"
                                v-if="goodsDetail.dispatch_type && goodsDetail.dispatch_type.indexOf('autosend')!=-1">
                                <div class="display-flex">
                                    <div class="flex-1">
                                        <el-select v-model="goodsDetail.autosend_ids" placeholder="请选择" size="small">
                                            <el-option v-for="item in dispatchOptions.autosend" :key="item.id"
                                                :label="item.name" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div class="create-template" @click="createTemplate('autosend')">
                                        新建模板
                                    </div>
                                </div>
                            </el-form-item>
                        </div> -->
            </div>

            <!-- <div v-if="stepActive==2">
                        <el-form-item label="商品规格：" prop="is_sku">
                            <div class="display-flex">
                                <el-radio-group v-model="goodsDetail.is_sku">
                                    <el-radio :label="0">单规格</el-radio>
                                    <el-radio :label="1">多规格</el-radio>
                                </el-radio-group>
                                <div class="msg-tip" style="margin-left: 8px;">如果商品参与了拼团,秒杀,积分商城等活动,编辑规格可能导致活动规格不可用</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="售卖价格：" prop="price" v-if="goodsDetail.is_sku==1">
                            <div class="display-flex">
                                <el-input v-enter-number type="text" v-model="goodsDetail.price" style="width:300px"
                                    size="small">
                                </el-input>
                                <div class="msg-tip">商品没有优惠的情况下售卖的价格</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="售卖价格：" prop="price" v-if="goodsDetail.is_sku==0">
                            <div class="display-flex">
                                <el-input v-enter-number type="number" v-model="goodsDetail.price" style="width:300px"
                                    size="small">
                                </el-input>
                                <div class="msg-tip">商品没有优惠的情况下售卖的价格</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="划线价格：" prop="original_price">
                            <div class="display-flex">
                                <el-input v-enter-number type="number" v-model="goodsDetail.original_price"
                                    style="width:300px" size="small">
                                    <template slot="append">元</template>
                                </el-input>
                                <div class="msg-tip">划线价在商品列表及详情会以划线形式显示</div>
                            </div>
                        </el-form-item>
                        <div v-if="goodsDetail.is_sku==0">
                            <el-form-item label="商品库存：" prop="stock">
                                <div class="display-flex">
                                    <el-input v-positive-integer type="number" min="0" v-model="goodsDetail.stock"
                                        style="width:300px" size="small">
                                        <template slot="append">个</template>
                                    </el-input>
                                </div>
                            </el-form-item>
                            <el-form-item label="开启库存预警：">
                                <el-switch v-model="goodsDetail.stock_warning_switch" @change="changeStockWarningSwitch(0)"
                                    active-color="#7438D5" inactive-color="#eee"></el-switch>
                                <span v-if="!goodsDetail.stock_warning_switch"
                                    class="stock-warning-switch-tip">使用默认库存预警</span>
                            </el-form-item>
                            <el-form-item label="库存预警：" v-if="goodsDetail.stock_warning_switch">
                                <div class="display-flex">
                                    <el-input v-positive-integer type="number" min="0" v-model="goodsDetail.stock_warning"
                                        style="width:300px" size="small">
                                        <template slot="append">个</template>
                                    </el-input>
                                </div>
                            </el-form-item>
                            <el-form-item label="商品重量：">
                                <div class="display-flex">
                                    <el-input type="input" v-model="goodsDetail.weight" style="width:300px" size="small">
                                    </el-input>
                                </div>
                            </el-form-item>
                            <el-form-item label="商品编号：">
                                <div class="display-flex">
                                    <el-input type="input" v-model="goodsDetail.sn" style="width:300px" size="small">
                                    </el-input>
                                </div>
                            </el-form-item>
                        </div>
                        <div v-if="goodsDetail.is_sku==1">
                            <div class="add-sku-box">
                                <div class="" v-for="(s, k) in skuList">
                                    <div class="display-flex sku-item" style="justify-content: space-between;">
                                        <div class="display-flex">
                                            <div>规格名称：</div>
                                            <div style="width: 120px;">
                                                <el-input type="input" v-model="skuList[k]['name']" maxlength="5"
                                                    placeholder="请输入名称">
                                                </el-input>
                                            </div>
                                        </div>

                                        <div style="width: 20px;height: 20px;" @click="deleteMainSku(k)">
                                            <img class="label-auto" src="/assets/addons/shopro/img/goods/close.png">
                                        </div>
                                    </div>
                                    <div class="display-flex sku-item sku-item-level"
                                        style="background: #fff;padding: 10px 20px;">
                                        <div style="width: 60px;">规格值：</div>
                                        <div class="display-flex sku-item sku-item-level2">
                                            <div class="sku-children" v-for="(sc, c) in s.children">
                                                <el-input type="input" v-model="skuList[k]['children'][c]['name']"
                                                    size="small" placeholder="请输入规格值" maxlength="22">
                                                </el-input>
                                                <div class="display-flex sku-children-del" @click="deleteChildrenSku(k,c)">
                                                    <img class="label-auto" src="/assets/addons/shopro/img/goods/close.png">
                                                </div>
                                            </div>
                                            <span style="color: #7536D0;cursor: pointer;"
                                                @click="addChildrenSku(k)">添加</span>
                                        </div>

                                    </div>
                                </div>
                                <div class="display-flex sku-item">
                                    <div class="btn-common add-level1-sku" @click="addMainSku">
                                        <i class="el-icon-plus"></i>
                                        <span>添加规格</span>
                                    </div>
                                </div>
                            </div>
                            <div class="table-box" v-show="skuPrice.length && skuList.length">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <template v-for="(item, i) in skuList" :key="i">
                                                <th v-if="item.children.length">
                                                    {{item.name}}
                                                </th>
                                            </template>
                                            <th>图片</th>
                                            <th>
                                                <div class="display-flex">
                                                    <span>价格(元)</span>
                                                    <el-popover placement="top" width="160" v-model="allEditPopover.price">
                                                        <el-input v-enter-number v-model="allEditDatas" placeholder="请输入内容"
                                                            size="small">
                                                        </el-input>
                                                        <div style="text-align: right; margin: 0">
                                                            <el-button size="mini" type="text"
                                                                @click="allEditData('price','cancel')">取消</el-button>
                                                            <el-button type="primary" size="mini"
                                                                @click="allEditData('price','define')">确定</el-button>
                                                        </div>
                                                        <div slot="reference">
                                                            <img class="all-edit-img"
                                                                src="/assets/addons/shopro/img/goods/batch.png">
                                                        </div>
                                                    </el-popover>
                                                </div>
                                            </th>
                                            <th>
                                                <div class="display-flex">
                                                    <span>库存(个)</span>
                                                    <el-popover placement="top" width="160" v-model="allEditPopover.stock">
                                                        <el-input v-positive-integer v-model="allEditDatas"
                                                            placeholder="请输入内容" size="small">
                                                        </el-input>
                                                        <div style="text-align: right; margin: 0">
                                                            <el-button size="mini" type="text"
                                                                @click="allEditData('stock','cancel')">取消</el-button>
                                                            <el-button type="primary" size="mini"
                                                                @click="allEditData('stock','define')">确定</el-button>
                                                        </div>
                                                        <div slot="reference">
                                                            <img class="all-edit-img"
                                                                src="/assets/addons/shopro/img/goods/batch.png">
                                                        </div>
                                                    </el-popover>
                                                </div>
                                            </th>
                                            <th>
                                                <div class="display-flex">
                                                    <span>库存预警(个)</span>
                                                    <el-popover placement="top" width="200"
                                                        v-model="allEditPopover.stock_warning">
                                                        <div class="table-stock-warning-switch">
                                                            <el-switch v-model="allstock_warning_switch"
                                                                active-color="#7438D5" inactive-color="#eee"></el-switch>
                                                            <span v-if="!allstock_warning_switch"
                                                                class="stock-warning-switch-tip table-stock-warning-switch-tip">使用默认库存预警</span>
                                                        </div>
                                                        <el-input v-positive-integer v-if="allstock_warning_switch"
                                                            v-model="allEditDatas" placeholder="请输入内容" size="small">
                                                        </el-input>
                                                        <div style="text-align: right; margin: 0">
                                                            <el-button size="mini" type="text"
                                                                @click="allEditData('stock_warning','cancel')">取消
                                                            </el-button>
                                                            <el-button type="primary" size="mini"
                                                                @click="allEditData('stock_warning','define','stock_warning_switch')">
                                                                确定</el-button>
                                                        </div>
                                                        <div slot="reference">
                                                            <img class="all-edit-img"
                                                                src="/assets/addons/shopro/img/goods/batch.png">
                                                        </div>
                                                    </el-popover>
                                                </div>
                                            </th>
                                            <th>
                                                <div class="display-flex">
                                                    <span>重量</span>
                                                    <el-popover placement="top" width="160" v-model="allEditPopover.weight">
                                                        <el-input v-model="allEditDatas" placeholder="请输入内容" size="small">
                                                        </el-input>
                                                        <div style="text-align: right; margin: 0">
                                                            <el-button size="mini" type="text"
                                                                @click="allEditData('weight','cancel')">取消</el-button>
                                                            <el-button type="primary" size="mini"
                                                                @click="allEditData('weight','define')">确定</el-button>
                                                        </div>
                                                        <div slot="reference">
                                                            <img class="all-edit-img"
                                                                src="/assets/addons/shopro/img/goods/batch.png">
                                                        </div>
                                                    </el-popover>
                                                </div>
                                            </th>
                                            <th>
                                                <div class="display-flex">
                                                    <span>编码</span>
                                                    <el-popover placement="top" width="160" v-model="allEditPopover.sn">
                                                        <el-input v-model="allEditDatas" placeholder="请输入内容" size="small">
                                                        </el-input>
                                                        <div style="text-align: right; margin: 0">
                                                            <el-button size="mini" type="text"
                                                                @click="allEditData('sn','cancel')">取消</el-button>
                                                            <el-button type="primary" size="mini"
                                                                @click="allEditData('sn','define')">确定</el-button>
                                                        </div>
                                                        <div slot="reference">
                                                            <img class="all-edit-img"
                                                                src="/assets/addons/shopro/img/goods/batch.png">
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
                                                <span class="th-center">{{v}}</span>
                                            </td>
                                            <td>
                                                <div class="display-flex table-upload-img">
                                                    <div class="sku-img" v-if="item.image">
                                                        <img :src="Fast.api.cdnurl(item.image)" class="label-auto">
                                                        <i class="el-icon-close" @click="delImg('sku',i)"></i>
                                                    </div>
                                                    <div v-else @click="addImg('sku',i,false)">
                                                        <i class="el-icon-plus" style="font-size:18px;"></i>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <el-input v-enter-number class="table-input" v-model="item.price">
                                                </el-input>
                                            </td>
                                            <td>
                                                <el-input v-positive-integer class="table-input" type="number" min="0"
                                                    v-model="item.stock">
                                                </el-input>
                                            </td>
                                            <td>
                                                <div class="display-flex">
                                                    <div class="table-stock-warning-switch">
                                                        <el-switch v-model="item.stock_warning_switch"
                                                            @change="changeStockWarningSwitch(1,i)" active-color="#7438D5"
                                                            inactive-color="#eee"></el-switch>
                                                        <span v-if="!item.stock_warning_switch"
                                                            class="stock-warning-switch-tip table-stock-warning-switch-tip">使用默认库存预警</span>
                                                    </div>
                                                    <el-input v-positive-integer type="number" min="0" class="table-input"
                                                        v-if="item.stock_warning_switch" v-model="item.stock_warning">
                                                    </el-input>
                                                </div>
                                            </td>
                                            <td>
                                                <el-input class="table-input" v-model="item.weight"></el-input>
                                            </td>
                                            <td>
                                                <el-input class="table-input" v-model="item.sn"></el-input>
                                            </td>
                                            <td>
                                                <span class="sku-status th-center" @click="editStatus(i)">
                                                    {{item.status=='up'?'上架':'下架'}}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div> -->

            <!-- <div v-if="stepActive==3">
                        <el-form-item label="服务标签：">
                            <div class="display-flex">
                                <div class="flex-1">
                                    <el-select v-model="timeData.service_ids_arr" placeholder="请选择" multiple size="small"
                                        @change="serviceChange" @focus="getServiceOptions">
                                        <el-option v-for="item in serviceOptions" :key="item.value" :label="item.name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="create-template" @click="createTemplate('service')">
                                    新建标签
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="参数详情：">
                            <div>
                                <div class="goods-detail-table">
                                    <div class="display-flex goods-detail-item">
                                        <div class="goods-detail-name">
                                            参数名称
                                        </div>
                                        <div class="goods-detail-msg">
                                            内容
                                        </div>
                                        <div class="goods-detail-del">
                                            删除
                                        </div>
                                        <div class="goods-detail-move">
                                            移动
                                        </div>
                                    </div>
                                    <draggable :list="goodsDetail.params_arr" v-bind="$attrs" :options="{animation:500}">
                                        <div class="display-flex goods-detail-item"
                                            v-for="(it,index) in goodsDetail.params_arr">
                                            <div class="goods-detail-name">
                                                <el-input type="input" v-model="it.title" style="width:90px" size="small">
                                                </el-input>
                                            </div>
                                            <div class="goods-detail-msg">
                                                <el-input type="input" v-model="it.content" style="width:348px"
                                                    size="small">
                                                </el-input>
                                            </div>
                                            <div class="goods-detail-del">
                                                <div class="goods-detail-del-icon" @click="delParams(index)">
                                                    删除
                                                </div>
                                            </div>
                                            <div class="goods-detail-move">
                                                <img src="/assets/addons/shopro/img/goods/move.png">
                                            </div>
                                        </div>
                                    </draggable>
                                </div>
                                <div class="btn-common add-params" @click="addParams">
                                    <i class="el-icon-plus"></i>
                                    <span>添加参数</span>
                                </div>
                            </div>
                        </el-form-item>
                    </div> -->

            <!-- <form id="add-form" class="form-horizontal" role="form" data-toggle="validator" method="POST" action=""
                        v-show="stepActive==3">
                        <div class="display-flex" style="margin: 0;align-items: flex-start;">
                            <label class="control-label" style="width: 100px;
                            padding-right: 20px;
                            font-weight: 600;
                            font-size: 14px;
                            color: #606266;">{:__('Content')}:</label>
                            <div style="flex: 1;">
                                <textarea id="c-content" class="form-control editor" rows="5" name="row[content]"
                                    cols="50"></textarea>
                            </div>
                        </div>
                    </form> -->
          </el-form>
        </div>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
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
      </span> -->
    </div>
</template>

<script>


export default {

  data() {
    return {
      // 原页面
      stepActive: 1,
      goodsDetail: null,
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
    };
  },
  mounted() {},
  computed: {
  },

  methods: {
  },
};
</script>

<style lang="scss" scoped>
@import "@/views/product/styles/product/form";
</style>
<style lang="scss" scoped>
.preview-body .steps-display .el-step__icon{
    display: none;
  }
</style>