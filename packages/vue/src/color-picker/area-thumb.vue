<script setup lang="ts">
import { computed } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

const cls = computed(() =>
  cn(
    "rounded-full shadow-sm ring-2 ring-bg outline-none focus-visible:outline-3",
    props.class as string | undefined,
  ),
);
</script>

<template>
  <Ark.AreaThumb data-slot="color-picker-area-thumb" :class="cls" />
</template>
