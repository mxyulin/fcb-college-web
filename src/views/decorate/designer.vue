<template>
  <basic-container>
   
  </basic-container>
</template>

<script>
  import {getList, getDetail, add, update, remove} from "@/api/decorate/designer"; 
  import {mapGetters} from "vuex";

export default {
  data() {
    return {
      // 弹框标题
      title: '',
      
    }
  },
  mounted() {
    this.init();
    this.onLoad(this.page);
  },
  computed: {
    ...mapGetters(["permission"]),

  },
  methods: {
    init() {
      // getDictionary({code: 'yes_no'}).then(res => {
      //   this.statusData = res.data.data;
      // });
    },

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
