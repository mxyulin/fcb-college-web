<template>
  <div id="detailPage" v-cloak>
    <div class="edit-body">
        <el-form :model="formData" label-width="168px">
        <div class="level-tip">
            新增或编辑等级后，请及时在分销商品中完善对应的佣金规则
        </div>
        <div>
            <div class="shopro-form-group-title">
            <div class="shopro-form-group-title-line"></div>
            等级佣金比例
            </div>
            <el-form-item label="等级权重：">
            <div class="display-flex" style="width: 420px; flex-wrap: wrap">
                <div
                class="shopro-level-item"
                v-for="(level, index) in this.levelList"
                :key="index"
                >
                {{ level.title }}
                </div>
            </div>
            </el-form-item>

            <el-form-item label="等级名称：" prop="name">
            <div class="level-name">
                <el-input
                v-model="formData.name"
                placeholder="请输入等级名称"
                maxlength="6"
                size="small"
                show-word-limit
                >
                </el-input>
            </div>
            </el-form-item>

            <el-form-item label="等级徽章：" prop="image">
            <div class="bgimage-add-container">
                <el-image
                v-if="formData.image"
                :src="Fast.api.cdnurl(formData.image)"
                fit="contain"
                >
                <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                </div>
                </el-image>
                <div class="bgimage-add" v-if="!formData.image">
                <i class="el-icon-plus"></i>
                </div>
            </div>
            </el-form-item>

            <el-form-item label="一级(自购)佣金比例：" prop="commission_1">
            <div class="commission-rate">
                <el-input
                v-model="formData.commission_rules.commission_1"
                type="number"
                placeholder="如不填写默认为0"
                size="small"
                >
                <template slot="append">%</template>
                </el-input>
            </div>
            </el-form-item>

            <el-form-item label="二级佣金比例：" prop="commission_2">
            <div class="commission-rate">
                <el-input
                v-model="formData.commission_rules.commission_2"
                type="number"
                placeholder="如不填写默认为0"
                size="small"
                >
                <template slot="append">%</template>
                </el-input>
            </div>
            </el-form-item>

            <el-form-item label="三级佣金比例：" prop="commission_3">
            <div class="commission-rate">
                <el-input
                v-model="formData.commission_rules.commission_3"
                type="number"
                placeholder="如不填写默认为0"
                size="small"
                >
                <template slot="append">%</template>
                </el-input>
            </div>
            </el-form-item>
        </div>

        <div>
            <div class="shopro-form-group-title">
            <div class="shopro-form-group-title-line"></div>
            添加升级条件
            </div>
            <el-form-item label="升级方式：" prop="upgrade_type">
            <div>
                <el-radio-group v-model="formData.upgrade_type">
                <el-radio :label="0">满足以下任意条件</el-radio>
                <el-radio :label="1">满足以下全部条件</el-radio>
                </el-radio-group>
            </div>
            </el-form-item>

            <el-form-item>
            <div>
                <div>
                <div
                    class="upgrade-condition-item"
                    :class="upgrade.selected ? 'upgrade-condition-item-active' : ''"
                    v-for="(upgrade, upgradeIndex) in upgradeCondition"
                    :key="upgradeIndex"
                    @click="selectCondition(upgradeIndex)"
                >
                    <span>{{ upgrade.title }}</span>
                </div>
                </div>
            </div>
            </el-form-item>

            <el-form-item>
            </el-form-item>
        </div>
        </el-form>
    </div>

    <div class="editbottom">

    </div>
    <div class="shopro-submit-container">
      <div class="shopro-submit-button">
        确定
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   optType: type,
      formData: {
        level: "",
        name: "",
        image: "",
        commission_rules: {
          commission_1: "0.00",
          commission_2: "0.00",
          commission_3: "0.00",
        },
        upgrade_type: 0,
        upgrade_rules: "",
      },
      levelList: [
        {
          title: "一级",
          value: "1",
        },
        {
          title: "二级",
          value: "2",
        },
        {
          title: "三级",
          value: "3",
        },
        {
          title: "四级",
          value: "4",
        },
        {
          title: "五级",
          value: "5",
        },
        {
          title: "六级",
          value: "6",
        },
        {
          title: "七级",
          value: "7",
        },
        {
          title: "八级",
          value: "8",
        },
        {
          title: "九级",
          value: "9",
        },
        {
          title: "十级",
          value: "10",
        },
      ],
      upgradeCondition: [
        {
          title: "用户消费金额",
          key: "total_consume",
          value: "",
        },
        {
          title: "一级用户人数",
          key: "child_user_count_1",
          value: "",
        },
        {
          title: "二级用户人数",
          key: "child_user_count_2",
          value: "",
        },
        {
          title: "团队用户人数",
          key: "child_user_count",
          value: "",
        },
        {
          title: "直推分销订单金额",
          key: "order_money",
          value: "",
        },
        {
          title: "一级分销订单金额",
          key: "child_order_money_1",
          value: "",
        },
        {
          title: "二级分销订单金额",
          key: "child_order_money_2",
          value: "",
        },
        {
          title: "团队分销订单金额",
          key: "child_order_money",
          value: "",
        },
        {
          title: "直推分销订单数量",
          key: "order_count",
          value: "",
        },
        {
          title: "一级分销订单数量",
          key: "child_order_count_1",
          value: "",
        },
        {
          title: "二级分销订单数量",
          key: "child_order_count_2",
          value: "",
        },
        {
          title: "团队分销订单数量",
          key: "child_order_count",
          value: "",
        },
        {
          title: "一级分销商人数",
          key: "child_agent_count_1",
          value: "",
        },
        {
          title: "二级分销商人数",
          key: "child_agent_count_2",
          value: "",
        },
        {
          title: "团队分销商人数",
          key: "child_agent_count",
          value: "",
        },
        {
          title: "团队分销商等级统计",
          key: "child_agent_level",
          value: [],
        },
        {
          title: "一级分销商等级统计",
          key: "child_agent_level_1",
          value: [],
        },
      ],
    };
  },
};
</script>


<style lang="scss" scoped>
@import "@/views/commission/style/commissionagentlevel/edit.scss";
</style>
<style lang="scss"></style>
