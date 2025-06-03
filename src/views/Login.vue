<template>
  <div class="flex min-h-screen bg-background">
    <!-- Form Section -->
    <div class="w-full md:w-1/2 lg:w-2/5 flex flex-col justify-center items-center p-8 sm:p-12">
      <div class="w-full max-w-md text-center">
        <img class="mx-auto h-20 w-auto rounded-lg shadow-md mb-8" src="../assets/img/galeria.png" alt="Galeria Logo">
        <h1 class="text-3xl font-bold text-textPrimary mb-3">Sign In</h1>
        <p class="text-sm text-textSecondary mb-8">Welcome back! Please enter your details.</p>

        <form @submit.prevent="login" class="space-y-6">
          <div>
            <label for="username" class="block text-sm font-medium text-textPrimary text-left mb-1">Username</label>
            <input
              type="text"
              id="username"
              v-model="username"
              placeholder="Enter your username"
              class="w-full px-4 py-3 border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
              required
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-textPrimary text-left mb-1">Password</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Enter your password"
              class="w-full px-4 py-3 border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
              required
            />
            <!-- Add forgot password link if needed -->
          </div>

          <button
            type="submit"
            class="w-full bg-primary text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all transform hover:scale-105"
          >
            Sign In
          </button>
        </form>

        <p class="mt-8 text-sm text-textSecondary">
          Don't have an account?
          <span @click="register" class="font-semibold text-primary hover:text-opacity-80 cursor-pointer transition-colors">
            Sign Up
          </span>
        </p>
        <p class="mt-2 text-xs text-textSecondary">
          ¡Almacena todas tus fotos en un solo lugar!
        </p>
      </div>
    </div>

    <!-- Carousel Section - Hidden on smaller screens -->
    <div class="hidden md:block md:w-1/2 lg:w-3/5 bg-neutral-800">
      <carousel
          :autoplay="5000"
          :items-to-show="1"
          :items-to-scroll="1"
          :snap-align="'center'"
          :wrap-around="true"
          class="h-full">
        <slide v-for="slideSrc in slides" :key="slideSrc">
          <img class="w-full h-screen object-cover" :src="slideSrc" alt="Gallery preview">
        </slide>
        <template #addons>
          <Pagination />
        </template>
      </carousel>
    </div>
  </div>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css' // Keep this for carousel base styles
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import {ref} from "vue"
import {useRouter} from "vue-router"
import Swal from 'sweetalert2/dist/sweetalert2'

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
const login = () => {
    if(localStorage.length == 0){ // This logic might need adjustment; localStorage can have other items.
        Toast.fire({
                icon:"error",
                title:"No hay usuarios en el sistema, sea el primero"
            })
    }else{
        // Assuming username is the key for user objects in localStorage
        const userString = localStorage.getItem(username.value);
        if(userString == null) {
            Toast.fire({
                icon:"warning",
                title:"No se encontró el usuario, registrese"
            })
        }else {
            const userExistent = JSON.parse(userString);
            if(userExistent.password == password.value){
                // Set a general 'user' item for the logged-in session
                localStorage.setItem("user", JSON.stringify(userExistent))
                router.push("/inicio"); // Or your main gallery route e.g., "/" or "/photos"
            }else{
                Toast.fire({
                    icon:"error",
                    title:"Contraseña incorrecta"
                })
            }
        }
    }
}
const register = () => {
    router.push('/register')
}
</script>

<style scoped>
/* Scoped styles are largely removed in favor of Tailwind. */
/* The carousel CSS is imported in the script setup. */
/* Any very specific overrides for vue3-carousel that Tailwind can't handle could go here,
   but try to use Tailwind for consistency if possible. */

/* Example: If you need to style pagination dots specifically and it's hard with Tailwind utilities applied directly */
/* :global(.carousel__pagination-button--active) {
  background-color: var(--primary) !important; /* Use your Tailwind primary color */
/* } */
/* :global(.carousel__pagination-button) {
  background-color: var(--neutral-300) !important; /* Use a neutral color */
/* } */
</style>