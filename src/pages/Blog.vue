<template>
  <Layout>
    <div slot="header">
      <h1>Welcome to my blog!</h1>
    </div>

    <div slot="content">
      <div v-for="post in $page.posts.edges" :key="post.id">
        <PostPreview
          :title="post.node.title"
          :to="post.node.path"
          :timeToRead="post.node.timeToRead"
          :excerpt="post.node.excerpt"
        />
      </div>
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
import PostPreview from "../components/PostPreview";

export default {
  metaInfo: {
    title: "Hello, world!",
  },
  components: {
    PostPreview,
  },
};
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
