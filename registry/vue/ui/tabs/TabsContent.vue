<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tabs as Ark } from "@ark-ui/vue/tabs";
import { cn } from "cn";
import { tabs } from "@/registry/shared/lib/tabs.styles";

interface TabsContentProps {
  value: string;
  class?: HTMLAttributes["class"];
}

const props = defineProps<TabsContentProps>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = tabs();
</script>

<template>
  <Ark.Content :value="props.value" :class="cn(styles.content(), props.class)">
    <slot />
  </Ark.Content>
</template>
