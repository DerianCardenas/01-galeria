<template>
  <div class="auth-layout flex items-center justify-center min-h-screen bg-gradient-to-br from-neutral-100 to-neutral-300 p-4">
    <!--
      Removed dark mode classes for now to keep it simple with current palette,
      can be added back if dark mode is configured in Tailwind.
      The classes from-neutral-100 and to-neutral-300 use Tailwind's default gray palette if 'neutral'
      is not extended to cover these shades in our custom palette.
      Our custom 'neutral' palette starts from 100, so this should work.
    -->
    <main class="w-full max-w-md">
      <router-view />
    </main>
  </div>
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
