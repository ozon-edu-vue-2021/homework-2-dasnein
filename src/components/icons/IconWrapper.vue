<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.2"
    baseProfile="tiny"
    :width="size.width"
    :height="size.height"
    :viewBox="`0 0 ${size.width} ${size.height}`"
  >
    <slot></slot>
  </svg>
</template>

<script>
import isNumber from "@/utils/validators/isNumber.js";

const DEFAULT_ICON_SIZE = 24;

export default {
  name: "IconWrapper",

  props: {
    height: {
      type: [Number, String],
      validator: isNumber,
    },
    width: {
      type: [Number, String],
      validator: isNumber,
    },
  },

  computed: {
    size() {
      const height = this.height || DEFAULT_ICON_SIZE;
      const width = this.width || DEFAULT_ICON_SIZE;

      return {
        height,
        width,
      };
    },
  },
};
</script>