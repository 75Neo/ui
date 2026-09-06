<script setup lang="ts">
import { cn, menuSizeData, type MenuRow } from "@75neo/themes";
import { useMenuVariants } from "./variants";
import MenuItemText from "./item-text.vue";
import type { Component } from "vue";

/**
 * The parts of a row that are the same whichever kind of row it is. Internal:
 * callers compose the exported parts, never this.
 */
const props = defineProps<{
  row: MenuRow<Component>;
}>();

const variants = useMenuVariants();
</script>

<template>
  <span
    v-if="props.row.icon != null"
    data-slot="menu-leading-icon"
    :class="cn('shrink-0 text-dimmed [&>svg]:size-full', menuSizeData.leadingIcon[variants.size])"
  >
    <component :is="props.row.icon" />
  </span>
  <MenuItemText>{{ props.row.label }}</MenuItemText>
  <kbd
    v-if="props.row.shortcut != null"
    data-slot="menu-shortcut"
    :class="
      cn(
        'ms-auto shrink-0 font-mono text-dimmed tabular-nums',
        menuSizeData.shortcut[variants.size],
      )
    "
  >
    {{ props.row.shortcut }}
  </kbd>
</template>
