<template>
  <div class="flex min-h-screen bg-background">
    <!-- Form Section -->
    <div class="w-full md:w-1/2 lg:w-2/5 flex flex-col justify-center items-center p-8 sm:p-12">
      <div class="w-full max-w-md text-center">
        <img class="mx-auto h-20 w-auto rounded-lg shadow-md mb-8" src="../assets/img/galeria.png" alt="Galeria Logo">
        <h1 class="text-3xl font-bold text-textPrimary mb-3">Create Your Account</h1>
        <p class="text-sm text-textSecondary mb-8">Join us and start building your personal photo gallery!</p>

        <form @submit.prevent="performRegister" class="space-y-6">
          <div>
            <label for="username" class="block text-sm font-medium text-textPrimary text-left mb-1">Username</label>
            <input
              type="text"
              id="username"
              v-model="username"
              placeholder="Choose a username"
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
              placeholder="Create a password"
              class="w-full px-4 py-3 border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
              required
            />
          </div>

          <button
            type="submit"
            class="w-full bg-primary text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 transition-all transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        <p class="mt-8 text-sm text-textSecondary">
          Already have an account?
          <router-link to="/login" class="font-semibold text-primary hover:text-opacity-80 cursor-pointer transition-colors">
            Sign In
          </router-link>
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
import 'vue3-carousel/dist/carousel.css'
import Swal from 'sweetalert2/dist/sweetalert2'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel' // Navigation is imported but not used in template
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

const performRegister = () => { // Renamed from 'login' for clarity
    const date = new Date().toLocaleDateString();
    const user = {
        username:username.value,
        password:password.value,
        pfp:"", // Default profile picture placeholder
        imagenes:[],
        detalles:[], // For image tags or other details
        created_at:date
    }
    if(username.value.trim() === ""){
        Toast.fire({
            icon:"warning",
            title:"Please enter a username"
        })
    }else if(password.value === ""){
        Toast.fire({
            icon:"warning",
            title:"Please enter a password"
        })
    }else if (localStorage.getItem(username.value) !== null) { // Check if user already exists
        Toast.fire({
            icon: "error",
            title: "Username already taken. Please choose another."
        });
    }else{
        localStorage.setItem(username.value, JSON.stringify(user)) // Store user by username
        localStorage.setItem("user",JSON.stringify(user)) // Set current user for session
        router.push("/inicio"); // Or your main gallery route e.g., "/" or "/photos"
    }
}
</script>

<style scoped>
/* Scoped styles are largely removed in favor of Tailwind. */
/* The carousel CSS is imported in the script setup. */
</style>