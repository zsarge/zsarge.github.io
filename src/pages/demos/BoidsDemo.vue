<template>
  <Layout>
    <div slot="header">
      <h1>Boids</h1>
    </div>

    <div slot="content">
      <p>Woah this is text as well!</p>
      <Boids />
    </div>
  </Layout>
</template>

<script>
import Boids from "../../components/Boids";

export default {
  metaInfo: {
    title: "Hello, world!",
  },
  components: {
    Boids,
  },
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
