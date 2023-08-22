<template>
    
  <div class="inicio">
    <div class="sidebar">
      <SidebarVue/>
    </div>
    <div class="home">
      <div class="topbar">
        <h1>GALERIA</h1>
        <div class="profile-info">  
          <img class="icon" :src="data.pfp" title="MI PERFIL" srcset="" @click="profile">
          <button  @click="closeSession">Cerrar sesión</button>
        </div> 
      </div>
      <div class="cont-view">    
        <router-view :key="$route.fullPath"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import { RouterView } from 'vue-router';
import SidebarVue from '../components/Sidebar.vue';
import router from '../router';
const data = JSON.parse(localStorage.getItem("user"));
const closeSession = () => {
  localStorage.removeItem("user");
  router.push("/login")
}
const profile = () => {
  router.push("/perfil")
}
</script>
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
  margin-top: 1em;
  width: 75%;
}
.topbar{
  display: flex;
  justify-content:space-between;
  width: 98%;
}
.topbar div{
  margin: 0;
}
.profile-info{
  display: flex;
  justify-content:space-between;
  width: 350px;
}
.icon{
  width:100px;
}
.icon:hover{
  cursor: pointer;
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
  width: 50%;
}
button:hover{
  background-color: rgb(255, 255, 236);
  cursor: pointer;
}
</style>
