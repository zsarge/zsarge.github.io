<template>
  <div class="page-content">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Noto+Sans");

:root {
  --max-width: 45rem;
}

.header {
  font-weight: 500;
  margin-bottom: 0;
  text-indent: -2em;
  font-family: "Roboto", sans-serif;
  transition: text-indent 1s;
  font-size: 2.3em;
}

@media screen and (max-width: 60rem) {
  .header {
    text-indent: 0;
  }
}

.page-content {
  margin-top: 1.3em;
  font-family: "Noto Sans", sans-serif;
}

p {
  font-size: 1.2rem;
}
</style>
