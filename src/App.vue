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
</style>
