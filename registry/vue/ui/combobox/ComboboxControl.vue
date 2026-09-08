<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Combobox as Ark } from "@ark-ui/vue/combobox";
import { cn } from "cn";
import { combobox } from "@/registry/shared/lib/combobox.styles";

interface ComboboxControlProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ComboboxControlProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = combobox();
</script>

<template>
  <Ark.Control :class="cn(styles.control(), props.class)">
    <slot />
  </Ark.Control>
</template>
