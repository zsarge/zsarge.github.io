<template>
  <div class="layout">
    <NavBar />
    <!-- <header class="header">
      <strong>
        <g-link to="/">{{ $static.metadata.siteName }}</g-link>
      </strong>
      <nav class="nav">
        <g-link class="nav__link" to="/">Home</g-link>
        <g-link class="nav__link" to="/about/">About</g-link>
      </nav>
    </header> -->
    <Page>
      <div slot="header">
        <slot name="header" />
      </div>
      <div slot="content">
        <slot name="content" />
      </div>
    </Page>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import NavBar from "../components/NavBar";
import Page from "../components/Page";
export default {
  components: {
    NavBar,
    Page,
  },
};
</script>