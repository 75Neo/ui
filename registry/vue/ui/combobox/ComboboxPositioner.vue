<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Combobox as Ark } from "@ark-ui/vue/combobox";
import { cn } from "cn";
import { combobox } from "@/registry/shared/lib/combobox.styles";

interface ComboboxPositionerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ComboboxPositionerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = combobox();
</script>

<template>
  <Ark.Positioner :class="cn(styles.positioner(), props.class)">
    <slot />
  </Ark.Positioner>
</template>
