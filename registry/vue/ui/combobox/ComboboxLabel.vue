<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Combobox as Ark } from "@ark-ui/vue/combobox";
import { cn } from "cn";
import { combobox } from "@/registry/shared/lib/combobox.styles";

interface ComboboxLabelProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ComboboxLabelProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = combobox();
</script>

<template>
  <Ark.Label :class="cn(styles.label(), props.class)">
    <slot />
  </Ark.Label>
</template>
