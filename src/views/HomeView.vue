<template>
  <div class="home">
    <EnrollmentPortal />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import EnrollmentPortal from "@/components/EnrollmentPortal.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  components: {
    EnrollmentPortal,
  },
});
</script>
