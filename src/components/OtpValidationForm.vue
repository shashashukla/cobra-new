<template>
  <div>
    <h3>Enter Verification Code</h3>
    <p>We have sent a verification code to</p>
    <p>{{ obscureEmail(user.email) }}</p>
    <form>
      <div class="form-group mb-3">
        <label for="name" class="form-label">Code</label>
        <input
          type="text"
          class="form-control"
          id="name"
          v-model="otpcode"
          @input="v$.otpcode.$touch()"
          :class="{ 'is-invalid': v$.otpcode.$error }"
        />
        <div class="input-errors" v-if="v$.otpcode.$error">
          <span
            :class="{ 'is-invalid': v$.otpcode.$error }"
            v-if="v$.otpcode.required"
          >
            Please enter a valid verification code
            <span class="error-icon"></span
          ></span>
        </div>
      </div>
      <div class="form-group mt-4">
        <button
          type="button"
          :disabled="v$.otpcode.$invalid"
          class="btn w-100"
          :class="[buttonDesign()]"
          @click="submitOtp"
        >
          VERIFY
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { required, maxLength, minLength, numeric } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default defineComponent({
  components: {
    //UserDetails,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: {
        name: this.formData.name,
        email: this.formData.email,
        ssn: this.formData.ssno,
        zipcode: this.formData.zip,
        dob: this.formData.dob,
      },
      otpcode: "",
      submitted: false,
    };
  },
  validations() {
    return {
      otpcode: {
        required,
        numeric,
        maxLength: maxLength(6),
        minLength: minLength(6),
      },
    };
  },
  methods: {
    obscureEmail(userEmail: string) {
      const [name, domain] = userEmail.split("@");
      return `${new Array(name.length - 4).join("*")}${name.substring(
        4
      )}@${domain}`;
    },
    buttonDesign() {
      const buttonStatus = this.v$.otpcode.$invalid;
      return buttonStatus == true ? "btn-secondary" : "btn-success";
    },
    async submitOtp(): Promise<void> {
      this.submitted = true;
      console.log("otpValueSubmit");
      this.v$.$touch();
      if (this.v$.$invalid) {
        console.log("ifcond");
        return;
      } else {
        console.log("elsecond", this.user);
        console.log("otpformData", this.formData);
        this.$emit("otpValueSubmit", this.formData);
      }
    },
  },
});
</script>
