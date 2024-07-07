<script lang="ts" setup>
import {
  DrawerContent,
  DrawerDescription,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "vaul-vue";

import {
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "radix-vue";

interface Props {
  title: string;
  description?: string;
  maxHeight?: string;
}

withDefaults(defineProps<Props>(), {
  maxHeight: "85%",
});

const isSmallScreen = useMediaQuery("(max-width: 640px)");
const open = defineModel<boolean>("open", { required: true });
</script>

<template>
  <DrawerRoot v-if="isSmallScreen" v-model:open="open" should-scale-background>
    <DrawerTrigger as-child>
      <slot name="trigger" />
    </DrawerTrigger>

    <DrawerPortal>
      <DrawerOverlay class="bg-neutral-950/40 backdrop-blur-md fixed inset-0 z-50" />
      <DrawerContent
        class="bg-neutral-900 text-neutral-100 flex flex-col rounded-t-xl h-full mt-24 fixed bottom-0 left-0 right-0 z-50 p-4"
        :style="{ maxHeight }"
      >
        <div class="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-neutral-300 mb-8" />

        <div class="max-w-md w-full mx-auto flex flex-col gap-y-8">
          <div class="space-y-2">
            <DrawerTitle class="text-xl font-bold">
              {{ title }}
            </DrawerTitle>

            <DrawerDescription v-if="description" class="text-gray-400 text-sm text-pretty">
              {{ description }}
            </DrawerDescription>
          </div>

          <slot name="content" />
        </div>
      </DrawerContent>
    </DrawerPortal>
  </DrawerRoot>

  <DialogRoot v-else v-model:open="open">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay class="bg-neutral-950/40 backdrop-blur-md fixed inset-0 z-50" />
      <DialogContent
        class="z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-neutral-900 text-neutral-100 border border-neutral-800 rounded-md flex flex-col"
      >
        <div class="space-y-2 p-6 border-b-neutral-800 border-b text-center">
          <DialogTitle class="text-xl font-bold">
            {{ title }}
          </DialogTitle>

          <DialogDescription v-if="description" class="text-gray-400 text-sm text-balance">
            {{ description }}
          </DialogDescription>
        </div>

        <div class="p-6">
          <slot name="content" />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
