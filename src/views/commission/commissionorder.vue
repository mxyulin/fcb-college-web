<template>
  <basic-container>
    <!-- 分销订单 -->
    <div id="orderIndex" v-cloak>
      <div class="screen-container display-flex">
        <div class="display-flex shopro-screen-item shopro-screen-item-vague">
          <div class="shopro-button shopro-refresh-button" @click="getrefresh">
            <i class="el-icon-refresh"></i>
          </div>
        </div>

        <div class="display-flex shopro-screen-item shopro-screen-item-vague">
          <div class="shopro-screen-condition">
            <el-input
              placeholder="请输入内容"
              v-model="searchForm.form_1_value"
              class="screen-item-select"
              size="small"
            >
              <el-select
                v-model="searchForm.form_1_key"
                slot="prepend"
                placeholder="请选择"
              >
                <el-option label="下单用户ID" value="buyer_id"></el-option>
                <el-option
                  label="下单用户昵称"
                  value="buyer_nickname"
                ></el-option>
                <el-option
                  label="下单用户手机号"
                  value="buyer_mobile"
                ></el-option>
              </el-select>
            </el-input>
          </div>
        </div>

        <div class="display-flex shopro-screen-item shopro-screen-item-vague">
          <div class="shopro-screen-condition">
            <el-input
              placeholder="请输入内容"
              v-model="searchForm.form_2_value"
              class="screen-item-select"
              size="small"
            >
              <el-select
                v-model="searchForm.form_2_key"
                slot="prepend"
                placeholder="请选择"
              >
                <el-option label="推广分销商ID" value="agent_id"></el-option>
                <el-option
                  label="推广分销商昵称"
                  value="agent_nickname"
                ></el-option>
                <el-option
                  label="推广分销商手机号"
                  value="agent_mobile"
                ></el-option>
              </el-select>
            </el-input>
          </div>
        </div>

        <div class="display-flex shopro-screen-item shopro-screen-item-vague">
          <div class="shopro-screen-condition">
            <el-input
              placeholder="请输入内容"
              v-model="searchForm.form_3_value"
              class="screen-item-select"
              size="small"
            >
              <el-select
                v-model="searchForm.form_3_key"
                slot="prepend"
                placeholder="请选择"
              >
                <el-option
                  label="分佣用户ID"
                  value="commission_user_id"
                ></el-option>
                <el-option
                  label="分佣用户昵称"
                  value="commission_nickname"
                ></el-option>
                <el-option
                  label="分佣用户手机号"
                  value="commission_mobile"
                ></el-option>
              </el-select>
            </el-input>
          </div>
        </div>

        <div class="display-flex shopro-screen-item shopro-screen-item-vague">
          <div class="shopro-screen-condition">
            <el-input
              placeholder="请输入内容"
              v-model="searchForm.form_3_value"
              class="screen-item-select"
              size="small"
            >
              <el-select
                v-model="searchForm.form_3_key"
                slot="prepend"
                placeholder="请选择"
              >
                <el-option
                  label="分佣用户ID"
                  value="commission_user_id"
                ></el-option>
                <el-option
                  label="分佣用户昵称"
                  value="commission_nickname"
                ></el-option>
                <el-option
                  label="分佣用户手机号"
                  value="commission_mobile"
                ></el-option>
              </el-select>
            </el-input>
          </div>
        </div>

        <div class="display-flex shopro-screen-item shopro-screen-item-vague">
          <div class="screen-item screen-item-time">
            <div class="screen-item-tip">下单时间</div>
            <div class="screen-item-times">
              <el-date-picker
                v-model="searchForm.order_createtime"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                size="small"
                format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </div>
        </div>

        <div class="display-flex shopro-screen-item shopro-screen-item-vague">
          <div class="screen-item">
            <div class="screen-item-tip">商品名称</div>
            <div>
              <div class="screen-item-botton">
                <el-input
                  placeholder="请输入商品名称"
                  v-model="searchForm.goods_title"
                  class="screen-item-input"
                  size="small"
                >
                </el-input>
              </div>
            </div>
          </div>
        </div>

        <div class="display-flex shopro-screen-item shopro-screen-item-vague">
          <div class="screen-item screen-item-time">
            <div class="screen-item-tip">分佣时间</div>
            <div class="screen-item-times">
              <el-date-picker
                v-model="searchForm.commission_time"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                size="small"
                format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
          </div>
        </div>

        <div class="display-flex shopro-screen-item shopro-screen-item-vague">
          <div class="screen-item">
            <div class="screen-item-tip">佣金结算</div>
            <div class="screen-item-botton">
              <el-select
                v-model="searchForm.commission_reward_status"
                placeholder="请选择佣金结算"
                size="small"
              >
                <el-option
                  :label="sitem.label"
                  :value="sitem.value"
                  v-for="(sitem, index) in searchStatusOption"
                  :key="index"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>

        <div class="display-flex shopro-screen-item shopro-screen-item-vague">
          <div class="screen-item">
            <div class="screen-item-tip">结算方式</div>
            <div class="screen-item-botton">
              <el-select
                v-model="searchForm.commission_event"
                placeholder="请选择结算方式"
                size="small"
              >
                <el-option
                  :label="sitem.label"
                  :value="sitem.value"
                  v-for="(sitem, indexb) in commissionEventOption"
                  :key="indexb"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>

        <div class="display-flex shopro-screen-item shopro-screen-item-vague">
          <div class="screen-item shopro-screen-item-button">
            <div class="shopro-button shopro-reset-button" @click="screenEmpty">
              重置
            </div>
            <div
              class="shopro-button shopro-screen-button"
              @click="handleCurrentChange(1)"
            >
              筛选
            </div>
          </div>
        </div>
      </div>

      <div class="order-table" v-loading="isAjax">
        <div class="table-dashboard-container">
          <el-row :gutter="10">
            <el-col
              :xs="24"
              :sm="24"
              :md="8"
              :lg="8"
              :xl="8"
              v-for="(itemTotal, indexc) in commissionDashboard.total"
              :key="indexc"
            >
              <div class="table-dashboard-item-container">
                <div class="table-dashboard-item">
                  <div class="table-dashboard-item-tip">
                    <span
                      class="table-dashboard-item-dot"
                      :style="{ background: itemTotal.color }"
                    ></span
                    >{{ itemTotal.label }}:
                  </div>
                  <div class="table-dashboard-item-form">
                    <span class="table-dashboard-item-num">{{
                      itemTotal.value
                    }}</span>
                    <span class="table-dashboard-item-unit">{{
                      itemTotal.unit
                    }}</span>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col
              :xs="24"
              :sm="12"
              :md="12"
              :lg="6"
              :xl="6"
              v-for="(itemStatus, indexd) in commissionDashboard.status"
              :key="indexd"
            >
              <div class="table-dashboard-item-container">
                <div class="table-dashboard-item">
                  <div class="table-dashboard-item-tip">
                    <span
                      class="table-dashboard-item-dot"
                      :style="{ background: itemStatus.color }"
                    ></span
                    >{{ itemStatus.label }}:
                  </div>
                  <div class="table-dashboard-item-form">
                    <span class="table-dashboard-item-num">{{
                      itemStatus.value
                    }}</span>
                    <span class="table-dashboard-item-unit">{{
                      itemStatus.unit
                    }}</span>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="shopro-table-expends">
          <el-table :data="orderList" style="width: 100%" default-expand-all>
            <!-- <el-table-column type="expand">
              <template slot-scope="props">
                <div class="expand-container">
                  <div class="expand-container-list">
                    <div class="display-flex border-bottom">
                      <div class="expand-column expand-column-1">
                        <div class="display-flex expand-item-height">
                          <div
                            v-if="props.row.item.goods_image"
                            class="expand-item-goods-iamge"
                          >
                            <el-image
                              :src="Fast.api.cdnurl(props.row.item.goods_image)"
                              fit="contain"
                            >
                              <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                              </div>
                            </el-image>
                          </div>
                          <div class="expand-item-goods-container display-flex">
                            <div class="expand-item-goods-title ellipsis-item">
                              {{ props.row.item.goods_title }}
                            </div>
                            <div
                              class="expand-item-goods-describe display-flex"
                            >
                              <span style="margin-right: 14px"
                                >单价：{{ props.row.item.goods_price }}元</span
                              >
                              <span style="margin-right: 14px">
                                数量：{{ props.row.item.goods_num }}
                              </span>
                              <div class="display-flex">
                                <template
                                  v-for="(b, a) in props.row.item
                                    .activity_type_text_arr"
                                >
                                  <template v-if="a == 'groupon'">
                                    <div
                                      v-if="
                                        props.row.item.btns &&
                                        props.row.item.btns.indexOf(
                                          'groupon'
                                        ) != '-1'
                                      "
                                      class="activity-tags groupon-activity-tag"
                                    >
                                      拼团
                                    </div>
                                    <div
                                      v-if="
                                        props.row.item.btns &&
                                        props.row.item.btns.indexOf(
                                          'groupon_alone'
                                        ) != '-1'
                                      "
                                      class="activity-tags groupon-activity-tag"
                                    >
                                      拼团-单独购买
                                    </div>
                                  </template>
                                  <div
                                    v-if="a == 'seckill'"
                                    class="activity-tags seckill-activity-tag"
                                  >
                                    {{ b }}
                                  </div>
                                  <div
                                    v-if="
                                      a == 'full_reduce' ||
                                      a == 'full_discount' ||
                                      a == 'free_shipping'
                                    "
                                    class="activity-tags full-activity-tag"
                                  >
                                    {{ b }}
                                  </div>
                                </template>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="expand-column expand-column-2">
                        <div class="expand-column-container">
                          <span
                            :class="
                              props.row.item.refund_status == 0
                                ? 'color-999'
                                : ''
                            "
                          >
                            {{ props.row.item.refund_status_text }}
                          </span>
                        </div>
                      </div>

                      <div class="expand-column expand-column-3">
                        <div class="expand-column-container">
                          <el-popover
                            placement="bottom"
                            trigger="hover"
                            width="180"
                          >
                            <div
                              v-if="props.row.buyer"
                              class="popover-container"
                            >
                              <div class="display-flex">
                                <div class="display-flex">
                                  <div class="popover-tip">用户ID</div>
                                  ：
                                </div>
                                <div
                                  class="active-cursor-line"
                                  @click="goUser('buyer', props.row.buyer.id)"
                                >
                                  {{ props.row.buyer.id }}
                                </div>
                              </div>
                              <div class="display-flex">
                                <div class="display-flex">
                                  <div class="popover-tip">手机号</div>
                                  ：
                                </div>
                                <div>
                                  {{
                                    props.row.buyer.mobile
                                      ? props.row.buyer.mobile
                                      : "-"
                                  }}
                                </div>
                              </div>
                            </div>
                            <div
                              v-if="props.row.buyer"
                              class="table-user-container"
                              slot="reference"
                            >
                              <div
                                v-if="props.row.buyer.avatar"
                                class="table-image table-image-user"
                              >
                                <el-image
                                  :src="Fast.api.cdnurl(props.row.buyer.avatar)"
                                  fit="contain"
                                >
                                  <div slot="error" class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                  </div>
                                </el-image>
                              </div>
                              <div
                                class="font-weight cursor-pointer ellipsis-item"
                              >
                                {{ props.row.buyer.nickname }}
                              </div>
                            </div>
                          </el-popover>
                          <span v-if="!props.row.buyer">-</span>
                        </div>
                      </div>

                      <div class="expand-column expand-column-4">
                        <div class="expand-column-container">
                          <el-popover
                            placement="bottom"
                            trigger="hover"
                            width="180"
                          >
                            <div
                              v-if="props.row.agent"
                              class="popover-container"
                            >
                              <div class="display-flex">
                                <div class="display-flex">
                                  <div class="popover-tip">用户ID</div>
                                  ：
                                </div>
                                <div
                                  class="active-cursor-line"
                                  @click="goUser('agent', props.row.agent.id)"
                                >
                                  {{ props.row.agent.id }}
                                </div>
                              </div>
                              <div class="display-flex">
                                <div class="display-flex">
                                  <div class="popover-tip">手机号</div>
                                  ：
                                </div>
                                <div>
                                  {{
                                    props.row.agent.mobile
                                      ? props.row.agent.mobile
                                      : "-"
                                  }}
                                </div>
                              </div>
                            </div>
                            <div
                              v-if="props.row.agent"
                              class="table-user-container"
                              slot="reference"
                            >
                              <div
                                v-if="props.row.agent.avatar"
                                class="table-image table-image-user"
                              >
                                <el-image
                                  :src="Fast.api.cdnurl(props.row.agent.avatar)"
                                  fit="contain"
                                >
                                  <div slot="error" class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                  </div>
                                </el-image>
                              </div>
                              <div
                                class="font-weight cursor-pointer ellipsis-item"
                              >
                                {{ props.row.agent.nickname }}
                              </div>
                            </div>
                          </el-popover>
                          <span v-if="!props.row.agent">-</span>
                        </div>
                      </div>

                      <div class="expand-column expand-column-10">
                        <div class="expand-column-container">
                          <div
                            v-for="(ite, idx) in props.row.reward"
                            class="expand-item-commission-describe-item"
                          >
                            <el-popover
                              placement="bottom"
                              trigger="hover"
                              width="264"
                              :ref="`popover-${props.$index}-${idx}`"
                            >
                              <div v-if="ite.agent" class="popover-container">
                                <div class="display-flex">
                                  <div class="display-flex">
                                    <div class="popover-tip">用户头像</div>
                                    ：
                                  </div>
                                  <div
                                    v-if="ite.agent.avatar"
                                    class="table-image"
                                  >
                                    <el-image
                                      :src="Fast.api.cdnurl(ite.agent.avatar)"
                                      fit="contain"
                                    >
                                      <div slot="error" class="image-slot">
                                        <i class="el-icon-picture-outline"></i>
                                      </div>
                                    </el-image>
                                  </div>
                                </div>
                                <div class="display-flex">
                                  <div class="display-flex">
                                    <div class="popover-tip">用户ID</div>
                                    ：
                                  </div>
                                  <div
                                    class="active-cursor-line"
                                    @click="goUser('agent', ite.agent.id)"
                                  >
                                    {{ ite.agent.id }}
                                  </div>
                                </div>
                                <div class="display-flex">
                                  <div class="display-flex">
                                    <div class="popover-tip">用户等级</div>
                                    ：
                                  </div>
                                  <div>等级{{ ite.agent_level }}</div>
                                </div>
                                <div class="display-flex">
                                  <div class="display-flex">
                                    <div class="popover-tip">用户层级</div>
                                    ：
                                  </div>
                                  <div>
                                    {{
                                      commissionLevelFilter(
                                        ite.commission_level
                                      )
                                    }}
                                  </div>
                                </div>
                                <div class="display-flex">
                                  <div class="display-flex">
                                    <div class="popover-tip">比例/金额</div>
                                    ：
                                  </div>
                                  <div>
                                    <span
                                      v-if="
                                        JSON.parse(ite.commission_rules).rate
                                      "
                                    >
                                      {{
                                        JSON.parse(ite.commission_rules).rate
                                      }}%
                                    </span>
                                    <span
                                      v-if="
                                        JSON.parse(ite.commission_rules).money
                                      "
                                    >
                                      {{
                                        JSON.parse(ite.commission_rules).money
                                      }}元
                                    </span>
                                  </div>
                                </div>
                                <div class="display-flex">
                                  <div class="display-flex">
                                    <div class="popover-tip">佣金状态</div>
                                    ：
                                  </div>
                                  <div class="display-flex">
                                    <div
                                      :style="{
                                        color:
                                          ite.status == 0
                                            ? '#999'
                                            : ite.status == 1
                                            ? '#0ACE97'
                                            : '#ED655F',
                                      }"
                                    >
                                      {{ ite.status_text }}
                                    </div>
                                    <div
                                      v-if="ite.status == 0"
                                      style="flex-shrink: 0"
                                      class="popover-edit"
                                      @click="
                                        settlement(
                                          'runReward',
                                          ite.id,
                                          props.$index,
                                          idx
                                        )
                                      "
                                    >
                                      手动结算
                                    </div>
                                    <div
                                      v-if="ite.status == 0"
                                      style="flex-shrink: 0"
                                      class="commission-status-cancel"
                                      @click="
                                        settlement(
                                          'cancelReward',
                                          ite.id,
                                          props.$index,
                                          idx
                                        )
                                      "
                                    >
                                      取消
                                    </div>
                                    <div
                                      v-if="ite.status == 1"
                                      style="flex-shrink: 0; color: #ec5b55"
                                      class="popover-edit"
                                      @click="
                                        settlement(
                                          'backReward',
                                          ite.id,
                                          props.$index,
                                          idx
                                        )
                                      "
                                    >
                                      手动退回
                                    </div>
                                  </div>
                                </div>
                                <div class="display-flex">
                                  <div class="display-flex">
                                    <div class="popover-tip">入账方式</div>
                                    ：
                                  </div>
                                  <div>{{ ite.type_text }}</div>
                                </div>
                                <div
                                  class="display-flex"
                                  style="align-items: flex-start"
                                >
                                  <div
                                    class="display-flex"
                                    style="flex-shrink: 0"
                                  >
                                    <div class="popover-tip">佣金金额</div>
                                    ：
                                  </div>
                                  <div>
                                    <div
                                      v-if="
                                        !isPopoverEdit ||
                                        idx != popoverIndex ||
                                        orderId != props.row.item.id
                                      "
                                    >
                                      <span>{{ ite.commission }}元</span>
                                      <span
                                        class="popover-edit"
                                        v-if="ite.status == 0"
                                        @click="
                                          changePopoverEdit(
                                            ite.commission,
                                            idx,
                                            props.row.item.id
                                          )
                                        "
                                        >修改</span
                                      >
                                    </div>
                                    <div
                                      v-if="
                                        isPopoverEdit &&
                                        idx == popoverIndex &&
                                        orderId == props.row.item.id
                                      "
                                      class="display-flex"
                                    >
                                      <div class="popover-input">
                                        <el-input
                                          placeholder=""
                                          v-model="isPopoverMessage"
                                        >
                                          <template slot="append">元</template>
                                        </el-input>
                                      </div>
                                      <div
                                        style="flex-shrink: 0; color: #999"
                                        class="popover-edit"
                                        @click="
                                          settlement(
                                            'cancel',
                                            ite.id,
                                            props.$index,
                                            idx
                                          )
                                        "
                                      >
                                        取消
                                      </div>
                                      <div
                                        style="flex-shrink: 0"
                                        class="popover-edit"
                                        @click="
                                          settlement(
                                            'edit',
                                            ite.id,
                                            props.$index,
                                            idx
                                          )
                                        "
                                      >
                                        确定
                                      </div>
                                    </div>
                                    <div
                                      style="margin-top: 8px"
                                      v-if="
                                        ite.original_commission !=
                                        ite.commission
                                      "
                                    >
                                      <s class="color-999"
                                        >{{ ite.original_commission }}元</s
                                      >
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                v-if="ite.agent && ite.agent.avatar"
                                class="
                                  table-image
                                  expand-item-commission-describe-image
                                "
                                slot="reference"
                              >
                                <el-image
                                  :src="Fast.api.cdnurl(ite.agent.avatar)"
                                  fit="contain"
                                >
                                  <div slot="error" class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                  </div>
                                </el-image>
                              </div>
                            </el-popover>
                            <div style="text-align: center">
                              {{ ite.commission }}元
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="expand-column expand-column-5">
                        <div class="expand-column-container">
                          <span
                            class="display-flex"
                            :class="
                              rewardStatusClass(
                                props.row.commission_reward_status
                              )
                            "
                          >
                            <span class="shopro-status-dot"></span>
                            <span>{{
                              props.row.commission_reward_status_text
                            }}</span>
                          </span>
                        </div>
                      </div>

                      <div class="expand-column expand-column-7">
                        <div class="expand-column-container">
                          <span v-if="props.row.commission_time">
                            {{
                              moment(props.row.commission_time * 1000).format(
                                "YYYY-MM-DD HH:mm:ss"
                              )
                            }}
                          </span>
                          <span v-else>-</span>
                        </div>
                      </div>

                      <div class="expand-column expand-column-6">
                        <div class="expand-column-container">
                          <span
                            class="settlement-status"
                            v-if="props.row.commission_reward_status_text"
                          >
                            {{ props.row.commission_event_text }}
                          </span>
                          <span v-else>-</span>
                        </div>
                      </div>

                      <div class="expand-column expand-column-8">
                        <div class="expand-column-container">
                          {{ props.row.amount }}元
                        </div>
                      </div>

                      <div class="expand-column expand-column-11">
                        <div class="expand-column-container">
                          <span
                            class="display-flex"
                            :class="
                              rewardStatusClass(
                                props.row.commission_order_status
                              )
                            "
                          >
                            <span class="shopro-status-dot"></span>
                            <span>{{
                              props.row.commission_order_status_text
                            }}</span>
                          </span>
                        </div>
                      </div>

                      <div class="expand-column expand-column-9">
                        <div class="expand-column-container">
                          {{ props.row.commission_total }}元/{{
                            props.row.commissioned_total
                          }}元
                        </div>
                      </div>

                    </div>
                    <div class="expand-column expand-column-right">
                      <div class="expand-column-container">
                        <span
                          class="settlement-status commission-status-container"
                          v-if="props.row.commission_reward_status >= 0"
                        >
                          <el-popover
                            placement="top"
                            trigger="click"
                            :ref="`commission-status-${props.$index}`"
                          >
                            <div class="popover-container">
                              <div v-if="commissionOperIndex == props.$index">
                                <div
                                  class="display-flex"
                                  v-if="props.row.commission_reward_status == 0"
                                >
                                  <template
                                    v-if="commissionOperStatus == 'run'"
                                  >
                                    <i
                                      class="
                                        el-icon-question
                                        settlement-status-icon
                                      "
                                    ></i>
                                    手动提前结算，佣金将不再按结算方式自动执行。
                                  </template>
                                  <template
                                    v-if="commissionOperStatus == 'cancel'"
                                  >
                                    <i
                                      class="
                                        el-icon-question
                                        settlement-status-icon
                                      "
                                    ></i>
                                    取消结算，佣金将不再结算。
                                  </template>
                                </div>
                                <div
                                  class="display-flex"
                                  v-if="props.row.commission_reward_status == 1"
                                >
                                  <i
                                    class="
                                      el-icon-question
                                      settlement-status-icon
                                    "
                                  ></i>
                                  您确定要手动退回佣金？
                                </div>
                                <div
                                  style="margin-top: 10px"
                                  v-if="
                                    props.row.commission_reward_status == 1 ||
                                    commissionOperStatus == 'cancel'
                                  "
                                >
                                  <el-checkbox
                                    v-model="deductioncheckbox"
                                    true-label="1"
                                    false-label="0"
                                    >扣除推广分销商业绩</el-checkbox
                                  >
                                </div>
                                <div
                                  class="display-flex commission-status-button"
                                >
                                  <el-button
                                    size="mini"
                                    type="text"
                                    @click="
                                      cancelcommissionStatusOper(props.$index)
                                    "
                                    >取消
                                  </el-button>
                                  <template
                                    v-if="
                                      props.row.commission_reward_status == 0
                                    "
                                  >
                                    <el-button
                                      v-if="commissionOperStatus == 'run'"
                                      type="primary"
                                      size="mini"
                                      :disabled="isdisabled"
                                      @click="
                                        settlement(
                                          'runOrder',
                                          props.row.id,
                                          props.$index
                                        )
                                      "
                                    >
                                      <i
                                        v-if="isdisabled"
                                        class="el-icon-loading"
                                      ></i>
                                      确定
                                    </el-button>
                                    <el-button
                                      type="primary"
                                      size="mini"
                                      :disabled="isdisabled"
                                      v-if="commissionOperStatus == 'cancel'"
                                      @click="
                                        settlement(
                                          'cancelOrder',
                                          props.row.id,
                                          props.$index
                                        )
                                      "
                                    >
                                      <i
                                        v-if="isdisabled"
                                        class="el-icon-loading"
                                      ></i>
                                      确定
                                    </el-button>
                                  </template>
                                  <el-button
                                    type="primary"
                                    size="mini"
                                    :disabled="isdisabled"
                                    v-if="
                                      props.row.commission_reward_status == 1
                                    "
                                    @click="
                                      settlement(
                                        'backOrder',
                                        props.row.id,
                                        props.$index
                                      )
                                    "
                                  >
                                    <i
                                      v-if="isdisabled"
                                      class="el-icon-loading"
                                    ></i>
                                    确定
                                  </el-button>
                                </div>
                              </div>
                            </div>
                            <div
                              class="display-flex active-cursor"
                              slot="reference"
                              v-if="props.row.commission_reward_status >= 0"
                            >
                              <div
                                v-show="props.row.commission_reward_status == 0"
                                class="active-cursor"
                                @click="
                                  changeCommissionStatus(props.$index, 'run')
                                "
                              >
                                手动结算
                              </div>
                              <div
                                v-show="props.row.commission_reward_status == 0"
                                class="commission-status-cancel"
                                @click="
                                  changeCommissionStatus(props.$index, 'cancel')
                                "
                              >
                                取消
                              </div>
                              <div
                                v-show="props.row.commission_reward_status == 1"
                                class="active-cursor cursor-returned"
                                @click="
                                  changeCommissionStatus(props.$index, 'back')
                                "
                              >
                                手动退回
                              </div>
                            </div>
                          </el-popover>
                        </span>
                        <span v-else>-</span>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column> -->

            <el-table-column prop="productId" label="商品信息" width="220">
            </el-table-column>
            <el-table-column prop="orderItemId" label="退款状态" width="100">
            </el-table-column>
            <el-table-column prop="tenantId" label="下单用户" width="110">
            </el-table-column>
            <el-table-column prop="createUser" label="推广分销商" width="110">
            </el-table-column>
            <el-table-column
              prop="commissionPriceType"
              label="佣金详情"
              width="280"
            >
            </el-table-column>
            <el-table-column
              prop="commissionOrderStatus"
              label="佣金结算"
              width="100"
            >
            </el-table-column>
            <el-table-column prop="commissionTime" label="结算时间" width="160">
            </el-table-column>
            <el-table-column prop="buyerId" label="结算方式" width="110">
            </el-table-column>
            <el-table-column
              prop="commissionEvent"
              label="商品结算金额"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="commissionRules"
              label="分销商业绩"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="amount"
              label="分佣总金额/到账金额"
              width="160"
            >
            </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="120">
            </el-table-column>
          </el-table>
        </div>
        <!-- pag页码 分页器 -->
        <div class="shopro-pagination-container">
          <el-pagination
            align="right" background
            @current-change="orderCurrentChange"
            @size-change="orderSizeChange"
            :current-page="page.currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </basic-container>
</template>

<script>
import {
  getList,
  getDetail,
  add,
  update,
  remove,
} from "@/api/commission/commissionorder";
import option from "@/const/commission/commissionorder";
import { mapGetters } from "vuex";
import { getDictionary } from "@/api/system/dict";

export default {
  data() {
    return {
      isAjax: false,
      searchForm: {
        form_1_key: "buyer_id",
        form_1_value: "",

        form_2_key: "agent_id",
        form_2_value: "",

        form_3_key: "commission_user_id",
        form_3_value: "",

        order_sn: "",
        order_createtime: "",
        goods_title: "",
        commission_order_createtime: "",
        commission_reward_status: "all",
        commission_event: "all",

        id: "",
      },
      searchFormInit: {
        form_1_key: "buyer_id",
        form_1_value: "",

        form_2_key: "agent_id",
        form_2_value: "",

        form_3_key: "commission_user_id",
        form_3_value: "",

        order_sn: "",
        order_createtime: "",
        goods_title: "",
        commission_time: "",
        commission_reward_status: "all",
        commission_event: "all",

        id: "",
      },
      searchOp: {
        buyer_id: "=",
        buyer_nickname: "like",
        buyer_mobile: "like",

        agent_id: "=",
        agent_nickname: "like",
        agent_mobile: "like",

        commission_user_id: "=",
        commission_nickname: "like",
        commission_mobile: "like",

        order_sn: "like",
        order_createtime: "range",
        goods_title: "like",
        commission_time: "range",
        commission_reward_status: "=",
        commission_event: "=",

        id: "=",
      },
      searchStatusOption: [
        {
          value: "all",
          label: "全部",
        },
        {
          value: "-2",
          label: "已取消",
        },
        {
          value: "-1",
          label: "已退回",
        },
        {
          value: "0",
          label: "未结算",
        },
        {
          value: "1",
          label: "已结算",
        },
      ],
      commissionEventOption: [
        {
          value: "all",
          label: "全部",
        },
        {
          value: "payed",
          label: "支付后结算",
        },
        {
          value: "confirm",
          label: "确认收货结算",
        },
        {
          value: "finish",
          label: "订单完成结算",
        },
        {
          value: "admin",
          label: "手动打款",
        },
      ],
      // 统计
      commissionDashboard: {
        total: {
          total: {
            label: "商品总订单数",
            color: "#8644F2",
            unit: "单",
            value: 0,
          },
          amount_total: {
            label: "商品结算总金额",
            color: "#E6A93C     ",
            unit: "元",
            value: 0,
          },
          commission_total: {
            label: "分佣总金额",
            color: "#687FF4",
            unit: "元",
            value: 0,
          },
        },
        status: {
          commission_cancel_total: {
            label: "已取消佣金",
            color: "#70C140 ",
            unit: "元",
            value: 0,
          },
          commission_back_total: {
            label: "已退回佣金",
            color: "#FF826C",
            unit: "元",
            value: 0,
          },
          commission_waiting_total: {
            label: "未结算佣金",
            color: "#EC5B55 ",
            unit: "元",
            value: 0,
          },
          commissioned_total: {
            label: "已结算佣金",
            color: "#56B99D ",
            unit: "元",
            value: 0,
          },
        },
      },
      orderList: [
        {
          tenantId: "用户id 下单用户 中文",
          orderItemId: "订单项目ID 退款状态 数字",
          productId: "产品Id 产品信息 数字",
          createUser: "创建用户 推广分销商 数字",
          commissionPriceType: "佣金价格类型 佣金详情  中文",
          commissionOrderStatus: "佣金订单状态 佣金结算 数字",
          commissionTime: "佣金结算时间",
          buyerId: "购买者ID 结算方式 数字",
          commissionEvent: "自我购买 结算金额 数字",
          commissionRules: "佣金奖励状态 分销商业业绩 中文",
          amount: "数量 总金额",
        },
      ],

      // 弹框标题
      title: "",
      // 是否展示弹框
      box: false,
      // 是否显示查询
      search: true,
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
      // 表单配置
      option: option,
      // 表单列表
      data: [],
    };
  },
  mounted() {
    this.init();
    this.onLoad(this.page);
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
    getrefresh() {
      window.location.reload(() => {
        // this.reqOrderList();
      });
    },
    screenEmpty() {
      // this.searchForm = JSON.parse(JSON.stringify(this.searchFormInit));
    },
    handleSelectionChange(val) {
      // this.multipleSelection = val;
    },

    init() {},
    // 分页器
    orderCurrentChange(currentPage) {
      let that = this;
      that.page.currentPage = currentPage;
      that.onLoad(that.page);
    },
    orderSizeChange(pageSize) {
      let that = this;
      that.page.pageSize = pageSize;
      that.onLoad(that.page);
    },
    // 发请求
    onLoad(page, params = {}) {
      let that = this;
      that.loading = true;
      getList(
        page.currentPage,
        page.pageSize,
        Object.assign(params, that.query)
      ).then((res) => {
        that.orderList = res.data.data.records;
        that.page.total = data.total;
        // that.data = data.records;
        // that.loading = false;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/views/commission/style/commissionorder.scss";
</style>
<style lang="scss"></style>
