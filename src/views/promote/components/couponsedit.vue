<template>
  <div id="pageDetail">
    <el-form
      :model="detailData"
      ref="detailData"
      label-width="108px"
      class="detail-form"
    >
      <el-form-item label="优惠券名称：" prop="name">
        <div class="display-flex">
          <el-input
            type="input"
            v-model="detailData.name"
            placeholder="请输入优惠券名称"
          ></el-input>
        </div>
      </el-form-item>

      <!-- <el-form-item label="优惠类型：" prop="type">
        <el-radio-group v-model="detailData.type">
          <el-radio label="cash">代金券</el-radio>
        </el-radio-group>
      </el-form-item> -->

      <!-- <el-form-item label="优惠券描述：">
        <el-input
          type="input"
          v-model="detailData.description"
          placeholder="仅商家端显示，用于区分相似优惠券(最多可输入十个字)"
          maxlength="11"
        ></el-input>
      </el-form-item> -->

      <!-- <el-form-item label="领券时间：" prop="gettime">
        <el-date-picker
          v-model="detailData.gettime"
          type="datetimerange"
          range-separator="至"
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="changeTime('gettime')"
        >
        </el-date-picker>
      </el-form-item> -->

      <!-- <el-form-item label="用券时间：" prop="usetime">
        <el-date-picker
          v-model="detailData.usetime"
          type="datetimerange"
          range-separator="至"
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="changeTime('usetime')"
        >
        </el-date-picker>
      </el-form-item> -->

      <!-- <el-form-item label="发券总量：">
        <div class="display-flex">
          <el-input
            v-positive-integer
            type="number"
            v-model="detailData.stock"
            style="width: 170px"
            placeholder="请输入发券总量"
          >
            <template slot="append">张</template>
          </el-input>
          <div class="msg-tip">
            修改优惠券总量时只能增加不能减少，请谨慎设置
          </div>
        </div>
      </el-form-item> -->

      <!-- <el-form-item label="每人限领：">
        <div class="display-flex">
          <el-input
            v-positive-integer
            type="number"
            v-model="detailData.limit"
            style="width: 170px"
            placeholder="请输入每人限领"
          >
            <template slot="append">张</template>
          </el-input>
        </div>
      </el-form-item> -->

      <!-- <el-form-item label="使用门槛：" prop="enough">
        <div class="display-flex">
          <el-input
            v-enter-number
            type="number"
            v-model="detailData.enough"
            style="width: 170px"
            placeholder="请输入使用门槛"
          >
            <template slot="append">元</template>
          </el-input>
        </div>
      </el-form-item> -->

      <!-- <el-form-item label="减免金额：" prop="amount">
        <div class="display-flex">
          <el-input
            v-enter-number
            type="number"
            v-model="detailData.amount"
            style="width: 170px"
            placeholder="请输入减免金额"
          >
            <template slot="append">元</template>
          </el-input>
        </div>
      </el-form-item> -->

      <!-- <el-form-item label="适用商品：" prop="goods_type">
        <div>
          <el-radio-group v-model="detailData.goods_type">
            <el-radio label="all">全部商品可用</el-radio>
            <el-radio label="part">指定商品可用</el-radio>
          </el-radio-group>
          <div
            class="display-flex"
            style="flex-wrap: wrap"
            v-if="detailData.goods_type == 'part'"
          >
            <div
              class="select-goods display-flex"
              :class="item.selected ? 'select-goods-selected' : ''"
              v-for="(item, index) in goods_arr"
              @click="operation('selectedDel', index)"
            >
              <img
                class="select-goods-img"
                :src="Fast.api.cdnurl(item.image)"
              />
              <div class="flex-1 ellipsis-item">
                {{ item.title }}
              </div>
              <img
                v-if="item.selected"
                class="delete-goods label-auto"
                src="/assets/addons/shopro/img/goods/close.png"
                @click="operation('delete', index)"
              />
            </div>
          </div>
          <div class="display-flex" v-if="detailData.goods_type == 'part'">
            <div class="display-flex">
              <div
                class="theme-color cursor-pointer modify-text"
                @click="operation('selected')"
              >
                {{ goods_arr.length > 0 ? "修改已选商品" : "选择商品" }}
              </div>
              <div
                class="theme-delete-color cursor-pointer"
                @click="operation('clear')"
              >
                清空
              </div>
            </div>
          </div>
        </div>
      </el-form-item> -->
    </el-form>
    <!-- <div class="dialog-footer display-flex">
      <div
        class="dialog-cancel-btn display-flex-c cursor-pointer"
      >
        取消
      </div>
      <div
        class="dialog-define-btn display-flex-c cursor-pointer"
      >
        确定
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailData: {
        name: '',
      },
    //   rules: {
    //     name: [
    //       {
    //         required: true,
    //         message: "请输入优惠券名称",
    //         trigger: "blur",
    //       },
    //     ],
    //     type: [
    //       {
    //         required: true,
    //         message: "请选择优惠券类型",
    //         trigger: "blur",
    //       },
    //     ],
    //     gettime: [
    //       {
    //         required: true,
    //         message: "请选择有效时间",
    //         trigger: "change",
    //       },
    //       {
    //         validator: checkTime,
    //         trigger: "change",
    //       },
    //     ],
    //     usetime: [
    //       {
    //         required: true,
    //         message: "请选择用券时间",
    //         trigger: "change",
    //       },
    //       {
    //         validator: checkTime,
    //         trigger: "change",
    //       },
    //     ],
    //     enough: [
    //       {
    //         required: true,
    //         message: "请输入使用门槛",
    //         trigger: "change",
    //       },
    //       {
    //         validator: checkEnough,
    //         trigger: "change",
    //       },
    //     ],
    //     amount: [
    //       {
    //         required: true,
    //         message: "请输入减免金额",
    //         trigger: "change",
    //       },
    //       {
    //         validator: checkAmount,
    //         trigger: "change",
    //       },
    //     ],
    //     goods_ids: [
    //       {
    //         required: true,
    //         message: "请选择商品",
    //         trigger: "change",
    //       },
    //     ],
    //   },
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/views/promote/style/couponsedit/couponsedit.scss";
</style>
