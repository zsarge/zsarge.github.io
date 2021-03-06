<template>
  <div id="app">
    <NavbarPage />
    <router-view />
  </div>
</template>

<script>
import NavbarPage from "./components/NavBar";

export default {
  components: {
    NavbarPage,
  },
};
</script>
