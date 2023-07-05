<template>
  <div class="home">
    <UserValidationPortal />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import UserValidationPortal from "@/components/UserValidationPortal.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserValidation",
  components: {
    UserValidationPortal,
  },
});
</script>
