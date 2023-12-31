<template>
  <div>
    <h3 class="heading-title">Enter Verification Code</h3>
    <p
      class="v-code-text"
      v-if="isResponseValid"
      v-html="otpResponseMessage"
    ></p>
    <p class="email-text">
      {{ userEmail }}
      <router-link
        class="edit-email edit-pencil"
        id="edit-link"
        :to="`/edit-email?ssn=${userSsn}&registrationCode=${userRegistration}`"
      >
        EDIT
      </router-link>
    </p>
    <form>
      <div
        class="alert alert-danger"
        v-if="isFormInvalid"
        v-html="validationMsg"
      ></div>
      <div class="form-group mb-3">
        <label for="name" class="form-label">Code</label>
        <input
          type="text"
          class="form-control type-number"
          id="name"
          v-model="verificationCode"
          @input="v$.verificationCode.$touch()"
          :class="v$.verificationCode.$error ? 'is-invalid' : 'input-text'"
        />
        <div class="input-errors" v-if="v$.verificationCode.$error">
          <span
            :class="{ 'is-invalid': v$.verificationCode.$error }"
            v-if="v$.verificationCode.required"
          >
            Enter correct verification code
          </span>
        </div>
      </div>
      <div class="form-group mt-4">
        <button
          type="button"
          :disabled="v$.verificationCode.$invalid || isSubmitDisabled"
          class="btn w-100"
          :class="[buttonDesign()]"
          id="button-continue"
          @click="otpVerification"
        >
          VERIFY
        </button>
      </div>
    </form>
    <div class="mt-2">
      <div
        class="float-left resend-code"
        :class="[resendTextEnable]"
        id="resend-button"
        @click="resendCode()"
      >
        RESEND CODE
      </div>
      <div class="timing-color float-right">{{ formatedCountdown }}</div>
    </div>
    <div class="clearfix"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { required, maxLength, minLength, numeric } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import moment from "moment";
import AuthService from "@/services/authService";

export default defineComponent({
  name: "OtpValidationView",
  created() {
    this.sendOtp();
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      isFormInvalid: false,
      verificationCode: "",
      countdown: 59,
      validationMsg:
        "You entered an incorrect code, Please try again or click RESEND CODE to click a new code.",
      isSubmitDisabled: false,
      userRegistration: this.$route.query.registrationCode as string,
      userSsn: this.$route.query.ssn as string,
      userEmail: this.$route.query.emailAddress as string,
      otpResponseMessage: "",
      isResponseValid: false,
    };
  },
  validations() {
    return {
      verificationCode: {
        required,
        numeric,
        maxLength: maxLength(6),
        minLength: minLength(6),
      },
    };
  },
  mounted() {
    this.timerCountdowm();
  },
  computed: {
    formatedCountdown(): string {
      return moment(this.countdown, "seconds").format("m:ss");
    },
    resendTextEnable(): string {
      return this.countdown ? "disabled" : "";
    },
  },
  methods: {
    timerCountdowm(): void {
      const stopCountdown = setInterval(() => {
        this.countdown -= 1;
        if (!this.countdown) clearInterval(stopCountdown);
      }, 1000);
    },
    resendCode(): void {
      const rsponseData = this.sendOtp().catch.length;
      if (rsponseData > 0) {
        this.otpResponseMessage = "We have re-sent a verification code to";
        this.countdown = 59;
        const stopCountdown = setInterval(() => {
          this.countdown -= 1;
          if (!this.countdown) clearInterval(stopCountdown);
        }, 1000);
      }
    },
    buttonDesign(): string {
      const buttonStatus = this.v$.verificationCode.$invalid;
      return buttonStatus == true ? "btn-secondary" : "btn-primary";
    },
    async sendOtp(): Promise<void> {
      const params = {
        registrationCode: this.userRegistration,
        ssn: this.userSsn,
        emailAddress: this.userEmail,
      };
      const result = await AuthService.emailVerification(params);
      if (result === undefined) {
        this.isFormInvalid = true;
        return;
      }
      if (result.data.response) {
        this.isFormInvalid = false;
        this.isResponseValid = true;
        this.otpResponseMessage = "We have sent a verification code to";
      } else if (result.data.error) {
        this.isFormInvalid = true;
        this.validationMsg =
          result.data.error +
          "If you believe this is incorrect, please click <a href='https://padmin.com/contact/' target='_blank'>Contact Us</a> to connect with P&A Group's Participant Support Center.";
      }
    },
    async otpVerification(): Promise<void> {
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      }
      this.isSubmitDisabled = true;
      const params = {
        verificationCode: this.verificationCode,
        emailAddress: this.userEmail,
      };
      const result = await AuthService.codeVerification(params);
      this.isSubmitDisabled = false;
      if (result === undefined) {
        this.isFormInvalid = true;
        return;
      }
      if (result.data.response) {
        this.isFormInvalid = false;
        const paramsData = {
          registrationCode: this.userRegistration,
          ssn: this.userSsn,
          emailAddress: this.userEmail,
        };
        this.$router.push({
          path: "/agreement",
          query: paramsData,
        });
      } else if (result.data.error) {
        console.log("elsepart");
        this.isFormInvalid = true;
        this.isSubmitDisabled = true;
        this.validationMsg;
      }
    },
  },
});
</script>
