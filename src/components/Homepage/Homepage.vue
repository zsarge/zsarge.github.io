<template>
  <div class="homepage">
    <Header />
    <div class="more-text">More text</div>
  </div>
</template>

<script>
import Header from "./Header.vue";

export default {
  title: "Zack Sargent's Webpage",
  name: "Homepage",
  components: {
    Header,
  },
};
</script>

<style scoped>
.more-text {
  width: 100%;
  height: 100%;
  background: white;
}

* {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>