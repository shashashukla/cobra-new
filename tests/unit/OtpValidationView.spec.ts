import { shallowMount } from "@vue/test-utils";
import OtpValidationView from "@/views/OtpValidationView.vue";
import AuthService from "@/services/authService";

jest.mock("@/services/authService", () => ({
  emailVerification: jest.fn(),
  codeVerification: jest.fn(),
}));
const mockRouter = {
  push: jest.fn(),
};

describe("OtpValidationView", () => {
  const wrapper = shallowMount(OtpValidationView, {
    data() {
      return {
        userRegistration: "EBY12345",
        userSsn: "012345679",
        userEmail: "test@test.com",
        verificationCode: "123456",
      };
    },
    global: {
      mocks: {
        $router: mockRouter,
        $route: { query: "" },
      },
      stubs: ["router-link"],
    },
  });

  test("Button disable when OTP code field is empty.", async () => {
    wrapper.vm.verificationCode = "";
    await wrapper.vm.$nextTick();

    const button = wrapper.find("#button-continue");
    expect(button.attributes().disabled).toBeDefined();
  });
  test("Resend button disable when count down running.", async () => {
    const wrapper = shallowMount(OtpValidationView, {
      data() {
        return {
          userRegistration: "EBY12345",
          userSsn: "012345679",
          userEmail: "test@test.com",
          verificationCode: "123456",
        };
      },
      global: {
        mocks: {
          $router: mockRouter,
          $route: { query: "" },
        },
        stubs: ["router-link"],
      },
    });
    wrapper.vm.countdown;
    await wrapper.vm.$nextTick();
    const button = wrapper.find("#resend-button");
    expect(button.exists()).toBe(true);
    expect(button.attributes().disabled).toBe(undefined);
  });
  test("Resend button enable when times out.", async () => {
    wrapper.vm.countdown == 0;
    await wrapper.vm.$nextTick();
    const button = wrapper.find("#resend-button");
    expect(button.exists()).toBe(true);
    expect(button.attributes().enable).toBe(undefined);
  });
  it("should call emailVerification API method with correct params", async () => {
    const emailVerificationMock = jest.fn(() =>
      Promise.resolve({ data: { response: true } })
    );
    AuthService.emailVerification = emailVerificationMock;

    await wrapper.vm.sendOtp();

    expect(emailVerificationMock).toHaveBeenCalledTimes(1);
    expect(emailVerificationMock).toHaveBeenCalledWith({
      registrationCode: "EBY12345",
      ssn: "012345679",
      emailAddress: "test@test.com",
    });

    expect(wrapper.vm.isFormInvalid).toBe(false);
    expect(wrapper.vm.isResponseValid).toBe(true);
    expect(wrapper.vm.otpResponseMessage).toBe(
      "We have sent a verification code to"
    );
  });

  it("should handle error response from emailVerification API method", async () => {
    const emailVerificationMock = jest.fn(() =>
      Promise.resolve({ data: { response: true } })
    );
    AuthService.emailVerification = emailVerificationMock;
    await wrapper.vm.sendOtp();

    expect(wrapper.vm.validationMsg).toBe(
      "You entered an incorrect code, Please try again or click RESEND CODE to click a new code."
    );
  });

  it("should call codeVerification API with correct params and return a successful response", async () => {
    const wrapper = shallowMount(OtpValidationView, {
      data() {
        return {
          userRegistration: "EBY12345",
          userSsn: "012345679",
          userEmail: "test@test.com",
          verificationCode: "123456",
        };
      },
      global: {
        mocks: {
          $router: mockRouter,
          $route: { query: "" },
        },
        stubs: ["router-link"],
      },
    });
    const codeVerificationMock = jest.fn(() =>
      Promise.resolve({ data: { response: true } })
    );
    AuthService.codeVerification = codeVerificationMock;

    await wrapper.vm.otpVerification();

    expect(codeVerificationMock).toHaveBeenCalledTimes(1);
    expect(codeVerificationMock).toHaveBeenCalledWith({
      verificationCode: wrapper.vm.verificationCode,
      emailAddress: "test@test.com",
    });

    expect(wrapper.vm.isFormInvalid).toBe(false);
    expect(mockRouter.push).toHaveBeenCalledWith({
      path: "/agreement",
      query: {
        registrationCode: "EBY12345",
        ssn: "012345679",
        emailAddress: "test@test.com",
      },
    });
  });
});
