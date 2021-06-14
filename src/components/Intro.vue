<template>
  <div class="introduction">
    <h3>About Me:</h3>
    Hello! I am a
    <Age />
    year old who loves programming.
  </div>
</template>

<script>
import Age from "./Age";

export default {
  name: "Intro",
  components: {
    Age,
  },
};
</script>
