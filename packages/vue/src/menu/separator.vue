<script setup lang="ts">
import { Menu as Ark } from "@ark-ui/vue/menu";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();
</script>

<template>
  <Ark.Separator
    data-slot="menu-separator"
    :class="cn('-mx-1 my-1 h-px border-0 bg-border', props.class as string | undefined)"
  />
</template>
