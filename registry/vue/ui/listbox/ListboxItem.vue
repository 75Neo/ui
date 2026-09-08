<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Listbox as Ark } from "@ark-ui/vue/listbox";
import { cn } from "cn";
import { listboxStyles as styles } from "@/registry/shared/lib/listbox.styles";

interface ListboxItemProps {
  item: unknown;
  class?: HTMLAttributes["class"];
}

const props = defineProps<ListboxItemProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.Item :item="props.item" :class="cn(styles.item(), props.class)">
    <slot />
  </Ark.Item>
</template>
