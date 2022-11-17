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
              <div class="select-style-item-tip">选择图片:</div>
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
                  @click="choosePicture('banner', index)"
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
                  @change="isweblink('banner', index)"
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
                  :data-index="index"
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
                  size="mini"
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
              class="item-radio-group"
              v-model="templateForm.content.style"
            >
              <el-radio :label="4">4列</el-radio>
              <el-radio :label="5">5列</el-radio>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>
      <draggable
        :list="templateForm.content.list"
        v-bind="$attrs"
        :options="{ animation: 200 }"
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
                  src="/assets/addons/shopro/img/decorate/move.png"
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
                  size="mini"
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
                      : '/assets/addons/shopro/img/decorate/image-default2.png'
                  "
                />
                <div
                  class="btn-common margin-left-20 choosePicture"
                  :data-index="index"
                >
                  {{ item.image ? "重新选择" : "选择图片" }}
                </div>
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
                  @change="isweblink('menu', index)"
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
                <div class="btn-common choosePath" :data-index="index">
                  选择链接
                </div>
                <span class="margin-left-20 one-ellipsis">{{
                  item.path_name
                }}</span>
              </div>
              <div class="select-style-item-select" v-if="item.path_type == 2">
                <el-input
                  v-model="item.path"
                  size="mini"
                  placeholder="http(s)://"
                ></el-input>
              </div>
            </el-col>
          </el-row>
        </div>
      </draggable>
      <div class="select-style-item-tip">
        <div @click.stop="addForm('menu')" class="btn-common">添加</div>
      </div>
    </div>
    <!-- 广告魔方 -->
    <div v-if="templateForm.type == 'adv'" class="decorate-right-write">
      <div class="select-style-con">
        <img :src="advStyleImage[templateForm.content.style - 1].src" />
        <div class="chooseAdvPic" @click.stop="chooseAdvPic">选择风格</div>
      </div>
      <draggable
        :list="templateForm.content.list"
        v-bind="$attrs"
        :options="{ animation: 200 }"
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
              src="/assets/addons/shopro/img/decorate/move.png"
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
                      : '/assets/addons/shopro/img/decorate/image-default.png'
                  "
                />
                <div
                  class="btn-common margin-left-20 choosePicture"
                  :data-index="index"
                >
                  {{ item.image ? "重新选择" : "选择图片" }}
                </div>
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
                  @change="isweblink('adv', index)"
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
                <div class="btn-common choosePath" :data-index="index">
                  选择链接
                </div>
                <span class="margin-left-20 one-ellipsis">{{
                  item.path_name
                }}</span>
              </div>
              <div class="select-style-item-select" v-if="item.path_type == 2">
                <el-input
                  v-model="item.path"
                  size="mini"
                  placeholder="http(s)://"
                ></el-input>
              </div>
            </el-col>
          </el-row>
        </div>
      </draggable>
    </div>
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
                size="mini"
                v-model="templateForm.content.category_name"
                disabled
              >
              </el-input>
              <div
                class="btn-common input-select-btn"
                @click="operation('goods-group')"
              >
                选择
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 自定义菜单 -->
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
            <div class="select-style-item-tip tip-line">选择商品:</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select input-select-inline">
              <el-input size="mini" v-model="templateForm.content.ids" disabled>
              </el-input>
              <div
                class="btn-common input-select-btn"
                @click="operation('goods-list')"
              >
                选择
              </div>
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
            :options="{ animation: 100 }"
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
              <el-input size="mini" v-model="templateForm.content.ids" disabled>
              </el-input>
              <div
                class="btn-common input-select-btn"
                @click="operation('coupons')"
              >
                选择
              </div>
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
                size="mini"
              ></el-input>
              <el-color-picker
                v-model="templateForm.content.bgcolor1"
                size="mini"
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
                size="mini"
              ></el-input>
              <el-color-picker
                v-model="templateForm.content.bgcolor2"
                size="mini"
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
                size="mini"
              ></el-input>
              <el-color-picker
                v-model="templateForm.content.pricecolor"
                size="mini"
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
                size="mini"
              ></el-input>
              <el-color-picker
                v-model="templateForm.content.color"
                size="mini"
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
                size="mini"
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
                size="mini"
                v-model="templateForm.content.groupon_name"
                disabled
              >
              </el-input>
              <div
                class="btn-common input-select-btn"
                @click="operation('groupon')"
              >
                选择
              </div>
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
                size="mini"
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
                size="mini"
                v-model="templateForm.content.seckill_name"
                disabled
              >
              </el-input>
              <div
                class="btn-common input-select-btn"
                @click="operation('seckill')"
              >
                选择
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 直播 -->
    <div v-if="templateForm.type == 'live'" class="decorate-right-write">
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
      <div class="select-style-item">
        <div class="select-style-item-title">直播</div>
        <el-row class="select-style-item-box">
          <el-col :xs="6" :sm="6">
            <div class="select-style-item-tip search-tip">直播名称</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select">
              <el-input
                v-model="templateForm.content.name"
                size="mini"
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
              <el-input size="mini" v-model="templateForm.content.ids" disabled>
              </el-input>
              <div
                class="btn-common input-select-btn"
                @click="operation('live')"
              >
                选择
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
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
        :options="{ animation: 100 }"
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
                  src="/assets/addons/shopro/img/decorate/move.png"
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
                        : '/assets/addons/shopro/img/decorate/image-default2.png'
                    "
                  />
                  <div
                    class="btn-common margin-left-20 choosePicture"
                    :data-index="index"
                  >
                    {{ item.image ? "重新选择" : "选择图片" }}
                  </div>
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
                        ? Fast.api.cdnurl(item.activeImage)
                        : '/assets/addons/shopro/img/decorate/image-default2.png'
                    "
                  />
                  <div
                    class="btn-common margin-left-20 choosePicture"
                    :data-index="index"
                    :data-active="'active'"
                  >
                    {{ item.activeImage ? "重新选择" : "选择图片" }}
                  </div>
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
                  size="mini"
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
                  @change="isweblink('tabbar', index)"
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
                <div class="btn-common choosePath" :data-index="index">
                  选择链接
                </div>
                <span class="margin-left-20 one-ellipsis">{{
                  item.path_name
                }}</span>
              </div>
              <div class="select-style-item-select" v-if="item.path_type == 2">
                <el-input
                  v-model="item.path"
                  size="mini"
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
        <div @click.stop="addForm('tabbar')" class="btn-common">添加</div>
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
                  size="mini"
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
                  size="mini"
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
                  size="mini"
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
    <!-- 列表导航 -->
    <div v-if="templateForm.type == 'nav-list'" class="decorate-right-write">
      <draggable
        :list="templateForm.content.list"
        v-bind="$attrs"
        :options="{ animation: 100 }"
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
                  src="/assets/addons/shopro/img/decorate/move.png"
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
                      : '/assets/addons/shopro/img/decorate/image-default2.png'
                  "
                />
                <div
                  class="btn-common margin-left-20 choosePicture"
                  :data-index="index"
                >
                  {{ item.image ? "重新选择" : "选择图片" }}
                </div>
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
                  size="mini"
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
                  @change="isweblink('nav-list', index)"
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
                <div class="btn-common choosePath" :data-index="index">
                  选择链接
                </div>
                <span class="margin-left-20 one-ellipsis">{{
                  item.path_name
                }}</span>
              </div>
              <div class="select-style-item-select" v-if="item.path_type == 2">
                <el-input
                  v-model="item.path"
                  size="mini"
                  placeholder="http(s)://"
                ></el-input>
              </div>
            </el-col>
          </el-row>
        </div>
      </draggable>
      <div class="select-style-item-tip">
        <div @click.stop="addForm('nav-list')" class="btn-common">添加</div>
      </div>
    </div>
    <!-- 宫格列表 -->
    <div v-if="templateForm.type == 'grid-list'" class="decorate-right-write">
      <draggable
        :list="templateForm.content.list"
        v-bind="$attrs"
        :options="{ animation: 100 }"
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
                  src="/assets/addons/shopro/img/decorate/move.png"
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
                      : '/assets/addons/shopro/img/decorate/image-default2.png'
                  "
                />
                <div
                  class="btn-common margin-left-20 choosePicture"
                  :data-index="index"
                >
                  {{ item.image ? "重新选择" : "选择图片" }}
                </div>
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
                  size="mini"
                  v-model="item.name"
                  maxlength="4"
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
                  @change="isweblink('grid-list', index)"
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
                <div class="btn-common choosePath" :data-index="index">
                  选择链接
                </div>
                <span class="margin-left-20 one-ellipsis">{{
                  item.path_name
                }}</span>
              </div>
              <div class="select-style-item-select" v-if="item.path_type == 2">
                <el-input
                  v-model="item.path"
                  size="mini"
                  placeholder="http(s)://"
                ></el-input>
              </div>
            </el-col>
          </el-row>
        </div>
      </draggable>
      <div class="select-style-item-tip">
        <div @click.stop="addForm('grid-list')" class="btn-common">添加</div>
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
            <div class="select-style-item-tip">点击选择:</div>
          </el-col>
          <el-col :xs="16" :sm="16">
            <div class="select-style-item-select">
              <div class="btn-common chooseRichText">富文本</div>
              <span class="margin-left-20 one-ellipsis">{{
                templateForm.content.name
              }}</span>
            </div>
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
          <div v-if="templateForm.content.style_type">
            <div class="compotent-title-block-container">
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
            </div>
          </div>
          <div v-else>
            <div v-if="!templateForm.content.image">
              <div
                v-for="(it, idx) in titleBlock.data"
                class="compotent-title-block-container"
                :key="idx"
                @click="selectTitleBlock(idx)"
              >
                <div
                  class="title-block-title"
                  :style="{ color: templateForm.content.color }"
                >
                  {{ templateForm.content.name }}
                </div>
                <img
                  class="title-block-style image-border"
                  :src="Fast.api.cdnurl(it.src)"
                  :style="{ margin: idx == titleBlock.length - 1 ? '0' : '' }"
                />
              </div>
            </div>
            <div v-if="templateForm.content.image">
              <div class="compotent-title-block-container">
                <div
                  class="title-block-title"
                  :style="{ color: templateForm.content.color }"
                >
                  {{ templateForm.content.name }}
                </div>
                <img
                  class="title-block-style image-border"
                  :src="Fast.api.cdnurl(templateForm.content.image)"
                />
              </div>
              <div
                class="title-block-btn"
                style="justify-content: space-around; display: flex"
              >
                <span @click="selectTitleBlock(null)">选择样式</span
                ><span class="choosePicture" data-index="title-block"
                  >选择图片</span
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
                size="mini"
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
                  size="mini"
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
                  size="mini"
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
                    ? Fast.api.cdnurl(templateForm.content.image)
                    : '/assets/addons/shopro/img/decorate/image-default.png'
                "
              />
              <div
                class="btn-common margin-left-20 choosePicture"
                data-index="image"
              >
                {{ templateForm.content.image ? "重新选择" : "选择图片" }}
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
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
              <el-input size="mini" v-model="templateForm.content.ids" disabled>
              </el-input>
              <div
                class="btn-common input-select-btn"
                @click="operation('category-tabs')"
              >
                选择
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 弹窗 -->
    <div v-if="templateForm.type == 'popup'" class="decorate-right-write">
      <draggable
        :list="templateForm.content.list"
        v-bind="$attrs"
        :options="{ animation: 100 }"
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
                      : '/assets/addons/shopro/img/decorate/image-default.png'
                  "
                />
                <div
                  class="btn-common margin-left-20 choosePicture"
                  :data-index="index"
                >
                  {{ item.image ? "重新选择" : "选择图片" }}
                </div>
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
                  @change="isweblink(index)"
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
                <div class="btn-common choosePath" :data-index="index">
                  选择链接
                </div>
                <span class="margin-left-20 one-ellipsis">{{
                  item.path_name
                }}</span>
              </div>
              <div class="select-style-item-select" v-if="item.path_type == 2">
                <el-input
                  v-model="item.path"
                  size="mini"
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
        <div @click.stop="addForm('popup')" class="btn-common">添加</div>
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
                  size="mini"
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
                    ? Fast.api.cdnurl(templateForm.content.image)
                    : '/assets/addons/shopro/img/decorate/image-default.png'
                "
              />
              <div
                class="btn-common margin-left-20 choosePicture"
                data-index="image"
              >
                {{ templateForm.content.image ? "重新选择" : "选择图片" }}
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0; padding-left: 10px; color: #999">
          <el-col :xs="16" :sm="16" :offset="6"> 建议尺寸:750x320 </el-col>
        </el-row>
      </div>
    </div>
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
                :src="Fast.api.cdnurl(templateForm.content.image)"
                fit="contain"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <div
                class="btn-common margin-left-20 choosePicture"
                data-index="image"
              >
                {{ templateForm.content.image ? "重新选择" : "选择图片" }}
              </div>
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
        :options="{ animation: 100 }"
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
                  src="/assets/addons/shopro/img/decorate/move.png"
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
                  size="mini"
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
                      ? Fast.api.cdnurl(item.btnimage)
                      : '/assets/addons/shopro/img/decorate/image-default2.png'
                  "
                />
                <div
                  class="btn-common margin-left-20 choosePicture"
                  :data-index="index"
                  data-type="btn"
                >
                  {{ item.image ? "重新选择" : "选择图片" }}
                </div>
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
                      : '/assets/addons/shopro/img/decorate/image-default.png'
                  "
                />
                <div
                  class="btn-common margin-left-20 choosePicture"
                  :data-index="index"
                >
                  {{ item.image ? "重新选择" : "选择图片" }}
                </div>
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
                    @change="isweblink(index)"
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
                  <div class="btn-common choosePath" :data-index="index">
                    选择链接
                  </div>
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
                    size="mini"
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
        <div @click.stop="addForm('float-button')" class="btn-common">添加</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { validatenull } from "@/util/validate";
import option from "@/const/decorate/dodecorate";
import draggable from "vuedraggable";

export default {
  /*
   * 父组件传来的数据 centerSelect templateForm fromtype
   * 父组件绑定的事件
   */
  name: "ToolsForm",
  comments: {
    draggable,
  },
  props: {
    isfloat: Boolean,
    popupIndex: Number,
    fromtype: String,
    centerSelect: Number,
    templateData: {
      type: Array,
      required: true,
      default: () => [],
    },
    templateForm: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      // 表单配置
      option: option,
      fromtype: this.fromtype,
      centerSelect: this.centerSelect,
      templateForm: this.templateForm,
      templateData: this.templateData,
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
    // 删除子元素
    rightDel(index) {
      let that = this;
      that.$emit("update:popupIndex", null);
      that.templateData[that.centerSelect].content.list.splice(index, 1);
    },
    // 选择图片
    choosePicture(type, index) {},
    // 选择链接
    isweblink(type, index) {
      let that = this;
      that.templateForm.content.list[index].path = "";
      that.templateForm.content.list[index].path_name = "";
    },
    // 添加表单
    addForm(type) {
      let that = this;
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
          //this.isfloat = false;
          that.$emit("update:isfloat", false);
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
      that.templateData[that.centerSelect].content.list.push(form);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "@/views/dodecorate/style/dodecorate_origin";
</style>

