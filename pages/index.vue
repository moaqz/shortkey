<script lang="ts" setup>
import { SOCIAL_LINKS } from "~/constants";
</script>

<template>
  <div class="flex flex-col gap-y-8 pt-20 md:pt-40">
    <div class="space-y-4">
      <NuxtLink
        :to="SOCIAL_LINKS.github" external
        class="rounded-full bg-peach text-black text-sm font-medium w-fit px-3 py-1"
      >
        Free and open source!
      </NuxtLink>

      <h1 class="font-bold text-balance text-4xl max-w-[40ch]">
        Self-hostable, minimalistic, and open-source URL shortener.
      </h1>
    </div>

    <ul class="text-gray-300 list-none list-inside space-y-1">
      <li class="pl-2 before:content-['✓'] before:size-4">
        Intuitive and user-friendly interface
      </li>
      <li class="pl-2 before:content-['✓'] before:size-4">
        Simple analytics
      </li>
      <li class="pl-2 before:content-['✓'] before:size-4">
        Free and open source
      </li>
    </ul>

    <NuxtLink
      to="/dashboard"
      class="w-fit flex items-center justify-center gap-2 px-4 rounded-md bg-peach text-black font-medium hover:transition-colors h-9 disabled:bg-peach/75 disabled:pointer-events-none hover:bg-peach/75"
    >
      Get Started
    </NuxtLink>
  </div>
</template>
