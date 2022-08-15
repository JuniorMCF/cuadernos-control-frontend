<template>
  <div>
    <Navbar></Navbar>
    <v-main class="main-open v-main__admin" id="container-main">
      <transition :name="nameTransition" :mode="modeTransition">
        <router-view :key="$route.fullPath"> </router-view>
      </transition>
    </v-main>
  </div>
</template>

<script>
import Navbar from "./utils/Navbar.vue";

export default {
  name: "admin-component",
  data: () => ({}),
  mounted() {},
  methods: {},
  computed: {
    isHome() {
      return this.$store.state.app.isHome;
    },
    isAuth() {
      return this.$store.getters["auth/isAuth"];
    },
    nameTransition() {
      return this.$store.state.app.pageTransition.name;
    },
    modeTransition() {
      return this.$store.state.app.pageTransition.mode;
    },
    durationTransition() {
      return this.$store.state.app.pageTransition.duration;
    },
  },
  components: { Navbar },
};
</script>

<style scoped>
.v-main {
  padding-top: 0px !important;
  z-index: 0 !important;
}

.v-main__admin {
  max-height: calc(100vh - 64px) !important;
  overflow-y: auto;
  border: 1px solid #0000;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
