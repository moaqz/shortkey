<script setup lang="ts">
import { FOOTER_LINKS, SOCIAL_LINKS } from "~/constants";
</script>

<template>
  <footer class="flex flex-col items-center justify-between gap-y-2 py-5 sm:flex-row">
    <p class="text-neutral-400 order-last sm:order-first">
      Made by
      <NuxtLink :to="SOCIAL_LINKS.github" target="_blank" external class="text-peach hover:underline">
        moaqz
      </NuxtLink>
    </p>

    <ul class="flex items-center justify-center gap-y-2 flex-wrap gap-x-5">
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
