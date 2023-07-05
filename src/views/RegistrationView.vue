<template>
  <div class="about">
    <h1>This is a rgistration page</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group row mb-3">
        <label for="firstName" class="col-sm-2 col-form-label"
          >First Name</label
        >
        <div class="col-sm-8">
          <input
            type="text"
            v-model="user.firstName"
            id="firstName"
            name="firstName"
            class="form-control"
            :class="{ 'is-invalid': submitted && v$.user.firstName.$error }"
          />
        </div>
        <div v-if="submitted && v$.user.firstName.$error">
          <span v-if="v$.user.firstName.required">
            First Name is required
          </span>
        </div>
      </div>
      <div class="form-group row mb-3">
        <label for="lastName" class="col-sm-2 col-form-label">Last Name</label>
        <div class="col-sm-8">
          <input
            type="text"
            v-model="user.lastName"
            id="lastName"
            name="lastName"
            class="form-control"
            :class="{ 'is-invalid': submitted && v$.user.lastName.$error }"
          />
        </div>
        <div v-if="submitted && v$.user.lastName.$error">
          <span v-if="v$.user.firstName.required"> Last Name is required </span>
        </div>
      </div>
      <div class="form-group row mb-3">
        <label for="email" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-8">
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
        <label for="password" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-8">
          <input
            type="password"
            v-model="user.password"
            id="password"
            name="password"
            class="form-control"
            :class="{ 'is-invalid': submitted && v$.user.password.$error }"
          />
        </div>
        <div v-if="submitted && v$.user.password.$error">
          <span v-if="v$.user.password.required">Password is required</span>
          <span v-if="v$.user.password.minLength.$invalid"
            >Password must be at least 6 characters</span
          >
        </div>
      </div>
      <div class="form-group row mb-3">
        <label for="confirmPassword" class="col-sm-2 col-form-label"
          >Confirm Password</label
        >
        <div class="col-sm-8">
          <input
            type="password"
            v-model="user.confirmPassword"
            id="confirmPassword"
            name="confirmPassword"
            class="form-control"
            :class="{
              'is-invalid':
                submitted && v$.user.confirmPassword.required.$invalid,
            }"
          />
        </div>
        <div v-if="submitted && v$.user.confirmPassword.$error">
          <span v-if="v$.user.confirmPassword.required.$invalid"
            >Confirm Password is required</span
          >
          <span v-else-if="!v$.user.confirmPassword.sameAsPassword"
            >Passwords must match</span
          >
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary">Register</button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
// @ is an alias to /src
import { defineComponent } from "vue";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default defineComponent({
  components: {},
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      submitted: false,
    };
  },

  validations() {
    return {
      user: {
        firstName: { required },
        lastName: { required },
        email: { required, email },
        password: { required, minLength: minLength(6) },
        confirmPassword: { required, sameAsPassword: sameAs("password") },
      },
    };
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
      console.log("formval", this.user);
      // stop here if form is invalid
      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      } else {
        console.log("userdata", this.user);
      }
    },
  },
});
</script>
