<script lang="ts" setup>
const modelValue = defineModel<string | number>();
</script>

<template>
  <input
    v-model="modelValue"
    class="w-full h-10 px-4 border border-neutral-800 rounded-md bg-transparent focus:outline focus:outline-offset-2 focus:outline-neutral-700"
  >
</template>
