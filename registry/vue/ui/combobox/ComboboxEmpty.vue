<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Combobox as Ark } from "@ark-ui/vue/combobox";
import { cn } from "cn";
import { comboboxStyles as styles } from "@/registry/shared/lib/combobox.styles";

interface ComboboxEmptyProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ComboboxEmptyProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Empty :class="cn(styles.empty(), props.class)">
    <slot />
  </Ark.Empty>
</template>
