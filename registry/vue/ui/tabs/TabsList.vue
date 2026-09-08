<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tabs as Ark } from "@ark-ui/vue/tabs";
import { cn } from "cn";
import { tabsStyles as styles } from "@/registry/shared/lib/tabs.styles";

interface TabsListProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TabsListProps>();

defineSlots<{
  default?: () => unknown;
}>();
</script>

<template>
  <Ark.List :class="cn(styles.list(), props.class)">
    <slot />
  </Ark.List>
</template>
