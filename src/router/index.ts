import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
const PoolView = () => import("../views/PoolView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/pool/:id",
      name: "pool",
      component: PoolView,
    },
  ],
});

export default router;
