<template>
<div>
    <div>554</div>
    <div>
    <draggable>
      <div>12</div>
      <div>34</div>
    </draggable>
    <draggable>
      <div>67</div>
      <div>89</div>
    </draggable>
    </div>
    <!-- <avue-ueditor v-model="text" v-bind="options"></avue-ueditor> -->
</div>
</template>

<script>
import AvueUeditor from 'avue-plugin-ueditor'
import draggable from "vuedraggable";
export default {
  components:{AvueUeditor,draggable },
  data() {
    return {
        text:'',
        options: {
  //wangEditor编辑的配置
  customConfig: {
    lineHeights: ['1', '1.15', '1.6', '2', '2.5', '3']
  },
  propsHttp: {
    home:'',
    url:'',
    res: ''
  },
  //是否启用oss(qiniu/ali)
  oss:'',
  headers:{},
  data:{},
  //普通图片上传
  action: "",
  //七牛云oss配置
  qiniu: {
    AK: "",
    SK: "",
    scope: "",
    url: "",
    deadline: 1
  },
  //阿里云oss配置
  ali: {
    region: "",
    endpoint: "",
    accessKeyId: "",
    accessKeySecret: "",
    bucket: ""
  }
}
    };
  },
};
</script>

<style lang="scss" scoped></style>
