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
    <div class="backgroundinput">
      <div>
      <el-button class="search-drop-down" icon="el-icon-refresh"></el-button>
      <el-button  icon="el-icon-s-promotion">上传</el-button>
      </div>
      <div class="backgroundinputflex">
      <el-input class="inputmarin" v-model="search" placeholder="请输入内容id"></el-input>
      <el-button class="search-drop-down">默</el-button>
      <el-button icon="el-icon-search"></el-button>
      </div>
    </div>

    <div class="tablelist">
      <el-table
        class="commodity-table"
        :data="datas"
        height="400"
        style="width: 100%"
        stripe="ture"
        :row-class-name="tableRowClassName"
      >
        <el-table-column prop="id" label="id" width="180"> </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="180"
        ></el-table-column>
        <el-table-column prop="oldtime" label="创建时间"> </el-table-column>
        <el-table-column prop="newtiem" label="更新时间"> </el-table-column>
        <el-table-column label="操作"> <div>butten</div> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 模拟数据
      datas: [
        {
          id: 1,
          title: "哦豁1",
          oldtime: "2022-11-08 13：32：42",
          newtiem: "2022-12-09 13：32：42",
        },
        {
          id: 2,
          title: "哦豁2",
          oldtime: "2022-11-02 13：32：42",
          newtiem: "2022-12-10 13：32：42",
        },
        {
          id: 3,
          title: "哦豁3",
          oldtime: "2022-11-03 13：32：42",
          newtiem: "2022-12-07 13：32：42",
        },
        {
          id: 4,
          title: "哦豁4",
          oldtime: "2022-11-04 13：32：42",
          newtiem: "2022-12-11 13：32：42",
        },
        {
          id: 5,
          title: "哦豁4",
          oldtime: "2022-11-04 13：32：42",
          newtiem: "2022-12-11 13：32：42",
        },
        {
          id: 5,
          title: "哦豁4",
          oldtime: "2022-11-04 13：32：42",
          newtiem: "2022-12-11 13：32：42",
        },
        {
          id: 5,
          title: "哦豁4",
          oldtime: "2022-11-04 13：32：42",
          newtiem: "2022-12-11 13：32：42",
        },
        {
          id: 5,
          title: "哦豁4",
          oldtime: "2022-11-04 13：32：42",
          newtiem: "2022-12-11 13：32：42",
        },
      ],
    };
  },
};
</script>

<style
  lang="scss"
  scoped
  src="@/views/commission/style/background.scss"
></style>
<style lang="scss">
// 当要改变element样式时用
.backgroundinput .el-input__inner{
  width: 200px;
  // height: 20px;
}
</style>
