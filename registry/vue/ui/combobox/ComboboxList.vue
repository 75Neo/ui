<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Combobox as Ark } from "@ark-ui/vue/combobox";
import { cn } from "cn";
import { combobox } from "@/registry/shared/lib/combobox.styles";

interface ComboboxListProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ComboboxListProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = combobox();
</script>

<template>
  <Ark.List :class="cn(styles.list(), props.class)">
    <slot />
  </Ark.List>
</template>
