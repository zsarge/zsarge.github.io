<template>
  <div id="app">
    <NavbarPage />
    <Homepage />
  </div>
</template>

<script>
import NavbarPage from "./components/NavBar";
import Homepage from "./components/Homepage/Homepage";

export default {
  name: "App",
  components: {
    NavbarPage,
    Homepage,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");

#app {
  text-align: center;
}
</style>
