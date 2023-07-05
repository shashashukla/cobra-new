<template>
  <div class="about">
    <h1>Welcome !</h1>
    <form>
      {{ formData }}
      <div class="form-group row mb-3">
        <label for="name" class="col-sm-3 col-form-label">Name</label>
        <div class="col-sm-9">
          <input
            type="text"
            v-model="user.name"
            id="name"
            class="form-control"
            :class="{ 'is-invalid': submitted && v$.user.name.$error }"
          />
        </div>
        <div v-if="submitted && v$.user.name.$error">
          <span v-if="v$.user.name.required"> Name is required </span>
        </div>
      </div>
      <div class="form-group row mb-3">
        <label for="ssn" class="col-sm-3 col-form-label">SSN</label>
        <div class="col-sm-9">
          <input
            type="text"
            v-model="user.ssn"
            id="ssn"
            class="form-control"
            :class="{ 'is-invalid': submitted && v$.user.ssn.$error }"
          />
        </div>
        <div v-if="submitted && v$.user.ssn.$error">
          <span v-if="v$.user.ssn.required"> SSN is required </span>
        </div>
      </div>
      <div class="form-group row mb-3">
        <label for="Address" class="col-sm-3 col-form-label">Address</label>
        <div class="col-sm-9">
          <input
            type="text"
            v-model="user.address"
            class="form-control"
            :class="{ 'is-invalid': submitted && v$.user.address.$error }"
          />
        </div>
        <div v-if="submitted && v$.user.address.$error">
          <span v-if="v$.user.address.required"> SSN is required </span>
        </div>
      </div>
      <div class="form-group row mb-3">
        <label for="zipcode" class="col-sm-3 col-form-label">Zip Code</label>
        <div class="col-sm-9">
          <input
            type="text"
            v-model="user.zip"
            class="form-control"
            :class="{ 'is-invalid': submitted && v$.user.zip.$error }"
          />
        </div>
        <div v-if="submitted && v$.user.zip.$error">
          <span v-if="v$.user.zip.required"> Zipcode is required </span>
        </div>
      </div>
      <div class="form-group row mb-3">
        <label for="dob" class="col-sm-3 col-form-label">Date Of Birth</label>
        <div class="col-sm-9">
          <Datepicker
            id="dob"
            inputFormat="dd-MM-yyyy"
            class="form-control"
          ></Datepicker>
        </div>
      </div>
      <div class="form-group row mb-3">
        <label for="gender" class="col-sm-3 col-form-label">Gender</label>
        <div class="col-sm-7">
          <div class="form-check-inline">
            {{ user.genderf }}
            <label class="form-check-label">
              <input
                type="checkbox"
                class="form-check-input"
                value="M"
                v-model="user.genderf"
                :checked="user.genderf === 'M' ? checked : true"
              />
              Male
            </label>
          </div>
          <div class="form-check-inline">
            <label class="form-check-label">
              <input
                type="checkbox"
                class="form-check-input"
                value="F"
                v-model="user.genderf"
                :checked="user.genderf == 'F' ? checked : true"
              />
              Female
            </label>
          </div>
          <div class="form-check-inline">
            <label class="form-check-label">
              <input
                type="checkbox"
                class="form-check-input"
                value="Other"
                v-model="user.genderf"
                :checked="user.genderf == 'Other' ? checked : true"
              />
              Other
            </label>
          </div>
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" type="button" @click="userDataSubmit">
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
        genderf: this.formData.gender,
      },
      submitted: false,
    };
  },

  validations() {
    return {
      user: {
        name: { required },
        ssn: { required },
        zip: { required },
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
          //email: this.user.email,
          ssno: this.user.ssn,
          zip: this.user.zip,
          dob: dobFormat,
        };
        console.log("listingParams", listingParams);
        this.$emit("userDataValidate", this.user);
      }
    },
  },
});
</script>
