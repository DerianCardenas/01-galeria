<script setup>
import {useRouter} from "vue-router"
const router = useRouter();
</script>
<template>
    <nav>
        <div class="cont-img">
            <img class="logo" src="../assets/img/galeria.png" alt="" srcset="">
            <h3>Galería Web</h3>
        </div>
        <div class="items">
            <li class="" @click="router.push('/inicio')" >Mis fotos</li>
            <li class="" @click="router.push('/buscar')">Buscar</li>
            <li class="" @click="router.push('/subir')">Subir</li>
        </div>
    </nav>
</template>
<style scoped>
nav{
    height: 100vh;
}
.cont-img{
    display: block;
    padding: 3.5em 0;
    margin: 0 auto;
    width: 50%;
}
.logo{
    border-radius: 1.5em;
    width: 100%;
}
.items{
    display: block;
    margin: 0 auto;
    width: 50%;
}
li{
    border-radius: 1em;
    text-align: left;
    list-style: none;
    font-size: 1.1em;
    margin-top:1em;
    padding: .5em 1em;
    transition: .25s all ease-in;
}
li:hover{
    background-color: rgb(96,148,254);
    cursor: pointer;
    color: white;
}
</style>