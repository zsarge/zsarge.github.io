<template>
  <div class="preview-container">
    <div class="preview">
      <g-link class="link" :to="to">
        <div class="heading">
          <div class="title">
            {{ title }}
          </div>
          <div class="time-to-read">{{ timeToRead }} min read</div>
        </div>
        {{ excerpt }}
      </g-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    to: String,
    timeToRead: String,
    excerpt: String,
  },
};
</script>

<style scoped>
.preview {
  background: rgb(232, 240, 243);
  margin: 1em;
  padding: 1em;
  font-size: 1.3em;
  border: 0.1em;
}

.preview-container {
  padding: 0;
  margin: 0;
  border: 0;
}

.preview-container :hover {
  color: rgb(173, 151, 151);
}

.link {
  color: black;
}

.heading {
  display: flex;
}

.title {
  color: rgb(141, 141, 173);
  margin-right: 0.8rem;
}

.time-to-read {
  font-size: 1rem;
  padding-top: 0.3rem;
}
</style>