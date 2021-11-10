<template>
  <div class="message-block" :class="elementClasses">
    <slot>Default message block content</slot>
  </div>
</template>

<script>
const MESSAGE_BLOCK_TYPES = ["error", "info"];

export default {
  name: "MessageBlock",

  props: {
    type: {
      type: String,
      validator: (val) => MESSAGE_BLOCK_TYPES.includes(val),
    },
  },

  computed: {
    elementClasses() {
      return `message-block_${this.type}`;
    },
  },
};
</script>

<style lang="scss">
.message-block {
  width: 100%;
  font-size: 1.5em;
  text-align: left;
  margin: 25px 0;
  border: 2px solid rgba(128, 128, 128, 0.5);
  background-color: rgba(128, 128, 128, 0.2);
  padding: 1em;

  &_error {
    border-color: rgba(128, 0, 0, 0.5);
    background-color: rgba(255, 0, 0, 0.2);
    text-align: center;
  }
}
</style>