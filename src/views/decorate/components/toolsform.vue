<template>
  <!-- 组件表单模块 -->
  <div class="decorate-right" v-if="centerSelect != null">
    <div class="decorate-right-header">
      <span
        v-if="
          templateForm.type != 'order-card' &&
          templateForm.type != 'wallet-card'
        "
        class="decorate-right-header-title"
      >
        {{ templateForm.name }}
      </span>
      <el-popover
        popper-class="tabber-popper"
        placement="bottom-start"
        width="200"
        trigger="hover"
      >
        <el-link
          type="primary"
          href="https://doc.fastadmin.net/shopro/825.html"
          target="_blank"
        >
          自定义底部导航文档
        </el-link>
        <i
          v-if="templateForm.type == 'tabbar'"
          slot="reference"
          class="el-icon-question tabber-popper-icon"
        ></i>
      </el-popover>
    </div>
    <!-- 轮播图 -->
    <div v-if="templateForm.type == 'banner'" class="decorate-right-write">
      <!-- 轮播图几何信息调整 -->
      <div v-if="centerSelect != 0 || fromtype == 'custom'">
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip search-tip">高度</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <el-slider
              :min="100"
              :max="600"
              v-model="templateForm.content.height"
            ></el-slider>
          </el-col>
        </el-row>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip search-tip">倒角度数</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <el-slider
              :min="0"
              :max="50"
              v-model="templateForm.content.radius"
            ></el-slider>
          </el-col>
        </el-row>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip search-tip">左右边距</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <el-slider v-model="templateForm.content.x"></el-slider>
          </el-col>
        </el-row>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip search-tip">上下边距</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <el-slider v-model="templateForm.content.y"></el-slider>
          </el-col>
        </el-row>
      </div>
      <draggable
        v-bind="$attrs"
        :list="templateForm.content.list"
        handle=".draggable-handle-move"
        :animation="100"
      >
        <div
          class="select-style-item"
          v-for="(item, index) in templateForm.content.list"
          :key="index"
        >
          <el-row class="select-style-item-title">
            <el-col :xs="12" :sm="12">
              <!-- 拖动句柄 -->
              <div class="display-flex" style="align-items: center">
                <img
                  class="draggable-handle-move"
                  src="https://demo.shopro.top/assets/addons/shopro/img/decorate/move.png"
                />
                <div class="select-style-item-tip">图片{{ index + 1 }}</div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12">
              <div class="detele-item">
                <span @click.stop="rightDel(index)">删除</span>
              </div>
            </el-col>
          </el-row>
          <el-row class="select-style-item-box">
            <el-col :xs="6" :sm="6">
              <div class="select-style-item-tip">选择图片</div>
            </el-col>
            <el-col :xs="16" :sm="16">
              <div class="select-style-item-select input-select-inline">
                <img
                  class="select-img image-border"
                  :class="'bannerimg' + index"
                  :src="
                    item.image
                      ? item.image
                      : 'https://demo.shopro.top/assets/addons/shopro/img/decorate/image-default.png'
                  "
                />
                <el-button
                  plain
                  type="primary"
                  :size="option.size"
                  class="margin-left-20"
                  @click="chooseResource('picture', index)"
                >
                  {{ item.image ? "重新选择" : "选择图片" }}
                </el-button>
              </div>
            </el-col>
          </el-row>
          <el-row style="margin: 10px 0; padding-left: 10px; color: #999">
            <el-col :xs="16" :sm="16" :offset="6"> 建议尺寸:750*520 </el-col>
          </el-row>
          <el-row class="select-style-item-box">
            <el-col :xs="6" :sm="6">
              <div class="select-style-item-tip">选择链接:</div>
            </el-col>
            <el-col :xs="16" :sm="16">
              <div class="select-style-item-select">
                <el-radio-group
                  :size="option.size"
                  class="item-radio-group"
                  v-model="item.path_type"
                  @change="clearlink('banner', index)"
                >
                  <el-radio :label="1">系统链接</el-radio>
                  <el-radio :label="2">外部链接</el-radio>
                </el-radio-group>
              </div>
            </el-col>
          </el-row>
          <el-row class="select-style-item-box">
            <el-col :xs="16" :sm="16" :offset="6">
              <div class="select-style-item-select" v-if="item.path_type == 1">
                <el-button
                  type="primary"
                  :size="option.size"
                  plain
                  class="choosePath"
                  @click="chooseResource('link', index)"
                >
                  选择链接
                </el-button>
                <span class="margin-left-20 one-ellipsis">{{
                  item.path_name
                }}</span>
              </div>
              <div class="select-style-item-select" v-if="item.path_type == 2">
                <el-input
                  v-model="item.path"
                  :size="option.size"
                  placeholder="http(s)://"
                ></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row class="select-style-item-box">
            <el-col :xs="6" :sm="6">
              <div class="select-style-item-tip">背景颜色:</div>
            </el-col>
            <el-col :xs="16" :sm="16">
              <div class="select-style-item-select input-select-inline">
                <el-input v-model="item.bgcolor" :size="option.size"></el-input>
                <el-color-picker
                  v-model="item.bgcolor"
                  :size="option.size"
                ></el-color-picker>
              </div>
            </el-col>
          </el-row>
        </div>
      </draggable>
      <div class="select-style-item-tip">
        <el-button
          type="primary"
          :size="option.size"
          plain
          @click.stop="addForm('banner')"
          >添加</el-button
        >
      </div>
    </div>
    <!-- 菜单组 -->
    <div v-if="templateForm.type == 'menu'" class="decorate-right-write">
      <el-row class="select-style-item-box" style="margin: 0 0 16px">
        <el-col :xs="6" :sm="6">
          <div class="select-style-item-tip radio-tip">样式选择</div>
        </el-col>
        <el-col :xs="16" :sm="16">
          <div class="select-style-item-select">
            <el-radio-group
              :size="option.size"
              v-model="templateForm.content.style"
              class="item-radio-group"
            >
              <el-radio :label="4">4列</el-radio>
              <el-radio :label="5">5列</el-radio>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>
      <draggable
        :list="templateForm.content.list"
        :animation="200"
        v-bind="$attrs"
        handle=".draggable-handle-move"
      >
        <div
          class="select-style-item"
          v-for="(item, index) in templateForm.content.list"
          :key="index"
        >
          <el-row class="select-style-item-title">
            <el-col :xs="12" :sm="12">
              <div class="display-flex" style="align-items: center">
                <img
                  class="draggable-handle-move"
                  src="https://demo.shopro.top/assets/addons/shopro/img/decorate/move.png"
                />
                <div class="select-style-item-tip">图片{{ index + 1 }}</div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12">
              <div class="detele-item">
                <span @click.stop="rightDel(index)">删除</span>
              </div>
            </el-col>
          </el-row>
          <el-row class="select-style-item-box">
            <el-col :xs="6" :sm="6">
              <div class="select-style-item-tip">菜单标题</div>
            </el-col>
            <el-col :xs="16" :sm="16">
              <div class="select-style-item-select">
                <el-input
                  placeholder="最多4个文字"
                  :size="option.size"
                  v-model="item.name"
                  maxlength="5"
                >
                </el-input>
              </div>
            </el-col>
          </el-row>
          <el-row class="select-style-item-box">
            <el-col :xs="6" :sm="6">
              <div class="select-style-item-tip">选择图片</div>
            </el-col>
            <el-col :xs="16" :sm="16">
              <div class="select-style-item-select">
                <img
                  class="select-img select-imgzheng image-border"
                  :src="
                    item.image
                      ? item.image
                      : 'https://demo.shopro.top/assets/addons/shopro/img/decorate/image-default2.png'
                  "
                />
                <el-button
                  type="primary"
                  plain
                  :size="option.size"
                  class="margin-left-20 choosePicture"
                  @click="chooseResource('picture', index)"
                >
                  {{ item.image ? "重新选择" : "选择图片" }}
                </el-button>
              </div>
            </el-col>
          </el-row>
          <el-row style="margin: 10px 0; padding-left: 10px; color: #999">
            <el-col :xs="16" :sm="16" :offset="6"> 建议尺寸:98x98 </el-col>
          </el-row>
          <el-row class="select-style-item-box">
            <el-col :xs="6" :sm="6">
              <div class="select-style-item-tip">选择链接:</div>
            </el-col>
            <el-col :xs="16" :sm="16">
              <div class="select-style-item-select">
                <el-radio-group
                  class="item-radio-group"
                  v-model="item.path_type"
                  @change="clearlink('menu', index)"
                >
                  <el-radio :label="1">系统链接</el-radio>
                  <el-radio :label="2">外部链接</el-radio>
                </el-radio-group>
              </div>
            </el-col>
          </el-row>
          <el-row class="select-style-item-box">
            <el-col :xs="16" :sm="16" :offset="6">
              <div class="select-style-item-select" v-if="item.path_type == 1">
                <el-button
                  type="primary"
                  plain
                  :size="option.size"
                  class="choosePath"
                  @click="chooseResource('link', index)"
                >
                  选择链接
                </el-button>
                <span class="margin-left-20 one-ellipsis">{{
                  item.path_name
                }}</span>
              </div>
              <div class="select-style-item-select" v-if="item.path_type == 2">
                <el-input
                  v-model="item.path"
                  :size="option.size"
                  placeholder="http(s)://"
                ></el-input>
              </div>
            </el-col>
          </el-row>
        </div>
      </draggable>
      <div class="select-style-item-tip">
        <el-button
          type="primary"
          plain
          :size="option.size"
          @click.stop="addForm('menu')"
          >添加</el-button
        >
      </div>
    </div>
    <!-- 广告魔方 -->
    <div v-if="templateForm.type == 'adv'" class="decorate-right-write">
      <div class="select-style-con">
        <img :src="advStyleImage[templateForm.content.style - 1].src" />
        <el-button type="text" class="chooseAdvPic" @click.stop="showDrawer"
          >选择风格</el-button
        >
      </div>
      <!-- 广告魔方样式抽屉 -->
      <el-drawer
        size="25%"
        title="选择样式"
        :visible.sync="advdrawer"
        :with-header="false"
        :modal-append-to-body="false"
      >
        <div style="display: flex; flex-wrap: wrap; padding: 15px">
          <el-row :gutter="10">
            <el-col
              :xs="12"
              :sm="12"
              v-for="(i, index) in advStyleImage"
              :key="index"
            >
              <img
                style="margin: 10px 0; width: 154px; height: 100px"
                :src="i.src"
                @click.stop="changeAdv(index, i.num)"
              />
            </el-col>
          </el-row>
        </div>
      </el-drawer>
      <draggable
        :list="templateForm.content.list"
        v-bind="$attrs"
        :animation="200"
        handle=".draggable-handle-move"
      >
        <div
          class="select-style-item"
          v-for="(item, index) in templateForm.content.list"
          :key="index"
        >
          <div
            class="display-flex select-style-item-title"
            style="align-items: center"
          >
            <img
              class="draggable-handle-move"
              src="https://demo.shopro.top/assets/addons/shopro/img/decorate/move.png"
            />
            <div class="select-style-item-tip">图片{{ index + 1 }}:</div>
          </div>
          <el-row class="select-style-item-box">
            <el-col :xs="6" :sm="6">
              <div class="select-style-item-tip">选择图片:</div>
            </el-col>
            <el-col :xs="16" :sm="16">
              <div class="select-style-item-select">
                <img
                  class="select-img image-border"
                  :src="
                    item.image
                      ? item.image
                      : 'https://demo.shopro.top/assets/addons/shopro/img/decorate/image-default.png'
                  "
                />
                <el-button
                  type="primary"
                  :size="option.size"
                  plain
                  class="margin-left-20 choosePicture"
                  @click="chooseResource('picture', index)"
                >
                  {{ item.image ? "重新选择" : "选择图片" }}
                </el-button>
              </div>
            </el-col>
          </el-row>
          <el-row class="select-style-item-box">
            <el-col :xs="6" :sm="6">
              <div class="select-style-item-tip">选择链接:</div>
            </el-col>
            <el-col :xs="16" :sm="16">
              <div class="select-style-item-select">
                <el-radio-group
                  class="item-radio-group"
                  v-model="item.path_type"
                  @change="clearlink('adv', index)"
                >
                  <el-radio :label="1">系统链接</el-radio>
                  <el-radio :label="2">外部链接</el-radio>
                </el-radio-group>
              </div>
            </el-col>
          </el-row>
          <el-row class="select-style-item-box">
            <el-col :xs="16" :sm="16" :offset="6">
              <div class="select-style-item-select" v-if="item.path_type == 1">
                <el-button
                  type="primary"
                  :size="option.size"
                  plain
                  class="choosePath"
                  @click="chooseResource('link', index)"
                >
                  选择链接
                </el-button>
                <span class="margin-left-20 one-ellipsis">{{
                  item.path_name
                }}</span>
              </div>
              <div class="select-style-item-select" v-if="item.path_type == 2">
                <el-input
                  v-model="item.path"
                  :size="option.size"
                  placeholder="http(s)://"
                ></el-input>
              </div>
            </el-col>
          </el-row>
        </div>
      </draggable>
    </div>
    <!-- 商品分类 -->
    <div v-if="templateForm.type == 'goods-group'" class="decorate-right-write">
      <div class="select-style-item">
        <div class="select-style-item-title">商品分类</div>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip search-tip">样式选择</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select">
              <el-radio-group
                class="item-radio-group"
                v-model="templateForm.content.style"
              >
                <el-radio :label="1">样式一</el-radio>
                <el-radio :label="2">样式二</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip tip-line">选择分类:</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select input-select-inline">
              <el-input
                :size="option.size"
                v-model="templateForm.content.category_name"
                disabled
              >
                <el-button
                  slot="append"
                  :size="option.size"
                  type="primary"
                  plain
                  @click="chooseResource('goods-group')"
                >
                  选择
                </el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 自定义商品 -->
    <div v-if="templateForm.type == 'goods-list'" class="decorate-right-write">
      <div class="select-style-item">
        <div class="select-style-item-title">商品列表</div>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip search-tip">样式选择</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select">
              <el-radio-group
                class="item-radio-group"
                v-model="templateForm.content.style"
              >
                <el-radio :label="1">样式一</el-radio>
                <el-radio :label="2">样式二</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <d iv class="select-style-item-tip tip-line">选择商品:</d>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select input-select-inline">
              <el-input
                :size="option.size"
                v-model="templateForm.content.ids"
                disabled
              >
                <el-button
                  slot="append"
                  :size="option.size"
                  type="primary"
                  plain
                  @click="chooseResource('goods-list')"
                >
                  选择
                </el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
        <div
          style="
            display: flex;
            flex-wrap: wrap;
            padding-left: 15px;
            padding-top: 16px;
          "
          v-if="templateData[centerSelect].content.timeData"
        >
          <draggable
            style="display: flex; flex-wrap: wrap"
            :list="templateData[centerSelect].content.timeData"
            v-bind="$attrs"
            :animation="100"
            @end="goodsListEnd"
          >
            <div
              style="
                width: 40px;
                height: 40px;
                border-radius: 3px;
                margin-bottom: 10px;
                margin-right: 10px;
                position: relative;
              "
              v-for="(item, index) in templateData[centerSelect].content
                .timeData"
              :key="index"
            >
              <el-image
                class="image-border"
                style="width: 100%; height: 100%"
                :src="item.image"
                fit="contain"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <i
                style="
                  position: absolute;
                  width: 12px;
                  height: 12px;
                  right: -6px;
                  top: -6px;
                  color: #7438d5;
                "
                class="el-icon-error"
                @click="customList(index)"
              ></i>
            </div>
          </draggable>
        </div>
      </div>
    </div>
    <!-- 优惠券 -->
    <div v-if="templateForm.type == 'coupons'" class="decorate-right-write">
      <div class="select-style-item">
        <div class="select-style-item-title">优惠券</div>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip search-tip">样式选择</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select">
              <el-radio-group
                class="item-radio-group"
                v-model="templateForm.content.style"
              >
                <el-radio :label="1">样式一</el-radio>
                <el-radio :label="2">样式二</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip tip-line">选择优惠券</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select input-select-inline">
              <el-input
                :size="option.size"
                v-model="templateForm.content.ids"
                disabled
              >
                <el-button
                  slot="append"
                  :size="option.size"
                  type="primary"
                  plain
                  @click="operation('coupons')"
                >
                  选择
                </el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip search-tip">背景颜色1</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select">
              <el-input
                v-model="templateForm.content.bgcolor1"
                :size="option.size"
              ></el-input>
              <el-color-picker
                v-model="templateForm.content.bgcolor1"
                :size="option.size"
              >
              </el-color-picker>
            </div>
          </el-col>
        </el-row>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip search-tip">背景颜色2</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select">
              <el-input
                v-model="templateForm.content.bgcolor2"
                :size="option.size"
              ></el-input>
              <el-color-picker
                v-model="templateForm.content.bgcolor2"
                :size="option.size"
              >
              </el-color-picker>
            </div>
          </el-col>
        </el-row>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip search-tip">价格颜色</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select">
              <el-input
                v-model="templateForm.content.pricecolor"
                :size="option.size"
              ></el-input>
              <el-color-picker
                v-model="templateForm.content.pricecolor"
                :size="option.size"
              >
              </el-color-picker>
            </div>
          </el-col>
        </el-row>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip search-tip">字体颜色</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select">
              <el-input
                v-model="templateForm.content.color"
                :size="option.size"
              ></el-input>
              <el-color-picker
                v-model="templateForm.content.color"
                :size="option.size"
              ></el-color-picker>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 拼团 -->
    <div v-if="templateForm.type == 'groupon'" class="decorate-right-write">
      <div class="select-style-item">
        <div class="select-style-item-title">拼团</div>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip search-tip">拼团名称</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select">
              <el-input
                v-model="templateForm.content.name"
                :size="option.size"
              ></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip search-tip">样式选择</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select">
              <el-radio-group
                class="item-radio-group"
                v-model="templateForm.content.style"
              >
                <el-radio :label="1">样式一</el-radio>
                <el-radio :label="2">样式二</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip tip-line">拼团列表</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select input-select-inline">
              <el-input
                :size="option.size"
                v-model="templateForm.content.groupon_name"
                disabled
              >
                <el-button
                  slot="append"
                  :size="option.size"
                  type="primary"
                  plain
                  @click="operation('groupon')"
                >
                  选择
                </el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 秒杀 -->
    <div v-if="templateForm.type == 'seckill'" class="decorate-right-write">
      <div class="select-style-item">
        <div class="select-style-item-title">秒杀</div>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip search-tip">秒杀名称</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select">
              <el-input
                v-model="templateForm.content.name"
                :size="option.size"
              ></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip search-tip">样式选择</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select">
              <el-radio-group
                class="item-radio-group"
                v-model="templateForm.content.style"
              >
                <el-radio :label="1">样式一</el-radio>
                <el-radio :label="2">样式二</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip tip-line">秒杀列表</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select input-select-inline">
              <el-input
                :size="option.size"
                v-model="templateForm.content.seckill_name"
                disabled
              >
                <el-button
                  slot="append"
                  :size="option.size"
                  type="primary"
                  plain
                  @click="operation('seckill')"
                >
                  选择
                </el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 直播 -->
    <div v-if="templateForm.type == 'live'" class="decorate-right-write">
      <div class="select-style-item">
        <div class="select-style-item-title">直播</div>
        <el-row class="select-style-item-box box-radio">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip radio-tip">样式选择</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select">
              <el-radio-group
                class="item-radio-group"
                v-model="templateForm.content.style"
              >
                <el-radio :label="1">1列</el-radio>
                <el-radio :label="2">2列</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip search-tip">直播名称</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select">
              <el-input
                v-model="templateForm.content.name"
                :size="option.size"
              ></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip tip-line">直播列表</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select input-select-inline">
              <el-input
                :size="option.size"
                v-model="templateForm.content.ids"
                disabled
              >
                <el-button
                  slot="append"
                  :size="option.size"
                  type="primary"
                  plain
                  @click="operation('live')"
                >
                  选择
                </el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 列表导航 -->
    <div v-if="templateForm.type == 'nav-list'" class="decorate-right-write">
      <draggable
        :list="templateForm.content.list"
        v-bind="$attrs"
        :animation="100"
        handle=".draggable-handle-move"
      >
        <div
          class="select-style-item"
          v-for="(item, index) in templateForm.content.list"
          :key="index"
        >
          <el-row class="select-style-item-title">
            <el-col :xs="12" :sm="12">
              <div class="display-flex" style="align-items: center">
                <img
                  class="draggable-handle-move"
                  src="https://demo.shopro.top/assets/addons/shopro/img/decorate/move.png"
                />
                <div class="select-style-item-tip">列表{{ index + 1 }}</div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12">
              <div class="detele-item">
                <span @click.stop="rightDel(index)">删除</span>
              </div>
            </el-col>
          </el-row>
          <el-row class="select-style-item-box">
            <el-col :xs="6" :sm="6">
              <div class="select-style-item-tip">选择图片</div>
            </el-col>
            <el-col :xs="16" :sm="16">
              <div class="select-style-item-select">
                <img
                  class="select-img select-imgzheng image-border"
                  :src="
                    item.image
                      ? item.image
                      : 'https://demo.shopro.top/assets/addons/shopro/img/decorate/image-default2.png'
                  "
                />
                <el-button
                  slot="append"
                  :size="option.size"
                  type="primary"
                  plain
                  class="margin-left-20 choosePicture"
                  @click="chooseResource('picture', index)"
                >
                  {{ item.image ? "重新选择" : "选择图片" }}
                </el-button>
              </div>
            </el-col>
          </el-row>
          <el-row style="margin: 10px 0; padding-left: 10px; color: #999">
            <el-col :xs="16" :sm="16" :offset="6"> 建议尺寸:38x38 </el-col>
          </el-row>
          <el-row class="select-style-item-box">
            <el-col :xs="6" :sm="6">
              <div class="select-style-item-tip">编辑标题</div>
            </el-col>
            <el-col :xs="16" :sm="16">
              <div class="select-style-item-select">
                <el-input
                  placeholder="最多12个文字"
                  :size="option.size"
                  v-model="item.name"
                  maxlength="12"
                >
                </el-input>
              </div>
            </el-col>
          </el-row>
          <el-row class="select-style-item-box">
            <el-col :xs="6" :sm="6">
              <div class="select-style-item-tip">选择链接:</div>
            </el-col>
            <el-col :xs="16" :sm="16">
              <div class="select-style-item-select">
                <el-radio-group
                  class="item-radio-group"
                  v-model="item.path_type"
                  @change="clearlink('nav-list', index)"
                >
                  <el-radio :label="1">系统链接</el-radio>
                  <el-radio :label="2">外部链接</el-radio>
                </el-radio-group>
              </div>
            </el-col>
          </el-row>
          <el-row class="select-style-item-box">
            <el-col :xs="16" :sm="16" :offset="6">
              <div class="select-style-item-select" v-if="item.path_type == 1">
                <el-button
                  slot="append"
                  :size="option.size"
                  type="primary"
                  plain
                  class="choosePath"
                  @click="chooseResource('link', index)"
                >
                  选择链接
                </el-button>
                <span class="margin-left-20 one-ellipsis">{{
                  item.path_name
                }}</span>
              </div>
              <div class="select-style-item-select" v-if="item.path_type == 2">
                <el-input
                  v-model="item.path"
                  :size="option.size"
                  placeholder="http(s)://"
                ></el-input>
              </div>
            </el-col>
          </el-row>
        </div>
      </draggable>
      <div class="select-style-item-tip">
        <el-button
          slot="append"
          :size="option.size"
          type="primary"
          plain
          @click="addForm('nav-list')"
        >
          添加
        </el-button>
      </div>
    </div>
    <!-- 宫格列表 -->
    <div v-if="templateForm.type == 'grid-list'" class="decorate-right-write">
      <draggable
        :list="templateForm.content.list"
        v-bind="$attrs"
        :animation="100"
        handle=".draggable-handle-move"
      >
        <div
          class="select-style-item"
          v-for="(item, index) in templateForm.content.list"
          :key="index"
        >
          <el-row class="select-style-item-title">
            <el-col :xs="12" :sm="12">
              <div class="display-flex" style="align-items: center">
                <img
                  class="draggable-handle-move"
                  src="https://demo.shopro.top/assets/addons/shopro/img/decorate/move.png"
                />
                <div class="select-style-item-tip">列表图片{{ index + 1 }}</div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12">
              <div class="detele-item">
                <span @click.stop="rightDel(index)">删除</span>
              </div>
            </el-col>
          </el-row>
          <el-row class="select-style-item-box">
            <el-col :xs="6" :sm="6">
              <div class="select-style-item-tip">选择图片</div>
            </el-col>
            <el-col :xs="16" :sm="16">
              <div class="select-style-item-select">
                <img
                  class="select-img select-imgzheng image-border"
                  :src="
                    item.image
                      ? item.image
                      : 'https://demo.shopro.top/assets/addons/shopro/img/decorate/image-default2.png'
                  "
                />
                <el-button
                  class="margin-left-20 choosePicture"
                  :size="option.size"
                  type="primary"
                  plain
                  @click="chooseResource('picture', index)"
                >
                  {{ item.image ? "重新选择" : "选择图片" }}
                </el-button>
              </div>
            </el-col>
          </el-row>
          <el-row class="select-style-item-box">
            <el-col :xs="6" :sm="6">
              <div class="select-style-item-tip">编辑标题</div>
            </el-col>
            <el-col :xs="16" :sm="16">
              <div class="select-style-item-select">
                <el-input
                  placeholder="最多4个文字"
                  :size="option.size"
                  v-model="item.name"
                  maxlength="4"
                >
                </el-input>
              </div>
            </el-col>
          </el-row>
          <el-row class="select-style-item-box">
            <el-col :xs="6" :sm="6">
              <div class="select-style-item-tip">选择链接</div>
            </el-col>
            <el-col :xs="16" :sm="16">
              <div class="select-style-item-select">
                <el-radio-group
                  class="item-radio-group"
                  v-model="item.path_type"
                  @change="clearlink('grid-list', index)"
                >
                  <el-radio :label="1">系统链接</el-radio>
                  <el-radio :label="2">外部链接</el-radio>
                </el-radio-group>
              </div>
            </el-col>
          </el-row>
          <el-row class="select-style-item-box">
            <el-col :xs="16" :sm="16" :offset="6">
              <div class="select-style-item-select" v-if="item.path_type == 1">
                <el-button
                  :size="option.size"
                  type="primary"
                  plain
                  class="choosePath"
                  @click="chooseResource('link', index)"
                >
                  选择链接
                </el-button>
                <span class="margin-left-20 one-ellipsis">{{
                  item.path_name
                }}</span>
              </div>
              <div class="select-style-item-select" v-if="item.path_type == 2">
                <el-input
                  v-model="item.path"
                  :size="option.size"
                  placeholder="http(s)://"
                ></el-input>
              </div>
            </el-col>
          </el-row>
        </div>
      </draggable>
      <div class="select-style-item-tip">
        <el-button
          slot="append"
          :size="option.size"
          type="primary"
          plain
          @click="addForm('grid-list')"
        >
          添加
        </el-button>
      </div>
    </div>
    <!-- 富文本 -->
    <div v-if="templateForm.type == 'rich-text'" class="decorate-right-write">
      <div class="select-style-item">
        <el-row class="select-style-item-title">
          <el-col :xs="12" :sm="12">
            <div class="select-style-item-tip">富文本</div>
          </el-col>
        </el-row>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip tip-line">点击选择</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <el-input
              v-model="templateForm.content.name"
              placeholder=""
              :size="option.size"
              disabled
            >
              <el-button
                type="primary"
                slot="append"
                :size="option.size"
                plain
                @click="operation('live')"
                >富文本</el-button
              >
            </el-input>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 标题栏 -->
    <div v-if="templateForm.type == 'title-block'" class="decorate-right-write">
      <div
        class="select-style-item"
        :class="templateForm.content.style == '2' ? '' : 'select-style-block'"
      >
        <el-row class="select-style-item-title">
          <el-col :xs="24" :sm="24">
            <div class="select-style-item-tip">
              装饰<span style="margin: 10px 0; padding-left: 10px; color: #999"
                >(建议尺寸:710x84)</span
              >
            </div>
          </el-col>
        </el-row>
        <el-row class="title-block-body">
          <!-- 不存在的字段，判断意义不明 -->
          <div v-if="templateForm.content.style_type">
            <!-- <div class="compotent-title-block-container">
              <div
                class="title-block-title"
                :style="{ color: templateForm.content.color }"
              >
                {{ templateForm.content.name }}
              </div>
              <img
                class="title-block-style"
                :src="titleBlock.data[templateForm.content.style_type - 1].src"
                :style="{ margin: 0 }"
              />
            </div>
            <div class="title-block-btn" @click="selectTitleBlock(null)">
              选择样式
            </div> -->
          </div>
          <div v-else>
            <div v-if="!templateForm.content.image">
              <div
                v-for="(it, index) in titleBlock.data"
                class="compotent-title-block-container"
                :key="index"
                @click="selectTitleBlock(index)"
              >
                <div
                  class="title-block-title"
                  :style="{ color: templateForm.content.color }"
                >
                  {{ templateForm.content.name }}
                </div>
                <img
                  class="title-block-style image-border"
                  :src="it.src"
                  :style="{ margin: index == titleBlock.length - 1 ? '0' : '' }"
                />
              </div>
            </div>
            <div v-else>
              <div class="compotent-title-block-container">
                <div
                  class="title-block-title"
                  :style="{ color: templateForm.content.color }"
                >
                  {{ templateForm.content.name }}
                </div>
                <img
                  class="title-block-style image-border"
                  :src="templateForm.content.image"
                />
              </div>
              <div
                class="title-block-btn"
                style="justify-content: space-around; display: flex"
              >
                <el-button
                  :size="option.size"
                  type="text"
                  @click="selectTitleBlock(null)"
                  >选择样式</el-button
                ><el-button
                  :size="option.size"
                  type="text"
                  @click="chooseResource('picture', index)"
                  >选择图片</el-button
                >
              </div>
            </div>
          </div>
        </el-row>
      </div>
      <div class="select-style-item">
        <el-row class="select-style-item-title">
          <el-col :xs="12" :sm="12">
            <div class="select-style-item-tip">文字</div>
          </el-col>
        </el-row>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip">编辑标题</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select">
              <el-input
                placeholder="最多4个文字"
                maxlength="4"
                :size="option.size"
                v-model="templateForm.content.name"
              >
              </el-input>
            </div>
          </el-col>
        </el-row>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip">颜色</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select">
              <p class="select-color">
                <el-input
                  placeholder=""
                  :size="option.size"
                  v-model="templateForm.content.color"
                >
                </el-input>
                <el-color-picker
                  v-model="templateForm.content.color"
                  :size="option.size"
                >
                </el-color-picker>
              </p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 导航背景色 -->
    <div v-if="templateForm.type == 'nav-bg'" class="decorate-right-write">
      <div class="select-style-item">
        <el-row class="select-style-item-title">
          <el-col :xs="12" :sm="12">
            <div class="select-style-item-tip">导航背景色</div>
          </el-col>
        </el-row>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip">导航背景</div>
          </el-col>
          <el-col :xs="18" :sm="18">
            <div class="select-style-item-select">
              <el-radio-group
                class="item-radio-group"
                v-model="templateForm.content.style"
              >
                <el-radio :label="1">色块</el-radio>
                <el-radio :label="2">图片</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
        <el-row
          class="select-style-item-box"
          v-if="templateForm.content.style == 1"
        >
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip">修改颜色</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select">
              <p class="select-color">
                <el-input
                  placeholder=""
                  :size="option.size"
                  v-model="templateForm.content.color"
                >
                </el-input>
                <el-color-picker
                  v-model="templateForm.content.color"
                  size="small"
                >
                </el-color-picker>
              </p>
            </div>
          </el-col>
        </el-row>
        <el-row
          class="select-style-item-box"
          v-if="templateForm.content.style == '2'"
        >
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip">选择图片</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select">
              <img
                class="select-img image-border"
                :src="
                  templateForm.content.image
                    ? templateForm.content.image
                    : 'https://demo.shopro.top/assets/addons/shopro/img/decorate/image-default.png'
                "
              />
              <el-button
                class="margin-left-20 choosePicture"
                :size="option.size"
                type="primary"
                plain
                @click="chooseResource('picture', index)"
              >
                {{ templateForm.content.image ? "重新选择" : "选择图片" }}
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 分类选项卡 -->
    <div
      v-if="templateForm.type == 'category-tabs'"
      class="decorate-right-write"
    >
      <div class="select-style-item">
        <div class="select-style-item-title">分类商品组</div>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip search-tip">样式选择</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select">
              <el-radio-group
                class="item-radio-group"
                v-model="templateForm.content.style"
              >
                <el-radio :label="1">样式一</el-radio>
                <el-radio :label="2">样式二</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip tip-line">选择分类:</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select input-select-inline">
              <el-input
                :size="option.size"
                v-model="templateForm.content.ids"
                disabled
              >
                <el-button
                  slot="append"
                  :size="option.size"
                  type="primary"
                  plain
                  @click="chooseResource('category-tabs')"
                >
                  选择
                </el-button>
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 个人中心头部 -->
    <div v-if="templateForm.type == 'user'" class="decorate-right-write">
      <div class="select-style-item">
        <el-row class="select-style-item-title">
          <el-col :xs="12" :sm="12">
            <div class="select-style-item-tip">导航背景色</div>
          </el-col>
        </el-row>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip">导航背景</div>
          </el-col>
          <el-col :xs="18" :sm="18">
            <div class="select-style-item-select">
              <el-radio-group
                class="item-radio-group"
                v-model="templateForm.content.style"
              >
                <el-radio :label="1">色块</el-radio>
                <el-radio :label="2">图片</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
        <el-row
          class="select-style-item-box"
          v-if="templateForm.content.style == 1"
        >
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip">修改颜色</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select">
              <p class="select-color">
                <el-input
                  placeholder=""
                  :size="option.size"
                  v-model="templateForm.content.color"
                >
                </el-input>
                <el-color-picker
                  v-model="templateForm.content.color"
                  size="small"
                >
                </el-color-picker>
              </p>
            </div>
          </el-col>
        </el-row>
        <el-row
          class="select-style-item-box"
          v-if="templateForm.content.style == '2'"
        >
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip">选择图片</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select">
              <img
                class="select-img image-border"
                :src="
                  templateForm.content.image
                    ? templateForm.content.image
                    : 'https://demo.shopro.top/assets/addons/shopro/img/decorate/image-default.png'
                "
              />
              <el-button
                :size="option.size"
                type="primary"
                plain
                class="margin-left-20 choosePicture"
                @click="chooseResource('picture', index)"
              >
                {{ templateForm.content.image ? "重新选择" : "选择图片" }}
              </el-button>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0; padding-left: 10px; color: #999">
          <el-col :xs="16" :sm="16" :offset="6"> 建议尺寸:750x320 </el-col>
        </el-row>
      </div>
    </div>
    <!--  -->
    <!--  -->
    <!--  -->
    <!-- 底部导航 -->
    <div v-if="templateForm.type == 'tabbar'" class="decorate-right-write">
      <div class="select-style-item">
        <el-row class="select-style-item-title">
          <el-col :xs="12" :sm="12">
            <div class="select-style-item-tip">样式选择</div>
          </el-col>
        </el-row>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip">选择样式</div>
          </el-col>
          <el-col :xs="18" :sm="18">
            <div class="select-style-item-select">
              <el-radio-group
                class="item-radio-group"
                v-model="templateForm.content.style"
              >
                <el-radio :label="1">图标+文字</el-radio>
                <el-radio :label="2">图标</el-radio>
                <el-radio :label="3">文字</el-radio>
              </el-radio-group>
            </div>
          </el-col>
        </el-row>
      </div>
      <draggable
        :list="templateForm.content.list"
        v-bind="$attrs"
        :animation="100"
        handle=".draggable-handle-move"
      >
        <div
          class="select-style-item"
          v-for="(item, index) in templateForm.content.list"
          :key="index"
        >
          <el-row class="select-style-item-title">
            <el-col :xs="12" :sm="12">
              <div class="display-flex" style="align-items: center">
                <img
                  class="draggable-handle-move"
                  src="https://demo.shopro.top/assets/addons/shopro/img/decorate/move.png"
                />
                <div class="select-style-item-tip">导航图片{{ index + 1 }}</div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12">
              <div class="detele-item">
                <span @click.stop="rightDel(index)">删除</span>
              </div>
            </el-col>
          </el-row>
          <div v-if="templateForm.content.style != 3">
            <el-row class="select-style-item-box">
              <el-col :xs="6" :sm="6">
                <div class="select-style-item-tip">默认图片</div>
              </el-col>
              <el-col :xs="16" :sm="16">
                <div class="select-style-item-select">
                  <img
                    class="select-img select-imgzheng image-border"
                    :src="
                      item.image
                        ? item.image
                        : 'https://demo.shopro.top/assets/addons/shopro/img/decorate/image-default2.png'
                    "
                  />
                  <el-button
                    slot="append"
                    :size="option.size"
                    type="primary"
                    plain
                    class="margin-left-20 choosePicture"
                    @click="chooseResource('picture', index)"
                  >
                    {{ item.image ? "重新选择" : "选择图片" }}
                  </el-button>
                </div>
              </el-col>
            </el-row>
            <el-row class="select-style-item-box">
              <el-col :xs="6" :sm="6">
                <div class="select-style-item-tip">选中图片</div>
              </el-col>
              <el-col :xs="16" :sm="16">
                <div class="select-style-item-select">
                  <img
                    class="select-img select-imgzheng image-border"
                    :src="
                      item.activeImage
                        ? item.activeImage
                        : 'https://demo.shopro.top/assets/addons/shopro/img/decorate/image-default2.png'
                    "
                  />
                  <el-button
                    slot="append"
                    :size="option.size"
                    type="primary"
                    plain
                    class="margin-left-20 choosePicture"
                    @click="chooseResource('picture', index)"
                  >
                    {{ item.activeImage ? "重新选择" : "选择图片" }}
                  </el-button>
                </div>
              </el-col>
            </el-row>
            <el-row style="margin: 10px 0; padding-left: 10px; color: #999">
              <el-col :xs="16" :sm="16" :offset="6"> 建议尺寸:46x46 </el-col>
            </el-row>
          </div>
          <el-row
            class="select-style-item-box"
            v-if="templateForm.content.style != 2"
          >
            <el-col :xs="6" :sm="6">
              <div class="select-style-item-tip">图标名称</div>
            </el-col>
            <el-col :xs="16" :sm="16">
              <div class="select-style-item-select">
                <el-input
                  placeholder="最多4个文字"
                  maxlength="4"
                  :size="option.size"
                  v-model="item.name"
                >
                </el-input>
              </div>
            </el-col>
          </el-row>
          <el-row class="select-style-item-box">
            <el-col :xs="6" :sm="6">
              <div class="select-style-item-tip">选择链接:</div>
            </el-col>
            <el-col :xs="16" :sm="16">
              <div class="select-style-item-select">
                <el-radio-group
                  class="item-radio-group"
                  v-model="item.path_type"
                  @change="clearlink('tabbar', index)"
                >
                  <el-radio :label="1">系统链接</el-radio>
                  <el-radio :label="2">外部链接</el-radio>
                </el-radio-group>
              </div>
            </el-col>
          </el-row>
          <el-row class="select-style-item-box">
            <el-col :xs="16" :sm="16" :offset="6">
              <div class="select-style-item-select" v-if="item.path_type == 1">
                <el-button
                  slot="append"
                  :size="option.size"
                  type="primary"
                  plain
                  class="choosePath"
                  @click="chooseResource('link', index)"
                >
                  选择链接
                </el-button>
                <span class="margin-left-20 one-ellipsis">{{
                  item.path_name
                }}</span>
              </div>
              <div class="select-style-item-select" v-if="item.path_type == 2">
                <el-input
                  v-model="item.path"
                  :size="option.size"
                  placeholder="必须填写http(s)://"
                >
                </el-input>
              </div>
            </el-col>
          </el-row>
        </div>
      </draggable>
      <div
        class="select-style-item-tip"
        v-if="templateForm.content.list.length < 5"
      >
        <el-button
          slot="append"
          :size="option.size"
          type="primary"
          plain
          @click.stop="addForm('tabbar')"
        >
          添加
        </el-button>
      </div>
      <div class="select-style-item" v-if="templateForm.content.style != 2">
        <el-row class="select-style-item-title">
          <el-col :xs="12" :sm="12">
            <div class="select-style-item-tip">文字颜色</div>
          </el-col>
        </el-row>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip">默认颜色</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select">
              <p class="select-color">
                <el-input
                  placeholder=""
                  :size="option.size"
                  v-model="templateForm.content.color"
                >
                </el-input>
                <el-color-picker
                  v-model="templateForm.content.color"
                  size="small"
                >
                </el-color-picker>
              </p>
            </div>
          </el-col>
        </el-row>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip">选中颜色</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select">
              <p class="select-color">
                <el-input
                  placeholder=""
                  :size="option.size"
                  v-model="templateForm.content.activeColor"
                >
                </el-input>
                <el-color-picker
                  v-model="templateForm.content.activeColor"
                  size="small"
                >
                </el-color-picker>
              </p>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="select-style-item">
        <el-row class="select-style-item-title">
          <el-col :xs="12" :sm="12">
            <div class="select-style-item-tip">背景颜色</div>
          </el-col>
        </el-row>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip">默认颜色</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select">
              <p class="select-color">
                <el-input
                  placeholder=""
                  :size="option.size"
                  v-model="templateForm.content.bgcolor"
                >
                </el-input>
                <el-color-picker
                  v-model="templateForm.content.bgcolor"
                  size="small"
                >
                </el-color-picker>
              </p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 弹窗提醒 -->
    <div v-if="templateForm.type == 'popup'" class="decorate-right-write">
      <draggable
        :list="templateForm.content.list"
        v-bind="$attrs"
        :animation="100"
      >
        <div
          class="select-style-item select-style-block"
          v-for="(item, index) in templateForm.content.list"
          :key="index"
        >
          <el-row class="select-style-item-title">
            <el-col :xs="12" :sm="12">
              <div class="select-style-item-tip">弹窗设置{{ index + 1 }}</div>
            </el-col>
            <el-col :xs="12" :sm="12">
              <div class="detele-item">
                <span @click.stop="rightDel(index)">删除</span>
              </div>
            </el-col>
          </el-row>
          <el-row class="select-style-item-box">
            <el-col :xs="6" :sm="6">
              <div class="select-style-item-tip">弹窗图片</div>
            </el-col>
            <el-col :xs="16" :sm="16">
              <div class="select-style-item-select">
                <img
                  class="select-img image-border"
                  :src="
                    item.image
                      ? item.image
                      : 'https://demo.shopro.top/assets/addons/shopro/img/decorate/image-default.png'
                  "
                />
                <el-button
                  class="margin-left-20 choosePicture"
                  :size="option.size"
                  type="primary"
                  plain
                  @click="chooseResource('picture', index)"
                >
                  {{ item.image ? "重新选择" : "选择图片" }}
                </el-button>
              </div>
            </el-col>
          </el-row>
          <el-row style="margin: 10px 0; padding-left: 10px; color: #999">
            <el-col :xs="16" :sm="16" :offset="6"> 建议尺寸:612x836 </el-col>
          </el-row>
          <el-row class="select-style-item-box">
            <el-col :xs="6" :sm="6">
              <div class="select-style-item-tip">选择链接:</div>
            </el-col>
            <el-col :xs="16" :sm="16">
              <div class="select-style-item-select">
                <el-radio-group
                  class="item-radio-group"
                  v-model="item.path_type"
                  @change="clearlink(index)"
                >
                  <el-radio :label="1">系统链接</el-radio>
                  <el-radio :label="2">外部链接</el-radio>
                </el-radio-group>
              </div>
            </el-col>
          </el-row>
          <el-row class="select-style-item-box">
            <el-col :xs="16" :sm="16" :offset="6">
              <div class="select-style-item-select" v-if="item.path_type == 1">
                <el-button
                  slot="append"
                  :size="option.size"
                  type="primary"
                  plain
                  class="choosePath"
                  @click="chooseResource('link', index)"
                >
                  选择链接
                </el-button>
                <span class="margin-left-20 one-ellipsis">{{
                  item.path_name
                }}</span>
              </div>
              <div class="select-style-item-select" v-if="item.path_type == 2">
                <el-input
                  v-model="item.path"
                  :size="option.size"
                  placeholder="http(s)://"
                ></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row class="select-style-item-box">
            <el-col :xs="6" :sm="6">
              <div class="select-style-item-tip">显示类型</div>
            </el-col>
            <el-col :xs="18" :sm="18">
              <div class="select-style-item-select">
                <el-radio-group class="item-radio-group" v-model="item.style">
                  <el-radio :label="1">仅首次</el-radio>
                  <el-radio :label="2">多次</el-radio>
                </el-radio-group>
              </div>
            </el-col>
          </el-row>
          <el-row
            v-if="item.style == 1"
            style="margin: 10px 0; padding-left: 10px; color: #999"
          >
            <el-col :xs="16" :sm="16" :offset="6">
              进入商城只显示一次广告弹窗，再次进入商城依旧显示一次
            </el-col>
          </el-row>
          <el-row
            v-if="item.style == 2"
            style="margin: 10px 0; padding-left: 10px; color: #999"
          >
            <el-col :xs="16" :sm="16" :offset="6">
              每次进入该商城页面显示广告弹窗
            </el-col>
          </el-row>
        </div>
      </draggable>
      <div class="select-style-item-tip">
        <el-button
          slot="append"
          :size="option.size"
          type="primary"
          plain
          @click="addForm('popup')"
        >
          添加
        </el-button>
      </div>
    </div>
    <!-- 悬浮按钮 -->
    <div
      v-if="templateForm.type == 'float-button'"
      class="decorate-right-write"
    >
      <div class="select-style-item">
        <el-row class="select-style-item-title">
          <el-col :xs="12" :sm="12">
            <div class="select-style-item-tip">按钮图片</div>
          </el-col>
        </el-row>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip">按钮图片</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select">
              <el-image
                class="select-img select-imgzheng image-border"
                :src="templateForm.content.image"
                fit="contain"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <el-button
                class="margin-left-20 choosePicture"
                :size="option.size"
                type="primary"
                slot="append"
                plain
                @click="chooseResource('picture', -1)"
              >
                {{ templateForm.content.image ? "重新选择" : "选择图片" }}
              </el-button>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0; padding-left: 10px; color: #999">
          <el-col :xs="16" :sm="16" :offset="6"> 建议尺寸:80x80 </el-col>
        </el-row>
      </div>
      <draggable
        :list="templateForm.content.list"
        v-bind="$attrs"
        :animation="100"
        handle=".draggable-handle-move"
      >
        <div
          class="select-style-item"
          v-for="(item, index) in templateForm.content.list"
          :key="index"
        >
          <el-row class="select-style-item-title">
            <el-col :xs="12" :sm="12">
              <div class="display-flex" style="align-items: center">
                <img
                  class="draggable-handle-move"
                  src="https://demo.shopro.top/assets/addons/shopro/img/decorate/move.png"
                />
                <div class="select-style-item-tip">按钮编辑{{ index + 1 }}</div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12">
              <div class="detele-item">
                <span @click.stop="rightDel(index)">删除</span>
              </div>
            </el-col>
          </el-row>
          <el-row class="select-style-item-box">
            <el-col :xs="6" :sm="6">
              <div class="select-style-item-tip">图标名称</div>
            </el-col>
            <el-col :xs="16" :sm="16">
              <div class="select-style-item-select">
                <el-input
                  placeholder="最多4个文字"
                  :size="option.size"
                  v-model="item.name"
                  maxlength="4"
                >
                </el-input>
              </div>
            </el-col>
          </el-row>
          <el-row class="select-style-item-box">
            <el-col :xs="6" :sm="6">
              <div class="select-style-item-tip">按钮图片</div>
            </el-col>
            <el-col :xs="16" :sm="16">
              <div class="select-style-item-select">
                <img
                  class="select-img select-imgzheng image-border"
                  :src="
                    item.btnimage
                      ? item.btnimage
                      : 'https://demo.shopro.top/assets/addons/shopro/img/decorate/image-default2.png'
                  "
                />
                <el-button
                  class="margin-left-20 choosePicture"
                  :size="option.size"
                  slot="append"
                  type="primary"
                  plain
                  @click="chooseResource('picture', index)"
                >
                  {{ item.btnimage ? "重新选择" : "选择图片" }}
                </el-button>
              </div>
            </el-col>
          </el-row>
          <el-row style="margin: 10px 0; padding-left: 10px; color: #999">
            <el-col :xs="16" :sm="16" :offset="6"> 建议尺寸:80x80 </el-col>
          </el-row>
          <el-row class="select-style-item-box">
            <el-col :xs="6" :sm="6">
              <div class="select-style-item-tip">显示类型</div>
            </el-col>
            <el-col :xs="18" :sm="18">
              <div class="select-style-item-select">
                <el-radio-group class="item-radio-group" v-model="item.style">
                  <el-radio :label="1">弹窗样式</el-radio>
                  <el-radio :label="2">页面链接</el-radio>
                </el-radio-group>
              </div>
            </el-col>
          </el-row>
          <el-row class="select-style-item-box" v-if="item.style == 1">
            <el-col :xs="6" :sm="6">
              <div class="select-style-item-tip">弹窗图片</div>
            </el-col>
            <el-col :xs="16" :sm="16">
              <div class="select-style-item-select">
                <img
                  class="select-img image-border"
                  :src="
                    item.image
                      ? item.image
                      : 'https://demo.shopro.top/assets/addons/shopro/img/decorate/image-default.png'
                  "
                />
                <el-button
                  class="margin-left-20 choosePicture"
                  :size="option.size"
                  type="primary"
                  slot="append"
                  plain
                  @click="chooseResource('picture', index)"
                >
                  {{ item.image ? "重新选择" : "选择图片" }}
                </el-button>
              </div>
            </el-col>
          </el-row>
          <div v-if="item.style == 2">
            <el-row class="select-style-item-box">
              <el-col :xs="6" :sm="6">
                <div class="select-style-item-tip">选择链接:</div>
              </el-col>
              <el-col :xs="16" :sm="16">
                <div class="select-style-item-select">
                  <el-radio-group
                    class="item-radio-group"
                    v-model="item.path_type"
                    @change="clearlink(index)"
                  >
                    <el-radio :label="1">系统链接</el-radio>
                    <el-radio :label="2">外部链接</el-radio>
                  </el-radio-group>
                </div>
              </el-col>
            </el-row>
            <el-row class="select-style-item-box">
              <el-col :xs="16" :sm="16" :offset="6">
                <div
                  class="select-style-item-select"
                  v-if="item.path_type == 1"
                >
                  <el-button
                    slot="append"
                    :size="option.size"
                    type="primary"
                    plain
                    class="choosePath"
                    @click="chooseResource('link', index)"
                  >
                    选择链接
                  </el-button>
                  <span class="margin-left-20 one-ellipsis">{{
                    item.path_name
                  }}</span>
                </div>
                <div
                  class="select-style-item-select"
                  v-if="item.path_type == 2"
                >
                  <el-input
                    v-model="item.path"
                    :size="option.size"
                    placeholder="http(s)://"
                  >
                  </el-input>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </draggable>
      <div class="select-style-item-tip">
        <el-button
          slot="append"
          :size="option.size"
          type="primary"
          plain
          @click="addForm('float-button')"
        >
          添加
        </el-button>
      </div>
    </div>
    <!--  -->
    <!--  -->
    <!--  -->
    <!-- 资源表弹窗组件 -->
    <resourceTable
      width="75%"
      :dialogVisible.sync="dialogVisible"
      :dialogTitle="dialogTitle"
      :currentListIdx="currentListIdx"
      :resourceType="resourceType"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { validatenull } from "@/util/validate";
import option from "@/const/decorate/dodecorate";
import draggable from "vuedraggable";

export default {
  name: "ToolsForm",
  comments: {
    draggable,
  },
  props: {
    isfloat: Boolean,
    popupIndex: Number,
    centerSelect: Number,
    fromtype: String,
    templateData: Array,
    templateForm: Object,
  },
  data() {
    return {
      // 表单配置
      option: option,
      // 广告样式抽屉状态
      advdrawer: false,
      // 资源表弹窗状态
      dialogVisible: false,
      // 广告魔方数据
      advStyleImage: [
        {
          src: "https://demo.shopro.top/assets/addons/shopro/img/decorate/adv_01.png",
          num: 1,
        },
        {
          src: "https://demo.shopro.top/assets/addons/shopro/img/decorate/adv_02.png",
          num: 2,
        },
        {
          src: "https://demo.shopro.top/assets/addons/shopro/img/decorate/adv_03.png",
          num: 3,
        },
        {
          src: "https://demo.shopro.top/assets/addons/shopro/img/decorate/adv_04.png",
          num: 3,
        },
        {
          src: "https://demo.shopro.top/assets/addons/shopro/img/decorate/adv_05.png",
          num: 3,
        },
        {
          src: "https://demo.shopro.top/assets/addons/shopro/img/decorate/adv_06.png",
          num: 3,
        },
        {
          src: "https://demo.shopro.top/assets/addons/shopro/img/decorate/adv_07.png",
          num: 5,
        },
      ],
      // 标题栏样式
      titleBlock: {
        isSelected: false,
        data: [
          {
            src: "https://file.shopro.top/imgs/title1.png",
            selected: false,
          },
          {
            src: "https://file.shopro.top/imgs/title2.png",
            selected: false,
          },
          {
            src: "https://file.shopro.top/imgs/title3.png",
            selected: false,
          },
          {
            src: "https://file.shopro.top/imgs/title4.png",
            selected: false,
          },
          {
            src: "https://file.shopro.top/imgs/title5.png",
            selected: false,
          },
        ],
        currentImage: "",
      },
      // 弹窗名称
      dialogTitle: "",
      // 当前表单列表
      currentListIdx: null,
      // 资源类型
      resourceType: "",
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
    // 删除表单列表项
    rightDel(index) {
      this.$emit("update:popupIndex", null);
      this.templateData[this.centerSelect].content.list.splice(index, 1);
      this.$forceUpdate();
    },
    // 选择装修资源
    chooseResource(type, index = null) {
      this.currentListIdx = index;
      this.resourceType = type;
      switch (type) {
        case "picture":
          this.dialogTitle = "选择图片";
          break;
        case "link":
          this.dialogTitle = "选择链接";
          break;
        case "goods-group":
          this.dialogTitle = "选择分类";
          break;
        case 'goods-list':
          this.dialogTitle = "商品列表"
          break;
        case 'category-tabs':
          this.dialogTitle = "选择分类"
          this.resourceType = 'goods-group'
          break;
      }
      this.dialogVisible = true;
    },
    // 清空链接数据
    clearlink(type, index) {
      if (type == this.templateForm.type) {
        this.templateForm.content.list[index].path = "";
        this.templateForm.content.list[index].path_name = "";
      }
      this.$forceUpdate();
    },
    // 添加表单
    addForm(type) {
      let form = {};
      switch (type) {
        case "banner":
          form = {
            image: "",
            path: "",
            path_type: 1,
            name: "",
            bgcolor: "",
            path_name: "",
          };
          break;
        case "menu":
          form = {
            image: "",
            path: "",
            name: "",
            path_name: "",
            path_type: 1,
          };
          break;
        case "nav-list":
          form = {
            name: "",
            image: "",
            path: "",
            path_name: "",
            path_type: 1,
          };
          break;
        case "grid-list":
          form = {
            name: "",
            image: "",
            path: "",
            path_name: "",
            path_type: 1,
          };
          break;
        case "tabbar":
          form = {
            name: "",
            image: "",
            activeImage: "",
            path: "",
            path_name: "",
            path_type: 1,
            selected: false,
          };
          break;
        case "popup":
          form = {
            image: "",
            path: "",
            path_name: "",
            path_type: 1,
            style: 1,
          };
          break;
        case "float-button":
          form = {
            name: "",
            style: 1,
            image: "",
            btnimage: "",
            path: "",
            path_name: "",
            path_type: 1,
          };
          break;
      }
      this.templateData[this.centerSelect].content.list.push(form);
      this.$forceUpdate();
    },
    // 展开广告样式抽屉
    showDrawer() {
      this.advdrawer = true;
    },
    // 选择广告样式
    changeAdv(index, num) {
      this.templateData[this.centerSelect].content.list = [];
      this.templateData[this.centerSelect].content.style = index + 1;
      for (let i = 0; i < num; i++) {
        this.templateData[this.centerSelect].content.list.push({
          image: "",
          name: "",
          path: "",
          path_name: "",
          path_type: 1,
        });
      }
      const { centerSelect } = this;
      this.$emit("showForm", centerSelect);
      this.advdrawer = false;
      this.$forceUpdate();
    },
    // 选择标题栏样式
    selectTitleBlock(index) {
      if (index != null) {
        this.titleBlock.isSelected = true;
        this.templateData[this.centerSelect].content.image =
          this.titleBlock.data[index].src;
        this.titleBlock.currentImage = this.titleBlock.data[index].src;
      } else {
        this.titleBlock.isSelected = false;
        this.templateData[this.centerSelect].content.image = "";
      }
    },
    // 自定义列表商品图片排序
    goodsListEnd() {
      this.templateForm.content.ids = "";
      const idsArr = [];
      this.templateForm.content.timeData.forEach((t) => {
        idsArr.push(t.id);
      });
      this.templateForm.content.ids = idsArr.join(",");
      this.$forceUpdate();
    },
    // 删除自定义列表商品图片
    customList(index) {
      this.templateData[this.centerSelect].content.timeData.splice(index, 1);
      let idsArr = this.templateData[this.centerSelect].content.ids.split(",");
      idsArr.splice(index, 1);
      this.templateData[this.centerSelect].content.ids = idsArr.join(",");
      this.templateForm.content.ids = idsArr.join(",");
      this.$forceUpdate();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/views/decorate/style/dodecorate_origin";
</style>
