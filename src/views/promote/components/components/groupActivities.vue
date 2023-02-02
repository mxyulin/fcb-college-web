<template>
  <div>
    <!-- 拼团活动 -->
    <avue-form
      :option="formOption"
      v-model="form"
      @submit="submit"
      @error="error"
    >
      <template slot="isFictitious">
        <div class="hwmint">
          <el-switch
            v-model="form.temp_is_fictitious"
            @click.native="isfictitious"
            active-color="#7536D0"
            inactive-color="#e9ebef"
            active-value="1"
            inactive-value="0"
          >
          </el-switch>
          <span class="switch-tip">允许</span>
          <el-popover
            class="popover-item"
            width="240"
            trigger="hover"
            content="开启虚拟成团后，在拼团有效期内人数不够的团，系统会虚拟用户凑满人数，使拼团成功。虚拟的用户不生成订单，只需对真实买家发货。(请在资料管理中添加足够数量的虚拟用户，否则虚拟成团不会成功)"
          >
            <i slot="reference" class="el-icon-question"></i>
          </el-popover>
        </div>
      </template>
      <template slot="teamCard">
        <div class="hwmint">
          <el-switch
            v-model="form.temp_team_card"
            active-color="#7536D0"
            inactive-color="#e9ebef"
            active-value="1"
            inactive-value="0"
          >
          </el-switch>
          <span class="switch-tip">允许</span>
          <el-popover
            class="popover-item"
            width="240"
            trigger="hover"
            content="开启参团卡显示后，商品详情页显示未成团的团列表，买家可以直接选择一个参团。"
          >
            <i slot="reference" class="el-icon-question"></i>
          </el-popover>
        </div>
      </template>
      <template slot="fictitiousNum">
        <el-input
          type="number"
          v-model.number="temp_fictitious_num"
          placeholder="单团最多虚拟人数的名额限制，不填时，不限制名额"
          size="small"
        >
        </el-input>
      </template>
      <template slot="teamNum">
        <el-input
          v-positive-integer
          type="number"
          v-model.number="temp_team_num"
          placeholder="请输入成团人的数量"
          size="small"
        >
          <template slot="append">人</template>
        </el-input>
      </template>
      <template slot="validTime">
        <el-input type='number' v-model.number="form.temp_valid_time" placeholder="申请组团的有效时间,默认不限制"
                        size="small">
                        <template slot="append">小时</template>
                    </el-input>
      </template>
      <template slot="quota">
        <el-input
          v-positive-integer
          type="number"
          v-model.number="form.temp_limit_buy"
          placeholder="请输入限购件数"
          size="small"
        >
          <template slot="append">件</template>
        </el-input>
      </template>
      <template slot="activityDescription">
        <div
          class="display-flex"
          style="align-items: center; line-height: 34px; position: relative"
        >
          <el-input
            v-model="form.richtext_title"
            
            placeholder="请选择活动说明"
            size="small"
          >
          </el-input>
          <el-button
            style="position: absolute; right: 0"
            @click.native="article"
            type="primary"
            size="small"
          >
            选择活动说明
          </el-button>
        </div>
      </template>
      <template slot="commodity">
        <el-button @click.native="commodity" type="primary" size="small">
          商品选择
        </el-button>
        <el-table
          :data="activityForm.goods_list"
          style="width: 100%"
          v-if="activityForm.goods_list.length > 0"
        >
          <el-table-column label="商品信息" width="320" align="left">
            <template slot-scope="scope">
              <div class="display-flex">
                <div class="table-goods-image">
                  <el-image v-if="scope.row.image === ''" fit="cover">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <el-image
                    v-if="scope.row.image != ''"
                    :src="scope.row.image"
                  ></el-image>
                </div>
                <span class="ellipsis-item-2">{{ scope.row.title }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="100">
            <template slot-scope="scope">
              <template>
                <span
                  class="table-good-status-delete cursor-pointer"
                  @click="goodsDelete(scope.$index)"
                >
                  移除
                </span>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </avue-form>
    <resource-table
      width="60%"
      :dialogTitle="dialogTitle"
      :tableType="tableType"
      :dialogVisible.sync="dialogVisible"
      :updateForm="updateForm"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
import { getList, getDetail, add, update, remove } from "@/api/promote/promote";
import option from "@/const/promote/promote";
export default {
  data() {
    return {
      dialogTitle: null,
      tableType: null,
      dialogVisible: false, //判断组件的显示与隐藏
      activityForm: {
        type: "seckill",
        goods_list: [],
      },

      form: {
        temp_fictitious_num:null,//最多虚拟人数
        temp_is_fictitious:0,//虚拟成团
        temp_team_card:0, //参团卡显示
        temp_limit_buy:2,
        richtextId:1,//活动说明
                    rules:{
                        "activity_auto_close":"20",
                        "limit_buy":"1",
                        "order_auto_close":"10"
                    },
      },

      formOption: {
        labelWidth: "120",
        height: "auto",
        calcHeight: 30,
        tip: false,
        border: true,
        column: [
          // 活动名称
          {
            span: 24,
            label: "活动名称",
            prop: "title", //表单字段
            type: "",
          },
          // 活动时间1
          {
            label: "活动时间",
            span: 24,
            prop: "dateTime",
            type: "datetimerange",
            // defaultTime:['12:00:00', '08:00:00'],
            format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            startPlaceholder: "时间开始范围自定义",
            endPlaceholder: "时间结束范围自定义",
          },
          // 成团人数2
          {
            label: "成团人数",
            span: 24,
            prop: "teamNum",
            display: true,
          },
          // 单独购买
          {
            label: "单独购买",
            prop: "isAlone",
            span: 9,
            type: "switch",
            // display: false,
            dicData: [{ value: 0 }, { label: "允许", value: 1 }],
          },
          // 虚拟成团
          {
            label: "虚拟成团",
            prop: "isFictitious",
            span: 8,
            // display: false,
          },
          // 参团卡显示
          {
            label: "参团卡显示",
            prop: "teamCard",
            span: 8,
            // display: false,
          },
          // 最多虚拟人数
          {
            label: "最多虚拟人数",
            prop: "fictitiousNum",
            span: 24,
            display: false, //
          },
          // 组团有效时间
          {
            label: "组团有效时间",
            prop: "validTime",
            span: 24,
            // display: false,
          },
          // 每人限购件数
          {
            label: "每人限购件数",
            span: 24,
            prop: "quota",
            // type:'number',
            append: "件",
            display: true,
          },
          // 订单关闭时间
          {
            label: "订单关闭时间",
            span: 24,
            prop: "closetime",
            type: "",
            append: "分钟",
            display: true,
          },
          // 活动下架时间
          {
            label: "活动下架时间",
            span: 24,
            prop: "LowerShelfTime",
            type: "",
            append: "分钟",
            display: true,
          },
          // 活动说明
          {
            label: "活动说明",
            span: 24,
            prop: "activityDescription",
            type: "",
          },
          // 活动商品
          {
            label: "活动商品",
            span: 24,
            prop: "commodity",
            type: "",
          },
        ],
      },
    };
  },
  methods: {
    commodity() {
      this.dialogTitle = "选择商品";
      this.tableType = "goods-list"; //选择商品
      this.dialogVisible = true;
    },
    article() {
      this.dialogTitle = "选择文章";
      this.tableType = "article"; //文章
      this.dialogVisible = true;
    },
    updateForm(tableType, currentSelection, row) {
      console.log("表格数据", tableType, "数据", row);
      row.forEach((item, index) => {
        this.activityForm.goods_list.push({
          image: item.image,
          title: item.title,
        });
      });
    },
    isfictitious(){
      this.form.temp_is_fictitious==1?
      this.formOption.column[6].display = true :
      this.formOption.column[6].display = false
    },

    submit(form, done) {
      console.log("表单", form);
      // this.$message.success(JSON.stringify(form));
      done();
    },
    error(err) {
      this.$message.success("请查看控制台");
      console.log("问题", err);
    },
    goodsDelete(index) {
      this.activityForm.goods_list.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/views/promote/components/style/add.scss";
</style>
