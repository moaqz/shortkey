<script lang="ts" setup>
interface Props {
  title: string;
  description: string;
  illustration?: string;
}

withDefaults(defineProps<Props>(), {
  illustration: "just_browsing.svg",
});
</script>

<template>
  <div class="border border-neutral-800 rounded-md flex flex-col items-center justify-center py-16 space-y-10">
    <div class="flex flex-col items-center justify-center text-center gap-2">
      <h2 class="font-semibold text-xl text-balance">
        {{ title }}
      </h2>
      <p class="text-balance px-8 max-w-xl text-base text-gray-300">
        {{ description }}
      </p>
    </div>

    <img :src="`/images/${illustration}`" width="300" height="300" class="h-48 w-60">

    <!-- Call to action -->
    <slot name="cta" />
  </div>
</template>
