<template>
    <div id="updatelevel">
        <!-- 修改等级 -->
        <div class="shopro-header-container">修改分销商等级</div>
        <hr style="border:1px solid #eeeeee;">
        <div class="remind">注意：更换等级后，该用户不会降级。</div>
        <div class="shopro-table-container level">
        <el-table
          :data="levellist"
          style="width: 100%"
          border
          :cell-class-name="tableCellClassName"
          :header-cell-class-name="tableCellClassName"
        >
          <el-table-column prop="id" label="ID" width="160">
            
          </el-table-column>
          <el-table-column prop="name" label="等级信息" min-width="120">
          </el-table-column>
          <el-table-column  label="等级权重" min-width="120">
            <template slot-scope="scope">
                <div>
                    等级{{scope.row.level}}
                </div>
            </template>
          </el-table-column>
        </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                levellist: [
                    {id:1,name:'信息1',level:1,},
                    {id:2,name:'信息2',level:2,},
                    {id:3,name:'信息3',level:3,},
                    {id:4,name:'信息4',level:4,},
                    {id:5,name:'信息5',level:5,},
                    {id:6,name:'信息6',level:6,},
                    {id:7,name:'信息7',level:7,},
                    {id:8,name:'信息8',level:8,},
                ]
            }
        },
    }
</script>

<style lang="scss" scoped>
@import "@/views/commission/style/commissionagent/updatelevel.scss";
</style>

<style lang="scss">

</style>