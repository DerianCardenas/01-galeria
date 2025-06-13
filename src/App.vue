<template>
  <router-view />
</template>

<script setup>
// No specific script logic or imports are needed here anymore,
// as App.vue now only serves as an entry point for the router's views and layouts.
// Vue Router will handle rendering the correct layout and view components.
// The <router-view> component is globally available when Vue Router is installed.
</script>

<style>
/*
  Remove ALL styles from App.vue (both scoped and non-scoped if any were global).
  Global styles should be in src/style.css (which includes Tailwind).
  Layout-specific styles are now in MainLayout.vue or AuthLayout.vue (ideally as Tailwind utilities).
  The style block can be removed completely if empty, or kept empty like this.
*/

/*
  The old #app styles from the original App.vue <style scoped> like:
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
    text-align: center; // This was often overridden or not desired globally
  }
  are now handled by:
  1. Tailwind's preflight (for resets like margin/padding).
  2. Global styles in src/style.css for fonts, -webkit-font-smoothing, etc. (already set up).
  3. Tailwind utility classes for specific text alignment if needed.
*/
</style>
