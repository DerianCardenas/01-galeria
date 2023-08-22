<template>
    <div class="animate">
        BUSCAR IMAGENES
        <div class="cont-search">
            <input class="busqueda" type="text" name="busqueda" id="busqueda" placeholder="Buscar imagenes por categoria" v-model="filter">
            <div class="btn-search">
                <i class="fas fa-search"></i>
            </div>
        </div>
        <ContFotos :showImageFullScreen="showImageFullScreen" :imagenes="newImagenes"/>
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
            </div>
            <div class="arrow right-arrow" @click="showNextImage">
              <i class="fa-solid fa-arrow-right"></i></div>
          </div>
    </div>
</template>
<script setup>
import { ref, computed , watch} from 'vue';
import ContFotos from '../components/ContFotos.vue';
const filter = ref("");
const showModal = ref(false);
const currentImage = ref('');
const currentImageIndex = ref(0);
const imageTags = ref([]);
const currentImageSrc = computed(() => imagenes[currentImageIndex.value]);
const user = JSON.parse(localStorage.getItem("user"))
const imagenes = user.imagenes
const imgDetails = user.detalles
const newImagenes = ref(imagenes);
const newImagenesDetalles = ref(imgDetails)
function showNextImage() {
  currentImageIndex.value = (currentImageIndex.value + 1) % newImagenes.value.length;
  imageTags.value = newImagenesDetalles.value[currentImageIndex.value].tags
  currentImage.value = newImagenes.value[currentImageIndex.value];
}
function showPreviousImage() {
  currentImageIndex.value = (currentImageIndex.value - 1 + newImagenes.value.length) % newImagenes.value.length;
  imageTags.value = newImagenesDetalles.value[currentImageIndex.value].tags
  currentImage.value = newImagenes.value[currentImageIndex.value];
}
const showImageFullScreen = (index) => {
  currentImage.value = newImagenes.value[index];
  currentImageIndex.value = index;
  showModal.value = true;
  imageTags.value = newImagenesDetalles.value[index].tags
  document.body.style.overflow = 'hidden';
};
const hideImageFullScreen = () => {
  showModal.value = false;
  document.body.style.overflow = 'auto';
};
watch(filter,(value)=>{
    var newImages = [];
    var newDetails = []
    imgDetails.map((el, index)=>{
        var found = false;
        el.tags.map(tag=>{
            if(tag.toString().toLowerCase().includes(value.toString().toLowerCase())){
                found = true;
            }
        })
        if(found){
            newImages.push(imagenes[index])
            newDetails.push(imgDetails[index])
        }
    })
    newImagenes.value = newImages;
    newImagenesDetalles.value = newDetails;
})
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
.cont-search{
    display:flex;
    margin: 1em auto;
    width:95%;
    .busqueda{
        border: 1px solid rgb(107, 107, 107);
        border-radius: 1em;
        color: rgba(96,148,254,255);
        height: 2em;
        margin: 0 auto;
        width:100%;
        padding-left: 3em;
    }
    .btn-search{
        display: flex;
        position: absolute;
        margin-left: 1em;
    }
    .fas{
        margin: 50% 0;
    }
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
</style>