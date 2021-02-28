<template>
  <div id="app">
    <NavbarPage />
    <img src="./assets/logo-mdb-vue-small.png" />
    <router-view />
  </div>
</template>

<script>
import NavbarPage from "./components/NavBar";

export default {
  name: "App",
  components: {
    NavbarPage,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");

#app {
  text-align: center;
}
</style>
