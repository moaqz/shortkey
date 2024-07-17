<script setup lang="ts">
import "@fontsource-variable/inter";
import { Toaster } from "vue-sonner";

useHead({
  link: [
    { rel: "icon", type: "image/svg+xml", href: "/shortkey.svg" },
  ],
});
</script>

<template>
  <div class="bg-neutral-900 text-neutral-50">
    <div class="mx-auto px-4 flex flex-col min-h-dvh max-w-5xl">
      <SiteHeader />
      <main class="flex-1">
        <slot />
      </main>
      <SiteFooter />
    </div>
  </div>
  <Toaster rich-colors />
</template>

<style>
body {
  font-family: "Inter Variable", system-ui, sans-serif;
}
</style>
