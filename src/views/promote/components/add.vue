<template>
  <div>
    <!-- <avue-from></avue-from> -->
    <div id="activityDetail" v-cloak>
        <table></table>
        <div class="marginauto">
            <el-radio-group  v-model="optType" size="medium" >
                <el-radio-button   label="秒杀活动" ></el-radio-button>
                <el-radio-button   label="拼团活动"></el-radio-button>
                <el-radio-button   label="满额立减"></el-radio-button>
                <el-radio-button   label="满额折扣"></el-radio-button>
                <el-radio-button   label="满额包邮"></el-radio-button>
            </el-radio-group>
        </div>

        <div v-show="this.optType=='秒杀活动'">
            <seckillactivity></seckillactivity>
        </div>
        <div v-show="this.optType=='拼团活动'">
            <groupactivities></groupactivities>
        </div>
        <div v-show="this.optType=='满额立减'">
            <fullreduce></fullreduce>
        </div>
        <div v-show="this.optType=='满额折扣'">
            <fulldiscount></fulldiscount>
        </div>
        <div v-show="this.optType=='满额包邮'">
            <fullfreeshipping></fullfreeshipping>
        </div>
        <!-- <button @click="test">dsfsd</button> -->
        <resourceTable
        width="60%"
        :dialogTitle="dialogTitle"
        :tableType="tableType"
        :dialogVisible.sync="dialogVisible"
        :updateForm="updateForm"
        v-bind="$attrs"
        />

    </div>
  </div>
</template>

<script>


import seckillactivity from "./components/seckillActivity"//秒杀活动
import groupactivities from "./components/groupActivities"//拼团活动
import fullreduce from "./components/fullReduce"//满额立减
import fulldiscount from "./components/fullDiscount"//满额折扣
import fullfreeshipping from "./components/fullFreeShipping"//满额包邮

export default {
    components:{seckillactivity,groupactivities,fullreduce,fulldiscount,fullfreeshipping},
    data() {
        return {
            dialogTitle:null,
            tableType:null,
            dialogVisible:false,//判断组件的显示与隐藏
            optType:'秒杀活动',
        }
    },
    mounted () {
    },
    methods: {
        test() {
          this.dialogTitle = "选择商品";
        //   this.tableType = "goods-list";//选择商品
          this.tableType = "article";//文章
          this.dialogVisible = true;
        },
        updateForm(tableType, currentSelection, row){
            console.log('表格数据',tableType,'数据',row)
        }
    },
};
</script>

<style lang="scss" scoped>
@import "@/views/promote/components/style/add.scss"; 
</style>
