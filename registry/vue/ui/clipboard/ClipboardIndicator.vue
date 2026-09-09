<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { Clipboard as Ark } from "@ark-ui/vue/clipboard";
import { cn } from "cn";
import { clipboardStyles as styles } from "@/registry/shared/lib/clipboard.styles";

interface ClipboardIndicatorProps {
  class?: HTMLAttributes["class"];
}

const props = defineProps<ClipboardIndicatorProps>();

defineSlots<{
  default?: () => unknown;
  copied?: () => unknown;
}>();
</script>

<template>
  <Ark.Indicator :class="cn(styles.indicator(), props.class)">
    <template #default>
      <slot />
    </template>
    <template #copied>
      <slot name="copied" />
    </template>
  </Ark.Indicator>
</template>
