<template>
  <Layout>
    <div slot="header">
      <h1>About us</h1>
    </div>
    <div slot="content">
      <div v-html="$page.post.content" />
    </div>
  </Layout>
</template>

<page-query>

query Post ($path: String!) {
  post: post (path: $path) {
    title
    content
  }
}

</page-query>

<script>
// I used this tutorial: https://youtu.be/uF3K3IpRfhE

export default {
  metaInfo() {
    return {
      title: this.$page.post.title,
    };
  },
};
</script>



