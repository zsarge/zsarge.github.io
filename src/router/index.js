import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Blog from "../views/Blog.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/blog",
		name: "Blog",
		component: Blog,
	},
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	// {
	//   path: '/about',
	//   name: 'About',
	//   // route level code-splitting
	//   // this generates a separate chunk (about.[hash].js) for this route
	//   // which is lazy-loaded when the route is visited.
	//   component: () => import(/* webpackChunkName: "about" */ '../views/Blog.vue')
	// }
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

// From: https://stackoverflow.com/a/51640162
const DEFAULT_TITLE = "Zack Sargent's Webpage";
router.afterEach((to) => {
	// Use next tick to handle router history correctly
	// see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
	Vue.nextTick(() => {
		document.title = to.meta.title || DEFAULT_TITLE;
	});
});

export default router;

// Single Page Apps for GitHub Pages
// MIT License
// https://github.com/rafgraph/spa-github-pages
// This script checks to see if a redirect is present in the query string,
// converts it back into the correct url and adds it to the
// browser's history using window.history.replaceState(...),
// which won't cause the browser to attempt to load the new url.
// When the single page app is loaded further down in this file,
// the correct url will be waiting in the browser's history for
// the single page app to route accordingly.
(function(l) {
	if (l.search[1] === "/") {
		var decoded = l.search
			.slice(1)
			.split("&")
			.map(function(s) {
				return s.replace(/~and~/g, "&");
			})
			.join("?");
		window.history.replaceState(
			null,
			null,
			l.pathname.slice(0, -1) + decoded + l.hash
		);
	}
})(window.location);
