<template>
  <div class="container">
    <div class="row">
      <div class="col-3"></div>
      <div class="col-6">
        <component
          :is="currentStep"
          :formData="formData"
          @userDataValidate="handleOtpValidation"
          @otpValueSubmit="handleOtpSubmit"
        ></component>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserValidationForm from "@/components/UserValidationForm.vue";
import OtpValidationForm from "@/components/OtpValidationForm.vue";
import UserDetails from "@/components/UserDetails.vue";
import * as EmployeeService from "@/services/employeeService";

export default defineComponent({
  components: {
    UserValidationForm,
    OtpValidationForm,
    UserDetails,
  },
  data() {
    return {
      currentStep: "UserValidationForm",
      formData: {} as Record<string, any>,
    };
  },
  methods: {
    async handleOtpValidation(): Promise<void> {
      console.log("handleOtpValidation");
      const response = await EmployeeService.getEmployeeDetails();
      if (response !== undefined && response.ok) {
        this.formData = await response.data;
        console.log("allformData", this.formData);
        this.currentStep = "OtpValidationForm";
      }
    },
    handleOtpSubmit(data: Record<string, any>): void {
      this.formData = data;
      this.currentStep = "UserDetails";
    },
  },
});
</script>

<style scoped>
/* Add your custom styles here */
</style>
