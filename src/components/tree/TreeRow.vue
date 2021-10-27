<template>
  <li class="tree__row">
    <tree-row-content
      @click="onClick"
      :data="data"
      :opened="isFolderOpened"
      :selected="isFileSelected"
    />

    <tree
      v-if="isFolderWithFiles && isFolderOpened"
      :data="data.contents"
      :path="fullPath"
    />
  </li>
</template>

<script>
import EventBus, { EVENT_BUS_EVENTS } from "@/utils/eventBus.js";

import TreeRowContent from "./TreeRowContent.vue";

export default {
  name: "TreeRow",

  components: {
    TreeRowContent,
    Tree: () => import("./Tree.vue"),
  },

  props: {
    data: {
      type: Object,
      required: true,
    },
    path: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      isFolderOpened: false,
      selectedFile: null,
    };
  },

  computed: {
    isFileSelected() {
      return this.fullPath === this.selectedFile;
    },
    isFolderWithFiles() {
      return (
        this.data.type === "directory" &&
        this.data.contents &&
        this.data.contents.length > 0
      );
    },
    fullPath() {
      return `${this.path}/${this.data.name}`;
    },
  },

  methods: {
    onClick() {
      this.toggleFolderStatus();
      EventBus.$emit(EVENT_BUS_EVENTS.SELECT_FILE, this.fullPath);
    },
    updateSelectedFile(filePath) {
      this.selectedFile = filePath;
    },
    toggleFolderStatus() {
      this.isFolderOpened = !this.isFolderOpened;
    },
  },

  mounted() {
    EventBus.$on(EVENT_BUS_EVENTS.SELECT_FILE, this.updateSelectedFile);
  },

  beforeDestroy() {
    EventBus.$off(EVENT_BUS_EVENTS.SELECT_FILE, this.updateSelectedFile);
  },
};
</script>

<style lang="scss">
.tree__row {
  padding-left: 25px;
  position: relative;
  user-select: none;
  margin-top: 6px;

  &:before {
    content: "";
    display: block;
    position: absolute;
    left: 10px;
    width: 1px;
    bottom: 0;
    height: calc(100% - 1.2em);
    background-color: #aaa;
  }
}
</style>