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
.error-icon {
  padding-right: calc(1.5em + 0.75rem);
  background-repeat: no-repeat;
  background-position: right calc(0.375em + 0.1875rem) center;
  background-size: calc(0.6em + 0.35rem) calc(0.6em + 0.375rem);
  background-image: url(/src/assets/svgerrorimg.svg);
}
</style>
