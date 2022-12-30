<template>
  <div>
    <basic-container>
      <h1>测试页</h1>
      <el-checkbox-group
        v-model="checkedCities"
      >
        <el-checkbox v-for="city in cities" :label="city" :key="city">{{
          city
        }}</el-checkbox>
      </el-checkbox-group>
    </basic-container>
  </div>
</template>

<script>
export default {
  name: "wel",
  data() {
    return {
      checkedCities: ["上海", "北京"],
      cities: ["上海", "北京", "广州", "深圳"],
    };
  },
  computed: {},
  created() {},
  methods: {
  },
};
</script>

<style scoped="scoped" lang="scss">
</style>
