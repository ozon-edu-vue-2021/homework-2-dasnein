import Vue from 'vue';

export const EVENT_BUS_EVENTS = {
  SELECT_FILE: 'eventBus_selectFile'
};

export default new Vue({
  methods: {
    onClick() {
      this.$emit(EVENT_BUS_EVENTS.SELECT_FILE, null);
    }
  },

  created() {
    document.addEventListener('click', this.onClick);
  },
});
