<template>
  <basic-container>
    <div id="indexPage">
      <el-form label-width="158px">
        <div class="form-group-area">
          <div class="shopro-form-group-title">
            <div class="shopro-form-group-title-line"></div>
            基础设置
          </div>

          <!-- <div class="shopro-form-group-title-agreement" v-if="tipshow">
                        <div>
                            设置分销时，请先了解<a class="shopro-form-group-title-href" href="https://www.spp.gov.cn/flfg/gfwj/201311/t20131122_64638.shtml" target="_blank" rel="noopener noreferrer">《关于办理组织领导传销活动刑事案件适用法律若干问题的意见》</a>
                        </div>
                        <i class="el-icon-close" @click="tipClose"></i>
                        </div> -->

          <el-form-item label="分销层级：">
            <el-radio-group>
              <el-radio label="0">关闭</el-radio>
              <el-radio label="1">一级</el-radio>
              <el-radio label="2">二级</el-radio>
              <el-radio label="3">三级</el-radio>
            </el-radio-group>
            <div class="title-tip">默认佣金比例请到 分销等级 进行设置</div>
          </el-form-item>
          <el-form-item label="分销内购：">
            <el-radio-group>
              <el-radio label="0">关闭</el-radio>
              <el-radio label="1">开启</el-radio>
            </el-radio-group>
            <div class="title-tip">
              内购优惠开启后，分销商自己购买时，下单可以给自己返佣
            </div>
          </el-form-item>
          <el-form-item label="分销商锁定下线条件：">
            <el-radio-group>
              <el-radio label="share">点击分享链接</el-radio>
              <el-radio label="pay">首次支付</el-radio>
              <el-radio label="agent">成为子分销商</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="分销商审核：">
            <el-radio-group>
              <el-radio label="0">不需要</el-radio>
              <el-radio label="1">需要</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="越级升级：">
            <el-radio-group>
              <el-radio label="0">不允许</el-radio>
              <el-radio label="1">允许</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="升级审核：">
            <el-radio-group>
              <el-radio label="0">不需要</el-radio>
              <el-radio label="1">需要</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="form-group-area">
          <div class="shopro-form-group-title">
            <div class="shopro-form-group-title-line"></div>
            默认分销商设置
          </div>
          <el-form-item label="成为分销商条件：">
            <el-radio-group>
              <el-radio label="apply">自助申请</el-radio>
              <el-radio label="goods">购买任意商品</el-radio>
              <el-radio label="consume">消费累计</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="消费累计金额：">
            <div class="display-flex" style="width: 320px; height: 40px">
              <el-input size="small" type="number">
                <template slot="append">元</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="完善资料：">
            <el-radio-group>
              <el-radio label="0">不需要</el-radio>
              <el-radio label="1">需要</el-radio>
            </el-radio-group>
            <div class="title-tip">
              成为分销商条件如果选择自助申请，完善资料必须选择需要
            </div>
          </el-form-item>
        </div>

        <div class="form-group-area">
          <div class="shopro-form-group-title">
            <div class="shopro-form-group-title-line"></div>
            结算条件
          </div>
          <el-form-item label="商品结算方式：">
            <el-radio-group>
              <el-radio label="goods_price">商品价</el-radio>
              <el-radio label="pay_price">实际支付价</el-radio>
            </el-radio-group>
            <div class="title-tip">
              商品价: 商品实际售价/规格价，实际支付价: 实际支付的费用(不含运费)
            </div>
          </el-form-item>
          <el-form-item label="佣金结算方式：">
            <el-radio-group>
              <el-radio label="payed">支付后结算</el-radio>
              <el-radio label="confirm">确认收货结算</el-radio>
              <el-radio label="finish">订单完成结算</el-radio>
              <el-radio label="admin">手动打款</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="退款扣除佣金：">
            <el-radio-group>
              <el-radio label="0">不扣除</el-radio>
              <el-radio label="1">扣除</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="退款扣除分销业绩：">
            <el-radio-group>
              <el-radio label="0">不扣除</el-radio>
              <el-radio label="1">扣除</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </el-form>
      <div class="shopro-submit-container">
        <div class="shopro-default-button" @click="formRestore">重置</div>
        <div class="shopro-submit-button" @click="formSubmit">保存</div>
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
} from "@/api/decorate/designer";
import { mapGetters } from "vuex";
//   import vala from "../../mock/designer/designer"
//   console.log(vala)
export default {
  data() {
    return {
      // 弹框标题
      title: "",
    };
  },
  mounted() {
    this.init();
    this.onLoad(this.page);
    console.log("aba")
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  methods: {
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

    onLoad(page, params = {}) {
      const that = this
      that.loading = true;
      getList(page.currentPage, page.pageSize, Object.assign(params, that.query)).then(res => {
        const data = res.data.data;
        console.log("data:",data)
        console.log("abc")
        // this.page.total = data.total;
        // this.data = data.records;
        // this.loading = false;
        // this.selectionClear();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#indexPage {
  border-radius: 10px 10px 0px 0px;
  color: #444;
  font-weight: 500;
  position: relative;
}
.el-form-item {
  padding: 0 0 0 100px;
}

.el-form-item {
  margin-bottom: 16px;
}

.become-register-row {
  display: flex;
  font-size: 13px;
}

.become-register-row-title {
  background: #f9f9f9;
  border: none;
}

.become-register-row-item {
  width: 260px;
  min-width: 260px;
  padding: 0 20px;
  line-height: 44px;
}

.become-register-row-item-center {
  width: 240px;
  min-width: 240px;
}

.become-register-row-title .become-register-row-item {
  line-height: 40px;
}

.become-register-row-item-last {
  width: 130px;
  min-width: 130px;
  display: flex;
  align-items: center;
}

.become_register-contaoner {
  display: flex;
}

.become_register_add-button {
  cursor: pointer;
  color: #7438d5;
  width: 60px;
  margin-top: 16px;
  font-size: 13px;
}

.become_register_add-button i {
  margin-right: 6px;
}

.become_register_delete {
  color: #ff5959;
  cursor: pointer;
}

.become-register-row-frist {
  width: 90px;
  color: rgba(0, 0, 0, 0);
}

#draggableHandle {
  cursor: move;
  margin-left: 18px;
  font-size: 16px;
}

.seat-item {
  display: none;
  padding: 0 20px;
  color: #7438d5;
  height: 44px;
  line-height: 44px;
}

.sortable-ghost .seat-item {
  display: block;
}

.sortable-ghost .become_register-contaoner {
  display: none;
}

.apply_protocol-select {
  color: #7438d5;
  cursor: pointer;
  margin-left: 20px;
}

.shopro-submit-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: calc(100% - 30px);
  height: 60px;
  padding: 0 16px;
  position: fixed;
  bottom: 0px;
  right: 16px;
  // background: #fff;
  background-color: black;
}

.shopro-submit-button {
  width: 88px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  background: #7438d5;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
}

.shopro-default-button {
  width: 88px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  color: #7438d5;
}

.title-tip {
  color: #999;
  line-height: 13px;
  font-size: 13px;
  font-weight: 400;
  margin-top: 14px;
}

.bgimage-add-container {
  border: 1px solid #e6e6e6;
  width: 80px;
  height: 80px;
  border-radius: 5px;
}

.bgimage-add {
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #999;
}

.goods-add {
  width: 80px;
  height: 30px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  background: #7438d5;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-form-item__label,
.el-radio__label,
.el-input,
.el-select-dropdown__item {
  font-size: 13px;
}

.form-group-area {
  border-radius: 4px;
  margin-bottom: 10px;
}
.shopro-form-group-title {
  height: 50px;
  display: flex;
  align-items: center;

  color: black;
  font-weight: 600;
  box-sizing: border-box;
}
.shopro-form-group-title-line {
  width: 2px;
  height: 18px;
  background: #7438d5;
  margin: 0 10px 0 10px;
}
.shopro-goods-header {
  height: 40px;
  display: flex;
  align-items: center;
  background: #f9f9f9;
}

.shopro-goods-body {
  height: 50px;
  display: flex;
  align-items: center;
  border-top: 1px solid #e6e6e6;
}

.shopro-goods-title {
  width: 280px;
  min-width: 280px;
  display: flex;
  height: 50px;
  align-items: center;
  padding: 0 20px;
}

.shopro-goods-stock {
  width: 120px;
  min-width: 120px;
}

.shopro-goods-opt {
  width: 160px;
  min-width: 160px;
}

.shopro-goods-image {
  width: 36px;
  height: 36px;

  border: 1px solid #e6e6e6;
  box-sizing: border-box;
  border-radius: 2px;
  margin-right: 12px;
}

.shopro-goods-add-button {
  cursor: pointer;
  color: #7438d5;
  font-size: 13px;
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
}

.shopro-goods-add-button i {
  margin-right: 6px;
}
.shopro-goods-id {
  width: 70px;
  padding: 0 10px;
  text-align: center;
  flex-shrink: 0;
}
.form-group-area-last {
  padding-bottom: 20px;
}
.become-register-row-item-esp {
  line-height: 32px;
  display: flex;
  align-items: center;
}
.el-dialog {
  width: 900px;
}
.el-dialog__wrapper {
  background: rgba(43, 43, 43, 0.05);
  backdrop-filter: blur(2px);
}
.configis-upgrade-image {
  width: 900px;
  height: 580px;
  background: #ffffff;
  border-radius: 4px;
  position: relative;
}
.configis-upgrade-image img {
  width: 100%;
  height: 100%;
}
.el-dialog__body {
  padding: 0;
}
.el-dialog__header {
  height: 0;
  padding: 0;
}
.configis-upgrade-button {
  position: absolute;
  bottom: 162px;
  right: 360px;
}
.configis-upgrade-button-upgrade {
  width: 110px;
  height: 34px;
  background: #8322ff;
  border-radius: 2px;
  justify-content: center;
  font-weight: bold;
  font-size: 12px;
  color: #ffffff;
  margin-left: 42px;
  cursor: pointer;
}
.configis-upgrade-button-upgrade .icon-right {
  margin-left: 12px;
  width: 18px;
  height: 18px;
}
.configis-upgrade-button-refresh {
  color: #86818e;
  font-size: 12px;
  cursor: pointer;
}
.configis-upgrade-button-refresh .el-icon-refresh-right {
  margin-right: 6px;
  font-size: 14px;
}
.configis-upgrade-close {
  position: absolute;
  top: 53px;
  right: 58px;
  font-size: 20px;
  color: #7f7a87;
  cursor: pointer;
}

[v-cloak] {
  display: none;
}
.el-card__body {
  padding: 0;
}
</style>