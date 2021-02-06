import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/reset.css";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import {
  Pagination,
  Button,
  Badge,
  Card,
  Row,
  Col,
  Header,
  Input
} from "element-ui";

Vue.config.productionTip = false;
Vue.component("font-awesome-icon", FontAwesomeIcon);

const libraryIcon = [faHeart, farHeart];
libraryIcon.forEach(l => library.add(l));

const components = [Pagination, Button, Badge, Card, Row, Col, Header, Input];
components.forEach(c => Vue.use(c));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
