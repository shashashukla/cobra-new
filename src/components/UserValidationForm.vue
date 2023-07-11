<template>
  <div class="about">
    <h3 class="text-heading">Get Started</h3>
    <form>
      <div class="form-group mb-3">
        <label for="email" class="form-label">Email</label>
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
        <label for="ssn" class="form-label">SSN</label>
        <input
          type="text"
          v-model="user.ssn"
          @input="v$.user.ssn.$touch()"
          id="ssn"
          class="form-control"
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
      <div class="form-group mb-3">
        <label for="zipcode" class="form-label">Zip Code</label>
        <input
          type="text"
          v-model="user.zipcode"
          @input="v$.user.zipcode.$touch()"
          id="zipcode"
          class="form-control"
          :class="v$.user.zipcode.$error ? 'is-invalid' : 'input-text'"
        />
        <div class="input-errors" v-if="v$.user.zipcode.$error">
          <span
            :class="{ 'is-invalid': v$.user.zipcode.$error }"
            v-if="v$.user.zipcode.required"
          >
            Please enter a valid zip code <span class="error-icon"></span
          ></span>
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="dob" class="form-label">Date Of Birth</label>
        <datepicker
          :modelValue="user.dob"
          @input="v$.user.dob.$touch()"
          format="dd-MM-yyyy"
          :class="v$.user.dob.$error ? 'is-invalid' : 'input-text'"
          wrapper-class="form-control p-0"
        ></datepicker>
        <div class="input-errors" v-if="v$.user.dob.$error">
          <span
            :class="{ 'is-invalid': v$.user.dob.$error }"
            v-if="v$.user.dob.required"
          >
            Please enter a valid date of birth <span class="error-icon"></span
          ></span>
        </div>
      </div>

      <div class="form-group mt-4">
        <button
          :disabled="v$.user.$invalid"
          class="btn w-100 button-textcolor"
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
import {
  required,
  email,
  minLength,
  maxLength,
  numeric,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import Datepicker from "vuejs3-datepicker";
import moment from "moment";

export default defineComponent({
  components: {
    Datepicker,
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
        ssn: "",
        zipcode: "",
        dob: new Date(),
      },
      submitted: false,
    };
  },

  validations() {
    return {
      user: {
        email: { required, email },
        ssn: { required },
        zipcode: {
          required,
          minLength: minLength(6),
          maxLength: maxLength(6),
          numeric,
        },
        dob: { required },
      },
    };
  },
  methods: {
    buttonDesign() {
      const buttonStatus = this.v$.user.$invalid;
      return buttonStatus == true ? "btn-secondary" : "button-successcolor";
    },
    async userDataSubmit(): Promise<void> {
      this.submitted = true;
      console.log("formval", this.user);
      console.log("dateformat", moment(this.user.dob).format("DD-MM-yyyy"));
      // stop here if form is invalid
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
