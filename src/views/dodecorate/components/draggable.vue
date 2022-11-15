<template>
  <!-- 拖放模块 -->
  <div
    :class="isPageType == 'home' || fromtype == 'custom' ? 'home-custom' : ''"
    class="center-draggable"
  >
    <template v-if="templateData && templateData.length > 0">
      <div
        class="compotent-item"
        v-for="(compotent, index) in templateData"
        @click.stop="showForm(index)"
        :key="index"
      >
        <div class="seat-item">可放在此处</div>
        <!-- 装修 -->
        <div class="compotent-item-container">
          <!-- search -->
          <div
            class="
              compotent-item-container-item
              compotent-item-container-item-padding
            "
            :class="index == centerSelect ? 'selected' : ''"
            v-if="compotent.type == 'search'"
          >
            <div class="compotent-search">
              <i class="el-icon-search"></i>
              <span>{{ compotent.content }}</span>
            </div>
          </div>
          <!-- banner -->
          <div
            v-if="compotent.type == 'banner' && compotent.content"
            class="compotent-banner compotent-item-container-item-margin"
            :class="[
              index == centerSelect ? 'selected' : '',
              index == 0 && fromtype == 'shop' ? 'undraggable' : '',
            ]"
            :style="{
              background: centerSelect == 0 ? 'rgba(238,238,238,1)' : '#f6f6f6',
            }"
          >
            <div
              v-if="index == 0 && fromtype == 'shop'"
              class="header-name display-flex"
              style="justify-content: space-between"
            >
              <span>{{ shoproName }}</span>
              <div class="header-input">
                <i class="el-icon-search"></i>
              </div>
            </div>
            <el-carousel
              trigger="click"
              :height="compotent.content.height * 0.5 + 'px'"
              :autoplay="false"
            >
              <el-carousel-item
                v-for="(it, index) in compotent.content.list"
                :key="index"
              >
                <div
                  :style="{
                    height: compotent.content.height * 0.5 + 'px',
                    overflow: 'hidden',
                    padding:
                      compotent.content.y * 0.5 +
                      'px ' +
                      compotent.content.x * 0.5 +
                      'px',
                  }"
                >
                  <el-image
                    :style="{
                      'border-radius': compotent.content.radius * 0.5 + 'px',
                    }"
                    v-if="it.image"
                    class="label-auto"
                    :src="it.image"
                    fit="cover"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <!-- adv -->
          <div
            class="compotent-adv compotent-item-container-item-margin"
            :class="index == centerSelect ? 'selected' : ''"
            v-if="compotent.type == 'adv' && compotent.content"
          >
            <!-- 1 -->
            <div
              v-if="compotent.content.style == 1"
              class="compotent-adv-1 compotent-adv-image"
            >
              <el-image
                v-if="compotent.content.list[0].image"
                :src="compotent.content.list[0].image"
                fit="cover"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
            <!-- 2 -->
            <div v-if="compotent.content.style == 2" class="compotent-adv-2">
              <div
                class="adv-width-50 adv-height-100 compotent-adv-image"
                v-for="(it, idx) in compotent.content.list"
                :key="idx"
              >
                <el-image
                  v-if="it.image"
                  :src="it.image"
                  fit="cover"
                >
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div>
            </div>
            <!-- 3 -->
            <div v-if="compotent.content.style == 3" class="compotent-adv-3">
              <div
                class="
                  adv-width-50 adv-height-100 adv-line-right
                  compotent-adv-image
                "
              >
                <el-image
                  v-if="compotent.content.list[0].image"
                  :src="compotent.content.list[0].image"
                  fit="cover"
                >
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div>
              <div class="adv-width-50 adv-height-100">
                <div
                  class="
                    adv-width-100 adv-height-50 adv-line-bottom
                    compotent-adv-image
                  "
                >
                  <el-image
                    v-if="compotent.content.list[1].image"
                    :src="compotent.content.list[1].image"
                    fit="cover"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
                <div class="adv-width-100 adv-height-50 compotent-adv-image">
                  <el-image
                    v-if="compotent.content.list[2].image"
                    :src="compotent.content.list[2].image"
                    fit="cover"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
              </div>
            </div>
            <!-- 4 -->
            <div v-if="compotent.content.style == 4" class="compotent-adv-4">
              <div class="adv-width-50 adv-height-100 adv-line-right">
                <div
                  class="
                    adv-width-100 adv-height-50 adv-line-bottom
                    compotent-adv-image
                  "
                >
                  <el-image
                    v-if="compotent.content.list[0].image"
                    :src="compotent.content.list[0].image"
                    fit="cover"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
                <div class="adv-width-100 adv-height-50 compotent-adv-image">
                  <el-image
                    v-if="compotent.content.list[1].image"
                    :src="compotent.content.list[1].image"
                    fit="cover"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
              </div>
              <div class="adv-width-50 adv-height-100 compotent-adv-image">
                <el-image
                  v-if="compotent.content.list[2].image"
                  :src="compotent.content.list[2].image"
                  fit="cover"
                >
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div>
            </div>
            <!-- 5 -->
            <div v-if="compotent.content.style == 5" class="compotent-adv-5">
              <div
                class="adv-width-100 adv-height-50 adv-line-bottom display-flex"
              >
                <div
                  class="
                    adv-width-50 adv-height-100 adv-line-right
                    compotent-adv-image
                  "
                >
                  <el-image
                    v-if="compotent.content.list[0].image"
                    :src="compotent.content.list[0].image"
                    fit="cover"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
                <div class="adv-width-50 adv-height-100 compotent-adv-image">
                  <el-image
                    v-if="compotent.content.list[1].image"
                    :src="compotent.content.list[1].image"
                    fit="cover"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
              </div>
              <div class="adv-width-100 adv-height-50 compotent-adv-image">
                <el-image
                  v-if="compotent.content.list[2].image"
                  :src="compotent.content.list[2].image"
                  fit="cover"
                >
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div>
            </div>
            <!-- 6 -->
            <div v-if="compotent.content.style == 6" class="compotent-adv-6">
              <div
                class="
                  adv-width-100 adv-height-50 adv-line-bottom
                  compotent-adv-image
                "
              >
                <el-image
                  v-if="compotent.content.list[0].image"
                  :src="compotent.content.list[0].image"
                  fit="cover"
                >
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div>
              <div class="adv-width-100 adv-height-50 display-flex">
                <div
                  class="
                    adv-width-50 adv-height-100 adv-line-right
                    compotent-adv-image
                  "
                >
                  <el-image
                    v-if="compotent.content.list[1].image"
                    :src="compotent.content.list[1].image"
                    fit="cover"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
                <div class="adv-width-50 adv-height-100 compotent-adv-image">
                  <el-image
                    v-if="compotent.content.list[2].image"
                    :src="compotent.content.list[2].image"
                    fit="cover"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
              </div>
            </div>
            <!-- 7 -->
            <div v-if="compotent.content.style == 7" class="compotent-adv-7">
              <div
                class="adv-width-100 adv-height-50 adv-line-bottom display-flex"
              >
                <div
                  class="
                    adv-width-50 adv-height-100 adv-line-right
                    compotent-adv-image
                  "
                >
                  <el-image
                    v-if="compotent.content.list[0].image"
                    :src="compotent.content.list[0].image"
                    fit="cover"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
                <div class="adv-width-50 adv-height-100 compotent-adv-image">
                  <el-image
                    v-if="compotent.content.list[1].image"
                    :src="compotent.content.list[1].image"
                    fit="cover"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
              </div>
              <div class="adv-width-100 adv-height-50 display-flex">
                <div
                  class="
                    adv-width-33 adv-height-100 adv-line-right
                    compotent-adv-image
                  "
                >
                  <el-image
                    v-if="compotent.content.list[2].image"
                    :src="compotent.content.list[2].image"
                    fit="cover"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
                <div
                  class="
                    adv-width-33 adv-height-100 adv-line-right
                    compotent-adv-image
                  "
                >
                  <el-image
                    v-if="compotent.content.list[3].image"
                    :src="compotent.content.list[3].image"
                    fit="cover"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
                <div class="adv-width-33 adv-height-100 compotent-adv-image">
                  <el-image
                    v-if="compotent.content.list[4].image"
                    :src="compotent.content.list[4].image"
                    fit="cover"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
              </div>
            </div>
          </div>
          <!-- 列表导航nav-list -->
          <div
            class="compotent-item-container-item"
            :class="index == centerSelect ? 'selected' : ''"
            v-if="compotent.type == 'nav-list' && compotent.content"
          >
            <div
              class="compotent-nav-list-item"
              v-for="(it, index) in compotent.content.list"
              :key="index"
            >
              <div class="compotent-nav-list-item-left">
                <img
                  v-if="it.image"
                  class="compotent-nav-list-item-image"
                  :src="it.image"
                />
                <div v-if="it.name">{{ it.name }}</div>
              </div>
              <div><i class="el-icon-arrow-right"></i></div>
            </div>
          </div>
          <!-- 宫格列表 grid-list -->
          <div
            class="compotent-item-container-item"
            :class="index == centerSelect ? 'selected' : ''"
            v-if="compotent.type == 'grid-list' && compotent.content"
          >
            <div class="compotent-grid-list-container">
              <div
                class="compotent-grid-list-item"
                v-for="(it, index) in compotent.content.list"
                :key="index"
                style="height: 62px"
              >
                <div
                  class="compotent-grid-list-item-image"
                  style="width: 22px; height: 22px; margin-bottom: 8px"
                >
                  <img v-if="it.image" :src="it.image" />
                </div>
                <div class="compotent-grid-list-item-tip">{{ it.name }}</div>
              </div>
            </div>
          </div>
          <!-- 富文本 -->
          <div
            class="
              compotent-item-container-item
              compotent-item-container-item-padding
            "
            :class="index == centerSelect ? 'selected' : ''"
            v-if="compotent.type == 'rich-text' && compotent.content"
          >
            <div class="compotent-rich-text" v-if="compotent.content.name">
              <div v-html="compotent.content.timeData"></div>
            </div>
            <el-image
              v-if="!compotent.content.name"
              src="https://demo.shopro.top/assets/addons/shopro/img/decorate/rich-text_bg.png"
              fit="contain"
            >
            </el-image>
          </div>
          <!-- 订单卡片 -->
          <div
            class="
              compotent-item-container-item
              compotent-item-container-item-padding
            "
            :class="index == centerSelect ? 'selected' : ''"
            v-if="compotent.type == 'order-card'"
          >
            <div class="order-card-box">
              <img
                class="label-auto"
                src="https://demo.shopro.top/assets/addons/shopro/img/decorate/order-card_bg.png"
              />
            </div>
          </div>
          <!-- 资产卡片 -->
          <div
            class="
              compotent-item-container-item
              compotent-item-container-item-padding
            "
            :class="index == centerSelect ? 'selected' : ''"
            v-if="compotent.type == 'wallet-card'"
          >
            <div class="wallet-card-box">
              <img
                class="label-auto"
                src="https://demo.shopro.top/assets/addons/shopro/img/decorate/wallet-card_bg.png"
              />
            </div>
          </div>
          <!-- 菜单组 -->
          <div
            v-if="compotent.type == 'menu' && compotent.content"
            class="
              compotent-item-container-item compotent-item-container-item-margin
            "
            :class="index == centerSelect ? 'selected' : ''"
          >
            <el-carousel
              trigger="click"
              :height="
                compotent.content.list.length > compotent.content.style
                  ? '208px'
                  : '116px'
              "
              :autoplay="false"
            >
              <el-carousel-item
                v-for="(it, calindex) in Math.ceil(
                  compotent.content.list.length / (compotent.content.style * 2)
                )"
                :key="calindex"
              >
                <div class="menu-box">
                  <template
                    v-if="
                      (calindex + 1) * compotent.content.style * 2 >=
                        index + 1 &&
                      index + 1 > calindex * compotent.content.style * 2
                    "
                  >
                    <div
                      class="menu-box-item"
                      :style="{
                        width: compotent.content.style == 4 ? '25%' : '20%',
                      }"
                      v-for="(i, index) in compotent.content.list"
                      :key="index"
                    >
                      <div
                        class="
                          compotent-grid-list-item-image
                          menu-compotent-image
                        "
                      >
                        <img
                          v-if="i.image"
                          class="compotent-grid-list-item-image"
                          :src="i.image"
                        />
                      </div>
                      <div v-if="i.name" class="compotent-grid-list-item-tip">
                        {{ i.name }}
                      </div>
                    </div>
                  </template>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <!-- 优惠券 -->
          <div
            class="
              compotent-item-container-item compotent-item-container-item-margin
            "
            :class="index == centerSelect ? 'selected' : ''"
            v-if="
              compotent.type == 'coupons' &&
              compotent.content &&
              compotent.content.timeData
            "
          >
            <!-- 有数据 -->
            <div
              class="coupons-container"
              v-if="
                compotent.content.timeData &&
                compotent.content.timeData.length > 0
              "
            >
              <div class="compotent-activity-header">
                <div class="compotent-activity-header-title">领劵专区</div>
                <div class="compotent-activity-header-more">
                  查看更多<i
                    class="
                      el-icon-arrow-right
                      compotent-activity-header-more-icon
                    "
                  ></i>
                </div>
              </div>
              <template v-if="compotent.content.style == 1">
                <el-carousel trigger="click" height="84px" :autoplay="false">
                  <el-carousel-item
                    v-for="it in compotent.content.timeData"
                    :key="it"
                  >
                    <div
                      class="compotent-coupons1-item"
                      :style="{
                        background:
                          compotent.content.bgcolor1 &&
                          compotent.content.bgcolor2
                            ? 'linear-gradient(to right,' +
                              compotent.content.bgcolor1 +
                              ',' +
                              compotent.content.bgcolor2 +
                              ')'
                            : compotent.content.bgcolor1
                            ? compotent.content.bgcolor1
                            : compotent.content.bgcolor2,
                        color: compotent.content.color,
                      }"
                    >
                      <div>
                        <div :style="{ color: compotent.content.pricecolor }">
                          <span>￥</span>
                          <span class="coupons-amount">{{ it.amount }}</span>
                          <span class="coupons-name">{{ it.name }}</span>
                        </div>
                        <div class="coupons-enough">满{{ it.enough }}可用</div>
                        <div class="coupons-time">
                          有效期：{{
                            moment(it.usetimestart * 1000).format("YYYY.MM.DD")
                          }}至{{
                            moment(it.usetimeend * 1000).format("YYYY.MM.DD")
                          }}
                        </div>
                      </div>
                      <div>
                        <div
                          class="coupons-get"
                          :style="{ color: compotent.content.bgcolor1 }"
                        >
                          立即领取
                        </div>
                        <div class="coupons-stock">仅剩{{ it.stock }}张</div>
                      </div>
                    </div>
                  </el-carousel-item>
                </el-carousel>
              </template>
              <div
                v-if="compotent.content.style == 2"
                class="display-flex compotent-coupons2-container"
              >
                <template v-for="(it, cindex) in compotent.content.timeData">
                  <div
                    :key="cindex"
                    v-if="cindex < 2"
                    class="compotent-coupons2-item"
                    :style="{
                      background:
                        compotent.content.bgcolor1 && compotent.content.bgcolor2
                          ? 'linear-gradient(to right,' +
                            compotent.content.bgcolor1 +
                            ',' +
                            compotent.content.bgcolor2 +
                            ')'
                          : compotent.content.bgcolor1
                          ? compotent.content.bgcolor1
                          : compotent.content.bgcolor2,
                      color: compotent.content.color,
                    }"
                  >
                    <div class="compotent-coupons2-item-left">
                      <div :style="{ color: compotent.content.pricecolor }">
                        <span>￥</span>
                        <span class="coupons-amount">{{ it.amount }}</span>
                      </div>
                      <div class="coupons-enough">满{{ it.enough }}可用</div>
                      <div class="coupons-stock">仅剩{{ it.stock }}张</div>
                    </div>
                    <div class="compotent-coupons2-item-right">立即领取</div>
                  </div>
                </template>
              </div>
            </div>
            <!-- 无数据 -->
            <template
              v-if="
                compotent.content.timeData &&
                compotent.content.timeData.length == 0
              "
            >
              <el-image
                v-if="compotent.content.style == 1"
                src="https://demo.shopro.top/assets/addons/shopro/img/decorate/coupons_bg_01.png"
                fit="contain"
              >
              </el-image>
              <el-image
                v-if="compotent.content.style == 2"
                src="https://demo.shopro.top/assets/addons/shopro/img/decorate/coupons_bg_02.png"
                fit="contain"
              >
              </el-image>
            </template>
          </div>
          <!-- 秒杀 -->
          <div
            v-if="
              compotent.type == 'seckill' &&
              compotent.content &&
              compotent.content.timeData
            "
            class="compotent-item-container-item-margin"
            :class="index == centerSelect ? 'selected' : ''"
          >
            <div
              v-if="compotent.content.timeData.length > 0"
              class="compotent-activity-seckill"
            >
              <div class="compotent-activity-header">
                <div class="compotent-activity-header-title">
                  {{ compotent.content.name }}
                </div>
                <div class="compotent-activity-header-more">
                  更多抢购
                  <i
                    class="
                      el-icon-arrow-right
                      compotent-activity-header-more-icon
                    "
                  ></i>
                </div>
              </div>
              <div class="compotent-activity-container">
                <template v-for="(it, index) in compotent.content.timeData">
                  <div
                    :key="index"
                    v-if="compotent.content.style == 1"
                    class="compotent-activity-item"
                  >
                    <div class="compotent-activity-item-image">
                      <el-image
                        v-if="it.image"
                        :src="it.image"
                        fit="cover"
                      >
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                    </div>
                    <div class="compotent-activity-item-message">
                      <div class="compotent-activity-item-title ellipsis-item">
                        {{ it.title }}
                      </div>
                      <div class="compotent-activity-item-price">
                        ￥{{ it.price }}
                      </div>
                      <div class="compotent-activity-item-originalprice">
                        <span>￥{{ it.original_price }}</span>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-for="(sitem, sindex) in compotent.content.timeData">
                  <div class="compotent-goods-list-container" :key="sindex">
                    <div
                      class="compotent-goods-list"
                      v-if="compotent.content.style == 2"
                    >
                      <div class="compotent-goods-list-image">
                        <el-image
                          :src="sitem.image"
                          fit="cover"
                        >
                          <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </el-image>
                      </div>
                      <div class="compotent-goods-list-right">
                        <div class="compotent-goods-list-title ellipsis-item">
                          <div
                            class="
                              compotent-goods-list-title-tags
                              compotent-seckill-title-tags
                            "
                          >
                            <span>秒杀</span>
                          </div>
                          {{ sitem.title }}
                        </div>
                        <div
                          class="compotent-goods-list-subtitle ellipsis-item"
                        >
                          {{ sitem.subtitle }}
                        </div>
                        <div class="compotent-goods-list-seckill">
                          <div class="compotent-goods-list-progress">
                            <el-progress
                              :percentage="20"
                              stroke-width="8"
                              color="#FFBBBB"
                            >
                            </el-progress>
                          </div>
                          <div class="compotent-goods-list-team_num">
                            已售出20件
                          </div>
                        </div>
                        <div
                          class="
                            compotent-goods-list-message
                            onerow-seckill-message
                          "
                        >
                          <div class="compotent-goods-list-price-container">
                            <div class="compotent-goods-list-price">
                              ￥{{ sitem.price }}
                            </div>
                            <div class="compotent-goods-list-originalprice">
                              ￥{{ sitem.original_price }}
                            </div>
                          </div>
                          <div
                            class="
                              compotent-goods-list-button
                              compotent-goods-list-button-seckill
                            "
                          >
                            去抢购
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <template
              v-if="
                compotent.content.timeData &&
                compotent.content.timeData.length == 0
              "
            >
              <el-image
                v-if="compotent.content.style == 1"
                src="https://demo.shopro.top/assets/addons/shopro/img/decorate/secKill_bg_01.png"
                fit="contain"
              >
              </el-image>
              <el-image
                v-if="compotent.content.style == 2"
                src="https://demo.shopro.top/assets/addons/shopro/img/decorate/secKill_bg_02.png"
                fit="contain"
              >
              </el-image>
            </template>
          </div>
          <!-- 拼团 -->
          <div
            v-if="
              compotent.type == 'groupon' &&
              compotent.content &&
              compotent.content.timeData
            "
            class="compotent-item-container-item-margin"
            :class="index == centerSelect ? 'selected' : ''"
          >
            <div
              v-if="compotent.content.timeData.length > 0"
              class="compotent-activity-groupon"
            >
              <div class="compotent-activity-header">
                <div class="compotent-activity-header-title">
                  {{ compotent.content.name }}
                </div>
                <div class="compotent-activity-header-more">
                  更多拼团
                  <i
                    class="
                      el-icon-arrow-right
                      compotent-activity-header-more-icon
                    "
                  ></i>
                </div>
              </div>
              <div class="compotent-activity-container">
                <template v-for="(it, index) in compotent.content.timeData">
                  <div
                    :key="index"
                    v-if="compotent.content.style == 1"
                    class="compotent-activity-item"
                  >
                    <div class="compotent-activity-item-image">
                      <el-image
                        v-if="it.image"
                        :src="it.image"
                        fit="cover"
                      >
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                    </div>
                    <div class="compotent-activity-item-message">
                      <div class="compotent-activity-item-title ellipsis-item">
                        {{ it.title }}
                      </div>
                      <div class="compotent-activity-item-price">
                        ￥{{ it.groupon_price }}
                      </div>
                      <div class="compotent-activity-item-pin">
                        <span>9527人正在拼</span>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-for="(gitem, index) in compotent.content.timeData">
                  <div
                    class="compotent-goods-list-container"
                    :key="index"
                    v-if="compotent.content.style == 2"
                  >
                    <div class="compotent-goods-list">
                      <div class="compotent-goods-list-image">
                        <el-image
                          :src="gitem.image"
                          fit="cover"
                        >
                          <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </el-image>
                      </div>
                      <div class="compotent-goods-list-right">
                        <div class="compotent-goods-list-title ellipsis-item">
                          <div
                            class="
                              compotent-goods-list-title-tags
                              compotent-groupon-title-tags
                            "
                          >
                            <span>拼团</span>
                          </div>
                          {{ gitem.title }}
                        </div>
                        <div
                          class="compotent-goods-list-subtitle ellipsis-item"
                        >
                          {{ gitem.subtitle }}
                        </div>
                        <div class="compotent-goods-list-team">
                          <div class="compotent-goods-list-teamed">
                            <img
                              class="compotent-goods-list-fire"
                              src="https://demo.shopro.top/assets/addons/shopro/img/decorate/groupon_fire.png"
                            />
                            已拼{{ gitem.sales }}件
                          </div>
                          <div class="compotent-goods-list-team_num">
                            {{ compotent.content.team_num }}人团
                          </div>
                        </div>
                        <div class="compotent-goods-list-message">
                          <div class="compotent-goods-list-price-container">
                            <div class="compotent-goods-list-price">
                              ￥{{ gitem.groupon_price }}
                            </div>
                            <div class="compotent-goods-list-originalprice">
                              ￥{{ gitem.original_price }}
                            </div>
                          </div>
                          <div
                            class="
                              compotent-goods-list-button
                              compotent-goods-list-button-groupon
                            "
                          >
                            马上拼
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <template
              v-if="
                compotent.content.timeData &&
                compotent.content.timeData.length == 0
              "
            >
              <el-image
                v-if="compotent.content.style == 1"
                src="https://demo.shopro.top/assets/addons/shopro/img/decorate/groupon_bg_01.png"
                fit="contain"
              >
              </el-image>
              <el-image
                v-if="compotent.content.style == 2"
                src="https://demo.shopro.top/assets/addons/shopro/img/decorate/groupon_bg_02.png"
                fit="contain"
              >
              </el-image>
            </template>
          </div>
          <!-- 标题栏  component-item-special-->
          <div
            v-if="compotent.type == 'title-block' && compotent.content"
            :class="index == centerSelect ? 'selected' : ''"
          >
            <div class="compotent-title-block-container">
              <div style="height: 42px">
                <img
                  v-if="compotent.content.image"
                  :src="compotent.content.image"
                  class="label-auto"
                />
              </div>
              <div
                class="compotent-title-block-title"
                :style="{ color: compotent.content.color }"
              >
                {{ compotent.content.name }}
              </div>
            </div>
          </div>
          <!-- 商品分类,自定义商品 -->
          <div
            v-if="
              (compotent.type == 'goods-list' ||
                compotent.type == 'goods-group') &&
              compotent.content &&
              compotent.content.timeData
            "
            :class="index == centerSelect ? 'selected' : ''"
          >
            <div
              v-if="compotent.content.timeData.length > 0"
              class="compotent-goods-list-1-container"
            >
              <template v-if="compotent.content.style == 1">
                <el-row
                  :gutter="8"
                  type="flex"
                  style="align-items: stretch; flex-wrap: wrap"
                >
                  <el-col
                    :span="12"
                    v-for="(it, index) in compotent.content.timeData"
                    :key="index"
                  >
                    <div
                      class="compotent-goods-list-1"
                      :class="
                        it.activity_type && it.activity_type.includes('seckill')
                          ? 'compotent-goods-list-1-seckill'
                          : it.activity_type &&
                            it.activity_type.includes('groupon')
                          ? 'compotent-goods-list-1-groupon'
                          : ''
                      "
                    >
                      <div class="compotent-goods-list-1-image">
                        <el-image :src="it.image" fit="cover">
                          <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </el-image>
                      </div>
                      <div class="compotent-goods-list-1-message">
                        <div class="compotent-goods-list-1-title ellipsis-item">
                          <div
                            v-if="
                              it.activity_type &&
                              it.activity_type.includes('groupon')
                            "
                            class="
                              compotent-goods-list-title-tags
                              compotent-groupon-title-tags
                            "
                          >
                            <span>拼团</span>
                          </div>
                          <div
                            v-if="
                              it.activity_type &&
                              it.activity_type.includes('seckill')
                            "
                            class="
                              compotent-goods-list-title-tags
                              compotent-seckill-title-tags
                            "
                          >
                            <span>秒杀</span>
                          </div>
                          {{ it.title }}
                        </div>
                        <div
                          class="compotent-goods-list-1-subtitle ellipsis-item"
                        >
                          {{ it.subtitle }}
                        </div>
                        <div class="display-flex" style="flex-wrap: wrap">
                          <div
                            class="compotent-discounts-tags"
                            v-for="(t, index) in it.activity_discounts_tags"
                            :key="index"
                          >
                            <span>{{ t }}</span>
                          </div>
                        </div>
                        <div class="compotent-goods-list-1-pricecontainer">
                          <div class="compotent-goods-list-1-price">
                            ￥{{
                              it.activity_type &&
                              it.activity_type.includes("groupon")
                                ? it.groupon_price
                                : it.price
                            }}
                          </div>
                          <div class="compotent-goods-list-1-sales">
                            ￥{{ it.original_price }}
                          </div>
                        </div>
                        <div class="compotent-goods-list-1-cart">
                          <img
                            src="https://demo.shopro.top/assets/addons/shopro/img/decorate/cart.png"
                          />
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </template>
              <template v-for="(gitem, index) in compotent.content.timeData">
                <div
                  class="compotent-goods-list-2-container"
                  :key="index"
                  v-if="compotent.content.style == 2"
                >
                  <div
                    class="compotent-goods-list"
                    :class="
                      gitem.activity_type &&
                      gitem.activity_type.indexOf('groupon') > -1
                        ? 'compotent-goods-list-2-groupon'
                        : gitem.activity_type &&
                          gitem.activity_type.indexOf('seckill') > -1
                        ? 'compotent-goods-list-2-seckill'
                        : ''
                    "
                  >
                    <div class="compotent-goods-list-image">
                      <el-image :src="gitem.image" fit="cover">
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                    </div>
                    <div class="compotent-goods-list-right">
                      <div class="compotent-goods-list-title ellipsis-item">
                        <div
                          v-if="
                            gitem.activity_type &&
                            gitem.activity_type.indexOf('groupon') > -1
                          "
                          class="
                            compotent-goods-list-title-tags
                            compotent-groupon-title-tags
                          "
                        >
                          <span>拼团</span>
                        </div>
                        <div
                          v-if="
                            gitem.activity_type &&
                            gitem.activity_type.indexOf('seckill') > -1
                          "
                          class="
                            compotent-goods-list-title-tags
                            compotent-seckill-title-tags
                          "
                        >
                          <span>秒杀</span>
                        </div>
                        {{ gitem.title }}
                      </div>
                      <div class="compotent-goods-list-subtitle ellipsis-item">
                        {{ gitem.subtitle }}
                      </div>
                      <div
                        class="display-flex"
                        style="flex-wrap: wrap; margin-bottom: 8px"
                      >
                        <div
                          class="compotent-discounts-tags"
                          style="margin-top: 0"
                          v-for="(t, index) in gitem.activity_discounts_tags"
                          :key="index"
                        >
                          <span>{{ t }}</span>
                        </div>
                      </div>
                      <div class="compotent-goods-list-message">
                        <div class="compotent-goods-list-price-container">
                          <div>
                            <div class="compotent-goods-list-price">
                              ￥{{ gitem.price }}
                            </div>
                            <div
                              style="margin-top: 8px"
                              class="compotent-goods-list-originalprice"
                            >
                              ￥{{ gitem.original_price }}
                            </div>
                          </div>
                        </div>
                        <div
                          class="compotent-goods-list-button"
                          :class="
                            gitem.activity_type &&
                            gitem.activity_type.indexOf('groupon') > -1
                              ? 'compotent-goods-list-button-groupon'
                              : gitem.activity_type &&
                                gitem.activity_type.indexOf('seckill') > -1
                              ? 'compotent-goods-list-button-seckill'
                              : ''
                          "
                        >
                          {{
                            gitem.activity_type &&
                            gitem.activity_type.indexOf("groupon") > -1
                              ? "马上拼"
                              : gitem.activity_type &&
                                gitem.activity_type.indexOf("seckill") > -1
                              ? "去抢购"
                              : "去购买"
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <template
              v-if="
                compotent.content.timeData &&
                compotent.content.timeData.length == 0
              "
            >
              <el-image
                v-if="compotent.content.style == 1"
                :src="
                  'https://demo.shopro.top/assets/addons/shopro/img/decorate/' +
                  compotent.type +
                  '_bg_01.png'
                "
                fit="contain"
              >
              </el-image>
              <el-image
                v-if="compotent.content.style == 2"
                :src="
                  'https://demo.shopro.top/assets/addons/shopro/img/decorate/' +
                  compotent.type +
                  '_bg_02.png'
                "
                fit="contain"
              >
              </el-image>
            </template>
          </div>
          <div
            v-if="
              compotent.type == 'category-tabs' &&
              compotent.content &&
              compotent.content.timeData
            "
            class="undraggable"
            :class="index == centerSelect ? 'selected' : ''"
          >
            <div class="compotent-category-tabs display-flex">
              <div
                class="compotent-category-tabs-item"
                v-for="(tabs, tindex) in compotent.content.category_arr"
                :key="tindex"
              >
                <div :style="{ color: tindex == 0 ? '#A8700D' : '#333' }">
                  {{ tabs.name }}
                </div>
                <div
                  class="compotent-category-tabs-dis"
                  :style="{
                    color: tindex == 0 ? '#fff' : '#999',
                    background:
                      tindex == 0
                        ? 'linear-gradient(90deg, #E9B461, #EECC89)'
                        : '',
                  }"
                >
                  <span>{{
                    tabs.description ? tabs.description : "暂无"
                  }}</span>
                </div>
              </div>
            </div>
            <div
              v-if="compotent.content.timeData.length > 0"
              class="compotent-goods-list-1-container"
            >
              <template v-if="compotent.content.style == 1">
                <el-row
                  :gutter="8"
                  type="flex"
                  style="align-items: stretch; flex-wrap: wrap"
                >
                  <el-col
                    :span="12"
                    v-for="(it, index) in compotent.content.timeData"
                    :key="index"
                  >
                    <div
                      class="compotent-goods-list-1"
                      :class="
                        it.activity_type &&
                        it.activity_type.indexOf('seckill') > -1
                          ? 'compotent-goods-list-1-seckill'
                          : it.activity_type &&
                            it.activity_type.indexOf('groupon') > -1
                          ? 'compotent-goods-list-1-groupon'
                          : ''
                      "
                    >
                      <div class="compotent-goods-list-1-image">
                        <el-image :src="it.image" fit="cover">
                          <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </el-image>
                      </div>
                      <div class="compotent-goods-list-1-message">
                        <div class="compotent-goods-list-1-title ellipsis-item">
                          <div
                            v-if="
                              it.activity_type &&
                              it.activity_type.indexOf('groupon') > -1
                            "
                            class="
                              compotent-goods-list-title-tags
                              compotent-groupon-title-tags
                            "
                          >
                            <span>拼团</span>
                          </div>
                          <div
                            v-if="
                              it.activity_type &&
                              it.activity_type.indexOf('seckill') > -1
                            "
                            class="
                              compotent-goods-list-title-tags
                              compotent-seckill-title-tags
                            "
                          >
                            <span>秒杀</span>
                          </div>
                          {{ it.title }}
                        </div>
                        <div
                          class="compotent-goods-list-1-subtitle ellipsis-item"
                        >
                          {{ it.subtitle }}
                        </div>
                        <div class="display-flex" style="flex-wrap: wrap">
                          <div
                            class="compotent-discounts-tags"
                            v-for="(t, index) in it.activity_discounts_tags"
                            :key="index"
                          >
                            <span>{{ t }}</span>
                          </div>
                        </div>
                        <div class="compotent-goods-list-1-pricecontainer">
                          <div class="compotent-goods-list-1-price">
                            ￥{{
                              it.activity_type &&
                              it.activity_type.indexOf("groupon") > -1
                                ? it.groupon_price
                                : it.price
                            }}
                          </div>
                          <div class="compotent-goods-list-1-sales">
                            ￥{{ it.original_price }}
                          </div>
                        </div>
                        <div class="compotent-goods-list-1-cart">
                          <img
                            src="https://demo.shopro.top/assets/addons/shopro/img/decorate/cart.png"
                          />
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </template>
              <template v-if="compotent.content.style == 2">
                <div class="compotent-goods-list-2-container">
                  <div
                    class="compotent-goods-list"
                    :class="
                      gitem.activity_type &&
                      gitem.activity_type.indexOf('groupon') > -1
                        ? 'compotent-goods-list-2-groupon'
                        : gitem.activity_type &&
                          gitem.activity_type.indexOf('seckill') > -1
                        ? 'compotent-goods-list-2-seckill'
                        : ''
                    "
                    v-for="(gitem, index) in compotent.content.timeData"
                    :key="index"
                  >
                    <div class="compotent-goods-list-image">
                      <el-image :src="gitem.image" fit="cover">
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                    </div>
                    <div class="compotent-goods-list-right">
                      <div class="compotent-goods-list-title ellipsis-item">
                        <div
                          v-if="
                            gitem.activity_type &&
                            gitem.activity_type.indexOf('groupon') > -1
                          "
                          class="
                            compotent-goods-list-title-tags
                            compotent-groupon-title-tags
                          "
                        >
                          <span>拼团</span>
                        </div>
                        <div
                          v-if="
                            gitem.activity_type &&
                            gitem.activity_type.indexOf('seckill') > -1
                          "
                          class="
                            compotent-goods-list-title-tags
                            compotent-seckill-title-tags
                          "
                        >
                          <span>秒杀</span>
                        </div>
                        {{ gitem.title }}
                      </div>
                      <div class="compotent-goods-list-subtitle ellipsis-item">
                        {{ gitem.subtitle }}
                      </div>
                      <div
                        class="display-flex"
                        style="flex-wrap: wrap; margin-bottom: 8px"
                      >
                        <div
                          class="compotent-discounts-tags"
                          style="margin-top: 0"
                          v-for="(t, index) in gitem.activity_discounts_tags"
                          :key="index"
                        >
                          <span>{{ t }}</span>
                        </div>
                      </div>
                      <div class="compotent-goods-list-message">
                        <div class="compotent-goods-list-price-container">
                          <div>
                            <div class="compotent-goods-list-price">
                              ￥{{ gitem.price }}
                            </div>
                            <div
                              style="margin-top: 8px"
                              class="compotent-goods-list-originalprice"
                            >
                              ￥{{ gitem.original_price }}
                            </div>
                          </div>
                        </div>
                        <div
                          class="compotent-goods-list-button"
                          :class="
                            gitem.activity_type &&
                            gitem.activity_type.indexOf('groupon') > -1
                              ? 'compotent-goods-list-button-groupon'
                              : gitem.activity_type &&
                                gitem.activity_type.indexOf('seckill') > -1
                              ? 'compotent-goods-list-button-seckill'
                              : ''
                          "
                        >
                          {{
                            gitem.activity_type &&
                            gitem.activity_type.indexOf("groupon") > -1
                              ? "马上拼"
                              : gitem.activity_type &&
                                gitem.activity_type.indexOf("seckill") > -1
                              ? "去抢购"
                              : "去购买"
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div
              v-if="
                compotent.content.timeData &&
                compotent.content.timeData.length == 0
              "
              class="compotent-nodata-tip"
            >
              <span v-if="compotent.content.category_arr.length == 0"
                >请选择分类,生成分类选项卡</span
              >
              <span v-if="compotent.content.category_arr.length > 0"
                >选中的分类选项卡没数据</span
              >
            </div>
            <div v-if="!compotent.content.timeData">
              <span v-if="compotent.content.category_arr.length > 0"
                >选中的分类选项卡没数据</span
              >
            </div>
          </div>
          <!-- 直播 -->
          <div
            class="
              compotent-item-container-item
              compotent-item-container-item-padding
            "
            :class="index == centerSelect ? 'selected' : ''"
            v-if="
              compotent.type == 'live' &&
              compotent.content &&
              compotent.content.timeData
            "
          >
            <div
              class="live-box"
              v-if="
                compotent.content.timeData &&
                compotent.content.timeData.length > 0
              "
            >
              <template>
                <div class="activity-header">
                  <div class="activity-header-tip">
                    {{ compotent.content.name }}
                  </div>
                  <div class="activity-more">
                    更多<i class="el-icon-arrow-right activity-more-icon"></i>
                  </div>
                </div>
                <div
                  class="live-body"
                  v-for="(it, idx) in compotent.content.timeData"
                  :key="idx"
                >
                  <div
                    class="live-item"
                    v-if="compotent.content.style > idx"
                    :style="{
                      width: compotent.content.style == 1 ? '100%' : '50%',
                    }"
                  >
                    <div
                      style="
                        width: 100%;
                        position: relative;
                        height: 140px;
                        border-radius: 10px;
                        overflow: hidden;
                      "
                    >
                      <div
                        style="
                          position: absolute;
                          background: rgba(0, 0, 0, 0.3);
                          width: 70px;
                          border-radius: 10px;
                          height: 20px;
                          line-height: 20px;
                          top: 10px;
                          left: 5px;
                        "
                      >
                        <i class="el-icon-video-play"></i
                        ><span style="margin-left: 6px; color: #fff">{{
                          it.live_status_text
                        }}</span>
                      </div>
                      <img
                        class="label-auto"
                        :src="it.share_img"
                      />
                      <div
                        class="live-name"
                        style="
                          position: absolute;
                          bottom: 20px;
                          left: 20px;
                          color: #fff;
                        "
                      >
                        {{ it.name }}
                      </div>
                    </div>
                    <div
                      style="
                        height: 30px;
                        line-height: 30px;
                        text-align: left;
                        padding: 0 10px;
                      "
                    >
                      {{ it.anchor_name }}
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <el-image
              v-if="
                compotent.content.timeData &&
                compotent.content.timeData.length == 0
              "
              src="https://demo.shopro.top/assets/addons/shopro/img/decorate/live_bg.png"
              fit="contain"
            >
            </el-image>
          </div>
          <div
            class="undraggable"
            :class="index == centerSelect ? 'selected' : ''"
            v-if="compotent.type == 'user'"
          >
            <div
              style="position: relative; height: 160px"
              v-if="compotent.content.style == 2"
            >
              <img
                style="position: absolute; left: 0"
                src="https://demo.shopro.top/assets/addons/shopro/img/decorate/user_bg.png"
              />
              <img
                v-if="compotent.content.image"
                :src="compotent.content.image"
              />
            </div>
            <img
              :style="{ background: compotent.content.color }"
              src="https://demo.shopro.top/assets/addons/shopro/img/decorate/user_bg.png"
              v-if="compotent.content.style == 1"
            />
          </div>
          <div
            v-if="
              (index == centerSelect &&
                compotent.type != 'user' &&
                compotent.type != 'banner') ||
              (index == centerSelect &&
                centerSelect != 0 &&
                compotent.type == 'banner') ||
              (index == centerSelect && fromtype == 'custom')
            "
            class="delete-compotent"
          >
            <i class="el-icon-delete-solid" @click.stop="centerDel(index)"></i>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import option from "@/const/decorate/dodecorate";

export default {
  /*
   * 父组件传来的数据 templateData isPageType templateForm centerSelect fromtype
   * 父组件绑定的事件 centerDel showForm
   */
  name: "Draggable",
  props: ["templateData", "isPageType", "templateForm", "centerSelect", "fromtype"],
  data() {
    return {
      // 表单配置
      option: option,
      // 商品名称
      shoproName: "",
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
    centerDel(idx) {
      this.$emit("centerDel", idx)
    },
    showForm(idx) {
      this.$emit("showForm", idx)
    }
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "@/views/dodecorate/style/dodecorate_origin";
</style>
