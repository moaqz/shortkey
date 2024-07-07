<script setup lang="ts">
import { FOOTER_LINKS, SOCIAL_LINKS } from "~/constants";
</script>

<template>
  <footer class="py-5 flex flex-col sm:flex-row items-center justify-between gap-y-2">
    <p class="order-last sm:order-first text-neutral-400">
      Made by
      <NuxtLink :to="SOCIAL_LINKS.github" target="_blank" external class="text-peach hover:underline">
        moaqz
      </NuxtLink>
    </p>

    <ul class="flex items-center justify-center flex-wrap gap-x-5 gap-y-2">
      <li v-for="link in FOOTER_LINKS" :key="link.name">
        <NuxtLink
          :to="link.path" :target="link.external ? '_blank' : undefined" :external="link.external"
          class="text-neutral-400 hover:text-peach transition-colors hover:underline"
        >
          {{ link.name }}
        </NuxtLink>
      </li>
    </ul>
  </footer>
</template>
