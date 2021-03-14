<template>
  <div class="introduction">
    Hello! I am a
    <Age />
    year old developer.
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
