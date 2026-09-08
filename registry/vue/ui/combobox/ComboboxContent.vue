<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Combobox as Ark } from "@ark-ui/vue/combobox";
import { cn } from "cn";
import { combobox } from "@/registry/shared/lib/combobox.styles";

interface ComboboxContentProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ComboboxContentProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = combobox();
</script>

<template>
  <Ark.Content :class="cn(styles.content(), props.class)">
    <slot />
  </Ark.Content>
</template>
