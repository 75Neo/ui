<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Combobox as Ark } from "@ark-ui/vue/combobox";
import { cn } from "cn";
import { combobox } from "@/registry/shared/lib/combobox.styles";

interface ComboboxItemTextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ComboboxItemTextProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = combobox();
</script>

<template>
  <Ark.ItemText :class="cn(styles.itemText(), props.class)">
    <slot />
  </Ark.ItemText>
</template>
