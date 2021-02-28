import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbvue/lib/css/mdb.min.css";
import Vue from "vue";
import App from "./App";

Vue.config.productionTip = false;

new Vue({
	render: (h) => h(App),
}).$mount("#app");
