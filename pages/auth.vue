<script lang="ts" setup>
useSeoMeta({
  title: "Sign In | Shortkey",
});

const user = useUser();
if (user.value) {
  navigateTo("/dashboard");
}
</script>

<template>
  <div class="flex-1 pt-25 max-w-sm mx-auto flex flex-col gap-y-4">
    <div class="flex flex-col space-y-2 text-center">
      <h1 class="text-2xl font-semibold tracking-tight">
        Sign in
      </h1>

      <p class="text-sm text-gray-400">
        Sign in to your account
      </p>
    </div>
    <a
      href="/login/google"
      class="w-full inline-flex items-center justify-center gap-4 border border-neutral-800 h-10 px-4 rounded-md text-sm hover:bg-neutral-800 hover:border-neutral-700/30 transition-colors"
    >
      <svg class="size-5">
        <use href="/icons/socials.svg#google" />
      </svg>
      Continue with Google
    </a>
  </div>
</template>
