<template>
  <div class="flex flex-col h-screen bg-background">
    <Topbar /> <!-- Use the Topbar component -->

    <div class="flex flex-1 overflow-hidden">
      <Sidebar /> <!-- Use the Sidebar component -->

      <!-- Main Content Area -->
      <main class="flex-1 p-6 overflow-y-auto bg-gallery-bg">
        <RouterView :key="$route.fullPath" />
      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Topbar from './components/Topbar.vue';
import Sidebar from './components/Sidebar.vue'; // Import Sidebar
</script>

<style scoped>
/* All previous scoped styles are removed as Tailwind CSS is used for layout and styling.
   Any component-specific styles that cannot be achieved with Tailwind alone
   can be added here if necessary, but the goal is to rely on utility classes.
*/

/* Example of a style that might be hard to do with Tailwind utilities directly,
   or if you want to keep some very specific scoped style:
.some-specific-class-in-app-vue {
  font-variant-caps: all-small-caps;
}
*/
</style>
