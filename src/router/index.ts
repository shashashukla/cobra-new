import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import LoginView from "../views/LoginView.vue";
import Loader from "@/components/common/LoaderComponent.vue";
import { createApp, h } from "vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const loaderApp = createApp({
    render: () => h(Loader),
  });

  const loaderComponent = loaderApp.mount(document.createElement("div")); // Mount the loader component to a temporary div

  document.body.appendChild(loaderComponent.$el); // Append the loader component to the DOM

  next();
});

router.afterEach(() => {
  const loaderElement = document.querySelector(".loader");
  if (loaderElement) {
    loaderElement.remove(); // Remove the loader component from the DOM
  }
});

export default router;
