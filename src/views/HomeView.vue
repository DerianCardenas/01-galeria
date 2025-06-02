
<template>
  <Transition>
    <div class="animate">
      <h3 v-if="imagenes.length > 0">MIS FOTOS</h3>
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
              <span @click="editTags" class="edit-tags span-tag">
                EDITAR ETIQUETAS
                <i class="fa-solid fa-edit" ></i>
              </span>
              
              <div v-if="!addTags">
                <span class="span-tag" v-for="tags in imageTags">
                  {{ tags }}
                  <i class="fas fa-tag"></i> 
                </span>
              </div>
              <div v-else>
                <span class="span-tag" v-for="(tag, i) in newTags">
                  <input type="text" v-model="newTags[i]">
                  <i class="fas fa-tag"></i> 
                </span>
              </div>
              <span v-if="addTags" @click="saveTags" class="cont-save span-tag">
                GUARDAR ETIQUETAS
                <i class="fas fa-save"></i> 
              </span>
              <span v-else @click="deletePhoto" class="cont-delete span-tag">
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
import { useRouter } from "vue-router";
import ContFotos from '../components/ContFotos.vue';
import { usePhotoGallery } from '../composables/usePhotoGallery';

const router = useRouter();
const user = JSON.parse(localStorage.getItem("user"));

// Ensure user and its properties exist and have default values if not
const initialImagenes = user?.imagenes || [];
const initialImgDetails = user?.detalles || [];

const {
  showModal,
  currentImage,
  currentImageIndex,
  imagenes,
  imgDetails,
  imageTags,
  addTags,
  newTags,
  showNextImage,
  showPreviousImage,
  showImageFullScreen,
  hideImageFullScreen,
  editTags,
  saveTags,
  deletePhoto,
} = usePhotoGallery(initialImagenes, initialImgDetails, router);

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
  overflow-y: auto; /* Changed from scroll to auto for better behavior */
  max-width: 100%;
  padding-right: 5px; /* Add some padding so scrollbar doesn't overlay content */
}
/* Modern Scrollbar Styles */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
::-webkit-scrollbar-track {
  background: var(--secondary-color);
  border-radius: 5px;
}
::-webkit-scrollbar-thumb {
  background-color: var(--primary-color);
  border-radius: 5px;
  border: 2px solid var(--secondary-color); /* Creates padding around thumb */
}
::-webkit-scrollbar-thumb:hover {
  background-color: #4a7bdc; /* Darker primary */
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
.edit-icon{
  margin-top:0;
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
  cursor: default; /* Default cursor, image itself is not interactive beyond viewing */
  border-radius: 4px; /* Subtle rounding */
}

.modal .close {
  color: var(--text-light-color);
  font-size: 30px; /* Slightly larger for easier clicking */
  position: absolute;
  top: 15px; /* Adjust position */
  right: 25px;
  cursor: pointer;
  transition: color 0.3s ease;
}
.modal .close:hover {
  color: var(--border-color); /* Lighter hover for close */
}

.cont-tags{
  display: flex; /* Use flex for better alignment of children */
  flex-direction: column;
  align-items: center; /* Center tags and action buttons */
  padding: 10px;
  margin-left: 20px; /* Space from the image */
  max-width: 250px; /* Max width for tag container */
  overflow-y: auto; /* Scroll if many tags */
}

/* Base style for all tags/action items in the modal */
.modal .span-tag {
  background-color: var(--secondary-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 8px; /* Consistent rounded corners */
  display: block; /* Or inline-block if they should flow */
  font-size: 0.9rem; /* Adjusted font size */
  margin: 0.5em 0; /* Vertical margin, horizontal handled by container */
  padding: 0.8em 1.2em;
  width: 100%; /* Make them full width of their container */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
  text-align: center;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;
}

/* Input fields within tags */
.modal .span-tag input[type="text"] {
  background-color: var(--text-light-color);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 8px 10px;
  width: calc(100% - 20px); /* Adjust width considering padding */
  margin-top: 5px;
  font-family: var(--font-text);
}

.arrow {
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 45px; /* Slightly smaller */
  height: 45px;
  background-color: rgba(0, 0, 0, 0.3); /* Darker, less obtrusive */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 20px; /* Adjusted icon size */
  color: var(--text-light-color);
  transition: background-color 0.3s ease;
}
.arrow:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.left-arrow {
  left: 20px; /* More spacing from edge */
}

.right-arrow {
  right: 20px; /* More spacing from edge */
}

/* Specific hover effects for action tags, inherits .span-tag base */
.cont-delete.span-tag:hover { /* Make selector more specific */
  background-color: var(--danger-color);
  color: var(--text-light-color);
  border-color: var(--danger-color);
  transform: scale(1.03); /* Slight scale effect */
}
.cont-save.span-tag:hover {
  background-color: var(--success-color);
  color: var(--text-light-color);
  border-color: var(--success-color);
  transform: scale(1.03);
}
.edit-tags.span-tag:hover {
  background-color: var(--info-color);
  color: var(--text-light-color);
  border-color: var(--info-color);
  transform: scale(1.03);
}

/* Ensure .span-tag for non-interactive tag display also looks good */
.span-tag:not(.cont-delete):not(.cont-save):not(.edit-tags) {
  /* Styles for plain tags if different from action tags base */
  background-color: var(--secondary-color);
  color: var(--text-color);
  cursor: default;
}

/* Remove redundant .span-tag styling at the end if covered by .modal .span-tag */
/* The last .span-tag rule was too generic. Handled above. */
</style>
