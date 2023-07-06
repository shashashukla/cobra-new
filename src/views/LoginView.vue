<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h1 class="text-white mb-3">Benefits</h1>
        <p class="text-white">
          The COBRA Enrollment Portal project aims to provide employees with a
          user-friendly web portal that enables them to self-enroll in COBRA
          benefits. The portal encompasses a comprehensive workflow designed to
          guide individuals through the enrollment process and allows them to
          select from the benefits offered by their former employer.
        </p>
      </div>
      <div class="col-md-6">
        <component
          :is="currentStep"
          :formData="formData"
          @userDataValidate="handleOtpValidation"
          @otpValueSubmit="handleOtpSubmit"
        ></component>
      </div>
    </div>
  </div>
  <div class="half-bg"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserValidationForm from "@/components/UserValidationForm.vue";
import OtpValidationForm from "@/components/OtpValidationForm.vue";
import UserDetails from "@/components/UserDetails.vue";
import * as EmployeeService from "@/services/employeeService";
import { toast } from "vue3-toastify";

export default defineComponent({
  name: "LoginView",
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
      toast.success("Your Email address has been successfully verified", {
        position: toast.POSITION.TOP_CENTER,
      });
      this.currentStep = "UserDetails";
    },
  },
});
</script>

<style scoped>
/* Add your custom styles here */
.half-bg {
  background-image: url("../assets/login-bg.png");
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
  background-size: contain;
}
</style>
