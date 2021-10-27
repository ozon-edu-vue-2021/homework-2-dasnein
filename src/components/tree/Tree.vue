<template>
  <ul class="tree">
    <tree-row
      v-for="(row, i) in items"
      :data="row"
      :key="`${row.name}-${i}`"
      :path="path"
    />
  </ul>
</template>

<script>
import TreeRow from "./TreeRow.vue";

import isArray from "@/utils/validators/isArray.js";

export default {
  name: "Tree",

  components: {
    TreeRow,
  },

  props: {
    data: {
      type: [Array, Object],
      required: true,
    },
    path: {
      type: String,
      default: "",
    },
  },

  computed: {
    items() {
      if (isArray(this.data)) {
        return this.data;
      }

      return [this.data];
    },
  },
};
</script>

<style>
.tree {
  list-style: none;
}
</style>