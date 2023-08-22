<template>
    <div class="cont-login">
        <div class="cont-half">
            <div class="cont-form">
                <h1>INICIA SESIÓN</h1>
                <img class="logo" src="../assets/img/galeria.png" alt="" srcset=""><br>
                <div class="cont-inputs">
                    <label for="username">Nombre de Usuario</label>
                    <input type="text" id="username" v-model="username">
                    <label for="password">Contraseña</label>
                    <input type="password" id="password" v-model="password">
                </div>
                <button @click="login" class="btn">Iniciar sesión</button>
                <h3>¡Almacena todas tus fotos en un solo lugar!</h3>
                <h5 @click="register">REGISTRARSE</h5>
            </div>
        </div>
        <div class="cont-half">
            <carousel class="carousel" 
                :autoplay="5000"
                :items-to-show="1" 
                :items-to-scroll="1" 
                :snap-align="center"
                :wrap-around="true">
                <slide  v-for="slide in slides" :key="slide">
                    <img class="carousel__item" :src="slide" alt="">
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
<style scoped>
h1{
    color: white;
}
.cont-login{
    display:flex;
    max-height: 100vh;
    justify-content:space-between;
    width:100%;
}
.cont-half{
    width: 49%;
    max-height: 100vh;
    display:flex;
}
.cont-form{
    background-color: rgba(96,148,254,255);
    border-radius: 1.5em;
    width:80%;
    margin: auto;
}
.logo{
    border-radius: 1.5em;
    width: 30%;
}
.cont-inputs input, .cont-inputs label{
    display: block;
    margin: .2em auto;
    width: 50%;
}
.cont-inputs input {
    border: 1px solid rgb(187, 187, 187);
    border-radius: .5em;
    height: 20px;
}
.btn{
    background-color:rgba(196,131,255,255);
    border: 1px solid rgb(255, 255, 236);
    border-radius: .5em;
    color: white;
    font-size: 1.3em;
    height: 30px;
    margin-top: 1em;
    transition: .55s all ease-in-out;
    width:50%;
}
h3{
    color: white;
}
h5{
color: black;
text-decoration: underline;
cursor: pointer;
}
.btn:hover{
    background-color: #c8ba42;
    cursor: pointer;
}
.carousel{
    max-width:100%;
}
.carousel__item {
  min-height: 100vh;
  width: 100%;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>