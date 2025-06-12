<template>
  <aside class="w-64 bg-neutral-100 text-neutral-800 p-6 shadow-md space-y-4">
    <h2 class="text-xl font-semibold text-textPrimary border-b border-neutral-300 pb-3">Menu</h2>

    <nav class="space-y-2">
      <router-link
        v-for="item in navigationItems"
        :key="item.name"
        :to="item.path"
        class="flex items-center py-2.5 px-4 rounded-lg transition-colors duration-200 ease-in-out"
        :class="isActive(item.path) ?
          'bg-neutral-200 text-textPrimary shadow-sm' : /* Active: Light gray bg, Dark text */
          'text-secondary hover:bg-neutral-100 hover:text-primary font-medium'  /* Default: Secondary text (teal), Hover: Primary text (blue) on lighter gray bg */
        "
      >
        <component :is="item.icon" class="h-5 w-5 mr-3" />
        <span>{{ item.name }}</span>
      </router-link>
    </nav>

    <div class="pt-4 border-t border-neutral-300 space-y-2">
      <h3 class="px-4 text-sm font-semibold text-neutral-500 uppercase tracking-wider">
        Library
      </h3>
      <router-link
        v-for="item in libraryItems"
        :key="item.name"
        :to="item.path"
        class="flex items-center py-2.5 px-4 rounded-lg transition-colors duration-200 ease-in-out"
        :class="isActive(item.path) ?
          'bg-neutral-200 text-textPrimary shadow-sm' : /* Active: Light gray bg, Dark text */
          'text-secondary hover:bg-neutral-100 hover:text-primary font-medium'  /* Default: Secondary text (teal), Hover: Primary text (blue) on lighter gray bg */
        "
      >
        <component :is="item.icon" class="h-5 w-5 mr-3" />
        <span>{{ item.name }}</span>
      </router-link>
    </div>

    <!-- Placeholder for storage indicator or other widgets -->
    <div class="pt-4 mt-auto">
      <div class="bg-neutral-200 p-3 rounded-lg text-center">
        <p class="text-xs text-neutral-600">Storage Usage (Placeholder)</p>
        <div class="w-full bg-neutral-300 rounded-full h-2.5 mt-1">
          <div class="bg-secondary h-2.5 rounded-full" style="width: 45%"></div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
// Forma correcta de importar (versión 2.x)
import {
  HomeIcon,
  PhotographIcon,
  UploadIcon,
  StarIcon,
  TrashIcon,
  CogIcon,
  ShareIcon
} from '@heroicons/vue/outline'; // Elimina el "24/" de la ruta

const route = useRoute();

const navigationItems = [
  { name: 'Home', path: '/', icon: HomeIcon },
  { name: 'My Photos', path: '/photos', icon: PhotographIcon }, // Assuming '/photos' is the main gallery view
  { name: 'Upload', path: '/upload', icon: UploadIcon },
];

const libraryItems = [
  { name: 'Favorites', path: '/favorites', icon: StarIcon },
  { name: 'Shared', path: '/shared', icon: ShareIcon },
  { name: 'Trash', path: '/trash', icon: TrashIcon },
  { name: 'Settings', path: '/settings', icon: CogIcon },
];

const isActive = (path) => {
  // For "/", check exact match. For others, startsWith is usually fine for parent routes.
  // However, for /photos, if / is also a gallery, this might need refinement.
  // Let's refine for /: exact match. For /photos: startsWith /photos but not something like /photos-archive
  if (path === '/') {
    return route.path === '/';
  }
  // A more specific check for /photos if it's a distinct section
  if (path === '/photos') {
     return route.path === '/photos' || route.path.startsWith('/photos/');
  }
  return route.path.startsWith(path) && route.path !== '/'; // Avoid highlighting everything when on "/"
};
</script>

<style scoped>
/* Scoped styles can be added if specific tweaks are needed beyond Tailwind utilities */
/* For example, if a very specific transition or element style is hard to achieve with utilities alone. */
</style>