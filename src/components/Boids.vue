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

<script>
export default {
  name: "Boids",
  mounted() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.moveTo(0, 0);
    ctx.lineTo(200, 100);
    ctx.stroke();
  },
};
</script>

<style scoped>
</style>