<template>

    <div class="cont-fotos">
        <div class="image" v-for="(image, index) in imagenes" @click="showImageFullScreen(index)">
          <img :src="image" alt="" class="image-darken" >
        </div>
      </div>
</template>
<script setup>
import { ref, computed } from 'vue';
const props = defineProps({
    imagenes:{
        type:Array,
        required:true,
    },
    showImageFullScreen:{
        type:Function,
        required:true,
    }
})
</script>
<style scoped>
.index{
  position: absolute;
  max-height: 85vh;
  scroll-behavior: smooth;
  scrollbar-color: transparent;
  overflow-y: scroll;
}
::-webkit-scrollbar {
  width: 12px; 
  background-color: #f0f0f0; 
}

::-webkit-scrollbar-thumb {
  background-color: #fff; 
}

::-webkit-scrollbar-button {
  display: none; 
}
.fas{
  font-size:1.2em;
  margin-left: .5em;
}
.cont-fotos {
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
}
.image{
  block-size: fit-content;
  margin: .2em;
  position: relative;
  width: fit-content;
}
.image::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Ajusta el valor del canal alfa (0.5) para cambiar la intensidad del oscurecimiento */
  opacity: 0; /* Inicialmente, el div de oscurecimiento es invisible */
  transition: opacity 0.3s ease; /* Agrega una transición para suavizar el efecto */
}

.image:hover::before {
  cursor: pointer;
  opacity: 1; /* Al pasar el mouse sobre el contenedor, se muestra el div de oscurecimiento */
}
.image img{
  padding: 0;
  height: 175px;
  transition: .5s;
}
.image-darken {
  width: 100%;
  height: auto;
  display: block;
  transition: filter 0.3s ease; /* Agrega una transición para suavizar el efecto */
}

/* Estilos para el modal */
.modal {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 9999;
  justify-content: center;
  align-items: center;
}

.modal img {
  max-height: 80%;
  width: 50%;
  cursor: pointer;
}

.modal .close {
  color: #fff;
  font-size: 24px;
  position: absolute;
  top: 20px;
  right: 30px;
  cursor: pointer;
}
.cont-tags{
  display: block;
}
.modal .span-tag{
  background-color: white;
  border-radius: 1em;
  display: block;
  color: black;
  font-size: 1.2em;
  margin: 2em 4em;
  padding: 1em 2em;
}
/* Estilos para el botón de cierre */
.close:hover {
  color: #ccc;
}
.arrow {
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 24px;
  color: #fff;
}

.left-arrow {
  left: 10px;
}

.right-arrow {
  right: 10px;
}
</style>