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
    if(newUsername.value === "" && newPassword.value === "" && newPassword2.value === "" && newPfp.value === "" )
        return false;
    else if((newPassword.value === "" && newPassword2.value !== "") || (newPassword.value !== "" && newPassword2.value === ""))
        return false;
    else if(newPassword.value !== "" && newPassword2.value !== "" && (newPassword.value !== newPassword2.value) )
        return false;
    else
        return true;
})
if(pfp === "")
imgSrc.value = "https://static.vecteezy.com/system/resources/previews/020/911/740/original/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
else
imgSrc.value = pfp


const showPassword = () => {
    const passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
      }
}
const showPassword2 = () => {
    const passwordInput = document.getElementById('password2');
    if (passwordInput.type === 'password') {
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
        newUsername.value !== "" ? userEdited.username = newUsername.value : userEdited.username = userExist.username
        if(newPassword.value !== "" && newPassword2.value !== ""){
            userEdited.password = newPassword.value;
        }else{
            userEdited.password = userExist.password;
        }
        newPfp.value !== "" ? userEdited.pfp = newPfp.value : userEdited.pfp = userExist.pfp
        userEdited.imagenes = userExist.imagenes;
        userEdited.detalles = userExist.detalles;
        userEdited.created_at = userExist.created_at;
        userEdited.edited_at = date;
        try{
            localStorage.setItem(userEdited.username,JSON.stringify(userEdited))
            localStorage.setItem("user",JSON.stringify(userEdited))
                    router.push("/inicio")
        }catch(e){
            Swal.fire({
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutDown'
                },
                title: 'La foto de perfil excede el limite permitido',
                text: "No se pudo actualizar la información",
                icon: 'error',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Reintentar',
                cancelButtonText: 'Cancelars',
                }).then((result) => {
                if (result.isConfirmed) {
                    router.go(0)
                }else{
                    router.push("/inicio")
                }
            })
        }
        

}
</script>
<template>
  <div class="animate-fade-in p-6 bg-white shadow-xl rounded-xl w-4/5 mx-auto mt-10">
    <h3 class="text-2xl font-semibold mb-6">INFORMACIÓN DEL PERFIL</h3>
    <div class="flex flex-col md:flex-row gap-8 items-start">
      <!-- Imagen y botón editar -->
      <div class="flex flex-col items-center md:w-1/4 w-full">
        <img :src="imgSrc" class="w-28 h-28 rounded-full object-cover shadow-md" alt="Perfil">
        <button v-if="!editUser" class="mt-4 bg-blue-500 hover:cursor-pointer hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" @click="editUser = true">
          EDITAR
        </button>
        <button v-if="editUser" class="mt-4 bg-gray-600 hover:cursor-pointer hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded" @click="editUser = false">
          CANCELAR
        </button>
      </div>

      <!-- Datos actuales -->
      <div class="md:w-3/4 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label class="block font-medium mb-1">Nombre de Usuario:</label>
          <input class="w-full px-4 py-2 border rounded bg-gray-100" disabled :value="data.username" type="text">
        </div>
        <div>
          <label class="block font-medium mb-1">Contraseña:</label>
          <div class="relative">
            <input class="w-full px-4 py-2 border rounded bg-gray-100 pr-10" disabled :value="data.password" type="password" id="password">
            <i @click="showPassword()" class="fa fa-eye absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"></i>
          </div>
        </div>
        <div>
          <label class="block font-medium mb-1">Creación de la cuenta:</label>
          <input class="w-full px-4 py-2 border rounded bg-gray-100" disabled :value="data.created_at" type="text">
        </div>
      </div>
    </div>

    <!-- Edición de datos -->
    <div v-if="editUser" class="mt-10 border-t pt-6">
      <h4 class="text-xl font-semibold mb-4">Cambiar mis datos</h4>
      <div class="flex flex-col md:flex-row gap-6">
        <!-- Imagen nueva -->
        <div class="w-full md:w-1/3 text-center">
          <img :src="newPfp" alt="" class="mx-auto h-36 object-cover rounded shadow-md">
          <input type="file" class="mt-4 block w-full text-sm" @change="handleFileInputChange">
        </div>

        <!-- Nuevos datos -->
        <div class="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label class="block font-medium mb-1">Nuevo nombre de usuario:</label>
            <input class="w-full px-4 py-2 border rounded" v-model="newUsername" type="text">
          </div>
          <div>
            <label class="block font-medium mb-1">Nueva contraseña:</label>
            <div class="relative">
              <input class="w-full px-4 py-2 border rounded pr-10" v-model="newPassword" type="password" id="password2">
              <i @click="showPassword2()" class="fa fa-eye absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"></i>
            </div>
          </div>
          <div class="sm:col-span-2">
            <label class="block font-medium mb-1">Repita la contraseña:
              <span v-if="newPassword !== newPassword2" class="text-red-500 text-sm ml-2">Las contraseñas no coinciden</span>
            </label>
            <input class="w-full px-4 py-2 border rounded" v-model="newPassword2" type="password">
          </div>
          <div class="sm:col-span-2 flex justify-end">
            <button v-if="blockSave" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded" @click="openModal">
              GUARDAR
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s ease-in-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>



<style lang="scss">
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
//.cont-details {
//  width: 95%;
//}
//.cont-datauser{
//  display: flex;
//  justify-content:space-between;
//}
//.cont-img{
//  width:15%;
//  img{
//    width:50%;
//  }
//}
//.cont-password{
//  display: flex;
//  flex-direction: row-reverse;
//  width: 100%;
//}
//.password{
//  padding-right: 10px;
//}
//.icon-eye{
//  cursor: pointer;
//  margin: .35em .2em;
//  position: absolute;
//}
.pfp{
  width:100px;
}
//.cont-info{
//  display: flex;
//  justify-content: space-between;
//  width:85%;
//}
//.cont-btn{
//  display: flex;
//  flex-direction: row-reverse;
//  margin-top: 1em;
//}
//.btn-edit{
//  background-color: rgb(96,148,254);
//  border-radius: .5em;
//  color: white;
//  cursor: pointer;
//  font-weight: bold;
//  padding: .5em 1.5em;
//}
//.btn-cancel{
//  background-color: rgb(88, 90, 93);
//  border-radius: .5em;
//  color: white;
//  cursor: pointer;
//  font-weight: bold;
//  padding: .5em 1.5em;
//}
//.row{
//  width: 30%;
//}
//.input-form, .label-form{
//  display: block;
//  width: 100%;
//}
//.label-form{
//  text-align: left;
//  margin-bottom: .5em;
//}
//.input-form{
//  border: 1px solid rgb(100, 100, 100);
//  border-radius: .5em;;
//  height: 20px;
//}
//.cont-datos{
//  display: flex;
//  width: 100%;
//}
//.newImage {
//  display: block;
//  width: 40%;
//  height: 150px;
//}
//.newImage img {
//   max-height: 150px !important;
//   max-width: 90% !important;
// }
//.newUserData {
//  display: flex;
//  justify-content: space-between;
//  flex-wrap: wrap;
//  width: 60%;
//
//  .row, .cont-btn-save {
//    margin-top: 1em;
//    width: 48%;
//  }
//
//  .cont-btn-save {
//    display: flex;
//    flex-direction: row-reverse;
//    flex-direction: column-reverse;
//
//    .btn-save {
//      background-color: rgb(40, 167, 69);
//      border-radius: .5em;
//      color: white;
//      cursor: pointer;
//      font-weight: bold;
//      max-height: 100px;
//      padding: .75em 1.75em;
//    }
//  }
//}
</style>
