<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Combobox as Ark } from "@ark-ui/vue/combobox";
import { cn } from "cn";
import { comboboxStyles as styles } from "@/registry/shared/lib/combobox.styles";

interface ComboboxContentProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ComboboxContentProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Content :class="cn(styles.content(), props.class)">
    <slot />
  </Ark.Content>
</template>
