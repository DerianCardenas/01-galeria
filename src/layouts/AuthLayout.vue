<template>

  <main class="w-full">
    <router-view />
  </main>
</template>

<script setup>
// No specific script logic is needed for this simple layout component.
</script>

<style scoped>
/* Scoped styles for AuthLayout if absolutely necessary, though prefer Tailwind utilities. */
/* For example, if a very specific background pattern or effect is desired for auth pages. */
.auth-layout {
  /* Example: if you wanted a specific non-Tailwind background */
  /* background-image: url('/path-to-some-very-light-pattern.png'); */
}
/* Using Tailwind for gradient background directly in the template for simplicity. */
</style>
