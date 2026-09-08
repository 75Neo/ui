<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Listbox as Ark } from "@ark-ui/vue/listbox";
import { cn } from "cn";
import { listbox } from "@/registry/shared/lib/listbox.styles";

interface ListboxEmptyProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ListboxEmptyProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = listbox();
</script>

<template>
  <Ark.Empty :class="cn(styles.empty(), props.class)">
    <slot />
  </Ark.Empty>
</template>
