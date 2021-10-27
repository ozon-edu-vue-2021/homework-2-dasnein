<template>
  <div id="app">
    <div v-if="!processing" class="container">
      <message-block v-if="error" type="error">
        <p>Error on fetching data.</p>
      </message-block>
      <template v-else>
        <message-block>
          <p>
            <b>Full path to file:</b> {{ selectedFile || "file not selected" }}
          </p>
        </message-block>
        <tree :data="data" />
      </template>
    </div>
  </div>
</template>

<script>
import MessageBlock from "./components/MessageBlock.vue";
import Tree from "./components/tree/Tree.vue";

import EventBus, { EVENT_BUS_EVENTS } from "./utils/eventBus";

export default {
  name: "App",
  components: {
    MessageBlock,
    Tree,
  },

  data() {
    return {
      data: null,
      error: false,
      processing: true,

      selectedFile: null,
    };
  },

  methods: {
    async fetchData() {
      try {
        const response = await fetch("/static/node_modules.json");
        this.data = await response.json();
      } catch (error) {
        this.error = true;
      }

      this.processing = false;
    },
    updateSelectedFile(filePath) {
      this.selectedFile = filePath;
    },
  },

  mounted() {
    this.fetchData();
    EventBus.$on(EVENT_BUS_EVENTS.SELECT_FILE, this.updateSelectedFile);
  },
};
</script>

<style lang="css">
/* reset styles */
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}
</style>

<style lang="css">
#app {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  width: 80%;
  max-width: 1200px;
  margin-top: 5vh;
  margin-bottom: 5vh;
}
</style>