import { shallowMount } from "@vue/test-utils";
import EditEmailView from "@/views/EditEmailView.vue";
import AuthService from "@/services/authService";
jest.mock("@/services/authService", () => ({
  emailVerification: jest.fn(),
}));
const mockRouter = {
  push: jest.fn(),
};

describe("Test for EditEmailView.vue page", () => {
  const wrapper = shallowMount(EditEmailView, {
    global: {
      mocks: {
        $router: mockRouter,
        $route: { query: { action: "" } },
      },
    },
    data() {
      return {
        user: {
          emailAddress: "test@test.com",
        },
      };
    },
  });
  test("Button disable when email field is empty.", async () => {
    const wrapper = shallowMount(EditEmailView, {
      global: {
        mocks: {
          $router: mockRouter,
          $route: { query: { action: "" } },
        },
      },
    });
    wrapper.find("#email").setValue(wrapper.vm.user.emailAddress);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.user.emailAddress).toBe(wrapper.vm.user.emailAddress);
    expect(
      wrapper.find("#button-verifyemail").attributes().disabled
    ).toBeDefined();
  });
  test("Button enable when email field is not empty.", async () => {
    wrapper.vm.user.emailAddress;
    await wrapper.vm.$nextTick();
    const button = wrapper.find("#button-verifyemail");
    expect(button.attributes().disabled).toBeUndefined();
  });
  it("should call emailVerification method on button click", async () => {
    const emailVerificationMock = jest.fn(() =>
      Promise.resolve({ data: { response: true } })
    );
    AuthService.emailVerification = emailVerificationMock;
    const button = wrapper.find("#button-verifyemail");
    await wrapper.find("#email").setValue("test@example.com");
    await button.trigger("click");
    expect(emailVerificationMock).toHaveBeenCalledWith({
      emailAddress: "test@example.com",
    });
  });
});
