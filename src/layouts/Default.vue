<template>
  <div class="layout">
    <NavBar />
    <Page class="offset-0 col-12 offset-md-2 col-md-7 offset-xl-3 col-xl-6">
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
