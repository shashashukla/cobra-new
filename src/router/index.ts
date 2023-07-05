import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Loader from "@/components/common/LoaderComponent.vue";
import { createApp, h } from "vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/registration",
    name: "registration",
    component: () => import("../views/RegistrationView.vue"),
  },
  {
    path: "/uservalidation",
    name: "uservalidation",
    component: () => import("../views/UserValidationView.vue"),
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
