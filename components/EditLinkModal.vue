<script lang="ts" setup>
import { flatten, safeParse } from "valibot";
import { toast } from "vue-sonner";

interface Props {
  id: number;
  slug: string;
  url: string;
}

const props = defineProps<Props>();

const open = ref(false);
const form = ref<EditLink>({ id: props.id, slug: props.slug, url: props.url });
const errors = shallowRef<EditLinkErrors>({});
const isSubmitting = ref(false);

async function onSubmit() {
  isSubmitting.value = true;

  try {
    errors.value = {};
    const { success, issues } = safeParse(EditLinkSchema, form.value);
    if (!success) {
      errors.value = flatten(issues).nested ?? {};
      isSubmitting.value = false;
      return;
    }

    await $fetch(`/api/links/${encodeURIComponent(props.id)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: form.value,
    });

    open.value = false;
    toast.success("Link edited successfully.");
    await refreshNuxtData();
  }
  catch (e) {
    toast.error("An unexpected error occurred. Please try again later.");
  }
  finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <CustomModal v-model:open="open" :title="`Edit /${slug}`">
    <template #trigger>
      <button class="px-2 h-8 rounded text-gray-400 hover:text-gray-50 hover:bg-neutral-800 hover:transition-colors" title="Edit link">
        <svg class="size-4">
          <use href="/icons/ui.svg#pen" />
        </svg>
      </button>
    </template>

    <template #content>
      <form class="flex flex-col gap-y-4" @submit.prevent="onSubmit">
        <div class="flex flex-col gap-y-1">
          <ULabel for="destionation">
            Destination URL
          </ULabel>
          <UInput id="destionation" v-model="form.url" placeholder="https://cloudflare.com" />
          <span v-if="errors?.url" class="text-xs text-red-400 font-medium">
            {{ errors.url[0] }}
          </span>
        </div>

        <div class="flex flex-col gap-y-1">
          <div class="flex items-center justify-between">
            <ULabel for="slug">
              Short Link
            </ULabel>

            <button
              type="button" title="Generate a random key"
              class="p-1 rounded-md text-gray-400 transition-colors hover:bg-neutral-800" @click="form.slug = generateRandomString()"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" class="size-4">
                <use href="/icons/ui.svg#shuffle" />
              </svg>
            </button>
          </div>

          <UInput id="slug" v-model="form.slug" placeholder="JJUXlmJKcx" />
          <span v-if="errors?.slug" class="text-xs text-red-400 font-medium">
            {{ errors.slug[0] }}
          </span>
        </div>

        <UButton type="submit" :disabled="isSubmitting">
          <svg v-if="isSubmitting" width="24" height="24" viewBox="0 0 24 24" class="animate-spin">
            <use href="/icons/ui.svg#loader-circle" />
          </svg>
          {{ isSubmitting ? "Editing Link..." : "Edit Link" }}
        </UButton>
      </form>
    </template>
  </CustomModal>
</template>
