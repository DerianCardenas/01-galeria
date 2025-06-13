<template>
  <nav class="bg-primary text-white shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo / App Title -->
        <div class="flex-shrink-0">
          <router-link to="/" class="text-2xl font-bold hover:text-accent transition-colors">
            PhotoGallery
          </router-link>
        </div>

        <!-- Search Bar -->
        <div class="flex-1 max-w-xl px-4">
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-neutral-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </span>
            <input
              type="search"
              placeholder="Search photos by tags..."
              class="w-full py-2 pl-10 pr-4 text-sm text-textPrimary bg-neutral-100 border border-neutral-300 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              v-model="searchQuery"
              @keyup.enter="performSearch"
            />
          </div>
        </div>

        <!-- User Profile Area -->
        <div class="flex items-center space-x-4">
          <button @click="toggleUploadModal" class="p-2 rounded-full bg-black cursor-pointer hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white" title="Upload Photo">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </button>
          <div class="relative">
            <button @click="toggleProfileDropdown" class="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-white">
              <span class="sr-only">Open user menu</span>
              <img
                class="h-10 w-10 rounded-full object-cover border-2 border-white"
                :src="imgSrc"
                alt="User profile"
              />
            </button>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div v-if="isProfileDropdownOpen" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                <router-link to="/profile" class="block px-4 py-2 text-sm text-black hover:bg-gray-800 hover:text-white focus:outline-none focus:bg-neutral-100 focus:text-black">Your Profile</router-link>
                <router-link to="/settings" class="block px-4 py-2 text-sm text-black hover:bg-gray-800 hover:text-white focus:outline-none focus:bg-neutral-100 focus:text-black">Settings</router-link>
                <button @click="logout" class="w-full text-left block px-4 py-2 text-sm text-black hover:bg-gray-800 hover:text-white focus:outline-none focus:bg-neutral-100 focus:text-black cursor-pointer">
                  Sign out
                </button>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <!-- TODO: Implement Upload Modal if toggleUploadModal is to be functional -->
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const data = JSON.parse(localStorage.getItem("user")) || { username: 'Guest', password: '', pfp: '', created_at: 'N/A', imagenes: [], detalles: [] }; // Fallback for data

const defaultPfp = "https://static.vecteezy.com/system/resources/previews/020/911/740/original/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png";
const imgSrc = ref(data.pfp || defaultPfp);
const router = useRouter();
const searchQuery = ref('');
const isProfileDropdownOpen = ref(false);

const performSearch = () => {
  if (searchQuery.value.trim()) {
    // Navigate to a search results page or emit an event
    // For now, let's assume a route like /search?q=query
    router.push({ path: '/search', query: { q: searchQuery.value.trim() } });
    searchQuery.value = ''; // Clear search bar after search
  }
};

const toggleProfileDropdown = () => {
  isProfileDropdownOpen.value = !isProfileDropdownOpen.value;
};

const toggleUploadModal = () => {
  // Placeholder for upload modal logic
  // This might involve emitting an event to App.vue or using a global state
  console.log('Toggle upload modal clicked');
   router.push({ path: '/upload'}); // Example navigation
};

const logout = () => {
  console.log('User logout');
  // Implement actual logout logic (e.g., clear localStorage, call API)
  isProfileDropdownOpen.value = false;
  localStorage.removeItem('user'); // Example: clear user from local storage
  router.push({ path: '/login' }); // Redirect to login
};
</script>

<style scoped>
/* Add any specific scoped styles if needed, though prefer Tailwind utilities */
/* Example: Define primary-dark if not in Tailwind config for hover effect */
.hover\:bg-primary-dark:hover {
   background-color: #2563EB; /* Example: a darker shade of blue-500 */
}
</style>
