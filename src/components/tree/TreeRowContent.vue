<template>
  <span v-on="$listeners" class="tree__row__content" :class="{ selected }">
    <tree-row-icon
      :is="treeRowIcon"
      :fill="selected ? '#33F' : '#000'"
      :opened="opened"
      class="tree__row__content__icon"
    />
    {{ data.name }}
  </span>
</template>

<script>
import IconDirectory from "@/components/icons/IconDirectory";
import IconFile from "@/components/icons/IconFile";
import IconLink from "@/components/icons/IconLink";

const FILE_TYPE_ICON = {
  directory: IconDirectory,
  file: IconFile,
  link: IconLink,
};

export default {
  name: "TreeRowContent",

  props: {
    data: {
      type: Object,
      required: true,
    },
    opened: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    treeRowIcon() {
      const fileType = this.data.type;
      const icon = FILE_TYPE_ICON[fileType];

      return icon || IconFile;
    },
  },
};
</script>

<style lang="scss">
.tree__row__content {
  position: relative;
  cursor: pointer;

  &.selected {
    color: #33f;
  }
  .tree__row__content__icon {
    position: absolute;
    top: 50%;
    left: -25px;
    transform: translateY(-50%);
  }
}
</style>