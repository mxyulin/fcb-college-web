<template>
  <div id="commodity">
    <!-- 商品 -->
    <div>
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>

    <div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1',
              children: [{
              label: '四级 1-1-1-1'
              },{
              label: '四级 1-1-1-1'
              }]
            }]
          },{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1',
              children: [{
              label: '四级 1-1-1-1'
              },{
              label: '四级 1-1-1-1'
              }]
            }]
          },]
        },],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>