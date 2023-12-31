<template>
  <div>
    <h3 class="heading-title">Enter Email {{ verificationTxt }}</h3>
    <form>
      <div
        class="alert alert-danger"
        v-if="isFormInvalid"
        v-html="validationMsg"
      ></div>
      <div class="form-group mb-3">
        <label for="email" class="form-label"
          >Email
          <ToolTip
            tooltipText="This is required to proceed with the verification process and to send you a confirmation regarding your elections."
          />
        </label>
        <input
          type="email"
          v-model="user.emailAddress"
          @input="v$.user.emailAddress.$touch()"
          id="email"
          class="form-control"
          :class="v$.user.emailAddress.$error ? 'is-invalid' : 'input-text'"
        />
        <div v-if="v$.user.emailAddress.$error">
          <div
            class="input-errors"
            v-for="(error, index) of v$.user.emailAddress.$errors"
            :key="index"
          >
            <span
              :class="{ 'is-invalid': v$.user.emailAddress.$error }"
              v-if="
                error.$validator == 'required' || error.$validator == 'email'
              "
              >Please enter a valid email address</span
            >
          </div>
        </div>
      </div>
      <div class="form-group mt-4">
        <button
          type="button"
          :disabled="v$.user.emailAddress.$invalid"
          class="btn w-100"
          id="button-verifyemail"
          :class="[buttonDesign()]"
          @click="verifyEmail"
        >
          SEND CODE
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { required, email } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import ToolTip from "@/components/common/ToolTip.vue";
import AuthService from "@/services/authService";

export default defineComponent({
  name: "EditEmailView",
  components: {
    ToolTip,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      userRegistration: this.$route.query.registrationCode as string,
      userSsn: this.$route.query.ssn as string,
      user: {
        emailAddress: "",
      },
      verificationTxt: "",
      isFormInvalid: false,
      validationMsg: "",
    };
  },
  validations() {
    return {
      user: {
        emailAddress: { required, email },
      },
    };
  },
  mounted() {
    this.userRegistration = this.$route.query.registrationCode as string;
    this.userSsn = this.$route.query.ssn as string;
    this.verificationTxt =
      this.$route.query.action === "register" ? "For Verification" : "";
  },
  methods: {
    buttonDesign(): string {
      const buttonStatus = this.v$.user.emailAddress.$invalid;
      return buttonStatus == true ? "btn-secondary" : "btn-primary";
    },
    async verifyEmail(): Promise<void> {
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      }
      const params = {
        registrationCode: this.userRegistration,
        ssn: this.userSsn,
        emailAddress: this.user.emailAddress,
      };
      const result = await AuthService.emailVerification(params);
      if (result === undefined) {
        this.isFormInvalid = true;
        return;
      }
      if (result.data.response) {
        this.isFormInvalid = false;
        this.$router.push({
          path: "/otp-verification",
          query: params,
        });
      } else if (result.data.error) {
        this.isFormInvalid = true;
        this.validationMsg =
          result.data.error +
          "If you believe this is incorrect, please click <a href='https://padmin.com/contact/' target='_blank'>Contact Us</a> to connect with P&A Group's Participant Support Center.";
      }
    },
  },
});
</script>
