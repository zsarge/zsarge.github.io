<template>
  <div class="boids">
    <canvas
      id="myCanvas"
      width="200"
      height="100"
      style="border: 1px solid #000000"
    >
    </canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Boids extends Vue {
  mounted() {
    const canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    if (ctx === null || ctx === undefined) {
      return;
    }

    ctx.moveTo(0, 0);
    ctx.lineTo(200, 100);
    ctx.stroke();
  }
}
</script>

<style scoped>
</style>