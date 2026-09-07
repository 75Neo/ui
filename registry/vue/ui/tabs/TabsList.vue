<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tabs as Ark } from "@ark-ui/vue/tabs";
import { cn } from "cn";
import { tabs } from "@/registry/shared/lib/tabs.styles";

interface TabsListProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<TabsListProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = tabs();
</script>

<template>
  <Ark.List :class="cn(styles.list(), props.class)">
    <slot />
  </Ark.List>
</template>
