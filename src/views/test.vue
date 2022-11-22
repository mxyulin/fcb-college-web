<template>
  <basic-container>
    <div>测试页</div>
    <draggable :list="list">
      <div v-for="(i, idx) of list" :key="i.id">
        {{i.name}}
        {{idx}}
      </div>
    </draggable>
  </basic-container>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
  data() {
    return {
      list: [
        {
          name: "Juan 2",
          id: 2,
        },
        {
          name: "Juan 3",
          id: 3,
        },
        {
          name: "Juan 4",
          id: 4,
        },
        {
          name: "Juan 5",
          id: 5,
        },
        {
          name: "Edgard",
          id: 1,
        },
      ],
    };
  },
};
</script>

<style>
</style>
