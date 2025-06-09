<template>
  <div class="p-0"> <!-- Was .animate. Tailwind animations can be added later if needed. -->
    <h3 v-if="imagenes.length > 0" class="text-2xl font-semibold text-textPrimary text-center my-6">
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
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
        <!-- Close Button -->
        <button @click="hideImageFullScreen" class="absolute top-4 right-4 text-white hover:text-neutral-300 transition-colors z-50">
          <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Previous Image Button -->
        <button @click="showPreviousImage" class="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full transition-colors focus:outline-none">
          <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Image and Tags Container -->
        <div class="flex flex-col md:flex-row items-center justify-center max-w-screen-xl w-full max-h-full">
          <img
            :key="currentImage"
            :src="currentImage"
            alt="Full screen image"
            class="max-w-[70vw] max-h-[80vh] object-contain rounded-md shadow-xl"
          />

          <!-- Tags Section -->
          <div class="md:ml-6 mt-4 md:mt-0 p-4 bg-neutral-800 bg-opacity-70 rounded-lg shadow-xl text-white max-w-xs w-full overflow-y-auto max-h-[80vh]">
            <h4 class="text-lg font-semibold mb-3 border-b border-neutral-600 pb-2">Image Tags</h4>

            <div v-if="!addTags" class="mb-3 space-y-2 min-h-[50px]"> <!-- min-h for consistent size -->
              <div v-if="imageTags.length === 0" class="text-sm text-neutral-300 italic">No tags yet.</div>
              <span v-for="tag in imageTags" :key="tag" class="inline-block bg-secondary text-white text-xs font-semibold mr-2 mb-2 px-2.5 py-1 rounded-full">
                {{ tag }}
              </span>
            </div>
            <div v-else class="space-y-2 mb-3">
              <input
                v-for="(tagInput, i) in newTags"
                :key="i"
                type="text"
                v-model="newTags[i]"
                placeholder="Enter tag"
                class="w-full p-2 bg-neutral-700 border border-neutral-600 rounded-md text-sm focus:ring-primary focus:border-primary"
              />
              <!-- Add button to allow adding more than 3 tag inputs if desired -->
            </div>

            <div class="space-y-3 pt-3 border-t border-neutral-600">
              <button v-if="!addTags" @click="editTags" class="w-full bg-info hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors">
                Edit Tags
              </button>
              <button v-if="addTags" @click="saveTags" class="w-full bg-success hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors">
                Save Tags
              </button>
              <button @click="deletePhoto" class="w-full bg-danger hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors">
                Delete Photo
              </button>
            </div>
          </div>
        </div>

        <!-- Next Image Button -->
        <button @click="showNextImage" class="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full transition-colors focus:outline-none">
          <svg class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
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

</script>

<style scoped>
/* All old scoped styles are removed. Tailwind utility classes are used directly in the template. */
/* Any component-specific style that is extremely difficult or verbose to do with Tailwind
   could be an exception, but the goal is to minimize or eliminate scoped CSS here. */
</style>
