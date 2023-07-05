<template>
  <div>
    <h2>Benefits Section</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
});
</script>
