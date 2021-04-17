<template>
  <div class="layout">
    <NavBar />
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
