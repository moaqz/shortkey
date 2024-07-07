<script lang="ts" setup>
import type { Link } from "~/types/link";

interface Props extends Link {}

const props = defineProps<Props>();
const creationDate = computed(() => {
  return formatDate(props.createdAt);
});
</script>

<template>
  <li class="border border-neutral-800 rounded-md p-3 shadow transition-all hover:shadow-md flex flex-col gap-4">
    <div class="flex flex-col gap-1">
      <a :href="`/${slug}`" class="font-medium text-peach/80 hover:text-peach hover:transition-colors">
        /{{ slug }}
      </a>

      <NuxtLink :to="destinationUrl" external class="text-xs text-neutral-400 truncate max-w-60 lg:max-w-80 hover:underline" :title="destinationUrl">
        {{ destinationUrl }}
      </NuxtLink>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex items-center gap-1">
        <DeleteLinkModal :id="id" :slug="slug" />
        <EditLinkModal :id="id" :slug="slug" :url="destinationUrl" />
      </div>

      <div class="flex items-center gap-x-2 text-xs text-neutral-400">
        <span>{{ totalClicks }} clicks</span>
        <div data-orientation="vertical" role="none" class="shrink-0 bg-neutral-800 w-px h-4" />
        <time :datetime="createdAt">{{ creationDate }}</time>
      </div>
    </div>
  </li>
</template>
