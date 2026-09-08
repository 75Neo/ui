<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Listbox as Ark } from "@ark-ui/vue/listbox";
import { cn } from "cn";
import { listbox } from "@/registry/shared/lib/listbox.styles";

interface ListboxItemGroupLabelProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ListboxItemGroupLabelProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = listbox();
</script>

<template>
  <Ark.ItemGroupLabel :class="cn(styles.itemGroupLabel(), props.class)">
    <slot />
  </Ark.ItemGroupLabel>
</template>
