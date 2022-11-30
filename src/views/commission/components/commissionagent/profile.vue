<template>
  <div id="agentDetail">
    <div class="">
      <el-row :gutter="10">

        <!-- 个人信息 -->
        <el-col :xs="14" :sm="14" :md="14" :lg="8" :xl="8">
          <div class="profile-block display-flex agent-message">
            <div class="agent-image">
              <el-image src="https://thirdwx.qlogo.cn/mmopen/vi_32/dlIBXlicZrokYVp283OFh5o1oKqbuASEdQAJ9gYmJeEtfvicVIkaI1XSvqMw29deK95Z54ibDExvtTdOgu9kWuK9Q/132">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <div class="agent-level-image">
                <el-image src="https://demo.shopro.top/uploads/20220909/5c5e361cd3869e363e8d19c4911905e5.jpg">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div>
            </div>

            <div class="agent-name font-weight">
              名字name
            </div>
            <div style="position: relative">
              <div class="agent-refresh">
                <i class="el-icon-refresh-right"></i><span>刷新</span>
              </div>

              <div
                class="agent-list-item display-flex"
                style="margin-bottom: 14px"
              >
                <div class="agent-list-item-tip">
                  <span class="tip-span">分销商状态</span><span>:</span>
                </div>
                <div class="agent-list-item-container display-flex">
                  <div class="agent-list-item-form font-weight">
                    <div class="agent-apply-status">
                      <el-select
                        v-model="agentdataa"
                        placeholder=""
                        size="mini"
                      >
                        <el-option
                          v-for="(item,index1) in agentdata"
                          :key="index1"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                </div>
              </div>

              <div class="agent-list-item display-flex">
                <div class="agent-list-item-tip">
                  <span class="tip-span">分销等级</span><span>:</span>
                </div>
                <div class="agent-list-item-container display-flex">
                  <div class="agent-list-item-form font-weight">
                    <span>普通用户</span>
                    <span>(等级1)</span>
                  </div>
                  <div class="theme-cursor theme-cursor-edit">
                    更换
                  </div>
                </div>
              </div>

              <!-- <div class="agent-list-item display-flex">
                <div class="agent-list-item-tip">
                  <span class="tip-span">待升级等级</span><span>:</span>
                </div>
                <div class="agent-list-item-container display-flex">
                  <div class="agent-list-item-form font-weight">
                    <span>{{
                      profileData.level_status_text
                        ? profileData.level_status_text
                        : "-"
                    }}</span>
                    <span>(等级)</span>
                  </div>
                  <div
                    class="theme-cursor theme-cursor-edit"
                  >
                    同意
                  </div>
                  <div
                    class="theme-cursor theme-cursor-edit no-recommendation"
                  >
                    拒绝
                  </div>
                </div>
              </div> -->

              <div class="agent-list-item display-flex">
                <div class="agent-list-item-tip">
                  <span class="tip-span">上级分销商</span><span>:</span>
                </div>
                <div class="agent-list-item-container display-flex">
                  <div class="agent-list-item-form">
                    <span>无推荐人</span>
                  </div>
                  <div class="theme-cursor">
                    更换
                  </div>
                </div>
              </div>

              <div class="agent-list-item-more display-flex">
                <div class="agent-list-item-tip">
                  <span class="tip-span">佣金比例</span><span>:</span>
                </div>
                <div class="agent-list-item-container display-flex">

                  <div class="agent-commission_rules-item">
                    <div>一级(自购)</div>
                    <div class="agent-commission_rules-rate font-weight">
                      0.00%
                    </div>
                  </div>

                  <div class="agent-commission_rules-item">
                    <div>二级</div>
                    <div class="agent-commission_rules-rate font-weight">
                      0.00%
                    </div>
                  </div>

                  <div class="agent-commission_rules-item">
                    <div>三级</div>
                    <div class="agent-commission_rules-rate font-weight">
                      0.00%
                    </div>
                  </div>

                </div>
              </div>

              <div class="display-flex">
                <div class="agent-list-item-tip">
                  <span class="tip-span">允许升级</span><span>:</span>
                </div>
                <div class="display-flex">
                  <el-switch
                    v-model="upgrade_lock"
                    :active-value="0"
                    :inactive-value="1"
                    active-color="#7536D0"
                    inactive-color="#eee"
                  >
                  </el-switch>
                </div>
              </div>

            </div>
          </div>
        </el-col>

        <!-- 团队统计 -->
        <el-col class="hidden-sm-and-down" :lg="12" :xl="12">
          <div class="profile-block agent-dashboard  profile-block-scrollbar">
            <div class="agent-dashboard-contanmer">
              <div class="agent-dashboard-title font-weight">
                团队统计<span @click="centerdilogteam=true" class="theme-cursor theme-cursor-edit">查看团队</span>
              </div>

              <el-row :gutter="10">
                <el-col :span="8">
                  <div class="agent-dashboard-item agent-dashboard-item-margin">
                    <div class="agent-dashboard-item-tip">团队人数：</div>
                    <div class="agent-dashboard-item-form">
                        0
                      <span class="unit-tip-item">人</span>
                    </div>
                  </div>
                </el-col>

                <el-col :span="8">
                  <div class="agent-dashboard-item agent-dashboard-item-margin">
                    <div class="agent-dashboard-item-tip">一级团队人数:</div>
                    <div class="agent-dashboard-item-form">0
                      <span class="unit-tip-item">人</span>
                    </div>
                  </div>
                </el-col>

                <el-col :span="8">
                  <div class="agent-dashboard-item agent-dashboard-item-margin">
                    <div class="agent-dashboard-item-tip">二级团队人数:</div>
                    <div class="agent-dashboard-item-form">
                      0
                      <span class="unit-tip-item">人</span>
                    </div>
                  </div>
                </el-col>

                <el-col :span="8">
                  <div class="agent-dashboard-item">
                    <div class="agent-dashboard-item-tip">
                      团队分销商人数:
                      <el-popover placement="bottom-start" trigger="hover">
                        <div>
                          <div
                            class="agent-dashboard-popover-item"
                          >
                            <span class="agent-dashboard-popover-item-tip"
                              >等级:</span
                            ><span>人</span>
                          </div>
                        </div>
                        <i slot="reference" class="el-icon-warning"></i>
                      </el-popover>
                    </div>
                    <div class="agent-dashboard-item-form">
                      0
                      <span class="unit-tip-item">人</span>
                    </div>
                  </div>
                </el-col>

                <el-col :span="8">
                  <div class="agent-dashboard-item">
                    <div class="agent-dashboard-item-tip">
                      一级分销商人数:
                      <el-popover placement="bottom-start" trigger="hover">
                        <div>
                          <div class="agent-dashboard-popover-item">
                            <span class="agent-dashboard-popover-item-tip"
                              >等级:</span>0<span>人</span>
                          </div>
                        </div>
                        <i slot="reference" class="el-icon-warning"></i>
                      </el-popover>
                    </div>
                    <div class="agent-dashboard-item-form">
                      0
                      <span class="unit-tip-item">人</span>
                    </div>
                  </div>
                </el-col>

                <el-col :span="8">
                  <div class="agent-dashboard-item">
                    <div class="agent-dashboard-item-tip">二级分销商人数:</div>
                    <div class="agent-dashboard-item-form">
                      0
                      <span class="unit-tip-item">人</span>
                    </div>
                  </div>
                </el-col>

              </el-row>
            </div>
            <div class="agent-assets">
              <div class="agent-assets-title font-weight">业绩统计</div>
              <el-row :gutter="10">
                <el-col :span="6">
                  <div class="agent-dashboard-item agent-dashboard-item-margin">
                    <div class="agent-dashboard-item-tip">团队分销总金额：</div>
                    <div class="agent-dashboard-item-form">
                      0.00
                      <span class="unit-tip-item">元</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="agent-dashboard-item agent-dashboard-item-margin">
                    <div class="agent-dashboard-item-tip">一级分销总金额:</div>
                    <div class="agent-dashboard-item-form">
                      0.00
                      <span class="unit-tip-item">元</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="agent-dashboard-item agent-dashboard-item-margin">
                    <div class="agent-dashboard-item-tip">二级分销总金额:</div>
                    <div class="agent-dashboard-item-form">
                      0.00
                      <span class="unit-tip-item">元</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="agent-dashboard-item agent-dashboard-item-margin">
                    <div class="agent-dashboard-item-tip">
                      直推分销总金额:
                      <el-popover
                        placement="bottom"
                        width="210"
                        trigger="hover"
                        content="包含直推分销金额和内购分销金额"
                      >
                        <i slot="reference" class="el-icon-warning"></i>
                      </el-popover>
                    </div>
                    <div
                      class="agent-dashboard-item-form theme-cursor"
                    >
                      0.00
                      <span class="unit-tip-item">元</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="agent-dashboard-item">
                    <div class="agent-dashboard-item-tip">团队分销订单：</div>
                    <div class="agent-dashboard-item-form">
                      0
                      <span class="unit-tip-item">单</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="agent-dashboard-item">
                    <div class="agent-dashboard-item-tip">一级分销订单:</div>
                    <div class="agent-dashboard-item-form">
                      0
                      <span class="unit-tip-item">单</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="agent-dashboard-item">
                    <div class="agent-dashboard-item-tip">二级分销订单:</div>
                    <div class="agent-dashboard-item-form">
                      0
                      <span class="unit-tip-item">单</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="agent-dashboard-item">
                    <div class="agent-dashboard-item-tip">
                      直推分销订单:
                      <el-popover
                        placement="bottom"
                        width="210"
                        trigger="hover"
                        content="包含直推分销订单和自购分销订单"
                      >
                        <i slot="reference" class="el-icon-warning"></i>
                      </el-popover>
                    </div>
                    <div
                      class="agent-dashboard-item-form theme-cursor"
                    >
                      0
                      <span class="unit-tip-item">单</span>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="agent-assets">
              <div class="agent-assets-title font-weight">资产信息</div>
              <el-row :gutter="10">
                <el-col :span="6">
                  <div class="agent-dashboard-item">
                    <div class="agent-dashboard-item-tip">累计佣金:</div>
                    <div
                      class="agent-dashboard-item-form theme-cursor"
                    >
                      0.00
                      <span class="unit-tip-item">元</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="agent-dashboard-item">
                    <div class="agent-dashboard-item-tip">待入账佣金:</div>
                    <div
                      class="agent-dashboard-item-form theme-cursor"
                    >
                      0.00
                      <span class="unit-tip-item">元</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="agent-dashboard-item">
                    <div class="agent-dashboard-item-tip">消费金额:</div>
                    <div class="agent-dashboard-item-form">
                      0.00
                      <span class="unit-tip-item">元</span>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>

        <!-- min-height: 545px; -->
        <!-- 完善资料 -->
        <el-col :xs="10" :sm="10" :md="10" :lg="4" :xl="4">
          <div class="profile-block agent-apply shopro-container-scrollbar">
            <div class="agent-apply-title font-weight">
              <div>完善资料</div>
            </div>

            <div class="agent-apply-info-status display-flex">
              <div>资料状态：</div>
              <div
                class="agent-apply-status"
                style="width: 100px"
              >
                <el-select
                  v-model="info_statusa"
                  placeholder=""
                  size="mini"
                  @change="applyInfoStatusChange"
                >
                  <el-option
                    v-for="item in info_status"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>

            <div class="agent-apply-title font-weight">
              <div>申请信息</div>
              <div
                class="theme-cursor theme-cursor-edit"
                v-if="!isEditInfoStatus"
              >
                编辑
              </div>
              <div
                class="theme-cursor theme-cursor-edit"
                v-if="isEditInfoStatus"
              >
                <span style="color: #999" @click="isEditInfoStatus = false"
                  >取消</span
                >
                <span
                  class="theme-cursor theme-cursor-edit"
                  style="margin-left: 10px"
                  >保存</span
                >
              </div>
            </div>

            <template v-if="applyInfoList != 0">
              <div
                class="agent-apply-item"
              >
                <div class="agent-apply-item-tip">
                  <span>姓名:</span>
                  <span
                    class="agent-apply-item-tip-delete"
                    >删除</span
                  >
                </div>

                <div
                  class="agent-apply-item-form display-flex"
                >
                  <div class="font-weight">
                    <!-- <el-input
                      placeholder="请输入内容"
                      size="small"
                    ></el-input> -->
                    <!-- <span></span> -->
                  </div>
                </div>

                <div class="agent-apply-item-form display-flex">  
                </div>
              </div>

              <!-- <div
                class="agent-apply-item-nodata font-weight"
                v-if="!profileData.apply_info && applyInfoList == 0"
              >
                暂无申请资料
              </div> -->

            </template>

            <!-- <div class="agent-apply-item-nodata font-weight">
              无需资料审核
            </div> -->

          </div>
        </el-col>


        <!-- 团队统计 -->
        <el-col class="hidden-sm-and-up" :xs="24" :sm="24" :md="24">
          <div class="profile-block agent-dashboard">
            <div class="agent-dashboard-contanmer">
              <div class="agent-dashboard-title font-weight">
                团队统计<span
                  class="theme-cursor theme-cursor-edit"
                  @click="centerdilogteam=true"
                  >查看团队</span
                >
              </div>
              <el-row :gutter="10">
                <el-col :span="8">
                  <div class="agent-dashboard-item agent-dashboard-item-margin">
                    <div class="agent-dashboard-item-tip">团队人数：</div>
                    <div class="agent-dashboard-item-form">
                        0
                      <span class="unit-tip-item">人</span>
                    </div>
                  </div>
                </el-col>

                <el-col :span="8">
                  <div class="agent-dashboard-item agent-dashboard-item-margin">
                    <div class="agent-dashboard-item-tip">一级团队人数:</div>
                    <div class="agent-dashboard-item-form">0
                      <span class="unit-tip-item">人</span>
                    </div>
                  </div>
                </el-col>

                <el-col :span="8">
                  <div class="agent-dashboard-item agent-dashboard-item-margin">
                    <div class="agent-dashboard-item-tip">二级团队人数:</div>
                    <div class="agent-dashboard-item-form">
                      0
                      <span class="unit-tip-item">人</span>
                    </div>
                  </div>
                </el-col>

                <el-col :span="8">
                  <div class="agent-dashboard-item">
                    <div class="agent-dashboard-item-tip">
                      团队分销商人数:
                      <el-popover placement="bottom-start" trigger="hover">
                        <div>
                          <div
                            class="agent-dashboard-popover-item"
                          >
                            <span class="agent-dashboard-popover-item-tip"
                              >等级:</span
                            ><span>人</span>
                          </div>
                        </div>
                        <i slot="reference" class="el-icon-warning"></i>
                      </el-popover>
                    </div>
                    <div class="agent-dashboard-item-form">
                      0
                      <span class="unit-tip-item">人</span>
                    </div>
                  </div>
                </el-col>

                <el-col :span="8">
                  <div class="agent-dashboard-item">
                    <div class="agent-dashboard-item-tip">
                      一级分销商人数:
                      <el-popover placement="bottom-start" trigger="hover">
                        <div>
                          <div class="agent-dashboard-popover-item">
                            <span class="agent-dashboard-popover-item-tip"
                              >等级:</span>0<span>人</span>
                          </div>
                        </div>
                        <i slot="reference" class="el-icon-warning"></i>
                      </el-popover>
                    </div>
                    <div class="agent-dashboard-item-form">
                      0
                      <span class="unit-tip-item">人</span>
                    </div>
                  </div>
                </el-col>

                <el-col :span="8">
                  <div class="agent-dashboard-item">
                    <div class="agent-dashboard-item-tip">二级分销商人数:</div>
                    <div class="agent-dashboard-item-form">
                      0
                      <span class="unit-tip-item">人</span>
                    </div>
                  </div>
                </el-col>

              </el-row>
            </div>

            <div class="agent-assets">
              <div class="agent-assets-title font-weight">业绩统计</div>
              <el-row :gutter="10">
                <el-col :span="6">
                  <div class="agent-dashboard-item agent-dashboard-item-margin">
                    <div class="agent-dashboard-item-tip">团队分销总金额：</div>
                    <div class="agent-dashboard-item-form">
                      0.00
                      <span class="unit-tip-item">元</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="agent-dashboard-item agent-dashboard-item-margin">
                    <div class="agent-dashboard-item-tip">一级分销总金额:</div>
                    <div class="agent-dashboard-item-form">
                      0.00
                      <span class="unit-tip-item">元</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="agent-dashboard-item agent-dashboard-item-margin">
                    <div class="agent-dashboard-item-tip">二级分销总金额:</div>
                    <div class="agent-dashboard-item-form">
                      0.00
                      <span class="unit-tip-item">元</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="agent-dashboard-item agent-dashboard-item-margin">
                    <div class="agent-dashboard-item-tip">
                      直推分销总金额:
                      <el-popover
                        placement="bottom"
                        width="210"
                        trigger="hover"
                        content="包含直推分销金额和内购分销金额"
                      >
                        <i slot="reference" class="el-icon-warning"></i>
                      </el-popover>
                    </div>
                    <div
                      class="agent-dashboard-item-form theme-cursor"
                    >
                      0.00
                      <span class="unit-tip-item">元</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="agent-dashboard-item">
                    <div class="agent-dashboard-item-tip">团队分销订单：</div>
                    <div class="agent-dashboard-item-form">
                      0
                      <span class="unit-tip-item">单</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="agent-dashboard-item">
                    <div class="agent-dashboard-item-tip">一级分销订单:</div>
                    <div class="agent-dashboard-item-form">
                      0
                      <span class="unit-tip-item">单</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="agent-dashboard-item">
                    <div class="agent-dashboard-item-tip">二级分销订单:</div>
                    <div class="agent-dashboard-item-form">
                      0
                      <span class="unit-tip-item">单</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="agent-dashboard-item">
                    <div class="agent-dashboard-item-tip">
                      直推分销订单:
                      <el-popover
                        placement="bottom"
                        width="210"
                        trigger="hover"
                        content="包含直推分销订单和自购分销订单"
                      >
                        <i slot="reference" class="el-icon-warning"></i>
                      </el-popover>
                    </div>
                    <div
                      class="agent-dashboard-item-form theme-cursor"
                    >
                      0
                      <span class="unit-tip-item">单</span>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="agent-assets">
              <div class="agent-assets-title font-weight">资产信息</div>
              <el-row :gutter="10">
                <el-col :span="6">
                  <div class="agent-dashboard-item">
                    <div class="agent-dashboard-item-tip">累计佣金:</div>
                    <div
                      class="agent-dashboard-item-form theme-cursor"
                    >
                      0.00
                      <span class="unit-tip-item">元</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="agent-dashboard-item">
                    <div class="agent-dashboard-item-tip">待入账佣金:</div>
                    <div
                      class="agent-dashboard-item-form theme-cursor"
                    >
                      0.00
                      <span class="unit-tip-item">元</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="agent-dashboard-item">
                    <div class="agent-dashboard-item-tip">消费金额:</div>
                    <div class="agent-dashboard-item-form">
                      0.00
                      <span class="unit-tip-item">元</span>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>

      </el-row>
    </div>

    <!-- table表格表头 -->
    <div class="profile-block agent-table">
      <div class="shopro-index-button-container">
        <div
          class="custom-refresh display-flex-c"
        >
          <i class="el-icon-refresh"></i>
        </div>
        <div class="flex-1">
          <el-radio-group
            v-model="activeStatus"
          >
            <el-radio-button   label="log">分销动态</el-radio-button>
            <el-radio-button   label="order">分销订单</el-radio-button>
            <el-radio-button   label="reward">佣金明细</el-radio-button>
          </el-radio-group>
        </div>
        <div class="theme-cursor" >
          查看详情
        </div>
      </div>
      <div v-loading="logListAjax">
        <div
          class="shopro-table-container"
          :class="activeStatus == 'order' ? 'table-height' : ''"
        >
          <!-- <el-table ref="multipleTable" :data="logList" border>
            <template v-for="(item, index) in columns[activeStatus]">
              <el-table-column
                :key="index"
                :fixed="item.fixed"
                :prop="item.field"
                :align="item.align ? item.align : 'center'"
                :min-width="item.width"
              >
                <template slot="header" slot-scope="scope">
                  <div
                    class="log-selected"
                    v-if="item.header == 'custom-header'"
                  >
                    <div class="log-selected-tip">动态筛选</div>
                    <el-select
                      v-model="filterForm.event"
                      placeholder="请选择"
                      size="small"
                      @change="changeLogEvent"
                    >
                      <el-option
                        v-for="item in logOptions"
                        :key="item.type"
                        :label="item.name"
                        :value="item.type"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div v-if="!item.header">
                    {{ item.title }}
                  </div>
                </template>

                <template slot-scope="scope">
                  <div
                    class="display-flex"
                    v-if="item.type == 'vhtml'"
                    v-html="item.formatter(scope.row)"
                  ></div>

                  <div
                    class="display-flex"
                    v-if="item.type == 'click'"
                    v-html="item.formatter(scope.row)"
                    @click="operation('open-order', scope.row.order.id)"
                  ></div>

                  <div
                    class="display-flex"
                    v-if="item.type == 'open'"
                    v-html="item.formatter(scope.row)"
                    @click="operation(scope.row.event, scope.row.event_id)"
                  ></div>

                  <div v-if="item.type == 'vmodel'">
                    {{ scope.row[item.field] }}
                  </div>
                </template>

              </el-table-column>
            </template>
          </el-table> -->
        
        </div>
        <div class="shopro-pagination-container">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalPage"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    
    
    <!-- table表格内容 -->
    <!-- <div class="ChildUserCountContainer">
      <el-dialog
        :title="
          dialogType == 'change-parent-agent'
            ? '修改上级分销商'
            : '修改分销商等级'
        "
        :visible.sync="dialogVisible"
        :before-close="closeDialog"
      >
        <div v-if="dialogType == 'change-level'">
          <div class="el-dialog-tip">注意：更换等级后，该用户不会降级。</div>
          <div>
            <div class="parent-agent-header display-flex">
              <div class="parent-agent-id">ID</div>
              <div
                class="parent-agent-message"
                style="text-align: left; padding-left: 10px"
              >
                等级信息
              </div>
              <div
                class="parent-agent-phone"
                style="text-align: left; padding-left: 10px"
              >
                等级权重
              </div>
            </div>
            <div class="parent-agent-body">
              <div
                class="parent-agent-item display-flex"
                :class="
                  agent.level == selectAgentLevel
                    ? 'parent-agent-item-active'
                    : ''
                "
                v-for="(agent, aindex) in agentLevelList"
                @click="operation('select-agent-level', agent.level)"
              >
                <div class="parent-agent-id">{{ agent.level }}</div>
                <div class="parent-agent-message">
                  <div class="display-flex">
                    <div class="table-image">
                      <el-image
                        :src="Fast.api.cdnurl(agent.image)"
                        fit="contain"
                      >
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                    </div>
                    <div class="ellipsis-item">{{ agent.name }}</div>
                  </div>
                  <div v-else>-</div>
                </div>
                <div
                  class="parent-agent-phone"
                  style="text-align: left; padding-left: 10px"
                >
                  等级{{ agent.level }}
                  <span
                    v-if="agent.level == profileData.agent_level.level"
                    style="position: absolute; right: 10px; color: #6e3dc8"
                  >
                    (当前)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="dialogType == 'change-parent-agent'">
          <div class="el-dialog-tip">
            注意：更换上级分销商之后，该用户之后的所有团队和业绩将移至新的分销商名下。
          </div>
          <div class="parent-agent-search">
            <el-input
              placeholder="请输入内容"
              v-model="parentFilterForm.form_1_value"
              class="input-with-select"
              size="small"
              @input="parentDebounceFilter"
            >
              <el-select
                v-model="parentFilterForm.form_1_key"
                slot="prepend"
                placeholder="请选择"
              >
                <el-option label="会员ID" value="user_id"></el-option>
                <el-option label="会员昵称" value="nickname"></el-option>
                <el-option label="手机号" value="mobile"></el-option>
              </el-select>
              <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <div>
            <div class="parent-agent-header display-flex">
              <div class="parent-agent-id">ID</div>
              <div class="parent-agent-message">分销信息</div>
              <div class="parent-agent-message">分销等级</div>
              <div class="parent-agent-phone">手机号</div>
            </div>
            <div class="parent-agent-body">
              <div
                class="parent-agent-item display-flex"
                :class="
                  parent.user_id == selectParentAgentId
                    ? 'parent-agent-item-active'
                    : ''
                "
                v-for="parent in dialogList"
                v-if="dialogList.length > 0"
                @click="operation('select-parent-agent', parent.user_id)"
              >
                <div class="parent-agent-id">{{ parent.user_id }}</div>
                <div class="parent-agent-message">
                  <div v-if="parent.user" class="display-flex">
                    <div class="table-image" v-if="parent.user.avatar">
                      <el-image
                        :src="Fast.api.cdnurl(parent.user.avatar)"
                        fit="contain"
                      >
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                    </div>
                    <div class="ellipsis-item">
                      {{ parent.user.nickname ? parent.user.nickname : "-" }}
                    </div>
                  </div>
                  <div v-else style="text-align: left">-</div>
                </div>
                <div class="parent-agent-message">
                  <span v-if="parent.agent_level && parent.agent_level.name">{{
                    parent.agent_level.name
                  }}</span
                  >(等级{{ parent.level }})
                </div>
                <div class="parent-agent-phone">
                  <span v-if="parent.user">{{
                    parent.user.mobile ? parent.user.mobile : "-"
                  }}</span>
                  <span v-else>-</span>
                </div>
              </div>
              <div
                class="parent-agent-item display-flex"
                style="justify-content: center"
                v-if="dialogList.length == 0"
              >
                无数据
              </div>
            </div>
          </div>
          <div class="shopro-pagination-container">
            <el-pagination
              pager-count="5"
              @current-change="phandleCurrentChange"
              :current-page="pcurrentPage"
              :page-size="plimit"
              layout="total, prev, pager, next, jumper"
              :total="ptotalPage"
            >
            </el-pagination>
          </div>
        </div>
        <span
          v-if="dialogType != 'view-team'"
          slot="footer"
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
          "
        >
          <div>
            <el-checkbox
              v-if="dialogType == 'change-parent-agent'"
              v-model="noRecommendationChecked"
              @change="
                operation('select-parent-agent', noRecommendationChecked)
              "
              >设为无推荐人</el-checkbox
            >
          </div>
          <div>
            <el-button
              style="margin-right: 10px"
              @click="closeDialog"
              size="mini"
              type="text"
              >取 消</el-button
            >
            <el-button
              type="primary"
              size="small"
              @click="closeDialog(true, dialogType)"
              >确 定</el-button
            >
          </div>
        </span>
      </el-dialog>
    </div> -->
    <!-- eldialog 跳转组件 -->
      <el-dialog
        append-to-body="ture"
        :visible.sync="centerdilogteam"
        width="60%"
        center
      >
      <team></team>
      </el-dialog>
    <div style="height:50px;"></div>
  </div>
</template>

<script>
import team from "./team.vue"
export default {
    components :{team},
    data() {
        return {
            centerdilogteam:false,
            logList:[],
            activeStatus: 'log',
            isEditInfoStatus: false,
            profileData: [],
            upgrade_lock:1,
            agentdataa:"正常",
            agentdata:[
                {label:'正常',value:'1',},
                {label:'禁用',value:'2',},
                {label:'审核中',value:'3',},
                {label:'冻结',value:'4',},
            ],
            info_statusa:"无需资料",
            info_status:[
                {label:'驳回',value:'1',},
                {label:'未完善',value:'2',},
                {label:'已完善',value:'3',},
                {label:'无需资料',value:'4',},
            ],


        }
    },
};
</script>

<style lang="scss" scoped>
@import "@/views/commission/style/profile.scss";
</style>
<style lang="scss">
.flex-1 .el-radio-button__inner{
    height: 32px;
    font-size: 12px;
    line-height: 6px;
}
</style>
