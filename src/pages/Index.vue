<template>
  <Layout>
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->

    <div slot="header">
      <h1>Hello, world!</h1>
    </div>

    <div slot="content">
      <g-image alt="Example image" src="~/favicon.png" width="135" />
      <p>
        Lorem ipsumasdasd dolor sit amet, consectetur adipisicing elit. Pariatur
        excepturi labore teasdasdasdmpore expedita, et iste tenetur suscipit
        explicabo! Dolores, aperiam non officia eos quod asperiores
      </p>

      <h2>Automatic Blogroll</h2>

      <ul>
        <li v-for="post in $page.posts.edges" :key="post.id">
          <g-link :to="post.node.path">
            {{ post.node.title }}
          </g-link>
        </li>
      </ul>

      <p class="home-links">
        <a href="https://gridsome.org/docs/" target="_blank" rel="noopener"
          >Gridsome Docs</a
        >
        <a
          href="https://github.com/gridsome/gridsome"
          target="_blank"
          rel="noopener"
          >GitHub</a
        >
      </p>
    </div>
  </Layout>
</template>


<page-query>
query Posts {
    posts: allPost {
      edges {
        node {
          id
          title
          path
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
