<template>
  <div class="p-0"> <!-- Was .animate. Tailwind animations can be added later if needed. -->
    <h3 v-if="imagenes.length > 0" class="text-3xl font-semibold text-textPrimary text-center my-6">
      My Photos
    </h3>
    
    <div v-if="imagenes.length > 0" class="relative"> <!-- Was .index. Max height and scroll handled by main layout -->
      <ContFotos :imagenes="imagenes" :showImageFullScreen="showImageFullScreen" />
    </div>
    <div v-else class="text-center py-20">
      <h2 class="text-2xl font-semibold text-textSecondary">No images yet!</h2>
      <router-link
        to="/upload"
        class="mt-6 inline-block bg-primary text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-opacity-90 transition-colors"
      >
        Upload Your First Photo
      </router-link>
    </div>

    <!-- Modal for full-screen image view -->
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div class="modal fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4" v-if="showModal" @click.self="hideImageFullScreen">
        <!-- Close Button -->
        <span class="close absolute top-4 right-6 text-white text-4xl cursor-pointer hover:text-neutral-300" @click="hideImageFullScreen">&times;</span>

        <!-- Modal Content Wrapper -->
        <div class="modal-content-wrapper flex items-center justify-center w-8/9 max-h-[95vh] bg-neutral-800 bg-opacity-0 rounded-lg relative">

          <!-- Image Display Area -->
          <div class="image-display-area w-2/3 flex items-center justify-center overflow-hidden p-2 sm:p-4">
            <img
              :key="currentImage"
              :src="currentImage"
              alt="Full screen image"
              class="block max-h-[calc(90vh-120px)] max-w-full object-contain rounded-md shadow-lg"
              @load="onModalImageLoad"
              @error="onModalImageError"
            />
            <!-- 120px is an estimate for arrows + tags area height -->
          </div>

          <!-- Tags Display Area -->
          <div class="tags-display-area w-1/3 sm:w-auto flex-shrink-0 p-3 sm:p-4 space-y-3 mx-auto
          overflow-y-auto bg-neutral-900 bg-opacity-70 rounded-b-lg sm:rounded-lg sm:mt-2">
            <!-- Edit Tags Button / View Tags -->
            <div v-if="!addTags" class="flex w-full items-center space-y-2">
              <button @click="editTags" class="bg-info hover:bg-opacity-80 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors">
                <i class="fas fa-edit mr-2"></i>EDITAR ETIQUETAS
              </button>
              <div v-if="imageTags && imageTags.length > 0" class="flex flex-wrap justify-center gap-2">
                <span v-for="tag in imageTags" :key="tag" class="span-tag bg-neutral-700 text-white px-3 py-1 rounded-full text-xs">
                  <i class="fas fa-tag mr-1"></i>{{ tag }}
                </span>
              </div>
              <p v-else class="text-neutral-400 text-xs italic">No tags yet.</p>
            </div>

            <!-- Add/Edit Tags Form -->
            <div v-else class="gap-3 w-1/2 mx-auto">
              <div class="flex flex-wrap justify-center gap-2 sm:w-auto">
                <input
                  v-for="(tagInput, i) in newTags"
                  :key="i"
                  type="text"
                  v-model="newTags[i]"
                  placeholder="Tag..."
                  class="bg-neutral-700 border border-neutral-600 text-white text-sm rounded-md p-2 focus:ring-primary focus:border-primary w-1/2 sm:w-auto"
                />
              </div>
              <button @click="saveTags" class="bg-green-500 p-3 hover:bg-opacity-80 text-white mt-8 mx-auto rounded-md
                    text-sm font-medium transition-colors cursor-pointer flex">
                <i class="fas fa-save mr-2"></i>GUARDAR ETIQUETAS
              </button>
            </div>

            <!-- Delete Photo Button (always available or only when not editing tags) -->
            <button v-if="!addTags" @click="deletePhoto" class="block mx-auto mt-2 bg-danger hover:bg-opacity-80 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors">
              <i class="fas fa-trash mr-2"></i>ELIMINAR FOTO
            </button>
          </div>
        </div>

        <!-- Navigation Arrows -->
        <div @click="showPreviousImage" class="arrow left-arrow absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-3 rounded-full cursor-pointer hover:bg-opacity-50 transition-all">
          <i class="fa-solid fa-arrow-left text-xl"></i>
        </div>
        <div @click="showNextImage" class="arrow right-arrow absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-3 rounded-full cursor-pointer hover:bg-opacity-50 transition-all">
          <i class="fa-solid fa-arrow-right text-xl"></i>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { watchEffect } from 'vue'; // Import watchEffect
import ContFotos from '../components/ContFotos.vue';
import { usePhotoGallery } from '../composables/usePhotoGallery';

const router = useRouter();
const user = JSON.parse(localStorage.getItem("user"));

// Ensure user and its properties exist and have default values if not
const initialImagenes = user?.imagenes || [];
const initialImgDetails = user?.detalles || [];

const {
  showModal,
  currentImage,
  currentImageIndex,
  imagenes,
  imgDetails,
  imageTags,
  addTags,
  newTags, // This is expected to be an array by usePhotoGallery for tag editing inputs
  showNextImage,
  showPreviousImage,
  showImageFullScreen,
  hideImageFullScreen,
  editTags,
  saveTags,
  deletePhoto,
} = usePhotoGallery(initialImagenes, initialImgDetails, router);

const onModalImageLoad = (event) => {
  console.log('[HomeView Modal] Image loaded successfully:', event.target.src);
};

const onModalImageError = (event) => {
  console.error('[HomeView Modal] Image failed to load:', event.target.src);
};

watchEffect(() => {
  if (showModal.value) { // Only log when modal is supposed to be open
    console.log('[HomeView watchEffect] currentImage for modal:', currentImage.value);
  }
});
</script>

<style scoped>
</style>
