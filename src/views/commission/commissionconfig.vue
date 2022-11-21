<template>
  <basic-container>
    <div id="indexPage">
      <el-form :model="configData" ref="configData" label-width="158px">
        <div class="form-group-area">
          <div class="shopro-form-group-title">
            <div class="shopro-form-group-title-line shopro-screen-button"></div>
            基础设置
          </div>
          <div class="shopro-form-group-title-agreement" v-if="tipshow">
            <div>
              设置分销时，请先了解<a
                class="shopro-form-group-title-href"
                href="https://www.spp.gov.cn/flfg/gfwj/201311/t20131122_64638.shtml"
                target="_blank"
                rel="noopener noreferrer"
                >《关于办理组织领导传销活动刑事案件适用法律若干问题的意见》</a
              >
            </div>
            <span class="el-icon-close" @click="tipClose"></span>
          </div>

          <el-form-item label="分销层级：">
            <el-radio-group
              v-model="configData.commission_level"
              fill="#8322ff"
            >
              <el-radio label="0">关闭</el-radio>
              <el-radio label="1">一级</el-radio>
              <el-radio label="2">二级</el-radio>
              <el-radio label="3">三级</el-radio>
            </el-radio-group>
            <div class="title-tip">默认佣金比例请到 分销等级 进行设置</div>
          </el-form-item>
          <el-form-item label="分销内购：">
            <el-radio-group v-model="configData.self_buy">
              <el-radio label="0">关闭</el-radio>
              <el-radio label="1">开启</el-radio>
            </el-radio-group>
            <div class="title-tip">
              内购优惠开启后，分销商自己购买时，下单可以给自己返佣
            </div>
          </el-form-item>
          <el-form-item label="分销商锁定下线条件：">
            <el-radio-group v-model="configData.invite_lock">
              <el-radio label="share">点击分享链接</el-radio>
              <el-radio label="pay">首次支付</el-radio>
              <el-radio label="agent">成为子分销商</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="分销商审核：">
            <el-radio-group v-model="configData.agent_check">
              <el-radio label="0">不需要</el-radio>
              <el-radio label="1">需要</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="越级升级：">
            <el-radio-group v-model="configData.upgrade_jump">
              <el-radio label="0">不允许</el-radio>
              <el-radio label="1">允许</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="升级审核：">
            <el-radio-group v-model="configData.upgrade_check">
              <el-radio label="0">不需要</el-radio>
              <el-radio label="1">需要</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="form-group-area">
          <div class="shopro-form-group-title">
            <div class="shopro-form-group-title-line shopro-screen-button"></div>
            默认分销商设置
          </div>

          <el-form-item label="成为分销商条件：">
            <el-radio-group
              v-model="configData.become_agent.type"
              @change="changeBecomeAgentType(configData.become_agent.type)"
            >
              <el-radio label="apply">自助申请</el-radio>
              <el-radio label="goods">购买任意商品</el-radio>
              <el-radio label="consume">消费累计</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-collapse-transition>
            <div v-if="configData.become_agent.type != 'apply'">
              <el-form-item
                label="选择商品："
                v-if="configData.become_agent.type == 'goods'"
              >
                <el-button

                  class="goods-add shopro-screen-button"
                  type="text"
                  @click="centerDialogVisible = true"
                  style="margin: 5px 0"
                  >{{
                    configData.become_agent.value ? "重新选择" : "选择商品"
                  }}</el-button
                >
                <!-- append-to-body="ture"  解决el-dialog点击后的朦胧层 -->
                <el-dialog
                  append-to-body="ture"
                  :visible.sync="centerDialogVisible"
                  width="80%"
                  center
                >
                  <commodity></commodity>
                  <!-- <span>需要注意的是内容是默认不居中的</span>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="centerDialogVisible = false"
                      >取 消</el-button
                    >
                    <el-button
                      type="primary"
                      @click="centerDialogVisible = false"
                      >确 定</el-button
                    >
                  </span> -->
                </el-dialog>


                <div style="max-width: 632px;border: 1px solid #e6e6e6;margin-top: 9px;">
                  <div class="shopro-goods-header">
                    <div class="shopro-goods-id">ID</div>
                    <div class="shopro-goods-title">商品信息</div>
                    <div class="shopro-goods-stock">库存</div>
                    <div class="shopro-goods-opt">操作</div>
                  </div>

                  <div>
                    <div
                      class="shopro-goods-body"
                    >
                      <div class="shopro-goods-id">
                      </div>
                      <div class="shopro-goods-title">
                        <div class="shopro-goods-image">
                          <el-image
                            fit="contain"
                          >
                            <div slot="error" class="image-slot">
                              <i class="el-icon-picture-outline"></i>
                            </div>
                          </el-image>
                        </div>
                        <div>
                          <div
                            class="ellipsis-item"
                            style="
                              width: 180px;
                              height: 20px;
                              line-height: 20px;
                            "
                          >
                          </div>
                          <div style="height: 20px; line-height: 20px">
                          </div>
                        </div>
                      </div>
                      <div class="shopro-goods-stock">
                      </div>
                      <div class="shopro-goods-opt">
                        <span class="become_register_delete">删除</span>
                      </div>
                    </div>
                    <div style="padding: 0 20px" v-if="!goodsDetail">
                      商品不存在或已下架
                    </div>
                  </div>
                  <div class="shopro-goods-body" >
                      <div class="shopro-goods-add-button shopro-screen-button">
                          <i class="el-icon-plus"></i>选择商品
                      </div>
                  </div>
                </div>
              </el-form-item>
              <!-- 累计消费消费累计金额 -->
              <el-form-item
                label="消费累计金额："
                v-if="configData.become_agent.type == 'consume'"
              >
                <div class="display-flex" style="width: 320px; height: 40px">
                  <el-input
                    v-model="configData.become_agent.value"
                    size="small"
                    type="number"
                    v-enter-number
                  >
                    <template slot="append">元</template>
                  </el-input>
                </div>
              </el-form-item>

              <!-- 邀请下级用户满 -->
              <el-form-item> </el-form-item>
            </div>
          </el-collapse-transition>

          <el-form-item label="完善资料：">
            <el-radio-group
              v-model="needAgentForm"
              @change="changeAgentForm(needAgentForm)"
            >
              <el-radio
                label="0"
                :disabled="configData.become_agent.type == 'apply'"
                >不需要</el-radio
              >
              <el-radio label="1">需要</el-radio>
            </el-radio-group>
            <div class="title-tip">
              成为分销商条件如果选择自助申请，完善资料必须选择需要
            </div>
          </el-form-item>

          <el-collapse-transition>
            <div v-if="needAgentForm == 1">
              <el-form-item label="表单背景图：">
                <div
                  class="bgimage-add-container"
                  @click="centerbackground = true"
                >
                  <el-image
                    v-if="configData.agent_form.background_image"
                    fit="contain"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>

                  <div
                    class="bgimage-add"
                    v-if="!configData.agent_form.background_image"
                  >
                    <i class="el-icon-plus"></i>
                  </div>
                </div>
                <el-dialog
                  append-to-body="ture"
                  :visible.sync="centerbackground"
                  width="80%"
                  center
                >
                  <background></background>
                </el-dialog>
              </el-form-item>

              <el-form-item label="表单内容：">
                <div style="max-width: 642px">
                  <div style="border: 1px solid #e6e6e6">
                    <div class="become-register-row become-register-row-title">
                      <div class="become-register-row-item">表单类型</div>
                      <div class="become-register-row-item">表单名称</div>
                      <div class="become-register-row-item-last">
                        <span>操作</span>
                      </div>
                    </div>
                    <div
                      v-if="this.listfrom"
                      class="become-register-row become-register-row-box"
                    >
                      <div class="become-register-row-item">
                        <el-select
                          class="become-register-row-item-input"
                          v-model="numselect"
                          slot="prepend"
                          placeholder="请选择"
                        >
                          <el-option label="餐厅名" value="1"></el-option>
                          <el-option label="订单号" value="2"></el-option>
                          <el-option label="用户电话" value="3"></el-option>
                        </el-select>
                      </div>
                      <div class="become-register-row-item">
                        <el-input
                          class="become-register-row-item-input"
                          v-model="frominput"
                          placeholder="请输入内容"
                        ></el-input>
                      </div>
                      <div class="become-register-row-item-last">
                        <span
                          class="become-register-row-item-last-red"
                          @click="fromfalse"
                          >删除</span
                        >
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="become_register_add-button" @click="fromture">
                      <i class="el-icon-plus"></i >追加
                    </div>
                  </div>
                </div>
              </el-form-item>
              <el-form-item label="申请协议：">
                <el-radio-group
                  v-model="needApplyProtocol"
                  @change="changeApplyProtocol(needApplyProtocol)"
                >
                  <el-radio label="0">不显示</el-radio>
                  <el-radio label="1">显示</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-collapse-transition>
                <div v-if="needApplyProtocol == 1">
                  <el-form-item label="协议内容：">
                    <div class="display-flex">
                      <div style="width: 150px; line-height: 32px">
                        <el-input
                          v-model="configData.apply_protocol.name"
                          size="small"
                        ></el-input>
                      </div>
                      <div
                        @click="centerDialogVisiblethree = true"
                        class="apply_protocol-select"
                      >
                        选择
                      </div>

                      <el-dialog
                        append-to-body="ture"
                        :visible.sync="centerDialogVisiblethree"
                        width="80%"
                        height="60%"
                      >
                        <agreement></agreement>
                      </el-dialog>
                    </div>
                  </el-form-item>
                </div>
              </el-collapse-transition>
            </div>
          </el-collapse-transition>
        </div>

        <!-- 结算条件 -->
        <div class="form-group-area">
          <div class="shopro-form-group-title">
            <div class="shopro-form-group-title-line shopro-screen-button"></div>
            结算条件
          </div>
          <el-form-item label="商品结算方式：">
            <el-radio-group v-model="configData.commission_price_type">
              <el-radio label="goods_price">商品价</el-radio>
              <el-radio label="pay_price">实际支付价</el-radio>
            </el-radio-group>
            <div class="title-tip">
              商品价: 商品实际售价/规格价，实际支付价: 实际支付的费用(不含运费)
            </div>
          </el-form-item>
          <el-form-item label="佣金结算方式：">
            <el-radio-group v-model="configData.commission_event">
              <el-radio label="payed">支付后结算</el-radio>
              <el-radio label="confirm">确认收货结算</el-radio>
              <el-radio label="finish">订单完成结算</el-radio>
              <el-radio label="admin">手动打款</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="退款扣除佣金：">
            <el-radio-group v-model="configData.refund_commission_reward">
              <el-radio label="0">不扣除</el-radio>
              <el-radio label="1">扣除</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="退款扣除分销业绩：">
            <el-radio-group v-model="configData.refund_commission_order">
              <el-radio label="0">不扣除</el-radio>
              <el-radio label="1">扣除</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </el-form>
      <div class="shopro-submit-container">
        <div class="shopro-submit-button shopro-screen-button">保存</div>
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
} from "@/api/commission/commissionconfig";

import { mapGetters } from "vuex";
import commodity from "./figchildren/commodity.vue";
import background from "./figchildren/background.vue";
import agreement from "./figchildren/agreement.vue";
//   import vala from "../../mock/designer/designer"
//   console.log(vala)
export default {
  components: { commodity, background, agreement },
  data() {
    return {
      centerbackground: false,
      centerDialogVisible: false,
      centerDialogVisiblethree: false,
      tipshow: true,
      goodsDetail:[],

      configData: {
        commission_level: "1",
        self_buy: "0",
        invite_lock: "share",
        agent_check: "0",
        upgrade_jump: "0",
        upgrade_check: "0",
        become_agent: {
          type: "apply",
          value: "", //传递值
        },
        agent_form: {
          background_image: "",
          content: [],
        },
        apply_protocol: "0",
        commission_price_type: "goods_price",
        commission_event: "payed",
        refund_commission_reward: "0",
        refund_commission_order: "0",
      },
      configDatatwo: {
        commission_level: "1",
        self_buy: "0",
        invite_lock: "share",
        agent_check: "0",
        upgrade_jump: "0",
        upgrade_check: "0",
        become_agent: {
          type: "apply",
          value: "", //传递值
        },
        agent_form: {
          background_image: "",
          content: [],
        },
        apply_protocol: "0",
        commission_price_type: "goods_price",
        commission_event: "payed",
        refund_commission_reward: "0",
        refund_commission_order: "0",
      },
      needApplyProtocol: "0",
      needAgentForm: "1",

      frominput: "",
      numselect: "",
      listfrom: false,

      // 模拟数据
      initData: [],
      isf: false,

      // // 弹框标题
      // title: '新建模板',
      // // 是否展示弹框
      // box: false,
      // // 加载中
      // loading: true,
      // // 是否为查看模式
      // view: false,
      // // 查询信息
      // query: {},
      // //选择的平台
      // platformArray:[],
      // // 分页信息
      // page: {
      //   currentPage: 1,
      //   pageSize: 10,
      //   total: 40
      // },
      // // 表单数据
      // form: {name:'',memo:'',platform:[]},
      // // 表单配置
      // option: option,
      // // 表单列表
      // templateList: [],
    };
  },
  mounted() {
    this.init();
    this.onLoad();
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  methods: {
    formRestore() {
      this.configData = this.configDatatwo;
    },
    fromture() {
      this.listfrom = true;
    },
    fromfalse() {
      this.listfrom = false;
    },
    tipClose() {
      this.tipshow = !this.tipshow;
    },
    changeAgentForm(value) {
      let that = this;
      if (value == "0") {
        that.configData.apply_protocol = "0";
      }
    },
    changeBecomeAgentType(value) {
      let that = this;
      if (value == "apply") {
        that.needAgentForm = "1";
      }
    },
    changeApplyProtocol(value) {
      if (value == "0") {
        this.configData.apply_protocol = "0";
      } else {
        this.configData.apply_protocol = {
          name: "",
          richtext_id: "",
        };
      }
    },

    init() {
      // console.log(this)
      // getDictionary({code: 'yes_no'}).then(res => {
      //   this.statusData = res.data.data;
      // });
    },

    handleSubmit() {
      // if (!this.form.id) {
      //   add(this.form).then(() => {
      //     this.box = false;
      //     this.onLoad(this.page);
      //     this.$message({
      //       type: "success",
      //       message: "操作成功!"
      //     });
      //   });
      // } else {
      //   update(this.form).then(() => {
      //     this.box = false;
      //     this.onLoad(this.page);
      //     this.$message({
      //       type: "success",
      //       message: "操作成功!"
      //     });
      //   })
      // }
    },

    onLoad(params = {}) {
      let that = this;
      that.loading = true;
      getList(that.page.currentPage, that.page.pageSize, params).then((res) => {
        console.log("res", res);
        // that.page.total = res.data.total;
        // that.data = res.data.records;
        // that.loading = false;
        // that.selectionClear();
      });
    },
  },
};
</script>


<style
  lang="scss"
  scoped
>
@import "@/views/commission/style/commissionconfig.scss"; 
</style>
<style lang="scss">
// 当要改变element样式时用
</style>
