<script setup>
import 'vue3-carousel/dist/carousel.css'
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
    if(localStorage.length == 0){
        Toast.fire({
                icon:"error",
                title:"No hay usuarios en el sistema, sea el primero"
            })
    }else{
        const userExistent = JSON.parse(localStorage.getItem(username.value))
        if(userExistent == null) {
            Toast.fire({
                icon:"warning",
                title:"No se encontró el usuario, registrese"
            })
        }else if(userExistent.password == password.value){
            localStorage.setItem("user", JSON.stringify(userExistent))
            router.push("/inicio");
        }else{
            Toast.fire({
                icon:"error",
                title:"Contraseña incorrecta"
            })
        }
    }
}
const register = () => {
    router.push('/register')
}
</script>
<template>
  <div class="login-container">
    <!-- Login Form Section -->
    <div class="form-section">
      <div class="form-wrapper">
        <h1 class="font-headings">INICIAR SESIÓN</h1>
        <img class="logo" src="../assets/img/galeria.png" alt="Galeria Logo">

        <div class="input-group">
          <label class="font-text" for="username">Nombre de Usuario</label>
          <input type="text" id="username" v-model="username" class="form-input">

          <label class="font-text" for="password">Contraseña</label>
          <div class="password-input">
            <input type="password" id="password" v-model="password" class="form-input">
          </div>
        </div>

        <button @click="login" class="login-button">Iniciar sesión</button>

        <p class="tagline">¡Almacena todas tus fotos en un solo lugar!</p>
        <p class="register-link" @click="register">¿No tienes cuenta? <span>Regístrate</span></p>
      </div>
    </div>

    <!-- Carousel Section -->
    <div class="carousel-section">
      <carousel
          :autoplay="5000"
          :items-to-show="1"
          :items-to-scroll="1"
          :snap-align="center"
          :wrap-around="true">
        <slide v-for="slide in slides" :key="slide">
          <img class="carousel-image" :src="slide" alt="Gallery preview">
        </slide>
        <template #addons>
          <Pagination />
        </template>
      </carousel>
    </div>
  </div>
</template>

<style scoped>
/* Base Styles */
.login-container {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

/* Form Section */
.form-section {
  width: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
  padding: 2rem;
}

.form-wrapper {
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.logo {
  width: 120px;
  height: auto;
  margin: 1.5rem 0;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-title {
  color: #1e293b;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

/* Input Styles */
.input-group {
  margin: 2rem 0;
}

.input-group label {
  display: block;
  text-align: left;
  color: #475569;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  margin-left: 25%;
}

.form-input {
  width: 50%;
  padding: 0.75rem;
  margin-bottom: 1.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: #ffffff;
  transition: all 0.3s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.form-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

/* Button Styles */
.login-button {
  width: 50%;
  padding: 0.75rem;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.login-button:hover {
  background-color: #4f46e5;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

/* Links and Text */
.tagline {
  color: #64748b;
  margin: 1.5rem 0;
  font-size: 0.9rem;
}

.register-link {
  color: #64748b;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 1rem;
}

.register-link span {
  color: #6366f1;
  font-weight: 600;
  text-decoration: underline;
}

.register-link:hover span {
  color: #4f46e5;
}

/* Carousel Section */
.carousel-section {
  width: 55%;
  background-color: #1e293b;
}

.carousel-image {
  width: 100%;
  height: 100vh;
  object-fit: cover;
  object-position: center;
}

/* Responsive Design */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }

  .form-section,
  .carousel-section {
    width: 100%;
  }

  .carousel-image {
    height: 50vh;
  }

  .input-group label,
  .form-input,
  .login-button {
    width: 80%;
    margin-left: 10%;
  }
}
</style>