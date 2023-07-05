<template>
  <div class="container">
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <component
          :is="currentStep"
          :formData="formData"
          @validationSubmit="handleValidationSubmit"
          @enrollmentSubmit="handleEnrollmentSubmit"
        ></component>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ValidationForm from "./ValidationForm.vue";
import EnrollmentForm from "./EnrollmentForm.vue";
import BenefitsSection from "./BenefitsSection.vue";
import * as EmployeeService from "@/services/employeeService";

export default defineComponent({
  components: {
    ValidationForm,
    EnrollmentForm,
    BenefitsSection,
  },
  data() {
    return {
      currentStep: "ValidationForm",
      formData: {} as Record<string, any>,
    };
  },
  methods: {
    async handleValidationSubmit(): Promise<void> {
      // const response = await EmployeeService.getEmployeeDetails("123");
      const response = await EmployeeService.getEmployeeDetails();
      if (response !== undefined && response.ok) {
        this.formData = await response.data;
        console.log(this.formData);
        this.currentStep = "EnrollmentForm";
      }
    },
    handleEnrollmentSubmit(data: Record<string, any>): void {
      this.formData = data;
      this.currentStep = "BenefitsSection";
    },
  },
});
</script>

<style scoped>
/* Add your custom styles here */
</style>
