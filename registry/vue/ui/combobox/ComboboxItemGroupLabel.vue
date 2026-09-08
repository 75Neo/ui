<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Combobox as Ark } from "@ark-ui/vue/combobox";
import { cn } from "cn";
import { comboboxStyles as styles } from "@/registry/shared/lib/combobox.styles";

interface ComboboxItemGroupLabelProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ComboboxItemGroupLabelProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.ItemGroupLabel :class="cn(styles.itemGroupLabel(), props.class)">
    <slot />
  </Ark.ItemGroupLabel>
</template>
