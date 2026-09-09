<script setup lang="ts">
import { computed } from "vue";
import { PACKAGE_MANAGERS, packageCommands } from "@/lib/package-manager";

const props = defineProps<{ value: string }>();

const commands = computed(() => packageCommands(props.value));
</script>

<template>
  <div data-pm-tabs class="my-6 overflow-hidden rounded-md ring ring-default">
    <div role="tablist" aria-label="Package manager" class="flex items-center bg-muted/60 px-2">
      <button
        v-for="manager in PACKAGE_MANAGERS"
        :key="manager"
        type="button"
        role="tab"
        data-pm-trigger
        :data-pm-value="manager"
        class="border-b-2 border-transparent px-2.5 py-2 text-xs font-medium text-muted transition-colors hover:text-default"
      >
        {{ manager }}
      </button>
    </div>

    <div
      v-for="manager in PACKAGE_MANAGERS"
      :key="manager"
      data-pm-panel
      :data-pm-value="manager"
      class="relative"
    >
      <pre
        data-language="sh"
        class="overflow-x-auto bg-muted/40 p-4 pe-14 text-[0.8125rem] leading-6 whitespace-pre"
        >{{ commands[manager] }}</pre
      >
      <div data-code-copy class="absolute end-2 top-2"></div>
    </div>
  </div>
</template>
