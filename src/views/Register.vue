<script setup>
import 'vue3-carousel/dist/carousel.css'
import Swal from 'sweetalert2/dist/sweetalert2'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import {ref} from "vue"
import {useRouter} from "vue-router"
const router = useRouter();
const username = ref("");
const password = ref("");
const slides = ref(["https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg",
    "https://mdbootstrap.com/img/Photos/Slides/img%20(129).jpg",
    "https://wowslider.com/sliders/demo-77/data1/images/field175959_1920.jpg",
    "https://wowslider.com/sliders/demo-93/data1/images/lake.jpg",
    "https://soliloquywp.com/wp-content/uploads/2013/05/action-backlit-beach-1046896-1200x450_c.jpg",
    "https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg"
])
const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
const register = () => {
    const date = new Date().toLocaleDateString();
    const user = {
        username:username.value,
        password:password.value,
        pfp:"",
        imagenes:[],
        detalles:[],
        created_at:date
    }
    if(username.value === ""){
        Toast.fire({
            icon:"warning",
            title:"Introduzca un nombre de usuario"
        })
    }
    else if(password.value === ""){
        Toast.fire({
            icon:"warning",
            title:"Introduzca una contraseña"
        })
    }
    else{
        localStorage.setItem(username.value, JSON.stringify(user))
        localStorage.setItem("user",JSON.stringify(user))
        router.push("/inicio");
    }
}
</script>
<template>
  <div class="flex min-h-screen w-full">
    <!-- Form Section -->
    <div class="w-full md:w-5/12 flex items-center justify-center bg-gray-50 p-8">
      <div class="w-full max-w-md text-center">
        <img class="w-32 h-auto mx-auto my-6 rounded-xl shadow-md" src="../assets/img/galeria.png" alt="Galeria Logo">
        <h1 class="text-3xl font-bold text-gray-800 mb-6">REGISTRA TU CUENTA</h1>

        <div class="my-8">
          <div class="mb-6">
            <label class="block text-gray-600 text-sm font-medium mb-2 text-left w-3/4 mx-auto" for="username">Nombre de Usuario</label>
            <input
                type="text"
                id="username"
                v-model="username"
                class="w-3/4 px-3 py-2 border border-gray-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
          </div>

          <div class="mb-6">
            <label class="block text-gray-600 text-sm font-medium mb-2 text-left w-3/4 mx-auto" for="password">Contraseña</label>
            <input
                type="password"
                id="password"
                v-model="password"
                class="w-3/4 px-3 py-2 border border-gray-200 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
          </div>
        </div>

        <button
            @click="register"
            class="w-3/4 px-4 py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow hover:bg-indigo-600 hover:-translate-y-0.5 hover:shadow-lg transition-all mt-4"
        >
          Registrarse
        </button>

        <p class="text-gray-500 text-sm my-6">¡Almacena todas tus fotos en un solo lugar!</p>
        <p
            class="text-gray-500 text-sm mt-4 cursor-pointer"
            @click="router.push('/login')"
        >
          ¿Ya tienes cuenta? <span class="text-indigo-500 font-semibold underline hover:text-indigo-600">Inicia sesión</span>
        </p>
      </div>
    </div>

    <!-- Carousel Section -->
    <div class="hidden md:block w-7/12 bg-slate-800">
      <carousel
          :autoplay="5000"
          :items-to-show="1"
          :items-to-scroll="1"
          :snap-align="center"
          :wrap-around="true">
        <slide v-for="slide in slides" :key="slide">
          <img class="w-full h-screen object-cover object-center" :src="slide" alt="Gallery preview">
        </slide>
      </carousel>
    </div>
  </div>
</template>