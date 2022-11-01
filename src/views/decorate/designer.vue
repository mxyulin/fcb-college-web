<template>
  <basic-container>
   
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/decorate/decorate"; 
  import {mapGetters} from "vuex";

export default {
  data() {
    return {
      // 弹框标题
      title: '',
      
      // // 查询信息
      // query: {},
      // // 分页信息
      // page: {
      //   currentPage: 1,
      //   pageSize: 10,
      //   total: 40
      // },
      // 表单数据
      form: {},
      
    }
  },
  mounted() {
    this.init();
    this.onLoad(this.page);
  },
  computed: {
    ...mapGetters(["permission"]),
    // ids() {
    //   let ids = [];
    //   this.selectionList.forEach(ele => {
    //     ids.push(ele.id);
    //   });
    //   return ids.join(",");
    // }
  },
  methods: {
    init() {
      // getDictionary({code: 'yes_no'}).then(res => {
      //   this.statusData = res.data.data;
      // });
    },
    // searchHide() {
    //   this.search = !this.search;
    // },
    // searchChange() {
    //   this.onLoad(this.page);
    // },
    // searchReset() {
    //   this.query = {};
    //   this.page.currentPage = 1;
    //   this.onLoad(this.page);
    // },
    handleSubmit() {
      // if (!this.form.id) {
      //   add(this.form).then(() => {
      //     this.box = false;
      //     this.onLoad(this.page);
      //     this.$message({
      //       type: "success",
      //       message: "操作成功!"
      //     });
      //   });
      // } else {
      //   update(this.form).then(() => {
      //     this.box = false;
      //     this.onLoad(this.page);
      //     this.$message({
      //       type: "success",
      //       message: "操作成功!"
      //     });
      //   })
      // }
    },
          
    onLoad(page, params = {}) {
      // this.loading = true;
      // getList(page.currentPage, page.pageSize, Object.assign(params, this.query)).then(res => {
      //   const data = res.data.data;
      //   this.page.total = data.total;
      //   this.data = data.records;
      //   this.loading = false;
      //   this.selectionClear();
      // });
    }
  }
};
</script>

<style lang="scss" scoped>
 
</style>
