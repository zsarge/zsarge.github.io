<template>
  <div class="preview">
    <g-link class="link" :to="to">
      <mdb-card>
        <mdb-card-body>
          <mdb-card-title class="title">
            <div class="joiner">
              {{ title }}
              <div class="time-to-read">{{ timeToRead }} min read</div>
            </div>
          </mdb-card-title>

          <mdb-card-text>
            {{ excerpt }}
          </mdb-card-text>
        </mdb-card-body>
      </mdb-card>
    </g-link>
  </div>
</template>

<script>
import {
  mdbCard,
  mdbCardImage,
  mdbCardBody,
  mdbCardTitle,
  mdbCardText,
  mdbBtn,
} from "mdbvue";

export default {
  components: {
    mdbCard,
    mdbCardImage,
    mdbCardBody,
    mdbCardTitle,
    mdbCardText,
    mdbBtn,
  },
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
  margin: 1em;
  color: black;
}
.time-to-read {
  color: black;
  margin-left: 0.2em;
  padding-bottom: 0.1em;
  font-size: 0.7em;
  justify-content: flex-end;
}
.joiner {
  display: flex;
  padding: 0;
  margin: 0;
  justify-content: space-between;
}
.title {
  color: black;
  margin-bottom: 0;
  display: inline;
}

.preview:hover {
  color: blue;
}
</style>