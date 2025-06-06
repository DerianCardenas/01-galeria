<template>
  <div class="p-6 bg-white shadow-md rounded-lg">
    <h1 class="text-3xl font-bold text-primary mb-4">{{ pageTitle }}</h1>
    <p class="text-textSecondary mb-2">Content for this page is under construction.</p>
    <p v-if="searchQuery" class="text-textSecondary">
      Search query: <span class="font-semibold text-accent">{{ searchQuery }}</span>
    </p>
    <router-link to="/" class="mt-6 inline-block bg-primary text-white py-2 px-4 rounded hover:bg-primary-dark transition-colors">
      Go to Homepage
    </router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const pageTitle = computed(() => {
  // Use route name or try to make a title from path
  if (route.name) {
    return String(route.name);
  }
  const path = route.path.startsWith('/') ? route.path.substring(1) : route.path;
  return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ') || 'Page';
});

const searchQuery = computed(() => route.query.q);
</script>

<style scoped>
/* Example: Define primary-dark if not in Tailwind config and you want a specific hover for the button */
.hover\:bg-primary-dark:hover {
   background-color: #2563EB; /* Example: a darker shade of blue-500 (Tailwind's primary) */
}
</style>
