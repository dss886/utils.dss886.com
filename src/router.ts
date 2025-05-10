import { createWebHistory, createRouter } from "vue-router";
import MainView from "./pages/main/MainPage.vue";
import MajPointsView from "./pages/maj-points/MajPointsPage.vue";
import NotFoundView from "./pages/not-found/NotFoundPage.vue";

const routes = [
  { path: "/", name: "main", component: MainView, meta: { title: "首页" } },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundView, meta: { title: "404 - NotFound" } },
  {
    path: "/maj-points",
    name: "maj-points",
    component: MajPointsView,
    meta: { title: "立直麻将点数计算器 | Riichi Mahjong Point Calculator" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title as string;
  next();
});

export default router;
