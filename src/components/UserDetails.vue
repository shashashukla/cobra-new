<template>
  <div class="about">
    <h1>Welcome !</h1>
    <form>
      <div class="form-group mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          type="text"
          v-model="user.name"
          id="name"
          class="form-control"
          :class="{ 'is-invalid': submitted && v$.user.name.$error }"
        />
        <div v-if="submitted && v$.user.name.$error" class="input-errors">
          <span v-if="v$.user.name.required"> Name is required </span>
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="ssn" class="form-label">SSN</label>
        <input
          type="text"
          v-model="user.ssn"
          id="ssn"
          class="form-control"
          :class="{ 'is-invalid': submitted && v$.user.ssn.$error }"
        />
        <div v-if="submitted && v$.user.ssn.$error" class="input-errors">
          <span v-if="v$.user.ssn.required"> SSN is required </span>
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="Address" class="form-label">Address</label>
        <input
          type="text"
          v-model="user.address"
          class="form-control"
          :class="{ 'is-invalid': submitted && v$.user.address.$error }"
        />
        <div v-if="submitted && v$.user.address.$error" class="input-errors">
          <span v-if="v$.user.address.required"> SSN is required </span>
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="zipcode" class="form-label">Zip Code</label>
        <input
          type="text"
          v-model="user.zip"
          class="form-control"
          :class="{ 'is-invalid': submitted && v$.user.zip.$error }"
        />
        <div v-if="submitted && v$.user.zip.$error" class="input-errors">
          <span v-if="v$.user.zip.required"> Zipcode is required </span>
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="dob" class="form-label">Date Of Birth</label>
        <Datepicker
          id="dob"
          inputFormat="dd-MM-yyyy"
          class="form-control"
        ></Datepicker>
      </div>
      <div class="form-group mb-3">
        <label for="gender" class="form-label">Gender</label>
        <div class="form-check-group">
          <div class="form-check-inline">
            <label class="form-check-label" for="male">
              <input
                type="radio"
                class="form-check-input"
                value="M"
                id="male"
                :checked="formData.gender == 'M' ? true : false"
                v-model="user.gender"
              />
              Male
            </label>
          </div>
          <div class="form-check-inline">
            <label class="form-check-label" for="female">
              <input
                type="radio"
                class="form-check-input"
                value="F"
                id="female"
                :checked="formData.gender == 'F' ? true : false"
                v-model="user.gender"
              />
              Female
            </label>
          </div>
          <div class="form-check-inline">
            <label class="form-check-label" for="other">
              <input
                type="radio"
                class="form-check-input"
                value="Other"
                id="other"
                :checked="formData.gender == 'other' ? true : false"
                v-model="user.gender"
              />
              Other
            </label>
          </div>
        </div>
      </div>
      <div class="form-group mt-4">
        <button
          class="btn btn-success w-100"
          type="button"
          @click="userDataSubmit"
        >
          SUBMIT
        </button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
// @ is an alias to /src
import { defineComponent } from "vue";
import { required } from "@vuelidate/validators";
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
  props: {
    formData: {
      type: Object,
      required: true,
    },
    checked: {
      type: Boolean,
    },
  },
  data() {
    return {
      user: {
        name: this.formData.name,
        ssn: this.formData.ssno,
        address: this.formData.address,
        zip: this.formData.zip,
        dob: this.formData.dob,
        gender: this.formData.gender,
      },
      submitted: false,
    };
  },

  validations() {
    return {
      user: {
        name: { required },
        ssn: { required },
        address: { required },
        zip: { required },
        //dob: { required },
        //gender: { required },
      },
    };
  },
  computed: {
    genderChecked() {
      return this.formData.gender == "M"
        ? true
        : this.formData.gender == "F"
        ? true
        : this.formData.gender == "other"
        ? true
        : false;
    },
  },
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
          //email: this.user.email,
          ssno: this.user.ssn,
          zip: this.user.zip,
          dob: dobFormat,
        };
        console.log("listingParams", listingParams);
        //this.$emit("userDataValidate", this.user);
      }
    },
  },
});
</script>
