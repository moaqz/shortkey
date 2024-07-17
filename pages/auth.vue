<script lang="ts" setup>
useSeoMeta({
  title: "Sign In",
});

const user = useUser();
if (user.value) {
  navigateTo("/dashboard");
}
</script>

<template>
  <div class="mx-auto flex flex-col gap-y-4 flex-1 pt-25 max-w-sm">
    <div class="flex flex-col space-y-2 text-center">
      <h1 class="font-semibold text-2xl tracking-tight">
        Sign in
      </h1>

      <p class="text-sm text-gray-400">
        Sign in to your account
      </p>
    </div>
    <a
      href="/login/google"
      class="w-full items-center justify-center border border-neutral-800 rounded-md text-sm hover:bg-neutral-800 transition-colors inline-flex gap-4 h-10 px-4 hover:border-neutral-700/30"
    >
      <svg class="size-5">
        <use href="/icons/socials.svg#google" />
      </svg>
      Continue with Google
    </a>
  </div>
</template>
