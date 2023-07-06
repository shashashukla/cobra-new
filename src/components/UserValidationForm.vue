<template>
  <div class="about">
    <h1>Get Started</h1>
    <form>
      <div class="form-group row mb-3">
        <label for="email" class="col-sm-3 col-form-label">Email</label>
        <div class="col-sm-9">
          <input
            type="email"
            v-model="user.email"
            id="email"
            name="email"
            class="form-control"
            :class="{ 'is-invalid': submitted && v$.user.email.$error }"
          />
        </div>
        <div v-if="submitted && v$.user.email.$error">
          <div
            class="input-errors"
            v-for="(error, index) of v$.user.email.$errors"
            :key="index"
          >
            <span v-if="error.$validator == 'required'">Email is required</span>
            <span v-if="error.$validator == 'email'">Email is invalid</span>
          </div>
        </div>
      </div>
      <div class="form-group row mb-3">
        <label for="ssn" class="col-sm-3 col-form-label">SSN</label>
        <div class="col-sm-9">
          <input
            type="text"
            v-model="user.ssn"
            id="ssn"
            name="ssn"
            class="form-control"
            :class="{ 'is-invalid': submitted && v$.user.ssn.$error }"
          />
        </div>
        <div v-if="submitted && v$.user.ssn.$error">
          <span v-if="v$.user.ssn.required"> SSN is required </span>
        </div>
      </div>
      <div class="form-group row mb-3">
        <label for="zipcode" class="col-sm-3 col-form-label">Zip Code</label>
        <div class="col-sm-9">
          <input
            type="text"
            v-model="user.zipcode"
            id="zipcode"
            name="zipcode"
            class="form-control"
            :class="{ 'is-invalid': submitted && v$.user.zipcode.$error }"
          />
        </div>
        <div v-if="submitted && v$.user.zipcode.$error">
          <span v-if="v$.user.zipcode.required"> Zipcode is required </span>
        </div>
      </div>
      <div class="form-group row mb-3">
        <label for="dob" class="col-sm-3 col-form-label">Date Of Birth</label>
        <div class="col-sm-9">
          <Datepicker
            v-model="user.dob"
            id="dob"
            inputFormat="dd-MM-yyyy"
            class="form-control"
            :class="{ 'is-invalid': submitted && v$.user.dob.$error }"
          ></Datepicker>
        </div>
        <div v-if="submitted && v$.user.dob.$error">
          <span v-if="v$.user.dob.required"> Date of birth is required </span>
        </div>
      </div>

      <div class="form-group">
        <button class="btn btn-primary" type="button" @click="userDataSubmit">
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
import Datepicker from "vue3-datepicker";
//import { ref } from "vue";
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
        zipcode: { required },
        dob: { required },
      },
    };
  },
  computed: {},
  methods: {
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
