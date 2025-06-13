<template>
  <div class="flex flex-col h-screen bg-background"> <!-- bg-background from palette -->
    <Topbar />
    <div class="flex flex-1 overflow-hidden">
      <Sidebar />
      <main class="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-gallery-bg"> <!-- bg-gallery-bg from palette -->
        <RouterView :key="$route.fullPath" />
      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Topbar from '../components/Topbar.vue'; // Adjusted path as layouts is in src/layouts/
import Sidebar from '../components/Sidebar.vue'; // Adjusted path
</script>

<style scoped>
/*
  Any scoped styles that were in App.vue and are specific to this main layout
  can be moved here. However, ideally, most styling is achieved via Tailwind utilities
  in the template or global styles in style.css.
  The original App.vue <style scoped> was already emptied in a previous step.
*/
</style>
