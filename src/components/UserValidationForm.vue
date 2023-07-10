<template>
  <div class="about">
    <h1>Get Started</h1>
    <form>
      <div class="form-group mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          v-model="user.email"
          @input="v$.user.email.$touch()"
          id="email"
          class="form-control"
          :class="{
            'is-invalid': v$.user.email.$error,
          }"
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
          :class="{ 'is-invalid': v$.user.ssn.$error }"
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
          :class="{ 'is-invalid': v$.user.zipcode.$error }"
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
          format="dd-MM-yyyy"
          :class="{ 'is-invalid': v$.user.dob.$error }"
          wrapper-class="form-control p-0"
        ></datepicker>
        <!-- <Datepicker
          v-model="user.dob"
          @input="v$.user.dob.$touch()"
          id="dob"
          inputFormat="dd-MM-yyyy"
          class="form-control"
          :class="{ 'is-invalid': v$.user.dob.$error }"
        ></Datepicker> -->
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
import {
  required,
  email,
  minLength,
  maxLength,
  numeric,
} from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
// import Datepicker from "vue3-datepicker";
import Datepicker from "vuejs3-datepicker";
import moment from "moment";

export default defineComponent({
  components: {
    Datepicker,
  },
  setup() {
    return { v$: useVuelidate() };
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
  computed: {},
  methods: {
    buttonDesign() {
      const buttonStatus = this.v$.user.$invalid;
      return buttonStatus == true ? "btn-secondary" : "btn-success";
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
        console.log("userdata", this.user);
        const dobFormat = moment(this.user.dob).format("DD-MM-yyyy");
        let listingParams = {
          email: this.user.email,
          ssno: this.user.ssn,
          zipcode: this.user.zipcode,
          dob: dobFormat,
        };
        console.log("listingParams", listingParams);
        this.$emit("userDataValidate", this.user);
      }
    },
  },
});
</script>
