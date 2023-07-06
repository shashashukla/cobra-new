<template>
  <div>
    <h2 class="page-title">Check your Eligibility - {{ baseTitle }}</h2>
    <div class="form-group row mb-3">
      <label for="socialSecurityNumber" class="col-sm-2 col-form-label"
        >SSN</label
      >
      <div class="col-sm-10">
        <input
          v-model="formData.socialSecurityNumber"
          type="text"
          class="form-control"
          id="socialSecurityNumber"
          required
        />
        <!-- {{ v$.formData.socialSecurityNumber }}
        <div v-if="v$.formData.socialSecurityNumber">
          Socialsecurity required.
        </div> -->
        <!-- {{ v$.$errors }} -->
        <!-- <p v-for="error of v$.formData.socialSecurityNumber" :key="error.$uid">
          {{ error.$message }}
        </p> -->
        <p v-if="!v$.formData.socialSecurityNumber.required">
          Name is required
        </p>
      </div>
    </div>
    <div class="form-group row mb-3">
      <label for="zipCode" class="col-sm-2 col-form-label">Zip Code</label>
      <div class="col-sm-10">
        <input
          v-model="formData.zipCode"
          type="text"
          class="form-control"
          id="zipCode"
          required
        />
        <!-- <div v-if="v$.formData.zipCode">Zip rquired.</div> -->
      </div>
    </div>
    <p>
      Is this form dirty? <b>{{ isDirty }}</b>
    </p>
    <button
      @click="submitValidation"
      :disabled="!isDirty"
      class="btn btn-primary"
    >
      Submit
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default defineComponent({
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      formData: {
        socialSecurityNumber: "",
        zipCode: "",
      },
      isDirty: false,
      baseTitle: process.env.VUE_APP_MODE,
    };
  },
  validations() {
    return {
      formData: {
        socialSecurityNumber: { required },
        zipCode: { required },
      },
    };
  },
  watch: {
    formData: {
      handler() {
        this.isDirty = true;
      },
      deep: true,
    },
  },
  methods: {
    async submitValidation(): Promise<void> {
      // this.v$.$touch();
      // if (this.v$.$invalid) {
      //   this.$emit("validationSubmit", this.formData);
      // }
      this.$emit("validationSubmit", this.formData);
    },
  },
});
</script>

<style scoped></style>
