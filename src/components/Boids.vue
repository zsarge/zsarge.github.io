<template>
  <div class="boids">
    <canvas id="myCanvas"> </canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CanvasSpace, Pt, Group } from "pts";

class Boid {
  x: number;
  y: number;
  direction: number; // 0 = facing right
  constructor(x: number, y: number, direction: number) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }
}

function drawTriangle(ctx: CanvasRenderingContext2D, b: Boid) {
  const radius = 50;
  const divot = radius / 2;
  ctx.beginPath();
  ctx.moveTo(b.x + radius, b.y);
  ctx.lineTo(b.x - radius, b.y + radius);
  ctx.lineTo(b.x - radius + divot, b.y);
  ctx.lineTo(b.x - radius, b.y - radius);
  ctx.fill();
}

@Component
export default class Boids extends Vue {
  private canvasWidth: number = 1280;
  private canvasHeight: number = 720;

  mounted(): void {
    const canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;
    canvas.style.width = "100%";
    canvas.style.height = "500px";
    const ctx = canvas.getContext("2d");
    if (ctx === null || ctx === undefined) return;

    let b = new Boid(100, 60, 0);

    drawTriangle(ctx, b);
  }
}
</script>

<style scoped>
#myCanvas {
  width: 100%;
  height: 100%;
  border: 1px solid #000000;
}
</style>