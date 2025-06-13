<template>
  <aside class="w-64 bg-gray-800 text-neutral-800 p-6 shadow-md space-y-4">
    <h2 class="text-xl font-semibold text-white border-b border-neutral-300 pb-3">Menu</h2>

    <nav class="space-y-2">
      <router-link
        v-for="item in navigationItems"
        :key="item.name"
        :to="item.path"
        class="flex items-center py-2.5 px-4 rounded-lg transition-colors duration-200 ease-in-out"
        :class="isActive(item.path) ?
          'bg-white text-textPrimary shadow-sm' :
          'bg-gray-700 text-white text-secondary hover:bg-neutral-100 hover:text-black font-medium'
        "
      >
        <component :is="item.icon" class="h-5 w-5 mr-3" />
        <span>{{ item.name }}</span>
      </router-link>
    </nav>

    <div class="pt-4 border-t border-neutral-300 space-y-2">
      <h3 class="px-4 text-sm font-semibold text-white uppercase tracking-wider">
        Library
      </h3>
      <router-link
        v-for="item in libraryItems"
        :key="item.name"
        :to="item.path"
        class="flex items-center py-2.5 px-4 rounded-lg transition-colors duration-200 ease-in-out"
        :class="isActive(item.path) ?
          'bg-white text-textPrimary shadow-sm' :
          'bg-gray-700 text-white text-secondary hover:bg-neutral-100 hover:text-black font-medium'
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
  import {
    HomeIcon, PhotoIcon, ArrowUpTrayIcon, StarIcon, TrashIcon, CogIcon, ShareIcon
  } from '@heroicons/vue/24/outline'; // Using Heroicons (outline style)

const route = useRoute();

const navigationItems = [
  { name: 'Home', path: '/home', icon: HomeIcon }, // Changed path to /home
  { name: 'My Photos', path: '/photos', icon: PhotoIcon }, // Assuming '/photos' is the main gallery view
  { name: 'Upload', path: '/upload', icon: ArrowUpTrayIcon },
];

const libraryItems = [
  { name: 'Favorites', path: '/favorites', icon: StarIcon },
  { name: 'Shared', path: '/shared', icon: ShareIcon },
  { name: 'Trash', path: '/trash', icon: TrashIcon },
  { name: 'Settings', path: '/settings', icon: CogIcon },
];

const isActive = (path) => {
  // For "/home", also consider "/" as active due to redirect.
  // For other paths, ensure it's an exact match or a parent of the current route.
  if (path === '/home') {
    return route.path === '/home' || route.path === '/';
  }
  // Example: if path is '/photos', active for '/photos' and '/photos/subpath'
  // but not for '/photosextra'
  return route.path === path || route.path.startsWith(path + '/');
};
</script>

<style scoped>
/* Scoped styles can be added if specific tweaks are needed beyond Tailwind utilities */
/* For example, if a very specific transition or element style is hard to achieve with utilities alone. */
</style>