<template>
  <div class="animate-fade-in">
    <div class="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h3 class="text-2xl font-bold text-gray-800 mb-6">INFORMACIÓN DEL PERFIL</h3>

      <div class="space-y-6">
        <div class="flex flex-col md:flex-row gap-6">
          <div class="w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
            <img :src="imgSrc" class="w-full h-full object-cover rounded-full border-4 border-blue-100" alt="Profile">
          </div>

          <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-600">Nombre de Usuario:</label>
              <input class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                     disabled :value="data.username" type="text">
            </div>

            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-600">Contraseña:</label>
              <div class="relative">
                <input class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                       disabled :value="data.password" :type="showPass1 ? 'text' : 'password'" id="password">
                <button @click="showPass1 = !showPass1" class="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700">
                  <i :class="showPass1 ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
                </button>
              </div>
            </div>

            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-600">Creación de la cuenta:</label>
              <input class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                     disabled :value="data.created_at" type="text">
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button v-if="!editUser" @click="editUser = true"
                  class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            EDITAR
          </button>
          <button v-if="editUser" @click="editUser = false"
                  class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition">
            CANCELAR
          </button>
        </div>

        <div v-if="editUser" class="border-t pt-6 mt-6">
          <h4 class="text-lg font-semibold text-gray-700 mb-4">Cambiar mis datos</h4>

          <div class="flex flex-col md:flex-row gap-6">
            <div class="w-full md:w-1/3">
              <div class="mb-4">
                <img :src="newPfp" class="w-full max-h-48 object-contain rounded-lg border" alt="New Profile">
              </div>
              <label class="block w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-md cursor-pointer text-center hover:bg-blue-100 transition">
                Seleccionar imagen
                <input type="file" @change="handleFileInputChange" class="hidden">
              </label>
            </div>

            <div class="w-full md:w-2/3 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Nuevo nombre de usuario:</label>
                <input v-model="newUsername"
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Nueva contraseña:</label>
                <div class="relative">
                  <input v-model="newPassword" :type="showPass2 ? 'text' : 'password'" id="password2"
                         class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                  <button @click="showPass2 = !showPass2" class="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700">
                    <i :class="showPass2 ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Repita la contraseña:</label>
                <input v-model="newPassword2" type="password"
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <p v-if="newPassword !== newPassword2" class="text-sm text-red-500 mt-1">Las contraseñas no coinciden</p>
              </div>

              <div class="flex justify-end pt-2">
                <button v-if="blockSave" @click="openModal"
                        class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                  GUARDAR CAMBIOS
                </button>
              </div>
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
<style>
.animate-fade-in {
  animation: fadeIn 0.75s cubic-bezier(.26,.53,.74,1.48) 0.5s backwards;
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* Smooth transitions for interactive elements */
button, input[type="file"] {
  transition: all 0.2s ease;
}

/* Custom focus styles */
input:focus, button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); /* This replaces ring-blue-500 */
}
</style>