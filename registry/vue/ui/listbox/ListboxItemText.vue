<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Listbox as Ark } from "@ark-ui/vue/listbox";
import { cn } from "cn";
import { listboxStyles as styles } from "@/registry/shared/lib/listbox.styles";

interface ListboxItemTextProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ListboxItemTextProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.ItemText :class="cn(styles.itemText(), props.class)">
    <slot />
  </Ark.ItemText>
</template>
