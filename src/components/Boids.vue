<template>
  <div class="boids">
    <canvas id="boids-canvas"> </canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CanvasSpace, Polygon, World, Body, Pt, Particle } from "pts";

class Boid {
  pt: Pt;
  constructor(pt: Pt) {
    this.pt = pt;
  }
}

@Component
export default class Boids extends Vue {
  private canvasWidth: number = 1280;
  private canvasHeight: number = 720;

  mounted(): void {
    var space = new CanvasSpace("#boids-canvas");
    space.setup({ bgcolor: "rgb(149, 149, 255)", resize: true, retina: true });
    var form = space.getForm();
    var world: World;

    space.add({
      start: (bound, space) => {
        world = new World(space.innerBound);

        let unit = (space.size.x + space.size.y) / 150;

        let triangle = Body.fromGroup(
          Polygon.fromCenter(space.center, unit * 3, 3)
        );

        // add to world
        world.add(triangle, "triangle");
      },

      animate: (time, ftime) => {
        if (ftime === undefined) return;
        world.drawParticles((p, i) =>
          form.fillOnly("#09f").point(p, p.radius, "circle")
        );

        world.drawBodies((b, i) => {
          form.fillOnly(["#0c9", "#f03", "#fe6"][i % 3]).polygon(b);
          form.strokeOnly("rgba(0,0,0,0.1");
          b.linksToLines().forEach((l) => form.line(l)); // visualize the edge constraints
        });

        world.update(ftime);
      },

      action: (type, px, py) => {
        world.body("triangle")[0].position = new Pt(px, py);
      },

      resize: (bound, evt) => {
        if (world) world.bound = space.innerBound;
      },
    });
    space.bindMouse().bindTouch().play();
  }
}
</script>

<style scoped>
#boids-canvas {
  width: 100%;
  height: 100%;
  border: 1px solid rgb(149, 149, 255);
}
</style>