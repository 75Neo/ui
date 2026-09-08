<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Listbox as Ark } from "@ark-ui/vue/listbox";
import { cn } from "cn";
import { listbox } from "@/registry/shared/lib/listbox.styles";

interface ListboxLabelProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ListboxLabelProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = listbox();
</script>

<template>
  <Ark.Label :class="cn(styles.label(), props.class)">
    <slot />
  </Ark.Label>
</template>
