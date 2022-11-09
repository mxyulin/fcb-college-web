<template>
  <div id="background">
    <!-- 背景 -->
    <table></table>
    <div class="commoditytop">
      <div class="commoditytop-one">
        <div>全部</div>
        <div>分类一</div>
        <div>分类二</div>
        <div>自定义</div>
        <div>未分类</div>
      </div>
      <div class="commoditytop-list">类型筛选</div>
    </div>
    <div>
      <el-input
          v-model="search"
          placeholder="请输入内容id"
        ></el-input>
        <el-button class="search-drop-down">默</el-button>
        <el-button
          @click="judgeiftop"
          icon="el-icon-search"
        ></el-button>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
#background{
  background-color: #ffffff;
  width: 100%;
  height: 100%;
}
.commoditytop{
  width: 95%;
  background-color: #e8edf0;
  display: flex;
  justify-content: space-between;
  padding: 15px 15px 0;
  margin: 10px;
}
.commoditytop .commoditytop-one{
  background-color: #e8edf0;
  display: flex;
}
.commoditytop-one div{
  width: 74px;
  height: 42px;
  margin-left: 10px;
  background-color: #d8e0e6;
  box-sizing: border-box;
}
.commoditytop-list{
  width: 102px;
  height: 42px;
  margin-right: 20px;
  background-color: #d8e0e6;
  box-sizing: border-box;
}
</style>