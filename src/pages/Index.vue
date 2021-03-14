<template>
  <Layout>
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->

    <div slot="header"></div>

    <div slot="content">
      <Intro />
    </div>
  </Layout>
</template>



<script>
import Intro from "../components/Intro";

export default {
  metaInfo: {
    title: "Home",
  },
  components: {
    Intro,
  },
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
