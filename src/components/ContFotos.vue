<template>
  <div class="cont-fotos p-2 sm:p-4">
    <div
      v-if="!imagenes || imagenes.length === 0"
      class="w-full text-center py-10"
    >
      <p class="text-xl text-textSecondary">No photos to display.</p>
      <!-- Optional: Link to upload page -->
      <router-link
        to="/upload"
        class="mt-4 inline-block bg-primary text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-opacity-90 transition-colors"
      >
        Upload Photos
      </router-link>
    </div>

    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
      <div
        v-for="(image, index) in imagenes"
        :key="image.id || index"
        @click="showImageFullScreen(index)"
          class="image-container group relative aspect-square overflow-hidden rounded-lg shadow-md cursor-pointer transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 bg-neutral-200"
      >
        <img
          :src="image.src || image"
          :alt="image.alt || 'Gallery image ' + (index + 1)"
          class="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
          @load="onImageLoad"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 ease-in-out flex items-center justify-center">
          <!-- Optional: Show an icon or info on hover -->
          <svg class="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'; // defineEmits is imported but not used in the provided script

const props = defineProps({
  imagenes: {
    type: Array,
    required: true,
    default: () => [] // Ensure it defaults to an empty array if not provided
  },
  showImageFullScreen: { // Explicitly define the prop for clarity and type checking
    type: Function,
    required: true
  }
});

// Define emits if ContFotos needs to communicate back other than through props (not strictly needed for this change)
// const emit = defineEmits(['image-clicked']);

const showImageFullScreen = (index) => {
  // Call the function passed via props
  if (props.showImageFullScreen) { // Check if prop exists (it's required, but good practice)
    props.showImageFullScreen(index);
  } else {
    // This case should ideally not be reached if parent provides the required prop.
    console.warn("showImageFullScreen function not provided to ContFotos component via props.");
  }
};

const onImageLoad = (event) => {
    // Placeholder for any logic needed on image load.
    // event.target.style.opacity = 1; // This line is removed as initial opacity is no longer 0.
};

// Ensure that the `imagenes` prop expects objects with `src` and `alt` or just strings.
// The template uses `image.src || image` to handle both cases.
// It's better if `HomeView` (or `usePhotoGallery`) standardizes the image objects.
// For now, this provides some flexibility.
</script>

<style scoped>
.image-container img {
  /* opacity: 0; */ /* Removed for troubleshooting image visibility */
  /* transition: opacity 0.5s ease-in-out, transform 0.3s ease-in-out; */ /* Transition for opacity also removed */
  transition: transform 0.3s ease-in-out; /* Keep only transform transition if needed */
}
/* Additional styles for loading placeholders or specific aspect ratio handling if needed beyond Tailwind. */
</style>