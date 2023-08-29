<template>
    <div class="drop-container animate" @drop="handleDrop" @dragover.prevent>
      <p>Arrastra y suelta tus imágenes aquí</p>
      <ul v-if="imagenes.length">
        <li v-for="(imagen, index) in imagenes" :key="index">
          <img :src="imagen" alt="Imagen">
        </li>
      </ul>
    </div>
    <div class="popup" id="popup">
      <h3>Asignar categorías</h3>
        <div class="cont-section">
          
          <div class="cont-imagenes" v-for="(imagen, index) in imagenes" :key="index">
            <div class="cont-data">
              
              <img :src="imagen" alt="Imagen">
              <div class="cont-inputs">
                <input type="text" placeholder="Categoría 1" v-model="tagsImages[index].tags[0]">
                <input type="text" placeholder="Categoría 2" v-model="tagsImages[index].tags[1]">
                <input type="text" placeholder="Categoría 3" v-model="tagsImages[index].tags[2]">
              </div>
            </div>
          </div>
        </div>
        <button @click="closePopup()">Guardar</button>
      </div>
  </template>
  <script setup>
  import { ref, onMounted } from 'vue';
  import {useRouter} from "vue-router";
  import Swal from 'sweetalert2/dist/sweetalert2';

  const router = useRouter();
  const imagenes = ref([]);
  const imagenesAnteriores = ref([]);
  const tagsAnteriores = ref([]);
  const tagsImages = ref([]);
  const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: true,
      timer: 5000,
      
      timerProgressBar: true,
      didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
  })
  // Función para manejar el evento drop
  function handleDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        imagenes.value.push(reader.result);
        tagsImages.value.push({tags:[]});
        imagenesAnteriores.value.push(reader.result)
      };
      reader.readAsDataURL(file);
    }
    setTags()
  }
  function setTags(){
    const popup = document.getElementById('popup');
    tagsImages.value.map(tags => {
        tagsAnteriores.value.push(tags)
    });
    popup.style.display = 'block';
  }
  function closePopup() {
    var breakCondition = false;
    tagsImages.value.map(tags => {
      if(tags.tags.length == 0) breakCondition = true;
    })
    if(!breakCondition){
      const user = JSON.parse(localStorage.getItem("user"))
      user.imagenes = imagenesAnteriores.value;
      user.detalles = tagsImages.value;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem(user.username, JSON.stringify(user));

      imagenes.value = [];
      const popup = document.getElementById('popup');
      popup.style.display = 'none';
      var mensaje =""
      if(imagenes.value.length == 1)
        mensaje="Una foto fue cargada con éxito"
      else if(imagenes.value.length > 1)
        mensaje = "Se cargaron " + imagenes.value.length  + " fotos correctamente"
      Swal.fire({
        title: 'Fotos subidas',
        text:mensaje,
        icon: 'success',
        showCancelButton: true,
        cancelButtonText: "Permanecer aquí",
        confirmButtonColor: '#6094fe',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ir a página principal'
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/inicio")
        }
      })
    }else{
      Toast.fire({
        icon:"error",
        title:"Ingresa al menos una categoría en cada foto"
      })
    }
}
  // Cargar las imágenes desde el localStorage al montar el componente
  onMounted(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    const storedImagenes = user.imagenes
    const storedImagenesTags = user.detalles
    if (storedImagenes && Array.isArray(storedImagenes)) {
        imagenesAnteriores.value = storedImagenes;
        tagsAnteriores.value = storedImagenesTags;
    }
  });
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
  .drop-container {
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
  }
  
  ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  }
  
  li {
    margin: 10px;
  }
  img{
    max-height: 150px;
  }
  .popup {
    border-radius: 1em;
    display: none;
    position: fixed;
    overflow: scroll;
    top: 50%;
    left: 50%;
    height: 80%;
    width: 80%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border: 1px solid #505050;
    z-index: 1;
  }
  
  .popup h3 {
    margin-bottom: 10px;
  }
  
  .popup input {
    display: block;
    margin-bottom: 10px;
  }
  .cont-section{
    display: flex;
    margin: .5em auto;
    justify-content: space-evenly;
    flex-wrap: wrap;
    width: 90%;
  }
  .popup button {
    background-color: #007bff;
    color: #fff;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
  }
  .cont-inputs, .cont-inputs input{
    margin: 1em auto;
  }
  
  </style>
  