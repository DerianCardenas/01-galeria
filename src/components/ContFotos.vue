<template>

    <div class="cont-fotos">
        <div class="image" v-for="(image, index) in imagenes" @click="showImageFullScreen(index)">
          <img :src="image" alt="" class="image-darken" >
        </div>
      </div>
</template>
<script setup>
// Props definition remains the same
const props = defineProps({
    imagenes:{
        type:Array,
        required:true,
    },
    showImageFullScreen:{
        type:Function,
        required:true,
    }
})
</script>
<style scoped>
.cont-fotos {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Replaces margin on individual items for better spacing */
  padding: 10px; /* Padding around the container */
  justify-content: center; /* Center images if they don't fill the row */
}

.image {
  position: relative;
  overflow: hidden; /* Ensures border-radius clips the ::before pseudo-element */
  border-radius: 8px; /* Rounded corners for the image container */
  box-shadow: 0 4px 6px rgba(0,0,0,0.1); /* Subtle shadow for depth */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 180px; /* Fixed height for uniformity */
  width: auto; /* Adjust width automatically based on image aspect ratio or fixed width */
  /* For a more masonry-like effect, width could be set and height auto,
     but that requires more complex layout or JS. Fixed height is simpler for now. */
  background-color: var(--secondary-color); /* Placeholder bg for images */
}

.image:hover {
  transform: translateY(-2px) scale(1.02); /* Lift and slightly enlarge */
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.image::before {
  content: ""; /* Consider adding an icon here, like a magnifying glass */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4); /* Slightly less dark overlay */
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Example for adding an icon using pseudo-elements (FontAwesome example)
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: "\f00e"; /* fa-search icon
  color: var(--text-light-color);
  font-size: 2rem;
  */
}

.image:hover::before {
  cursor: pointer;
  opacity: 1;
}

.image img { /* Class .image-darken is on the img tag */
  display: block; /* Remove extra space below image */
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures image covers the area, might crop */
  border-radius: 8px; /* Match parent's border-radius */
  transition: transform 0.5s ease; /* Smoother/longer image zoom transition */
}

.image:hover img {
  transform: scale(1.1); /* Zoom effect on image inside */
}

/* Removed all modal, scrollbar, .fas, .index styles as they are not used
   or are handled by HomeView.vue or globally. */
</style>