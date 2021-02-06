import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "People",
    component: () =>
      import(/* webpackChunkName: "People" */ "../views/PeoplePage.vue")
  },
  {
    path: "/favorite",
    name: "Favorite",
    component: () =>
      import(/* webpackChunkName: "Favorite" */ "../views/FavoritePeoplePage.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
