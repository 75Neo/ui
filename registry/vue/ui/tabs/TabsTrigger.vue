<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Tabs as Ark } from "@ark-ui/vue/tabs";
import { cn } from "cn";
import { tabs } from "@/registry/shared/lib/tabs.styles";

interface TabsTriggerProps {
  value: string;
  disabled?: boolean;
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<TabsTriggerProps>(), {
  disabled: undefined,
});

defineSlots<{
  default?: () => unknown;
}>();

const styles = tabs();
</script>

<template>
  <Ark.Trigger
    :value="props.value"
    :disabled="props.disabled"
    :class="cn(styles.trigger(), props.class)"
  >
    <slot />
  </Ark.Trigger>
</template>
