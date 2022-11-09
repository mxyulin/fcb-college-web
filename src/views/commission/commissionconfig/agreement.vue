<template>
    <div id="commodity">
      <div style="border-top: 1px solid #fff"></div>
      <!-- 协议 -->
      <div v-if="iftop" class="iftop">
        <div class="iftop-one">
          <div>
            <span>id</span
            ><el-input
              class="iftop-one-input"
              v-model="input1"
              placeholder="请输入内容id"
            ></el-input>
          </div>
          <div>
            <span>标题</span
            ><el-input
              class="iftop-one-input"
              v-model="input2"
              placeholder="请输入标题"
            ></el-input>
          </div>
          <div>
            <span>创建时间</span
            ><el-input
              class="iftop-one-input"
              v-model="input3"
              placeholder="请输入创建时间"
            ></el-input>
          </div>
          <div>
            <span>跟新时间</span
            ><el-input
              class="iftop-one-input"
              v-model="input4"
              placeholder="请输入内容跟新时间"
            ></el-input>
          </div>
        </div>
        <div class="iftop-two">
          <el-button type="primary">提交</el-button>
          <el-button>重置</el-button>
        </div>
      </div>

      <div class="search">
        <el-input
          class="search-input"
          v-model="search"
          placeholder="请输入内容id"
        ></el-input>
        <el-button class="search-drop-down">默</el-button>
        <el-button
          @click="judgeiftop"
          class="search-iftop"
          icon="el-icon-search"
        ></el-button>
      </div>
      <el-table
        class="commodity-table"
        :data="datas"
        height="400"
        style="width: 100%"
        stripe="ture"
        :row-class-name="tableRowClassName"
      >
        <el-table-column prop="id" label="id" width="180"> </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="oldtime" label="创建时间"> </el-table-column>
        <el-table-column prop="newtiem" label="更新时间"> </el-table-column>
        <el-table-column label="操作"> <div>butten</div> </el-table-column>
      </el-table>
    </div>
</template>

<script>
export default {
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      iftop: false,

      search: "",
      // 假数据
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
  mounted() {},
  computed: {},
  methods: {
    judgeiftop() {
      let that = this;
      this.iftop = !this.iftop;
    },
  },
};
</script>

<style lang="scss" scoped>
#commodity {
  background-color: #fff;
  min-width: 800px;
  margin: 0 auto;
}
.iftop {
  margin-top: 10px;
}
.iftop-one {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.iftop-one div {
  width: 374px;
  height: 40px;
  display: flex;
  align-items: center;
  margin: 10px;
}
.iftop-one span {
  display: block;
  width: 100px;
  display: flex;
  justify-content: flex-end;
}

.iftop-one .iftop-one-input {
  width: 200px;
  margin-left: 10px;
}
.iftop-two {
  margin-left: 120px;
}

.search {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.search-input {
  width: 200px;
  margin-right: 10px;
}
.search-drop-down {
  width: 60px;
  background-color: #f4f4f4;
}
.search-iftop {
  background-color: #f4f4f4;
}

.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}
</style>
