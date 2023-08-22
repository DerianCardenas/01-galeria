<template>
    <div class="animate">
        <h3>INFORMACIÓN DEL PERFIL</h3>
        <div class="cont-details">
            <div class="cont-datauser">
                <div class="cont-img">
                    <img :src="imgSrc" class="pfp" alt="">
                </div>
                <div class="cont-info">
                    <div class="row">
                        <label class="label-form" for="">Nombre de Usuario:</label>
                        <input class="input-form" disabled :value="data.username" type="text">
                    </div>
                    <div class="row">
                        <label class="label-form" for="">Contraseña:</label>
                        <div class="cont-password">
                            <input class="input-form" disabled :value="data.password" type="password" id="password">
                            <i id="showPassword" @click="showPassword()" class="fa fa-eye icon-eye"></i>
                        </div>
                    </div>
                    <div class="row">
                        <label class="label-form" for="">Creación de la cuenta:</label>
                        <input class="input-form" disabled :value="data.created_at"  type="text">
                    </div>
                </div>
            </div>
            <div class="cont-btn">
                <button  v-if="!editUser" class="btn-edit" @click="editUser =  true" > EDITAR</button>
                <button  v-if="editUser" class="btn-cancel" @click="editUser =  false" > CANCELAR</button>
            </div>
            <div v-if="editUser" class="cont-changes">
                <h4>Cambiar mis datos</h4>
                <div class="cont-datos">
                    <div class="newImage">    
                        <img :src="newPfp" alt="" srcset=""> <br>
                        <input type="file" @change="handleFileInputChange">
                    </div>
                    <div class="newUserData">
                        <div class="row">
                            <label class="label-form" for="">Nuevo nombre de usuario:</label>
                            <input class="input-form" v-model="newUsername" type="text">
                        </div>
                        <div class="row">
                            <label class="label-form" >Nueva contraseña:</label>
                            <div class="cont-password">
                                <input class="input-form" v-model="newPassword" type="password" id="password2">
                                <i id="showPassword" @click="showPassword2()" class="fa fa-eye icon-eye"></i>
                            </div>
                        </div>
                        <div class="row">
                            <label class="label-form" >Repita la contraseña: <span v-if="newPassword != newPassword2" style="color:red;">Las contraseñas no coinciden</span> </label>
                            <input class="input-form" v-model="newPassword2" type="password">
                        </div>
                        <div class="cont-btn-save">
                            <button v-if="blockSave" class="btn-save" @click="openModal" > GUARDAR</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref, computed} from "vue"
import Swal from 'sweetalert2/dist/sweetalert2'
import {useRouter} from "vue-router"
const router = useRouter();
const editUser = ref(false);
const data = JSON.parse(localStorage.getItem("user"));
const pfp = data.pfp
const imgSrc = ref("");
const newPfp = ref("");
const newUsername = ref("");
const newPassword = ref("");
const newPassword2 = ref("");
const blockSave = computed( () => {
    if(newUsername.value == "" && newPassword.value == "" && newPassword2.value == "" && newPfp.value == "" )
        return true;
    else if(newUsername.value != "" && newPassword2.value != "" && (newUsername.value != newPassword2.value) )
        return true;
    else
        return false;
})
if(pfp == "")
imgSrc.value = "https://thenounproject.com/api/private/icons/4590259/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0"
else
imgSrc.value = pfp


const showPassword = () => {
    const passwordInput = document.getElementById('password');
    if (passwordInput.type == 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
      }
}
const showPassword2 = () => {
    const passwordInput = document.getElementById('password2');
    if (passwordInput.type == 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
      }
}
const  handleFileInputChange =(event)=> {
  const file = event.target.files[0]; // Obtenemos el archivo seleccionado
  if (file) {
    // Verificamos que se haya seleccionado un archivo
    // Puedes realizar aquí validaciones adicionales si lo deseas

    // Mostramos la imagen seleccionada en una vista previa
    const reader = new FileReader();
    reader.onload = () => {
        newPfp.value = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
const openModal = () => {
    Swal.fire({
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutDown'
        },
        title: '¿Deseas actualizar tu información?',
        text: "No podrás deshacer esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, modificarlos',
        cancelButtonText: 'No, mantener datos',
        }).then((result) => {
        if (result.isConfirmed) {
            saveData();
        }
    })
}
const saveData = () => {
        const date = new Date().toLocaleDateString();
        var userEdited ={}
        var userExist = data;
        newUsername.value != "" ? userEdited.username = newUsername.value : userEdited.username = userExist.username 
        if(newPassword.value != "" && newPassword2.value != ""){
            userEdited.password = newPassword.value;
        }else{
            userEdited.password = userExist.password;
        }
        newPfp.value != "" ? userEdited.pfp = newPfp.value : userEdited.pfp = userExist.pfp
        userEdited.imagenes = userExist.imagenes;
        userEdited.detalles = userExist.detalles;
        userEdited.created_at = userExist.created_at;
        userEdited.edited_at = date;
        localStorage.removeItem(userExist.username);
        localStorage.removeItem("user");
        localStorage.setItem(newUsername.value,JSON.stringify(userEdited))
        localStorage.setItem("user",JSON.stringify(userEdited))
        router.push("/inicio");

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
.cont-details{
    width:95%;
}
.cont-datauser{
    display: flex;
    justify-content:space-between;
}
.cont-img{
    width:15%;
    img{
        width:50%;
    }
}
.cont-password{
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
}
.password{
  padding-right: 10px;
}
.icon-eye{
  cursor: pointer;
  margin: .35em .2em;
  position: absolute;
}
.pfp{
    width:100px;
}
.cont-info{
    display: flex;
    justify-content: space-between;
    width:85%;
}
.cont-btn{
    display: flex;
    flex-direction: row-reverse;
    margin-top: 1em;
}
.btn-edit{
    background-color: rgb(96,148,254);
    border-radius: .5em;
    color: white;
    cursor: pointer;
    font-weight: bold;
    padding: .5em 1.5em;
}
.btn-cancel{
    background-color: rgb(88, 90, 93);
    border-radius: .5em;
    color: white;
    cursor: pointer;
    font-weight: bold;
    padding: .5em 1.5em;
}
.row{
    width: 30%;
}
.input-form, .label-form{
    display: block;
    width: 100%;
}
.label-form{
    text-align: left;
    margin-bottom: .5em;
}
.input-form{
    border: 1px solid rgb(100, 100, 100);
    border-radius: .5em;;
    height: 20px;
}
.cont-datos{
    display: flex;
    width: 100%;
}
.newImage{
    display: block;
    width:40%;
    height: 150px;
}
.newImage img{
    max-height: 150px !important;
    max-width: 90% !important;
}
.newUserData{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 60%;
    .row,  .cont-btn-save{
        margin-top: 1em;
        width: 48%;
    }
    .cont-btn-save{
        display: flex;
        flex-direction: row-reverse;
        flex-direction: column-reverse;
        .btn-save{
            background-color: rgb(40, 167, 69);
            border-radius: .5em;
            color: white;
            cursor: pointer;
            font-weight: bold;
            max-height: 100px;
            padding: .75em 1.75em;
        }
    }
}
</style>