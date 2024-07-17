<script lang="ts" setup>
import {
  DropdownMenuArrow,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "radix-vue";

const user = useUser();

async function logout() {
  try {
    await $fetch("/api/logout", {
      method: "POST",
    });

    user.value = null;
    await navigateTo("/");
  }
  catch (e) {
    // Todo
  }
}
</script>

<template>
  <header class="py-5 flex items-center justify-between">
    <NuxtLink to="/" class="text-xl font-bold">
      Short<span class="text-peach">Key</span>
    </NuxtLink>

    <template v-if="user">
      <DropdownMenuRoot>
        <DropdownMenuTrigger>
          <Avatar :profile-picture="user.profilePicture" :username="user.name" />
        </DropdownMenuTrigger>

        <DropdownMenuPortal class="mt-3">
          <DropdownMenuContent align="end" class="bg-neutral-900 border border-neutral-800 rounded py-1 min-w-50 text-neutral-300">
            <DropdownMenuItem class="px-3 flex hover:bg-neutral-800 transition-colors font-medium py-1.5 hover:text-neutral-50" as-child>
              <NuxtLink to="/dashboard">
                Dashboard
              </NuxtLink>
            </DropdownMenuItem>

            <DropdownMenuSeparator class="bg-neutral-800 h-px my-1" />

            <DropdownMenuItem
              class="w-full px-3 py-1.5 flex hover:bg-neutral-800 hover:text-neutral-50 transition-colors font-medium" as="button"
              @click="logout"
            >
              Logout
            </DropdownMenuItem>

            <DropdownMenuArrow class="fill-neutral-800" />
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenuRoot>
    </template>

    <template v-else>
      <NuxtLink to="/auth" class="text-neutral-400 hover:text-peach transition-colors hover:underline">
        Login &#8594;
      </NuxtLink>
    </template>
  </header>
</template>
