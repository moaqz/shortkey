<script lang="ts" setup>
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "radix-vue";
</script>

<template>
  <DialogRoot>
    <DialogTrigger as-child class="h-12 px-4 bg-neutral-800 hover:bg-neutral-700 hover:transition-colors rounded-r-md">
      <slot name="trigger" />
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay class="bg-neutral-950/40 backdrop-blur-md fixed inset-0 z-50" />
      <DialogContent
        class="z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-neutral-900 text-neutral-100 border border-neutral-800 rounded-md flex flex-col"
      >
        <div class="space-y-2 p-6 border-b-neutral-800 border-b text-center">
          <DialogTitle class="text-xl font-bold">
            Sign in to Shortkey
          </DialogTitle>
        </div>

        <div class="p-6">
          <DialogClose as-child>
            <a
              href="/login/google"
              class="w-full inline-flex items-center justify-center gap-4 border border-neutral-800 h-10 px-4 rounded-md text-sm hover:bg-neutral-800 hover:border-neutral-700/30 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" class="size-5">
                <use href="/icons/socials.svg#google" />
              </svg>
              Continue with Google
            </a>
          </DialogClose>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
