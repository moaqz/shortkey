<script lang="ts" setup>
import { AvatarFallback, AvatarImage, AvatarRoot } from "radix-vue";

interface Props {
  username: string;
  profilePicture: string;
}

const props = defineProps<Props>();

const fallback = computed(() => {
  const letter = props.username.at(0) ?? "A";
  return letter.toUpperCase();
});
</script>

<template>
  <AvatarRoot>
    <AvatarImage :alt="`${username} profile picture`" :src="profilePicture" class="size-8 rounded-full overflow-hidden" />
    <AvatarFallback
      class="size-8 rounded-full overflow-hidden flex items-center justify-center bg-peach text-black"
    >
      {{ fallback }}
    </AvatarFallback>
  </AvatarRoot>
</template>
