<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Combobox as Ark } from "@ark-ui/vue/combobox";
import { cn } from "cn";
import { combobox } from "@/registry/shared/lib/combobox.styles";

interface ComboboxEmptyProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ComboboxEmptyProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = combobox();
</script>

<template>
  <Ark.Empty :class="cn(styles.empty(), props.class)">
    <slot />
  </Ark.Empty>
</template>
