
<template>
  <Transition>
    <div class="animate">
      <h3>MIS FOTOS</h3>
      <div v-if="imagenes.length > 0" class="index">
        <div>
          <ContFotos :showImageFullScreen="showImageFullScreen" :imagenes="imagenes"/>
          <!-- Modal para mostrar la imagen en pantalla completa -->
          <div class="modal" v-if="showModal">
            <span class="close" @click="hideImageFullScreen">&times;</span>
    
            <div class="arrow left-arrow" @click="showPreviousImage">
              <i class="fa-solid fa-arrow-left"></i>
            </div>
            <img :src="currentImage" alt="">
            <div class="cont-tags">
              <span class="span-tag" v-for="tags in imageTags">
                {{ tags }}
                <i class="fas fa-tag"></i> 
              </span>
              <span @click="deletePhoto" class="cont-delete span-tag">
                ELIMINAR FOTO
                <i class="fas fa-trash"></i> 
              </span>
            </div>
            <div class="arrow right-arrow" @click="showNextImage">
              <i class="fa-solid fa-arrow-right"></i></div>
          </div>
        </div>
      </div>
      <div v-else>
        <h2>AÚN NO TIENES IMAGENES!</h2>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed } from 'vue';
import ContFotos from '../components/ContFotos.vue';
import {useRouter} from "vue-router"
import Swal from 'sweetalert2/dist/sweetalert2'
const router = useRouter();
const showModal = ref(false);
const currentImage = ref('');
const currentImageIndex = ref(0);
const imageTags = ref([]);
const user = JSON.parse(localStorage.getItem("user"))
const imagenes = user.imagenes
const imgDetails = user.detalles
function showNextImage() {
  currentImageIndex.value = (currentImageIndex.value + 1) % imagenes.length;
  imageTags.value = imgDetails[currentImageIndex.value].tags
  currentImage.value = imagenes[currentImageIndex.value];
}

// Función para mostrar la imagen anterior
function showPreviousImage() {
  currentImageIndex.value = (currentImageIndex.value - 1 + imagenes.length) % imagenes.length;
  imageTags.value = imgDetails[currentImageIndex.value].tags
  currentImage.value = imagenes[currentImageIndex.value];
}

// Ruta de la imagen actual
const currentImageSrc = computed(() => imagenes[currentImageIndex.value]);
const showImageFullScreen = (index) => {
  currentImage.value = imagenes[index];
  currentImageIndex.value = index;
  showModal.value = true;
  imageTags.value = imgDetails[index].tags
  document.body.style.overflow = 'hidden';
};

const hideImageFullScreen = () => {
  showModal.value = false;
  document.body.style.overflow = 'auto';
};
const deletePhoto = () => {
  Swal.fire({
      customClass:"swal",
      title: 'Eliminar foto',
      text: "Deseas eliminar la foto?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: '#6094fe',
      confirmButtonColor: '#6094fe',
      confirmButtonText: 'Continuar'
    }).then((result) => {
      if (result.isConfirmed) {
        user.imagenes.splice(currentImageIndex.value, 1);
        user.detalles.splice(currentImageIndex.value, 1);
        localStorage.removeItem(user.username);
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem(user.username,JSON.stringify(user))
        showModal.value = false;
        router.go(0)
      }
    })
}
</script>
<style scoped>
.animate{
  animation-duration: 0.75s;
  animation-duration: .5s;
  animation-delay: 0.5s;
  animation-name: animate-fade;
  animation-timing-function: cubic-bezier(.26,.53,.74,1.48);
  animation-fill-mode: backwards;
}
.animate.fade {
  animation-name: animate-fade;
  animation-timing-function: ease;
}
@keyframes animate-fade {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
.swal{
  z-index:3 ;
}
h3{
  text-align: center;
  width: 100%;
}
.index{

  position: absolute;
  max-height: 85vh;
  scroll-behavior: smooth;
  scrollbar-color: transparent;
  overflow-y: scroll;
  max-width: 100%;
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
  z-index: 2;
  justify-content: center;
  align-items: center;
}

.modal img {
  max-height: 80%;
  max-width: 50%;
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
.cont-delete{
  transition: .5s all ease-out;
}
.cont-delete:hover{
  background-color: red;
  color: white;
  cursor: pointer;
}
</style>
