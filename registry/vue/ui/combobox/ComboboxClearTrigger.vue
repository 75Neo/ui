<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Combobox as Ark } from "@ark-ui/vue/combobox";
import { cn } from "cn";
import { combobox } from "@/registry/shared/lib/combobox.styles";

interface ComboboxClearTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ComboboxClearTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = combobox();
</script>

<template>
  <Ark.ClearTrigger :class="cn(styles.clearTrigger(), props.class)">
    <slot />
  </Ark.ClearTrigger>
</template>
