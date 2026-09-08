<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Listbox as Ark } from "@ark-ui/vue/listbox";
import { cn } from "cn";
import { listbox } from "@/registry/shared/lib/listbox.styles";

interface ListboxItemIndicatorProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ListboxItemIndicatorProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = listbox();
</script>

<template>
  <Ark.ItemIndicator :class="cn(styles.itemIndicator(), props.class)">
    <slot />
  </Ark.ItemIndicator>
</template>
