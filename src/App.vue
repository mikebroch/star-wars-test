<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  components: {
    Header
  }
};
</script>

<style lang="scss">
html,
body {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: "Futura", "Roboto", Helvetica, Arial, sans-serif !important;
}
@font-face {
  font-family: Futura;
  src: url("./assets/fonts/Starjedi.ttf");
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
