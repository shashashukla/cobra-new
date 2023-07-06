<template>
  <DefaultHeaderComponent />
  <router-view />
</template>
<script lang="ts">
import DefaultHeaderComponent from "./components/common/DefaultHeaderComponent.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    DefaultHeaderComponent,
  },
});
</script>
<style lang="scss">
@import "./styles/App.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
