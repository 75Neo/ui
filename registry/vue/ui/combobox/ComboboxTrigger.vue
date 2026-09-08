<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Combobox as Ark } from "@ark-ui/vue/combobox";
import { cn } from "cn";
import { combobox } from "@/registry/shared/lib/combobox.styles";

interface ComboboxTriggerProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ComboboxTriggerProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = combobox();
</script>

<template>
  <Ark.Trigger :class="cn(styles.trigger(), props.class)">
    <slot />
  </Ark.Trigger>
</template>
