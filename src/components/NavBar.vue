<template>
  <mdb-navbar color="white" light>
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
    <mdb-navbar-toggler>
      <mdb-navbar-nav right>
        <mdb-nav-item class="mdb-nav-item" href="#" active>Home</mdb-nav-item>
        <mdb-nav-item class="mdb-nav-item" href="#" active>Blog</mdb-nav-item>
        <mdb-nav-item class="mdb-nav-item" href="#">Live Demos</mdb-nav-item>
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
  title: "Zack Sargent's Webpage",
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
.title-container {
  display: flex;
  cursor: pointer;
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
  margin-right: 1em;
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
</style>