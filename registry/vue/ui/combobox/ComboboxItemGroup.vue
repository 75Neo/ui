<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Combobox as Ark } from "@ark-ui/vue/combobox";
import { cn } from "cn";
import { combobox } from "@/registry/shared/lib/combobox.styles";

interface ComboboxItemGroupProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ComboboxItemGroupProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = combobox();
</script>

<template>
  <Ark.ItemGroup :class="cn(styles.itemGroup(), props.class)">
    <slot />
  </Ark.ItemGroup>
</template>
