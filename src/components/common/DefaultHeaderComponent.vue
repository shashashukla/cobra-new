<template>
  <div>
    <div class="header-logo mx-auto mb-3 me-md-0 mb-md-5">
      <img src="@/assets/logo.png" alt="Logo" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {};
  },
  methods: {},
});
</script>

<style scoped>
.header-logo {
  margin-right: 0;
  margin-left: auto;
  display: block;
  width: 200px;
}
</style>
