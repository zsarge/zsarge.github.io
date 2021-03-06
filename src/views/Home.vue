<template>
  <div id="app">
    <Homepage />
  </div>
</template>

<script>
import Homepage from "../components/Homepage/Homepage";
import titleMixin from "../mixins/titleMixin";

export default {
  mixins: [titleMixin],
  title: "Zack Sargent's Webpage",
  name: "App",
  components: {
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
