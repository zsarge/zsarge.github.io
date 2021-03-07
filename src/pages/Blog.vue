<template>
  <Layout>
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->

    <div slot="header">
      <h1>Welcome to my blog!</h1>
    </div>

    <div slot="content">
      <ul>
        <li v-for="post in $page.posts.edges" :key="post.id">
          <g-link :to="post.node.path">
            {{ post.node.title }}
          </g-link>
        </li>
      </ul>
    </div>
  </Layout>
</template>


<page-query>

query Posts {
  posts: allPost {
    edges {
      node {
        title
        path
        id
        timeToRead
        excerpt
      }
    }
  }
}

</page-query>

<script>
export default {
  metaInfo: {
    title: "Hello, world!",
  },
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
