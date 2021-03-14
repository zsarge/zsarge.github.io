<template>
  <span class="age">{{ years }}</span>
</template>

<script>
// I was inspired by https://ottomated.net
// I am aware that it does not make sense to display my age
// to this precision in years, but I think it makes a cool
// dynamic element to the page. The goal is not information,
// but visual interest.

const interval = 60;

export default {
  name: "Age",
  data() {
    return {
      years: 16.775889841,
    };
  },
  mounted() {
    this.$options.timer = window.setInterval(this.updateAge, interval);
  },
  beforeDestroy() {
    window.clearInterval(this.$options.timer);
  },
  methods: {
    updateAge() {
      // June 7th, 2004 (month is 0 indexed)
      const birthday = new Date(2004, 5, 7);

      const age = new Date(new Date() - birthday);

      // To approximately convert milliseconds to calendar
      // years divide the time value by 3.154e10

      const floatingYear = age.valueOf() / 3.154e10;
      const places = 9;
      const years = Math.round(floatingYear * 10 ** places) / 10 ** places;
      this.years = years.toString().padEnd(places + 3, "0");
    },
  },
};
</script>

<style scoped>
/* .age {
  width: 30em;
  background: red;
} */
</style>