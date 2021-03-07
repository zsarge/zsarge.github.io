<template>
  <Layout>
    <div slot="header">
      <h1>
        <div v-html="$page.post.title" />
      </h1>
      <h6>Published {{ formatDateString($page.post.date) }}</h6>
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
    date
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
  methods: {
    formatDateString(str) {
      const date = new Date(Date.parse(str));
      var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour12: true,
      };

      return date.toLocaleDateString("UTC", options); // 9/17/2016
    },
  },
};
</script>



