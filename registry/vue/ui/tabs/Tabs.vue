<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tabs as Ark } from "@ark-ui/vue/tabs";
import { cn } from "cn";
import { tabs } from "@/registry/shared/lib/tabs.styles";

interface TabsProps {
  defaultValue?: string;
  orientation?: "horizontal" | "vertical";
  activationMode?: "manual" | "automatic";
  deselectable?: boolean;
  loopFocus?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<TabsProps>(), {
  deselectable: undefined,
  loopFocus: undefined,
});

const value = defineModel<string>();

defineSlots<{
  default?: () => unknown;
}>();

const styles = tabs();
</script>

<template>
  <Ark.Root
    v-model="value"
    :default-value="props.defaultValue"
    :orientation="props.orientation"
    :activation-mode="props.activationMode"
    :deselectable="props.deselectable"
    :loop-focus="props.loopFocus"
    :class="cn(styles.root(), props.class)"
  >
    <slot />
  </Ark.Root>
</template>
