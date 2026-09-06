<script setup lang="ts">
import { computed } from "vue";
import { ColorPicker as Ark } from "@ark-ui/vue/color-picker";
import { cn } from "@75neo/themes";

const props = defineProps<{
  class?: unknown;
}>();

const cls = computed(() => cn("size-full rounded-[inherit]", props.class as string | undefined));
</script>

<template>
  <Ark.AreaBackground data-slot="color-picker-area-background" :class="cls" />
</template>
