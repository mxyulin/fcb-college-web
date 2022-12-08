<template>
  <div id="updatetopagent">
    <!-- 修改上级分销商 -->
    <div class="shopro-header-container">修改上级分销商</div>
    <hr style="border: 1px solid #eeeeee" />
    <div class="remind">
      注意：更换上级分销商之后，该用户之后的所有团队和业绩将移至新的分销商名下。
    </div>
    <div class="shopro-screen-container">
        <div class="display-flex shopro-screen-item shopro-screen-item-vague">
          <div class="shopro-screen-condition">
            <el-input
              placeholder="请输入内容"
              v-model="searchForm.form_1_value"
              class="input-with-select"
              size="small"
            >
              <el-select
                v-model="searchForm.form_1_key"
                slot="prepend"
                placeholder="请选择"
              >
                <el-option label="会员ID" value="user_id"></el-option>
                <el-option label="会员昵称" value="nickname"></el-option>
                <el-option label="手机号" value="mobile"></el-option>
              </el-select>
            </el-input>
          </div>
        </div>
    </div>
    <div class="shopro-table-container level">
      <el-table
        :data="levellist"
        style="width: 100%"
        border
        :cell-class-name="tableCellClassName"
        :header-cell-class-name="tableCellClassName"
      >
        <el-table-column prop="id" label="ID" width="160"> </el-table-column>
        <el-table-column prop="name" label="等级信息" min-width="120">
        </el-table-column>
        <el-table-column label="等级权重" min-width="120">
          <template slot-scope="scope">
            <div>等级{{ scope.row.level }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="等级权重" min-width="120"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  levellist: [
    { id: 1, name: "信息1", level: 1, phone: 13344447337 },
    { id: 2, name: "信息2", level: 2, phone: 13344447997 },
    { id: 3, name: "信息3", level: 3, phone: 13344447887 },
    { id: 4, name: "信息4", level: 4, phone: 13344447657 },
    { id: 5, name: "信息5", level: 5, phone: 13344447467 },
    { id: 6, name: "信息6", level: 6, phone: 13344447327 },
    { id: 7, name: "信息7", level: 7, phone: 13344447897 },
    { id: 8, name: "信息8", level: 8, phone: 13344447457 },
  ],
  searchForm: {
        status: "all",
        level: "all",
        updatetime: [],

        form_1_key: "user_id",
        form_1_value: "",

        level_status: "all",
      },
};
</script>

<style lang="scss" scoped>
@import "@/views/commission/style/commissionagent/updatetopagent.scss";
</style>

<style lang="scss" scoped></style>
