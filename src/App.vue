<template>
  <v-app>
    <v-main>
      <router-view :key="$route.fullPath"> </router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style>
  .content-wrap{
    max-width: 1000px;
  }
  .text-normal{
    text-transform: none !important;
  }
</style>
