<template>
  <div class="homepage">
    <Header />
    <div class="more-text">More text</div>
  </div>
</template>

<script>
import Header from "./Header.vue";

export default {
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
</style>