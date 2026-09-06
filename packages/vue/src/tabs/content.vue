<script setup lang="ts">
import { computed } from "vue";
import { Tabs as Ark } from "@ark-ui/vue/tabs";
import { cva } from "class-variance-authority";
import { cn, tabsDefaults, tabsSizeData, type TabsContentProps } from "@75neo/themes";
import { useTabsVariants } from "./variants";

const tabsContent = cva("min-w-0 outline-none", {
  variants: { size: tabsSizeData.content },
  defaultVariants: tabsDefaults,
});

const props = defineProps<
  TabsContentProps & {
    class?: unknown;
  }
>();

defineSlots<{
  default?: () => unknown;
}>();

const variants = useTabsVariants();
const contentClass = computed(() => cn(tabsContent(variants), props.class as string | undefined));
</script>

<template>
  <Ark.Content :value="props.value" data-slot="tabs-content" :class="contentClass">
    <slot />
  </Ark.Content>
</template>
