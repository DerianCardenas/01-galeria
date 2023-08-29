<template>
    
  <div class="inicio">
    <div class="sidebar">
      <SidebarVue/>
    </div>
    <div class="home">
      <div class="topbar">
        <h1>GALERIA</h1>
        <div class="profile-info">  
          <img @click="showOptions" class="icon" :src="imagen" title="MI PERFIL" srcset="">
          <!-- <button  @click="closeSession">Cerrar sesión</button> -->
          <ul id="profile-options" class="profile-options">
            <li @click="profile()">Editar Perfil</li>
            <li @click="closeSession()">Cerrar sesión</li>
          </ul>
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
import {ref} from "vue";
import SidebarVue from '../components/Sidebar.vue';
import router from '../router';
const data = JSON.parse(localStorage.getItem("user"));
const showItems = ref(false)
const imagen = ref("")
if(data.pfp == "")
  imagen.value="https://static.vecteezy.com/system/resources/previews/020/911/740/original/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
else
  imagen.value = data.pfp
const closeSession = () => {
  localStorage.removeItem("user");
  router.push("/login")
}
const showOptions = () => {
  if(showItems.value)
    document.getElementById("profile-options").classList.remove("show")
  else
    document.getElementById("profile-options").classList.add("show")
  showItems.value = !showItems.value
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
.icon{
  border-radius: 50%;
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
.profile-options li{
  background-color: rgb(96,148,254);
  border-radius: .1em;
  cursor: pointer;
  color: white;
  display: block;
  margin-bottom: .2em;
  padding: .2em;
}
.profile-options{
  display: none;
  list-style-type: none;
  margin: 0;
  padding: 0;  
  position: absolute;
  transition: .7s all ease-in;
  text-align: left;
}

.show{
  display: block;
}
</style>
