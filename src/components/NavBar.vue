<template>
  <mdb-navbar color="white" light class="row container-fluid" id="navbar">
    <g-link to="/" class="offset-0 offset-xl-1 col-xl-5 col-4">
      <div class="title-container title">
        <!-- Hide profile pic on small screens -->
        <div class="profile-pic d-lg-flex d-sm-none d-none d-md-none title">
          <img
            class="rounded-circle img-fluid"
            src="../assets/profile-pic.jpg"
            data-holder-rendered="true"
          />
        </div>
        <mdb-navbar-brand class="title" href="#">
          <h1>Zack Sargent</h1>
          <h2 class="title d-lg-flex d-sm-none d-none d-md-none">zsarge</h2>
        </mdb-navbar-brand>
      </div>
    </g-link>

    <mdb-navbar-toggler class="col-xl-5">
      <mdb-navbar-nav right>
        <g-link to="/">
          <mdb-nav-item class="mdb-nav-item">Home</mdb-nav-item>
        </g-link>
        <g-link to="/blog">
          <mdb-nav-item class="mdb-nav-item">Blog</mdb-nav-item>
        </g-link>
        <mdb-nav-item class="mdb-nav-item">Live Demos</mdb-nav-item>
      </mdb-navbar-nav>
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>

<script>
import {
  mdbNavbar,
  mdbNavbarBrand,
  mdbNavbarToggler,
  mdbNavbarNav,
  mdbNavItem,
} from "mdbvue";

export default {
  name: "NavbarPage",
  components: {
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem,
  },
};
</script>

<style scoped>
#navbar {
  margin: 0 !important;
}

.width-container {
  display: flex;
  flex-direction: column;
  justify-items: space-between;
}

.title-container {
  display: flex;
  cursor: pointer;
  margin: 0;
}

h1 {
  font-weight: bold;
  font-size: 1.4em;
  padding-bottom: 0;
  margin-bottom: 0;
}

h2 {
  font-size: 1em;
  text-align: left;
  margin-bottom: 0;
  color: rgb(93, 92, 92);
}

.title :hover {
  color: rgb(93, 92, 92);
  cursor: pointer;
}

.mdb-nav-item {
  font-weight: bolder;
  margin-right: 0.5em;
  margin-left: 0.5em;
  font-size: 1.2em;
}

.mdb-nav-item :hover {
  background: rgb(235, 235, 235);
  border-radius: 1em;
}

.profile-pic {
  max-width: 4em;
  margin-right: 1em;
}

a {
  color: black;
  text-decoration: none !important;
}
</style>