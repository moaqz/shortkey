<script lang="ts" setup>
import { toast } from "vue-sonner";

interface Props {
  id: number;
  slug: string;
}

const props = defineProps<Props>();

const open = ref(false);
const verificationCode = ref("");
const code = ref("");

onMounted(() => {
  verificationCode.value = generateRandomString(6);
});

async function onSubmit() {
  if (verificationCode.value !== code.value) {
    return;
  }

  try {
    await $fetch(
      `/api/links/${encodeURIComponent(props.id)}`,
      { method: "DELETE" },
    );

    await refreshNuxtData();
    toast.success("Link deleted successfully.");
  }
  catch (e) {
    toast.error("An error occurred while deleting the link. Please try again.");
  }
  finally {
    open.value = false;
  }
}
</script>

<template>
  <CustomModal
    v-model:open="open" max-height="50%" :title="`Delete /${slug}`"
    description="Are you sure you want to delete this link? This action cannot be undone."
  >
    <template #trigger>
      <button
        type="button"
        class="text-gray-400 hover:bg-neutral-800 px-2 h-8 rounded hover:text-gray-50 hover:transition-colors"
        title="Delete link"
      >
        <svg class="size-4">
          <use href="/icons/ui.svg#trash" />
        </svg>
      </button>
    </template>

    <template #content>
      <form class="flex flex-col gap-y-2" @submit.prevent="onSubmit">
        <div class="space-y-2">
          <ULabel for="verification">
            To verify, type <span class="text-sm font-semibold text-peach">{{ verificationCode }}</span> below
          </ULabel>
          <UInput id="verification" v-model="code" :pattern="verificationCode" required />
        </div>

        <UButton type="submit">
          Confirm
        </UButton>
      </form>
    </template>
  </CustomModal>
</template>
