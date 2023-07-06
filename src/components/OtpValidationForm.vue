<template>
  <div>
    <h3>Enter Verification Code</h3>
    <p>We have sent a verification code to</p>
    <p>{{ user.email }}</p>
    <form>
      <div class="form-group row mb-3">
        <label for="name" class="col-sm-2 col-form-label">Code</label>
        <div class="col-sm-10">
          <input
            type="text"
            class="form-control"
            id="name"
            v-model="otpcode"
            :class="{ 'is-invalid': submitted && v$.otpcode.$error }"
          />
        </div>
        <div v-if="submitted && v$.otpcode.$error">
          <div
            class="input-errors"
            v-for="(error, index) of v$.otpcode.$errors"
            :key="index"
          >
            <span v-if="error.$validator == 'required'"
              >Please enter a valid verification code</span
            >
            <span v-if="error.$validator == 'maxLength'"
              >Please enter a 6 digit code</span
            >
            <span v-if="error.$validator == 'minLength'"
              >Please enter a 6 digit code</span
            >
            <span v-if="error.$validator == 'numeric'"
              >Please enter a 6 digit code</span
            >
          </div>
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" type="button" @click="submitOtp">
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
