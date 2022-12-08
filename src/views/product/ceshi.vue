<template>
    <div>
        <el-steps  :active="stepActive" simple>
          <el-step title="1、基础信息"></el-step>
          <el-step title="2、规格/价格"></el-step>
          <el-step title="3、商品详情"></el-step>
        </el-steps>
        <div class="div1">
            <div class="bb" v-if="stepActive == 1"></div>
            <div class="bb1" v-if="stepActive == 2"></div>
            <div class="bb2" v-if="stepActive == 3"></div>
        </div>
        <div v-if="stepActive > 1" @click="gonextback">
          上一步
        </div>
        <br>
        <div v-if="stepActive < 3" @click="gotoback"
          class="btn-common sub-btn shopro-screen-button"
        >
          下一步
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                stepActive: 1,
            }
        },
        methods: {
            // 上下翻页
        gonextback() {
        this.stepActive--;
        },
        gotoback() {
        this.stepActive++;
        },
        },
    }
</script>

<style lang="scss" scoped>
.div1 div{
    width: 100%;
    height: 200px;
}
.bb{
background: red;
}
.bb1{
background: blue;
}
.bb2{
background: salmon;
}
</style>