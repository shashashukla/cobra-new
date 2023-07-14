<template>
  <div class="about">
    <h1 class="heading-title">Get Started</h1>
    <form>
      <div class="form-group mb-3">
        <label for="email" class="form-label"
          >Email
          <ToolTip tooltipText="We will use your email to send you updates."
        /></label>
        <input
          type="email"
          v-model="user.email"
          @input="v$.user.email.$touch()"
          id="email"
          class="form-control"
          :class="v$.user.email.$error ? 'is-invalid' : 'input-text'"
        />

        <div v-if="v$.user.email.$error">
          <div
            class="input-errors"
            v-for="(error, index) of v$.user.email.$errors"
            :key="index"
          >
            <span
              :class="{ 'is-invalid': v$.user.email.$error }"
              v-if="
                error.$validator == 'required' || error.$validator == 'email'
              "
              >Plase enter a valid email address<span class="error-icon"></span
            ></span>
          </div>
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="registrationCode" class="form-label"
          >Registratin Code
          <ToolTip
            tooltipText="This field is required if you are registered in COBRA health insurance."
        /></label>
        <input
          type="text"
          v-model="user.registrationCode"
          @input="v$.user.registrationCode.$touch()"
          id="registrationCode"
          class="form-control type-number"
          :class="v$.user.registrationCode.$error ? 'is-invalid' : 'input-text'"
        />
        <div class="input-errors" v-if="v$.user.registrationCode.$error">
          <span
            :class="{ 'is-invalid': v$.user.registrationCode.$error }"
            v-if="v$.user.registrationCode.required"
          >
            Please enter a valid registration code
            <span class="error-icon"></span
          ></span>
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="ssn" class="form-label">SSN</label>
        <input
          type="text"
          v-model="user.ssn"
          @input="v$.user.ssn.$touch()"
          id="ssn"
          class="form-control type-number"
          :class="v$.user.ssn.$error ? 'is-invalid' : 'input-text'"
        />
        <div class="input-errors" v-if="v$.user.ssn.$error">
          <span
            :class="{ 'is-invalid': v$.user.ssn.$error }"
            v-if="v$.user.ssn.required"
          >
            Please enter a valid SSN <span class="error-icon"></span
          ></span>
        </div>
      </div>
      <div
        class="g-recaptcha form-group mb-3"
        data-sitekey="6LeNMh4nAAAAAJ0pj8ld0HhkxZCLrTvdn9951Ie8"
      ></div>
      <div class="form-group mt-4">
        <button
          :disabled="v$.user.$invalid"
          class="btn w-100"
          type="button"
          :class="[buttonDesign()]"
          @click="userDataSubmit"
        >
          VERIFY WITH EMAIL
        </button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
// @ is an alias to /src
import { defineComponent } from "vue";
import { required, email } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import ToolTip from "./common/ToolTip.vue";
import validateSsn from "@/services/validateSsn";

export default defineComponent({
  components: {
    ToolTip,
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
        email: "",
        registrationCode: "",
        ssn: "",
      },
      submitted: false,
    };
  },

  validations() {
    return {
      user: {
        email: { required, email },
        registrationCode: { required },
        ssn: { required, validateSsn },
      },
    };
  },
  methods: {
    buttonDesign() {
      const buttonStatus = this.v$.user.$invalid;
      return buttonStatus == true ? "btn-secondary" : "btn-primary";
    },
    async userDataSubmit(): Promise<void> {
      this.submitted = true;
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      } else {
        this.$emit("userDataValidate", this.user);
      }
    },
  },
});
</script>
