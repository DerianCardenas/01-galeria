<script setup>
import { RouterView } from 'vue-router';
import SidebarVue from './components/Sidebar.vue';

</script>

<template>
    <RouterView :key="$route.fullPath"/>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  text-align: center;
}
.inicio{
  display: flex;
  justify-content:space-between;
  height: 100vh;
}
.sidebar{
  width: 25%;
}
.home{
  width: 75%;
}
.topbar{
  display: flex;
}
h1{
  width: 50%;
}
.cont-buttons{
  display: flex;
  justify-content: space-around;
  width: 50%;
}
/* Removed general button styling from App.vue scoped styles.
   Global styles from style.css will apply to standard buttons.
   If App.vue has specific buttons needing unique styles,
   they should use specific classes. */
</style>
