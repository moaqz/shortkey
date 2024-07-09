<script lang="ts" setup>
definePageMeta({
  middleware: ["protected"],
});

const query = ref("");
const { data } = await useFetch("/api/links");

const showEmptyState = computed(() => {
  if (!data.value) {
    return true;
  }

  return data.value.length === 0;
});

const filteredLinks = computed(() => {
  if (!data.value) {
    return [];
  }

  return filterLinks(query.value, data.value);
});
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <div class="flex items-center justify-between pt-5 md:pt-10">
      <h1 class="text-xl font-bold capitalize md:text-2xl">
        Links
      </h1>
      <CreateLinkModal />
    </div>

    <EmptyState
      v-if="showEmptyState" title="You haven't created any link yet!"
      description="Start by creating your first link."
    />

    <UInput v-if="!showEmptyState" v-model="query" placeholder="Search..." />

    <ul class="grid gap-2 grid-cols-1 md:grid-cols-2">
      <LinkCard v-for="link in filteredLinks" v-bind="link" :key="link.id" />
    </ul>
  </div>
</template>
