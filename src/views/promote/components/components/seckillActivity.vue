<template>
  <div>
    <!-- 秒杀活动 -->
    <avue-form
      :option="formOption"
      v-model="form"
      @submit="submit"
      @error="error"
    >
      <!-- <template slot="title">
                    <el-input v-model="form.title"  placeholder="请输入活动名称" maxlength="10" :disabled="isDisabled"
                        size="small">
                    </el-input>
            </template> -->
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
            v-model="richtext_title"
            placeholder="请选择活动说明"
            size="small"
          >
          </el-input>
          <el-button
            style="position: absolute; right: 0"
            type="primary"
            @click.native="article"
            size="small"
          >
            选择活动说明
          </el-button>
        </div>
      </template>
      <template slot="commodity">
        <el-button type="primary" @click.native="commodity" size="small">
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
    <resourceTable
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
      richtext_title: null,
      activityForm: {
        type: "seckill",
        goods_list: [],
      },
      form: {
        temp_limit_buy: 2,
        richtextId: 1, //活动说明
        rules: {
          activity_auto_close: "20",
          limit_buy: "1",
          order_auto_close: "10",
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

          // 活动时间
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

          // 活动商品//
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

    submit(form, done) {
      form.rules=JSON.stringify(form.rules)
      console.log("表单", form);
      add(form).then((res) => {
        console.log("消息", res);
      });
      // this.$message.success(JSON.stringify(form));
      done();
    },
    // error(err){
    //     this.$message.success('请查看控制台');
    //     console.log('问题',err)
    // },
    goodsDelete(index) {
      this.activityForm.goods_list.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/views/promote/components/style/add.scss";
</style>
