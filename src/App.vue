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
button{
  background-color: transparent;
  border-radius: 1em;
  height: 2.5em;
  margin-top: 2.1em;
  width: 40%;
}
button:hover{
  background-color: rgb(255, 255, 236);
  cursor: pointer;
}
</style>
