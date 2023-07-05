<template>
  <div>
    <h3>Confirm your data and Enroll</h3>
    <div class="form-group row mb-3">
      <label for="name" class="col-sm-2 col-form-label">Name</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="name" v-model="name" />
      </div>
    </div>
    <div class="form-group row mb-3">
      <label for="email" class="col-sm-2 col-form-label">Email</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="email" v-model="email" />
      </div>
    </div>
    <div class="form-group row mb-3">
      <label for="dob" class="col-sm-2 col-form-label">DOB</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" id="dob" v-model="dob" />
      </div>
    </div>
    <div class="form-group row mb-3">
      <label for="gender" class="col-sm-2 col-form-label">Gender</label>
      <div class="col-sm-10">
        <select v-model="gender" class="form-control" id="gender">
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
      </div>
    </div>
    <div class="form-group row mb-3">
      <label for="mobile" class="col-sm-2 col-form-label">Mobile</label>
      <div class="col-sm-10">
        <input
          type="number"
          class="form-control"
          id="mobile"
          v-model="mobile"
        />
      </div>
    </div>
    <div class="form-group row mb-3">
      <label for="mobile" class="col-sm-2 col-form-label">Address</label>
      <div class="col-sm-10">
        <textarea
          id="address"
          class="form-control"
          v-model="address"
        ></textarea>
      </div>
    </div>
    <br />
    <button
      @click="submitEnrollment"
      class="btn btn-primary"
      id="submit-nextstep"
    >
      Next
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      name: this.formData.name,
      email: this.formData.email,
      dob: this.formData.dob,
      gender: this.formData.gender,
      mobile: this.formData.mobile,
      address: this.formData.address,
    };
  },
  methods: {
    submitEnrollment(): void {
      console.log("submitStep2method");
      this.$emit("enrollmentSubmit", { name: this.name, email: this.email });
    },
  },
});
</script>
